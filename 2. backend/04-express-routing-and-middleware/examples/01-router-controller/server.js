/**
 * ====================================================================
 * ПРИМЕР: Express Router и Controller
 * ====================================================================
 * 
 * Демонстрирует разделение кода на Router и Controller
 * 
 * Структура:
 *   src/
 *   ├── app.js
 *   ├── server.js
 *   ├── routes/
 *   │   └── product.router.js
 *   └── controllers/
 *       └── product.controller.js
 * 
 * Запуск: npm start
 * ====================================================================
 */

const express = require('express');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Простой логгер
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// КОНТРОЛЛЕР (обычно в отдельном файле)
// ==========================================

// Тестовые данные
const products = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA RTX 4090', price: 159990, category: 'Видеокарты' }
];
let nextId = 4;

/**
 * Контроллер — содержит логику обработки запросов
 */
const productController = {
    // GET /product/all
    getAllProducts: (req, res) => {
        const { category } = req.query;

        let result = products;
        if (category) {
            result = products.filter(p => p.category === category);
        }

        res.json({
            success: true,
            count: result.length,
            data: result
        });
    },

    // GET /product/:id
    getProductById: (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Товар не найден'
            });
        }

        res.json({ success: true, data: product });
    },

    // POST /product
    createProduct: (req, res) => {
        const { name, price, category } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                error: 'Поля name и price обязательны'
            });
        }

        const newProduct = {
            id: nextId++,
            name,
            price: parseFloat(price),
            category: category || null
        };

        products.push(newProduct);

        res.status(201).json({
            success: true,
            message: 'Товар создан',
            data: newProduct
        });
    },

    // DELETE /product/:id
    deleteProduct: (req, res) => {
        const id = parseInt(req.params.id);
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: 'Товар не найден'
            });
        }

        const deleted = products.splice(index, 1)[0];

        res.json({
            success: true,
            message: 'Товар удалён',
            data: deleted
        });
    }
};

// ==========================================
// РОУТЕР (обычно в отдельном файле)
// ==========================================

/**
 * Router — связывает URL с методами контроллера
 */
const productRouter = express.Router();

productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.delete('/:id', productController.deleteProduct);

// ==========================================
// MIDDLEWARE (примеры)
// ==========================================

/**
 * Middleware для проверки авторизации (заглушка)
 */
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация'
        });
    }

    // В реальности здесь проверка токена
    req.user = { id: 1, name: 'Admin' };
    next();
};

/**
 * Middleware для логирования времени выполнения
 */
const timingMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`  └─ Время: ${duration}ms`);
    });

    next();
};

// ==========================================
// ПОДКЛЮЧЕНИЕ К APP
// ==========================================

// Глобальный middleware
app.use(timingMiddleware);

// Подключаем роутер с префиксом /product
app.use('/product', productRouter);

// Пример защищённого маршрута
app.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: `Привет, ${req.user.name}! Это админ-панель.`
    });
});

// Главная страница
app.get('/', (req, res) => {
    res.json({
        message: 'API урока 04: Routing и Middleware',
        endpoints: {
            products: '/product/all',
            oneProduct: '/product/:id',
            admin: '/admin/dashboard (требует Header: Authorization)'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Маршрут ${req.method} ${req.url} не найден`
    });
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 Урок 04: Router и Middleware');
    console.log('='.repeat(55));
    console.log(`  ✅ Сервер: http://localhost:${PORT}`);
    console.log('');
    console.log('  Маршруты:');
    console.log('    GET  /product/all          — Все товары');
    console.log('    GET  /product/all?category=Процессоры');
    console.log('    GET  /product/:id          — Товар по ID');
    console.log('    POST /product              — Создать');
    console.log('    DELETE /product/:id        — Удалить');
    console.log('    GET  /admin/dashboard      — Защищённый');
    console.log('='.repeat(55));
});
