/**
 * ====================================================================
 * ПРИМЕР: Подключение к MySQL
 * ====================================================================
 * 
 * Демонстрирует:
 * - Connection Pool
 * - CRUD операции
 * - Параметризованные запросы (защита от SQL-инъекций)
 * 
 * Перед запуском:
 * 1. Установите MySQL
 * 2. Создайте базу данных (см. schema.sql)
 * 3. Настройте .env файл
 * 
 * Запуск: npm start
 * ====================================================================
 */

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// ==========================================
// DATABASE CONNECTION
// ==========================================

/**
 * Создаём пул соединений с MySQL
 * Пул переиспользует соединения — это эффективнее
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'storedb',

    // Настройки пула
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Проверка подключения к БД
 */
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Подключение к MySQL успешно!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Ошибка подключения к MySQL:', error.message);
        console.log('');
        console.log('⚠️  Убедитесь, что:');
        console.log('   1. MySQL сервер запущен');
        console.log('   2. Настройки в .env корректны');
        console.log('   3. База данных создана (см. schema.sql)');
        return false;
    }
}

// ==========================================
// SERVICE LAYER (работа с БД)
// ==========================================

const productService = {
    /**
     * Получить все товары
     */
    async getAll(category = null) {
        let query = 'SELECT * FROM products';
        const params = [];

        if (category) {
            query += ' WHERE product_category = ?';
            params.push(category);
        }

        query += ' ORDER BY product_id DESC';

        const [rows] = await pool.query(query, params);
        return rows;
    },

    /**
     * Получить товар по ID
     */
    async getById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE product_id = ?',
            [id]
        );
        return rows[0] || null;
    },

    /**
     * Создать товар
     */
    async create(data) {
        const { name, price, category } = data;

        const [result] = await pool.query(
            `INSERT INTO products (product_name, product_price, product_category) 
             VALUES (?, ?, ?)`,
            [name, price, category || null]
        );

        // Возвращаем созданный товар
        return this.getById(result.insertId);
    },

    /**
     * Обновить товар
     */
    async update(id, data) {
        const { name, price, category } = data;

        const [result] = await pool.query(
            `UPDATE products SET 
                product_name = COALESCE(?, product_name),
                product_price = COALESCE(?, product_price),
                product_category = COALESCE(?, product_category)
             WHERE product_id = ?`,
            [name, price, category, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return this.getById(id);
    },

    /**
     * Удалить товар
     */
    async delete(id) {
        const product = await this.getById(id);
        if (!product) return null;

        await pool.query(
            'DELETE FROM products WHERE product_id = ?',
            [id]
        );

        return product;
    },

    /**
     * Поиск товаров
     */
    async search(term) {
        const [rows] = await pool.query(
            `SELECT * FROM products 
             WHERE product_name LIKE ? 
             ORDER BY product_name`,
            [`%${term}%`]
        );
        return rows;
    }
};

// ==========================================
// CONTROLLER
// ==========================================

const productController = {
    async getAll(req, res) {
        try {
            const { category, search } = req.query;

            let products;
            if (search) {
                products = await productService.search(search);
            } else {
                products = await productService.getAll(category);
            }

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                error: 'Ошибка получения данных'
            });
        }
    },

    async getById(req, res) {
        try {
            const product = await productService.getById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Товар не найден'
                });
            }

            res.json({ success: true, data: product });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                error: 'Ошибка получения данных'
            });
        }
    },

    async create(req, res) {
        try {
            const { name, price } = req.body;

            if (!name || !price) {
                return res.status(400).json({
                    success: false,
                    error: 'Поля name и price обязательны'
                });
            }

            const product = await productService.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Товар создан',
                data: product
            });
        } catch (error) {
            console.error('Error:', error);

            // Дубликат
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    success: false,
                    error: 'Товар уже существует'
                });
            }

            res.status(500).json({
                success: false,
                error: 'Ошибка создания товара'
            });
        }
    },

    async update(req, res) {
        try {
            const product = await productService.update(req.params.id, req.body);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Товар не найден'
                });
            }

            res.json({
                success: true,
                message: 'Товар обновлён',
                data: product
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                error: 'Ошибка обновления'
            });
        }
    },

    async delete(req, res) {
        try {
            const product = await productService.delete(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Товар не найден'
                });
            }

            res.json({
                success: true,
                message: 'Товар удалён',
                data: product
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                error: 'Ошибка удаления'
            });
        }
    }
};

// ==========================================
// ROUTES
// ==========================================

const router = express.Router();

router.get('/all', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'API урока 06: MySQL Integration',
        database: process.env.DB_NAME || 'storedb',
        endpoints: {
            'GET /product/all': 'Все товары',
            'GET /product/all?search=intel': 'Поиск',
            'GET /product/:id': 'Товар по ID',
            'POST /product': 'Создать',
            'PUT /product/:id': 'Обновить',
            'DELETE /product/:id': 'Удалить'
        }
    });
});

app.use('/product', router);

app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

async function start() {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 Урок 06: MySQL Integration');
    console.log('='.repeat(55));

    // Проверяем подключение к БД
    await testConnection();

    app.listen(PORT, () => {
        console.log(`  🚀 Сервер: http://localhost:${PORT}`);
        console.log('='.repeat(55));
    });
}

start();
