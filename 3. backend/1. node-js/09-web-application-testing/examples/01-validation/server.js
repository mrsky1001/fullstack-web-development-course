/**
 * ====================================================================
 * ПРИМЕР: Валидация с express-validator
 * ====================================================================
 * 
 * Демонстрирует:
 * - Правила валидации
 * - Санитизация данных
 * - Централизованная обработка ошибок
 * - Кастомные валидаторы
 * 
 * Запуск: npm start
 * ====================================================================
 */

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// VALIDATION MIDDLEWARE
// ==========================================

/**
 * Middleware для обработки результатов валидации
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value
        }));

        console.log('  ⚠️ Validation errors:', formattedErrors);

        return res.status(400).json({
            success: false,
            error: 'Ошибка валидации',
            details: formattedErrors
        });
    }

    next();
};

// ==========================================
// VALIDATION RULES
// ==========================================

/**
 * Правила для создания товара
 */
const createProductRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Название обязательно')
        .isLength({ min: 2, max: 255 }).withMessage('Название: 2-255 символов')
        .escape(),  // Защита от XSS

    body('price')
        .notEmpty().withMessage('Цена обязательна')
        .isFloat({ min: 0.01, max: 99999999 })
        .withMessage('Цена должна быть положительным числом'),

    body('category')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Категория: макс. 100 символов'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Некорректный email')
        .normalizeEmail()
];

/**
 * Правила для обновления товара
 */
const updateProductRules = [
    param('id')
        .isInt({ min: 1 }).withMessage('Некорректный ID'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 }).withMessage('Название: 2-255 символов'),

    body('price')
        .optional()
        .isFloat({ min: 0.01 }).withMessage('Цена должна быть положительной')
];

/**
 * Правила для регистрации
 */
const registerRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Некорректный формат email')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Пароль обязателен')
        .isLength({ min: 6 }).withMessage('Пароль: минимум 6 символов')
        .matches(/\d/).withMessage('Пароль должен содержать хотя бы одну цифру')
        .matches(/[a-zA-Z]/).withMessage('Пароль должен содержать хотя бы одну букву'),

    body('confirmPassword')
        .notEmpty().withMessage('Подтверждение пароля обязательно')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Пароли не совпадают');
            }
            return true;
        }),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Имя: 2-100 символов')
        .escape()
];

/**
 * Правила для query параметров
 */
const listProductsRules = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('page должен быть >= 1')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('limit: 1-100')
        .toInt(),

    query('category')
        .optional()
        .trim()
        .isLength({ max: 100 })
];

// ==========================================
// "БАЗА ДАННЫХ"
// ==========================================

const products = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA RTX 4090', price: 159990, category: 'Видеокарты' }
];
let nextId = 4;

// ==========================================
// ROUTES
// ==========================================

/**
 * GET /products
 * С валидацией query параметров
 */
app.get('/products',
    listProductsRules,
    validate,
    (req, res) => {
        const { page = 1, limit = 10, category } = req.query;

        let result = products;
        if (category) {
            result = products.filter(p => p.category === category);
        }

        // Пагинация
        const start = (page - 1) * limit;
        const paginated = result.slice(start, start + limit);

        res.json({
            success: true,
            data: paginated,
            pagination: {
                page,
                limit,
                total: result.length,
                pages: Math.ceil(result.length / limit)
            }
        });
    }
);

/**
 * POST /products
 * С полной валидацией
 */
app.post('/products',
    createProductRules,
    validate,
    (req, res) => {
        const { name, price, category } = req.body;

        const product = {
            id: nextId++,
            name,
            price: parseFloat(price),
            category: category || null
        };

        products.push(product);

        console.log('  ✅ Product created:', product.name);

        res.status(201).json({
            success: true,
            message: 'Товар создан',
            data: product
        });
    }
);

/**
 * PUT /products/:id
 * С валидацией ID и body
 */
app.put('/products/:id',
    updateProductRules,
    validate,
    (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Товар не найден'
            });
        }

        const { name, price, category } = req.body;

        if (name) product.name = name;
        if (price) product.price = parseFloat(price);
        if (category !== undefined) product.category = category;

        res.json({
            success: true,
            message: 'Товар обновлён',
            data: product
        });
    }
);

/**
 * POST /register
 * Пример валидации регистрации
 */
app.post('/register',
    registerRules,
    validate,
    (req, res) => {
        const { email, password, name } = req.body;

        console.log('  ✅ User registered:', email);

        res.status(201).json({
            success: true,
            message: 'Регистрация успешна',
            user: {
                email,
                name: name || null
            }
        });
    }
);

// ==========================================
// ERROR HANDLING
// ==========================================

app.get('/', (req, res) => {
    res.json({
        message: 'API урока 09: Validation & Testing',
        endpoints: {
            'GET /products': 'Все товары (?page, ?limit, ?category)',
            'POST /products': 'Создать { name*, price*, category }',
            'PUT /products/:id': 'Обновить { name, price, category }',
            'POST /register': '{ email*, password*, confirmPassword*, name }'
        },
        testCases: {
            'POST /products с пустым name': '→ 400 + ошибка',
            'POST /products с price=-100': '→ 400 + ошибка',
            'POST /register с разными паролями': '→ 400 + ошибка',
            'GET /products?page=abc': '→ 400 + ошибка'
        }
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Внутренняя ошибка сервера'
    });
});

// ==========================================
// START
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(60));
    console.log('  🎓 Урок 09: Validation & Testing');
    console.log('='.repeat(60));
    console.log(`  🚀 Сервер: http://localhost:${PORT}`);
    console.log('');
    console.log('  Попробуйте отправить некорректные данные!');
    console.log('');
    console.log('  POST /products с body:');
    console.log('    ❌ { "name": "", "price": -100 }');
    console.log('    ✅ { "name": "Test", "price": 1000 }');
    console.log('='.repeat(60));
});
