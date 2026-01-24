/**
 * ====================================================================
 * ПРИМЕР: Архитектура MVC с Service Layer
 * ====================================================================
 * 
 * Полноценная структура проекта с разделением слоёв
 * 
 * Запуск: npm start
 * ====================================================================
 */

const express = require('express');
const app = express();

app.use(express.json());

// ==========================================
// MODEL (структура данных)
// ==========================================

/**
 * Класс Product — модель товара
 */
class Product {
    constructor(id, name, price, category = null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.createdAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            category: this.category,
            createdAt: this.createdAt
        };
    }
}

// ==========================================
// SERVICE (бизнес-логика)
// ==========================================

/**
 * ProductService — вся логика работы с товарами
 * Controller не знает, откуда берутся данные
 */
const productService = {
    // "База данных" в памяти
    products: [
        new Product(1, 'Intel Core i9-13900K', 55990, 'Процессоры'),
        new Product(2, 'AMD Ryzen 9 7950X', 62990, 'Процессоры'),
        new Product(3, 'NVIDIA RTX 4090', 159990, 'Видеокарты')
    ],
    nextId: 4,

    /**
     * Получить все товары
     */
    getAll(category = null) {
        if (category) {
            return this.products.filter(p =>
                p.category?.toLowerCase() === category.toLowerCase()
            );
        }
        return this.products;
    },

    /**
     * Получить товар по ID
     */
    getById(id) {
        return this.products.find(p => p.id === parseInt(id)) || null;
    },

    /**
     * Создать товар
     */
    create(data) {
        const { name, price, category } = data;

        // Валидация (бизнес-правила)
        if (!name || name.trim().length < 2) {
            throw new Error('Название должно содержать минимум 2 символа');
        }

        if (!price || price <= 0) {
            throw new Error('Цена должна быть положительным числом');
        }

        // Проверка на дубликат
        const exists = this.products.some(
            p => p.name.toLowerCase() === name.toLowerCase()
        );
        if (exists) {
            throw new Error('Товар с таким названием уже существует');
        }

        const product = new Product(
            this.nextId++,
            name.trim(),
            parseFloat(price),
            category || null
        );

        this.products.push(product);
        return product;
    },

    /**
     * Обновить товар
     */
    update(id, data) {
        const product = this.getById(id);
        if (!product) return null;

        if (data.name) product.name = data.name.trim();
        if (data.price) product.price = parseFloat(data.price);
        if (data.category !== undefined) product.category = data.category;

        return product;
    },

    /**
     * Удалить товар
     */
    delete(id) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;

        return this.products.splice(index, 1)[0];
    }
};

// ==========================================
// RESPONSE OBJECT (унифицированный ответ)
// ==========================================

/**
 * Класс для стандартизации всех ответов API
 */
class ResponseObject {
    static success(data, message = null) {
        const response = {
            success: true,
            timestamp: new Date().toISOString()
        };

        if (message) response.message = message;
        if (Array.isArray(data)) response.count = data.length;
        response.data = data;

        return response;
    }

    static error(errorMessage) {
        return {
            success: false,
            timestamp: new Date().toISOString(),
            error: errorMessage
        };
    }
}

// ==========================================
// CONTROLLER (обработка HTTP)
// ==========================================

/**
 * ProductController — обрабатывает HTTP, вызывает Service
 */
const productController = {
    getAll(req, res) {
        try {
            const { category } = req.query;
            const products = productService.getAll(category);
            res.json(ResponseObject.success(products));
        } catch (error) {
            res.status(500).json(ResponseObject.error(error.message));
        }
    },

    getById(req, res) {
        try {
            const product = productService.getById(req.params.id);

            if (!product) {
                return res.status(404).json(
                    ResponseObject.error('Товар не найден')
                );
            }

            res.json(ResponseObject.success(product));
        } catch (error) {
            res.status(500).json(ResponseObject.error(error.message));
        }
    },

    create(req, res) {
        try {
            const product = productService.create(req.body);
            res.status(201).json(
                ResponseObject.success(product, 'Товар успешно создан')
            );
        } catch (error) {
            // Ошибки валидации — 400
            res.status(400).json(ResponseObject.error(error.message));
        }
    },

    update(req, res) {
        try {
            const product = productService.update(req.params.id, req.body);

            if (!product) {
                return res.status(404).json(
                    ResponseObject.error('Товар не найден')
                );
            }

            res.json(ResponseObject.success(product, 'Товар обновлён'));
        } catch (error) {
            res.status(500).json(ResponseObject.error(error.message));
        }
    },

    delete(req, res) {
        try {
            const product = productService.delete(req.params.id);

            if (!product) {
                return res.status(404).json(
                    ResponseObject.error('Товар не найден')
                );
            }

            res.json(ResponseObject.success(product, 'Товар удалён'));
        } catch (error) {
            res.status(500).json(ResponseObject.error(error.message));
        }
    }
};

// ==========================================
// ROUTER (маршрутизация)
// ==========================================

const productRouter = express.Router();

productRouter.get('/all', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', productController.create);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);

// ==========================================
// APP CONFIGURATION
// ==========================================

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Маршруты
app.get('/', (req, res) => {
    res.json({
        message: 'API урока 05: MVC Architecture',
        endpoints: {
            'GET /product/all': 'Все товары',
            'GET /product/:id': 'Товар по ID',
            'POST /product': 'Создать товар',
            'PUT /product/:id': 'Обновить товар',
            'DELETE /product/:id': 'Удалить товар'
        }
    });
});

app.use('/product', productRouter);

// 404
app.use((req, res) => {
    res.status(404).json(ResponseObject.error('Маршрут не найден'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json(ResponseObject.error('Внутренняя ошибка сервера'));
});

// ==========================================
// SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 Урок 05: MVC Architecture');
    console.log('='.repeat(55));
    console.log(`  ✅ Сервер: http://localhost:${PORT}`);
    console.log('');
    console.log('  Слои:');
    console.log('    Model      — структура данных (Product)');
    console.log('    Service    — бизнес-логика');
    console.log('    Controller — обработка HTTP');
    console.log('    Router     — маршрутизация');
    console.log('='.repeat(55));
});
