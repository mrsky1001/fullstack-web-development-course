# Урок 09: Тестирование и Валидация

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Валидировать **входные данные** на сервере
- Использовать библиотеку **express-validator**
- Понимать основы **тестирования API**
- Отлаживать приложение с помощью **логирования**
- Применять лучшие практики **обработки ошибок**

---

## 📚 Теоретическая часть

### Зачем нужна валидация?

**Никогда не доверяйте данным от клиента!**

```javascript
// ❌ Опасно — данные не проверены
app.post('/products', async (req, res) => {
    const product = await db.query(
        'INSERT INTO products (name, price) VALUES (?, ?)',
        [req.body.name, req.body.price]  // Что если price = "не число"?
    );
});

// ✅ Безопасно — данные проверены
app.post('/products', validateProduct, async (req, res) => {
    // Сюда попадаем только если данные валидны
});
```

### Что может пойти не так?

| Проблема | Пример | Последствия |
|----------|--------|-------------|
| Пустые данные | `name: ""` | Некорректные записи в БД |
| Неверный тип | `price: "abc"` | Ошибка SQL |
| Слишком длинные | `name: "a".repeat(10000)` | Переполнение |
| SQL-инъекция | `name: "'; DROP TABLE --"` | Потеря данных |
| XSS | `name: "<script>..."` | Взлом пользователей |

---

## 📦 Express-Validator

**express-validator** — популярная библиотека для валидации данных в Express.

### Установка

```bash
npm install express-validator
```

### Базовое использование

```javascript
const { body, param, query, validationResult } = require('express-validator');

// Валидация в маршруте
app.post('/products',
    // Правила валидации (middleware)
    body('name')
        .notEmpty().withMessage('Название обязательно')
        .isLength({ min: 2, max: 255 }).withMessage('Название: 2-255 символов'),
    body('price')
        .notEmpty().withMessage('Цена обязательна')
        .isFloat({ min: 0.01 }).withMessage('Цена должна быть положительным числом'),
    body('category')
        .optional()
        .isString().withMessage('Категория должна быть строкой'),
    
    // Обработчик
    (req, res) => {
        // Проверяем результаты валидации
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        
        // Данные валидны, продолжаем...
    }
);
```

---

## ✅ Создание Middleware для валидации

### Middleware валидатора

```javascript
// middleware/validate.middleware.js

const { validationResult } = require('express-validator');

/**
 * Middleware для обработки результатов валидации
 * Используется после правил express-validator
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Форматируем ошибки
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value
        }));
        
        return res.status(400).json({
            success: false,
            error: 'Ошибка валидации',
            details: formattedErrors
        });
    }
    
    next();
};

module.exports = { validate };
```

### Правила валидации

```javascript
// validators/product.validator.js

const { body, param, query } = require('express-validator');

/**
 * Правила валидации для товаров
 */

// Валидация создания товара
const createProductRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Название обязательно')
        .isLength({ min: 2, max: 255 }).withMessage('Название: 2-255 символов')
        .escape(),  // Защита от XSS
    
    body('price')
        .notEmpty().withMessage('Цена обязательна')
        .isFloat({ min: 0.01, max: 99999999.99 })
        .withMessage('Цена: от 0.01 до 99999999.99'),
    
    body('category')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Категория: максимум 100 символов'),
    
    body('description')
        .optional()
        .trim()
        .isLength({ max: 5000 }).withMessage('Описание: максимум 5000 символов'),
    
    body('image')
        .optional()
        .trim()
        .isURL().withMessage('Изображение должно быть URL')
];

// Валидация обновления товара
const updateProductRules = [
    param('id')
        .isInt({ min: 1 }).withMessage('Некорректный ID товара'),
    
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 }).withMessage('Название: 2-255 символов'),
    
    body('price')
        .optional()
        .isFloat({ min: 0.01 }).withMessage('Цена должна быть положительной')
];

// Валидация ID в параметрах
const idParamRules = [
    param('id')
        .isInt({ min: 1 }).withMessage('Некорректный ID')
];

// Валидация query параметров (фильтры)
const listProductsRules = [
    query('category')
        .optional()
        .trim()
        .isLength({ max: 100 }),
    
    query('minPrice')
        .optional()
        .isFloat({ min: 0 }),
    
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 }),
    
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Страница должна быть >= 1'),
    
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Лимит: 1-100')
];

module.exports = {
    createProductRules,
    updateProductRules,
    idParamRules,
    listProductsRules
};
```

### Валидация пользователей

```javascript
// validators/auth.validator.js

const { body } = require('express-validator');

/**
 * Правила валидации для аутентификации
 */

const registerRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Некорректный формат email')
        .normalizeEmail(),  // Нормализация (lowercase, убрать точки)
    
    body('password')
        .notEmpty().withMessage('Пароль обязателен')
        .isLength({ min: 6 }).withMessage('Пароль: минимум 6 символов')
        .matches(/\d/).withMessage('Пароль должен содержать цифру'),
    
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Имя: 2-100 символов')
        .escape()
];

const loginRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Некорректный email'),
    
    body('password')
        .notEmpty().withMessage('Пароль обязателен')
];

module.exports = {
    registerRules,
    loginRules
};
```

---

## 🛣️ Использование в роутерах

```javascript
// routes/product.router.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { validate } = require('../middleware/validate.middleware');
const { isAuthenticated, isAdmin } = require('../middleware/auth.middleware');
const {
    createProductRules,
    updateProductRules,
    idParamRules,
    listProductsRules
} = require('../validators/product.validator');

// GET /product/all — с валидацией query
router.get('/all', 
    listProductsRules,
    validate,
    productController.getAllProducts
);

// GET /product/:id — с валидацией ID
router.get('/:id',
    idParamRules,
    validate,
    productController.getProductById
);

// POST /product — создание (с авторизацией и валидацией)
router.post('/',
    isAuthenticated,
    createProductRules,
    validate,
    productController.createProduct
);

// PUT /product/:id — обновление
router.put('/:id',
    isAuthenticated,
    updateProductRules,
    validate,
    productController.updateProduct
);

// DELETE /product/:id — удаление (только админ)
router.delete('/:id',
    isAdmin,
    idParamRules,
    validate,
    productController.deleteProduct
);

module.exports = router;
```

---

## 🔍 Кастомные валидаторы

```javascript
const { body } = require('express-validator');
const { pool } = require('../config/database');

// Проверка уникальности email
const checkEmailUnique = body('email').custom(async (email) => {
    const [rows] = await pool.query(
        'SELECT user_id FROM users WHERE user_email = ?',
        [email]
    );
    
    if (rows.length > 0) {
        throw new Error('Пользователь с таким email уже существует');
    }
    
    return true;
});

// Проверка существования товара
const checkProductExists = param('id').custom(async (id) => {
    const [rows] = await pool.query(
        'SELECT product_id FROM products WHERE product_id = ?',
        [id]
    );
    
    if (rows.length === 0) {
        throw new Error('Товар не найден');
    }
    
    return true;
});

// Проверка соответствия паролей
const checkPasswordsMatch = body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Пароли не совпадают');
    }
    return true;
});
```

---

## 🧹 Санитизация данных

Санитизация — это очистка данных от потенциально опасного содержимого.

```javascript
const { body } = require('express-validator');

const sanitizeProductRules = [
    body('name')
        .trim()           // Убрать пробелы по краям
        .escape()         // Экранировать HTML (&, <, >, ", ')
        .blacklist('\\'), // Удалить символы
    
    body('description')
        .trim()
        .stripLow()       // Удалить управляющие символы
        .escape(),
    
    body('email')
        .trim()
        .normalizeEmail({
            gmail_remove_dots: false,
            all_lowercase: true
        })
];
```

### Важные функции санитизации

| Функция | Что делает |
|---------|------------|
| `trim()` | Убирает пробелы по краям |
| `escape()` | Экранирует HTML-символы |
| `normalizeEmail()` | Нормализует email |
| `toInt()` | Преобразует в число |
| `toBoolean()` | Преобразует в boolean |
| `toLowerCase()` | Приводит к нижнему регистру |
| `stripLow()` | Удаляет управляющие символы |
| `blacklist(chars)` | Удаляет указанные символы |

---

## 🔴 Централизованная обработка ошибок

### Класс кастомных ошибок

```javascript
// utils/AppError.js

/**
 * Класс для кастомных ошибок приложения
 */
class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;  // Ошибка бизнес-логики, не баг
        this.details = details;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// Фабрики для типичных ошибок
class NotFoundError extends AppError {
    constructor(resource = 'Ресурс') {
        super(`${resource} не найден`, 404);
    }
}

class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, 400, details);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Требуется авторизация') {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'Доступ запрещён') {
        super(message, 403);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError
};
```

### Улучшенный Error Handler

```javascript
// middleware/error.middleware.js

const { AppError } = require('../utils/AppError');

/**
 * Обработчик ошибок (4 параметра!)
 */
const errorHandler = (err, req, res, next) => {
    // Логируем ошибку
    console.error('='.repeat(50));
    console.error('ERROR:', new Date().toISOString());
    console.error('URL:', req.method, req.url);
    console.error('Message:', err.message);
    
    if (process.env.NODE_ENV === 'development') {
        console.error('Stack:', err.stack);
    }
    console.error('='.repeat(50));
    
    // Определяем статус и сообщение
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Внутренняя ошибка сервера';
    let details = err.details || null;
    
    // Обработка специфических ошибок
    
    // MySQL ошибки
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 409;
        message = 'Запись уже существует';
    }
    
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        statusCode = 400;
        message = 'Связанная запись не найдена';
    }
    
    // JSON parse ошибки
    if (err instanceof SyntaxError && err.status === 400) {
        statusCode = 400;
        message = 'Некорректный JSON';
    }
    
    // Формируем ответ
    const response = {
        success: false,
        error: message
    };
    
    if (details) {
        response.details = details;
    }
    
    // В development показываем stack
    if (process.env.NODE_ENV === 'development' && statusCode === 500) {
        response.stack = err.stack;
    }
    
    res.status(statusCode).json(response);
};

module.exports = errorHandler;
```

### Использование в контроллерах

```javascript
// controllers/product.controller.js

const { NotFoundError, ValidationError } = require('../utils/AppError');

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        
        if (!product) {
            throw new NotFoundError('Товар');
        }
        
        res.json(ResponseObject.success(product));
    } catch (error) {
        next(error);  // Передаём в error handler
    }
};
```

---

## 📝 Логирование

### Простой логгер

```javascript
// utils/logger.js

/**
 * Простой логгер
 */
const logger = {
    info: (message, data = null) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
        if (data) console.log(data);
    },
    
    warn: (message, data = null) => {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
        if (data) console.warn(data);
    },
    
    error: (message, error = null) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        if (error) {
            console.error('Details:', error.message);
            console.error('Stack:', error.stack);
        }
    },
    
    debug: (message, data = null) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
            if (data) console.log(data);
        }
    }
};

module.exports = logger;
```

### Middleware для логирования запросов

```javascript
// middleware/logger.middleware.js

const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Логируем начало запроса
    logger.info(`→ ${req.method} ${req.url}`);
    
    // Логируем тело POST/PUT запросов (в development)
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        logger.debug('Body:', req.body);
    }
    
    // Перехватываем завершение
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusEmoji = status < 400 ? '✓' : '✗';
        
        logger.info(`← ${statusEmoji} ${req.method} ${req.url} ${status} (${duration}ms)`);
    });
    
    next();
};

module.exports = requestLogger;
```

---

## 🧪 Тестирование API

### Ручное тестирование с Postman

1. **Коллекция запросов:**
   - Создайте коллекцию "TechParts API"
   - Добавьте папки: Auth, Products, Cart

2. **Переменные окружения:**
   - `{{baseUrl}}` = `http://localhost:3000`

3. **Тесты в Postman:**
```javascript
// Scripts → Tests
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Response has success:true", () => {
    const json = pm.response.json();
    pm.expect(json.success).to.be.true;
});

pm.test("Products array exists", () => {
    const json = pm.response.json();
    pm.expect(json.data).to.be.an('array');
});
```

### Автоматическое тестирование (Jest + Supertest)

```bash
npm install --save-dev jest supertest
```

```javascript
// tests/product.test.js

const request = require('supertest');
const app = require('../src/app');

describe('Product API', () => {
    
    describe('GET /product/all', () => {
        it('should return all products', async () => {
            const res = await request(app)
                .get('/product/all')
                .expect('Content-Type', /json/)
                .expect(200);
            
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
        
        it('should filter by category', async () => {
            const res = await request(app)
                .get('/product/all?category=Процессоры')
                .expect(200);
            
            res.body.data.forEach(product => {
                expect(product.category).toBe('Процессоры');
            });
        });
    });
    
    describe('GET /product/:id', () => {
        it('should return product by ID', async () => {
            const res = await request(app)
                .get('/product/1')
                .expect(200);
            
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(1);
        });
        
        it('should return 404 for non-existent product', async () => {
            const res = await request(app)
                .get('/product/99999')
                .expect(404);
            
            expect(res.body.success).toBe(false);
        });
        
        it('should return 400 for invalid ID', async () => {
            const res = await request(app)
                .get('/product/abc')
                .expect(400);
            
            expect(res.body.success).toBe(false);
        });
    });
    
    describe('POST /product', () => {
        it('should require authentication', async () => {
            const res = await request(app)
                .post('/product')
                .send({ name: 'Test', price: 100 })
                .expect(401);
        });
        
        it('should validate required fields', async () => {
            // Тест с авторизацией — нужен agent с сессией
        });
    });
});
```

### Запуск тестов

```json
// package.json
{
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
```

```bash
npm test
```

---

## 📁 Финальная структура проекта

```
src/
├── config/
│   ├── database.js
│   └── passport.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── cart.controller.js
│   └── product.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── logger.middleware.js
│   ├── notFound.middleware.js
│   └── validate.middleware.js    # ← Новый
│
├── models/
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── auth.router.js
│   ├── cart.router.js
│   └── product.router.js
│
├── services/
│   ├── auth.service.js
│   ├── cart.service.js
│   └── product.service.js
│
├── utils/
│   ├── AppError.js               # ← Новый
│   ├── logger.js                 # ← Новый
│   └── ResponseObject.js
│
├── validators/                   # ← Новая папка
│   ├── auth.validator.js
│   └── product.validator.js
│
├── app.js
└── server.js

tests/                            # ← Новая папка
├── auth.test.js
├── product.test.js
└── setup.js

database/
└── schema.sql

.env
.env.example
package.json
README.md
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Валидация** | Проверка корректности данных |
| **Санитизация** | Очистка данных от опасного содержимого |
| **express-validator** | Библиотека для валидации в Express |
| **XSS** | Cross-Site Scripting — инъекция скриптов |
| **Escape** | Экранирование специальных символов |
| **Jest** | Фреймворк для тестирования JavaScript |
| **Supertest** | Библиотека для тестирования HTTP |
| **Логирование** | Запись событий для отладки |

---

## 🎓 Заключение курса

Поздравляем! Вы прошли полный курс **Backend-разработки на Node.js**!

### Чему вы научились:

✅ Понимать клиент-серверную архитектуру  
✅ Создавать серверы на Node.js и Express  
✅ Организовывать код по паттерну MVC  
✅ Работать с базой данных MySQL  
✅ Реализовывать аутентификацию пользователей  
✅ Интегрировать Frontend с Backend  
✅ Валидировать и защищать данные  

### Следующие шаги:

1. **Практика** — создайте свой проект с нуля
2. **TypeScript** — типизированный JavaScript
3. **ORM** — Sequelize, Prisma, TypeORM
4. **Docker** — контейнеризация приложений
5. **CI/CD** — автоматическое развёртывание
6. **Микросервисы** — масштабирование

---

**Курс:** Backend | **Урок:** 09-web-application-testing

🎉 **Удачи в дальнейшем развитии!**
