# Урок 05: Архитектура MVC

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Понимать и применять паттерн **MVC** (Model-View-Controller)
- Добавлять **Service Layer** для бизнес-логики
- Создавать **Model классы** для работы с данными
- Использовать **унифицированный формат ответа** API
- Организовывать код для масштабируемости

---

## 📚 Теоретическая часть

### Что такое MVC?

**MVC** (Model-View-Controller) — это архитектурный паттерн, разделяющий приложение на три компонента:

```
┌────────────────────────────────────────────────────────────────┐
│                           MVC                                  │
├──────────────────┬──────────────────┬──────────────────────────┤
│      MODEL       │      VIEW        │       CONTROLLER          │
│                  │                  │                          │
│  • Данные        │  • Отображение   │  • Логика                │
│  • Структура     │  • HTML/JSON     │  • Обработка запросов    │
│  • Валидация     │  • Шаблоны       │  • Взаимодействие        │
│  • БД операции   │                  │    Model ↔ View          │
└──────────────────┴──────────────────┴──────────────────────────┘
```

### MVC в контексте REST API

Для REST API мы адаптируем MVC — у нас нет традиционных "Views" (HTML-страниц). Вместо этого мы отправляем JSON.

```
┌───────────────────────────────────────────────────────────────────┐
│                    REST API Architecture                          │
│                                                                   │
│   Client          Controller        Service         Model         │
│      │                │                │               │          │
│      │  HTTP Request  │                │               │          │
│      │───────────────▶│                │               │          │
│      │                │  call service  │               │          │
│      │                │───────────────▶│               │          │
│      │                │                │  get data     │          │
│      │                │                │──────────────▶│          │
│      │                │                │               │ (DB)     │
│      │                │                │◀──────────────│          │
│      │                │◀───────────────│               │          │
│      │◀───────────────│  JSON Response │               │          │
│      │                │                │               │          │
└───────────────────────────────────────────────────────────────────┘
```

---

## 📁 Структура проекта с MVC

```
src/
├── controllers/          # Обработка HTTP-запросов
│   ├── product.controller.js
│   └── user.controller.js
│
├── services/             # Бизнес-логика
│   ├── product.service.js
│   └── user.service.js
│
├── models/               # Структура данных
│   ├── Product.js
│   └── User.js
│
├── routes/               # Маршруты
│   ├── product.router.js
│   └── user.router.js
│
├── middleware/           # Middleware
│   └── ...
│
├── utils/                # Утилиты
│   └── ResponseObject.js
│
├── app.js
└── server.js
```

### Роли компонентов

| Компонент | Ответственность | Зависит от |
|-----------|-----------------|------------|
| **Router** | Маршрутизация URL → Controller | Controller |
| **Controller** | Обработка HTTP, ответы | Service |
| **Service** | Бизнес-логика, правила | Model |
| **Model** | Структура данных, DB | — |

---

## 🔄 Поток данных

```
Запрос: POST /product
Body: { "name": "iPhone", "price": 99990 }

    ┌──────────────────────────────────────────────────────────────┐
    │                                                              │
    │   Router                                                     │
    │   router.post('/', controller.create)                        │
    │         │                                                    │
    │         ▼                                                    │
    │   Controller                                                 │
    │   • Получает req.body                                        │
    │   • Вызывает service.create(data)                            │
    │   • Отправляет res.json(response)                            │
    │         │                                                    │
    │         ▼                                                    │
    │   Service                                                    │
    │   • Валидация бизнес-правил                                  │
    │   • Обработка данных                                         │
    │   • Вызов Model для сохранения                               │
    │         │                                                    │
    │         ▼                                                    │
    │   Model                                                      │
    │   • Создание объекта                                         │
    │   • Сохранение в БД (позже)                                  │
    │   • Возврат результата                                       │
    │                                                              │
    └──────────────────────────────────────────────────────────────┘
```

---

## 📦 Model — Структура данных

Model определяет структуру объектов и может содержать методы для работы с данными.

```javascript
// models/Product.js

/**
 * Класс Product
 * Представляет товар в системе
 */
class Product {
    /**
     * @param {number} id - Уникальный идентификатор
     * @param {string} name - Название товара
     * @param {number} price - Цена
     * @param {string} category - Категория
     * @param {string} image - URL изображения
     */
    constructor(id, name, price, category = null, image = null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.createdAt = new Date();
    }

    /**
     * Преобразование в объект для JSON
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            category: this.category,
            image: this.image,
            createdAt: this.createdAt
        };
    }

    /**
     * Создание Product из объекта (например, из БД)
     * @param {Object} data - Данные товара
     * @returns {Product}
     */
    static fromObject(data) {
        const product = new Product(
            data.product_id || data.id,
            data.product_name || data.name,
            data.product_price || data.price,
            data.product_category || data.category,
            data.product_img || data.image
        );
        
        if (data.created_at) {
            product.createdAt = new Date(data.created_at);
        }
        
        return product;
    }
}

module.exports = Product;
```

### Model для пользователя

```javascript
// models/User.js

/**
 * Класс User
 * Представляет пользователя в системе
 */
class User {
    constructor(id, email, password, name = null, role = 'user') {
        this.id = id;
        this.email = email;
        this.password = password;  // Хеш пароля!
        this.name = name;
        this.role = role;
        this.createdAt = new Date();
    }

    /**
     * Преобразование в безопасный объект (без пароля!)
     */
    toSafeObject() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            role: this.role,
            createdAt: this.createdAt
        };
    }

    /**
     * Проверка, является ли пользователь администратором
     */
    isAdmin() {
        return this.role === 'admin';
    }

    static fromObject(data) {
        return new User(
            data.user_id || data.id,
            data.user_email || data.email,
            data.user_password || data.password,
            data.user_name || data.name,
            data.user_role || data.role
        );
    }
}

module.exports = User;
```

---

## ⚙️ Service — Бизнес-логика

Service содержит всю бизнес-логику. Controller только вызывает методы Service.

```javascript
// services/product.service.js

const Product = require('../models/Product');

/**
 * Сервис для работы с товарами
 * Содержит бизнес-логику
 */

// Временное хранилище (потом заменим на БД)
let products = [
    new Product(1, 'Intel Core i9-13900K', 55990, 'Процессоры'),
    new Product(2, 'AMD Ryzen 9 7950X', 62990, 'Процессоры'),
    new Product(3, 'NVIDIA RTX 4090', 159990, 'Видеокарты'),
    new Product(4, 'AMD RX 7900 XTX', 89990, 'Видеокарты')
];

let nextId = 5;

/**
 * Получить все товары
 * @param {string} category - Фильтр по категории (опционально)
 * @returns {Product[]}
 */
exports.getAllProducts = (category = null) => {
    if (category) {
        return products.filter(p => 
            p.category?.toLowerCase() === category.toLowerCase()
        );
    }
    return products;
};

/**
 * Получить товар по ID
 * @param {number} id
 * @returns {Product|null}
 */
exports.getProductById = (id) => {
    return products.find(p => p.id === parseInt(id)) || null;
};

/**
 * Создать новый товар
 * @param {Object} data - Данные товара
 * @returns {Product}
 * @throws {Error} При ошибке валидации
 */
exports.createProduct = (data) => {
    const { name, price, category, image } = data;
    
    // Валидация бизнес-правил
    if (!name || name.trim().length < 2) {
        throw new Error('Название должно содержать минимум 2 символа');
    }
    
    if (!price || price <= 0) {
        throw new Error('Цена должна быть положительным числом');
    }
    
    // Проверка на дубликат
    const exists = products.some(
        p => p.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
        throw new Error('Товар с таким названием уже существует');
    }
    
    // Создание товара
    const product = new Product(
        nextId++,
        name.trim(),
        parseFloat(price),
        category || null,
        image || null
    );
    
    products.push(product);
    
    return product;
};

/**
 * Обновить товар
 * @param {number} id
 * @param {Object} data
 * @returns {Product|null}
 */
exports.updateProduct = (id, data) => {
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
        return null;
    }
    
    // Обновляем только переданные поля
    if (data.name) product.name = data.name.trim();
    if (data.price) product.price = parseFloat(data.price);
    if (data.category !== undefined) product.category = data.category;
    if (data.image !== undefined) product.image = data.image;
    
    return product;
};

/**
 * Удалить товар
 * @param {number} id
 * @returns {Product|null} - Удалённый товар или null
 */
exports.deleteProduct = (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        return null;
    }
    
    const deleted = products.splice(index, 1)[0];
    return deleted;
};
```

---

## 🎮 Controller — Обработка HTTP

Controller получает HTTP-запросы и вызывает соответствующие методы Service.

```javascript
// controllers/product.controller.js

const productService = require('../services/product.service');

/**
 * Контроллер товаров
 * Обрабатывает HTTP-запросы
 */

/**
 * GET /product/all
 * Получить все товары
 */
exports.getAllProducts = (req, res, next) => {
    try {
        const { category } = req.query;
        const products = productService.getAllProducts(category);
        
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /product/:id
 * Получить товар по ID
 */
exports.getProductById = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = productService.getProductById(id);
        
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
    } catch (error) {
        next(error);
    }
};

/**
 * POST /product
 * Создать товар
 */
exports.createProduct = (req, res, next) => {
    try {
        const product = productService.createProduct(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Товар успешно создан',
            data: product
        });
    } catch (error) {
        // Ошибки валидации — 400
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * PUT /product/:id
 * Обновить товар
 */
exports.updateProduct = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = productService.updateProduct(id, req.body);
        
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
        next(error);
    }
};

/**
 * DELETE /product/:id
 * Удалить товар
 */
exports.deleteProduct = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = productService.deleteProduct(id);
        
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
        next(error);
    }
};
```

---

## 📤 Унифицированный формат ответа

Создадим класс для стандартизации всех ответов API.

```javascript
// utils/ResponseObject.js

/**
 * Класс для унифицированных ответов API
 */
class ResponseObject {
    /**
     * Успешный ответ
     * @param {any} data - Данные
     * @param {string} message - Сообщение
     * @returns {Object}
     */
    static success(data, message = null) {
        const response = {
            success: true,
            timestamp: new Date().toISOString()
        };
        
        if (message) {
            response.message = message;
        }
        
        if (Array.isArray(data)) {
            response.count = data.length;
        }
        
        response.data = data;
        
        return response;
    }

    /**
     * Ответ с ошибкой
     * @param {string} error - Текст ошибки
     * @param {number} code - HTTP код (опционально)
     * @returns {Object}
     */
    static error(error, code = null) {
        const response = {
            success: false,
            timestamp: new Date().toISOString(),
            error
        };
        
        if (code) {
            response.code = code;
        }
        
        return response;
    }

    /**
     * Пагинация
     * @param {Array} data - Массив данных
     * @param {number} page - Текущая страница
     * @param {number} limit - Элементов на странице
     * @param {number} total - Всего элементов
     */
    static paginated(data, page, limit, total) {
        return {
            success: true,
            timestamp: new Date().toISOString(),
            data,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        };
    }
}

module.exports = ResponseObject;
```

### Использование ResponseObject

```javascript
// controllers/product.controller.js
const ResponseObject = require('../utils/ResponseObject');

exports.getAllProducts = (req, res, next) => {
    try {
        const products = productService.getAllProducts();
        res.json(ResponseObject.success(products));
    } catch (error) {
        res.status(500).json(ResponseObject.error(error.message));
    }
};

exports.createProduct = (req, res, next) => {
    try {
        const product = productService.createProduct(req.body);
        res.status(201).json(
            ResponseObject.success(product, 'Товар успешно создан')
        );
    } catch (error) {
        res.status(400).json(ResponseObject.error(error.message));
    }
};
```

### Примеры ответов

```json
// Успешный ответ (список)
{
    "success": true,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "count": 4,
    "data": [
        { "id": 1, "name": "Intel Core i9", "price": 55990 },
        { "id": 2, "name": "AMD Ryzen 9", "price": 62990 }
    ]
}

// Успешный ответ (один объект)
{
    "success": true,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "message": "Товар успешно создан",
    "data": {
        "id": 5,
        "name": "New Product",
        "price": 29990
    }
}

// Ответ с ошибкой
{
    "success": false,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "error": "Товар не найден"
}
```

---

## 🛣️ Router — Связываем всё вместе

```javascript
// routes/product.router.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * Маршруты товаров
 * Базовый путь: /product
 */

// GET /product/all — Все товары
router.get('/all', productController.getAllProducts);

// GET /product/:id — Товар по ID
router.get('/:id', productController.getProductById);

// POST /product — Создать товар
router.post('/', productController.createProduct);

// PUT /product/:id — Обновить товар
router.put('/:id', productController.updateProduct);

// DELETE /product/:id — Удалить товар
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

---

## 📄 Полный файл app.js

```javascript
// app.js

const express = require('express');
const app = express();

// Импорт роутеров
const productRouter = require('./routes/product.router');

// Импорт middleware
const logger = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/error.middleware');
const notFound = require('./middleware/notFound.middleware');

// ==========================================
// MIDDLEWARE (порядок важен!)
// ==========================================

// 1. Парсинг JSON
app.use(express.json());

// 2. Парсинг URL-encoded
app.use(express.urlencoded({ extended: true }));

// 3. Логирование
app.use(logger);

// ==========================================
// МАРШРУТЫ
// ==========================================

// API информация
app.get('/', (req, res) => {
    res.json({
        name: 'Store API',
        version: '1.0.0',
        endpoints: {
            products: '/product'
        }
    });
});

// Подключение роутеров
app.use('/product', productRouter);

// ==========================================
// ОБРАБОТКА ОШИБОК (в конце!)
// ==========================================

app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

---

## 🏗️ Преимущества MVC + Service Layer

| Без MVC | С MVC |
|---------|-------|
| Весь код в одном файле | Код разделён по модулям |
| Сложно тестировать | Легко тестировать |
| Сложно масштабировать | Легко добавлять функционал |
| Дублирование кода | Переиспользование |
| Смешанные ответственности | Чёткое разделение |

### Правила:

1. **Controller** не должен знать о базе данных
2. **Service** не должен работать с req/res
3. **Model** только описывает структуру данных
4. **Router** только связывает URL с Controller

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **MVC** | Model-View-Controller — архитектурный паттерн |
| **Model** | Структура и правила данных |
| **View** | Представление (в REST API — JSON) |
| **Controller** | Обработчик HTTP-запросов |
| **Service** | Слой бизнес-логики |
| **DTO** | Data Transfer Object — объект для передачи данных |
| **Repository** | Паттерн для работы с хранилищем данных |

---

## ➡️ Что дальше?

В следующем уроке мы подключим настоящую **базу данных MySQL**:
- Установка и настройка MySQL
- Подключение через mysql2
- CRUD операции с реальными данными
- Миграции и схема базы данных

---

**Курс:** Backend | **Урок:** 05-mvc-architecture
