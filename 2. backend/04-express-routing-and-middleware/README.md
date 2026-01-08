# Урок 04: Маршрутизация и Middleware

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Использовать **Express Router** для организации маршрутов
- Создавать **контроллеры** (Controller Pattern)
- Понимать и создавать **middleware**
- Организовывать код в логическую структуру папок
- Обрабатывать ошибки централизованно

---

## 📚 Теоретическая часть

### Проблема: Всё в одном файле

Когда проект растёт, держать все маршруты в одном файле становится неудобно:

```javascript
// ❌ Плохо: всё в server.js
app.get('/products', ...);
app.get('/products/:id', ...);
app.post('/products', ...);
app.delete('/products/:id', ...);
app.get('/users', ...);
app.get('/users/:id', ...);
app.post('/users', ...);
app.post('/auth/login', ...);
app.post('/auth/register', ...);
// ... ещё 50 маршрутов
```

### Решение: Разделение на модули

```
src/
├── routes/
│   ├── product.router.js     # Маршруты товаров
│   ├── user.router.js        # Маршруты пользователей
│   └── auth.router.js        # Маршруты авторизации
├── controllers/
│   ├── product.controller.js # Логика товаров
│   ├── user.controller.js    # Логика пользователей
│   └── auth.controller.js    # Логика авторизации
├── app.js                    # Конфигурация Express
└── server.js                 # Запуск сервера
```

---

## 🛣️ Express Router

**Router** — это мини-приложение Express, содержащее группу маршрутов.

### Создание Router

```javascript
// routes/product.router.js
const express = require('express');
const router = express.Router();

// Все маршруты здесь будут иметь префикс /product
// (он добавляется при подключении в app.js)

// GET /product/all
router.get('/all', (req, res) => {
    res.json({ message: 'Список всех товаров' });
});

// GET /product/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Товар ${id}` });
});

// POST /product
router.post('/', (req, res) => {
    res.json({ message: 'Товар создан' });
});

// DELETE /product/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Товар ${id} удалён` });
});

module.exports = router;
```

### Подключение Router в app.js

```javascript
// app.js
const express = require('express');
const app = express();

// Импорт роутеров
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

// Middleware
app.use(express.json());

// Подключение роутеров с префиксами
app.use('/product', productRouter);   // /product/all, /product/:id
app.use('/user', userRouter);         // /user/all, /user/:id
app.use('/auth', authRouter);         // /auth/login, /auth/register

module.exports = app;
```

### Как это работает

```
Запрос: GET /product/all
         ↓
app.use('/product', productRouter)
         ↓
        совпало!
         ↓
router.get('/all', handler)
         ↓
        Ответ
```

---

## 🎮 Controller Pattern

**Controller** — это модуль, содержащий функции-обработчики (handlers).

### Зачем нужны контроллеры?

| Router | Controller |
|--------|------------|
| Определяет маршруты | Содержит бизнес-логику |
| Какой URL какой handler | Что делать при запросе |
| Минимум кода | Вся логика здесь |

### Создание Controller

```javascript
// controllers/product.controller.js

/**
 * Контроллер товаров
 * Содержит обработчики (handlers) для маршрутов
 */

// Тестовые данные (позже — из базы данных)
const products = [
    { id: 1, name: 'iPhone 15', price: 99990 },
    { id: 2, name: 'Samsung S24', price: 89990 },
    { id: 3, name: 'Pixel 8', price: 69990 }
];

/**
 * Получить все товары
 * GET /product/all
 */
exports.getAllProducts = (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
};

/**
 * Получить товар по ID
 * GET /product/:id
 */
exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Товар не найден'
        });
    }
    
    res.json({
        success: true,
        data: product
    });
};

/**
 * Создать товар
 * POST /product
 */
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
    
    // Валидация
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            error: 'Поля name и price обязательны'
        });
    }
    
    // Создание товара
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price)
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        message: 'Товар создан',
        data: newProduct
    });
};

/**
 * Удалить товар
 * DELETE /product/:id
 */
exports.deleteProduct = (req, res) => {
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
};
```

### Подключение Controller к Router

```javascript
// routes/product.router.js
const express = require('express');
const router = express.Router();

// Импорт контроллера
const productController = require('../controllers/product.controller');

// Маршруты используют методы контроллера
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

---

## 🔄 Middleware — Детально

### Что такое Middleware?

**Middleware** — функция, которая выполняется **между** получением запроса и отправкой ответа.

```
Запрос → Middleware 1 → Middleware 2 → Handler → Ответ
```

### Структура Middleware

```javascript
const myMiddleware = (req, res, next) => {
    // req — объект запроса
    // res — объект ответа
    // next — функция перехода к следующему обработчику
    
    console.log('Middleware выполнен');
    
    // Передаём управление дальше
    next();
    
    // ИЛИ отправляем ответ (завершаем цепочку)
    // res.status(403).json({ error: 'Доступ запрещён' });
};
```

### Виды Middleware

```javascript
// 1. Глобальный — для всех маршрутов
app.use(express.json());
app.use(myMiddleware);

// 2. На конкретный путь
app.use('/api', apiMiddleware);

// 3. На конкретный маршрут
app.get('/admin', authMiddleware, adminHandler);

// 4. В роутере
router.use(routerMiddleware);
router.get('/protected', authMiddleware, handler);
```

---

## 📝 Примеры Middleware

### 1. Логирование запросов

```javascript
// middleware/logger.middleware.js

/**
 * Middleware для логирования всех запросов
 */
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    
    console.log(`[${timestamp}] ${method} ${url}`);
    
    // Засекаем время выполнения
    const start = Date.now();
    
    // Перехватываем отправку ответа
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
    });
    
    next();
};

module.exports = logger;
```

**Использование:**
```javascript
// app.js
const logger = require('./middleware/logger.middleware');
app.use(logger);
```

### 2. Проверка авторизации

```javascript
// middleware/auth.middleware.js

/**
 * Middleware для проверки авторизации
 * Проверяет наличие заголовка Authorization
 */
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация'
        });
    }
    
    // Простая проверка (в реальности — проверка токена)
    if (authHeader !== 'Bearer secret-token') {
        return res.status(403).json({
            success: false,
            error: 'Неверный токен'
        });
    }
    
    // Добавляем информацию о пользователе в запрос
    req.user = { id: 1, name: 'Admin' };
    
    next();
};

module.exports = { isAuthenticated };
```

**Использование:**
```javascript
// routes/admin.router.js
const { isAuthenticated } = require('../middleware/auth.middleware');

// Защищённый маршрут
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.json({
        message: `Привет, ${req.user.name}!`,
        secretData: '...'
    });
});
```

### 3. Валидация запроса

```javascript
// middleware/validate.middleware.js

/**
 * Middleware для валидации создания товара
 */
const validateProduct = (req, res, next) => {
    const { name, price } = req.body;
    const errors = [];
    
    if (!name || name.trim() === '') {
        errors.push('Поле "name" обязательно');
    }
    
    if (!price || isNaN(price) || price <= 0) {
        errors.push('Поле "price" должно быть положительным числом');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    
    next();
};

module.exports = { validateProduct };
```

**Использование:**
```javascript
const { validateProduct } = require('../middleware/validate.middleware');

router.post('/', validateProduct, productController.createProduct);
```

### 4. CORS Middleware

```javascript
// middleware/cors.middleware.js

/**
 * Middleware для настройки CORS
 * Позволяет запросы с других доменов
 */
const cors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Обработка preflight запросов
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    
    next();
};

module.exports = cors;
```

---

## 🔴 Обработка ошибок

### Централизованный обработчик ошибок

```javascript
// middleware/error.middleware.js

/**
 * Middleware для обработки ошибок
 * ВАЖНО: должен иметь 4 параметра!
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    
    // Определяем статус код
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Внутренняя ошибка сервера',
        // В development показываем stack trace
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
```

### Обработка 404

```javascript
// middleware/notFound.middleware.js

/**
 * Middleware для несуществующих маршрутов
 */
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Маршрут ${req.method} ${req.url} не найден`
    });
};

module.exports = notFound;
```

### Подключение в app.js

```javascript
// app.js
const express = require('express');
const app = express();

// Middleware
const logger = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/error.middleware');
const notFound = require('./middleware/notFound.middleware');

// Роутеры
const productRouter = require('./routes/product.router');

// Глобальные middleware (в начале)
app.use(express.json());
app.use(logger);

// Маршруты
app.use('/product', productRouter);

// Обработчики ошибок (В КОНЦЕ!)
app.use(notFound);      // 404 — маршрут не найден
app.use(errorHandler);  // 500 — ошибки приложения

module.exports = app;
```

### Выброс ошибки в контроллере

```javascript
// controllers/product.controller.js

exports.getProductById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            const error = new Error('ID должен быть числом');
            error.statusCode = 400;
            throw error;
        }
        
        const product = products.find(p => p.id === id);
        
        if (!product) {
            const error = new Error('Товар не найден');
            error.statusCode = 404;
            throw error;
        }
        
        res.json({ success: true, data: product });
        
    } catch (err) {
        next(err);  // Передаём в error handler
    }
};
```

---

## 📁 Финальная структура проекта

```
src/
├── controllers/
│   ├── product.controller.js
│   ├── user.controller.js
│   └── auth.controller.js
│
├── routes/
│   ├── product.router.js
│   ├── user.router.js
│   └── auth.router.js
│
├── middleware/
│   ├── logger.middleware.js
│   ├── auth.middleware.js
│   ├── validate.middleware.js
│   ├── error.middleware.js
│   └── notFound.middleware.js
│
├── app.js              # Конфигурация Express
└── server.js           # Запуск сервера

.env                    # Переменные окружения
package.json
```

---

## 📋 Порядок подключения Middleware

Порядок **очень важен**! Middleware выполняются сверху вниз.

```javascript
// app.js — Правильный порядок

const express = require('express');
const app = express();

// 1. Парсеры (самые первые)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS (до маршрутов)
app.use(cors);

// 3. Логирование (до маршрутов)
app.use(logger);

// 4. Статические файлы
app.use(express.static('public'));

// 5. API маршруты
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// 6. 404 handler (после всех маршрутов)
app.use(notFound);

// 7. Error handler (самый последний)
app.use(errorHandler);

module.exports = app;
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Router** | Модуль Express для группировки маршрутов |
| **Controller** | Модуль с обработчиками (handlers) |
| **Middleware** | Промежуточная функция обработки запроса |
| **next()** | Передаёт управление следующему обработчику |
| **Handler** | Функция-обработчик маршрута |
| **Prefix** | Префикс URL при подключении роутера |
| **Error Handler** | Специальный middleware для ошибок (4 параметра) |

---

## ➡️ Что дальше?

В следующем уроке мы изучим **архитектуру MVC**:
- Разделение на Model, View, Controller
- Добавление Service Layer
- Работа с данными (подготовка к базе данных)
- Унифицированный формат ответа API

---

**Курс:** Backend | **Урок:** 04-express-routing-and-middleware
