# Урок 06: Интеграция Node.js и MySQL

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Установить и настроить **MySQL**
- Подключаться к базе данных из **Node.js**
- Выполнять **CRUD операции** (Create, Read, Update, Delete)
- Использовать **пул соединений** (Connection Pool)
- Обрабатывать ошибки при работе с БД
- Защищаться от **SQL-инъекций**

---

## 📚 Теоретическая часть

### Зачем нужна база данных?

До сих пор мы хранили данные в массивах — при перезапуске сервера все данные терялись. База данных решает эту проблему.

| Хранилище | Плюсы | Минусы |
|-----------|-------|--------|
| Массив в памяти | Быстро, просто | Теряется при перезапуске |
| Файл (JSON) | Простота | Медленно, сложно масштабировать |
| **База данных** | Надёжно, быстро, масштабируемо | Требует настройки |

### MySQL — Реляционная СУБД

**MySQL** — одна из самых популярных реляционных баз данных. Данные хранятся в таблицах со строками и столбцами.

```
Таблица products:
┌─────────────┬──────────────────────┬───────────────┬────────────────┐
│ product_id  │ product_name         │ product_price │ product_category│
├─────────────┼──────────────────────┼───────────────┼────────────────┤
│ 1           │ Intel Core i9-13900K │ 55990.00      │ Процессоры     │
│ 2           │ AMD Ryzen 9 7950X    │ 62990.00      │ Процессоры     │
│ 3           │ NVIDIA RTX 4090      │ 159990.00     │ Видеокарты     │
└─────────────┴──────────────────────┴───────────────┴────────────────┘
```

---

## 🛠️ Установка MySQL

### Windows

1. Скачайте [MySQL Installer](https://dev.mysql.com/downloads/installer/)
2. Выберите "MySQL Server" и "MySQL Workbench"
3. Следуйте инструкциям (запомните пароль root!)

### macOS

```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Проверка установки

```bash
mysql -u root -p
# Введите пароль
```

```sql
-- В консоли MySQL:
SHOW DATABASES;
```

---

## 📦 Создание базы данных

### SQL-скрипт для создания схемы

```sql
-- database/schema.sql

-- Создаём базу данных
CREATE DATABASE IF NOT EXISTS storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE storedb;

-- ==========================================
-- Таблица пользователей
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Таблица товаров
-- ==========================================
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_category VARCHAR(100),
    product_img VARCHAR(500),
    product_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Таблица корзины
-- ==========================================
CREATE TABLE IF NOT EXISTS shopping_cart (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    item_quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ==========================================
-- Тестовые данные
-- ==========================================
INSERT INTO products (product_name, product_price, product_category) VALUES
    ('Intel Core i9-13900K', 55990, 'Процессоры'),
    ('AMD Ryzen 9 7950X', 62990, 'Процессоры'),
    ('NVIDIA GeForce RTX 4090', 159990, 'Видеокарты'),
    ('AMD Radeon RX 7900 XTX', 89990, 'Видеокарты'),
    ('ASUS ROG STRIX Z790-E', 42990, 'Материнские платы'),
    ('Corsair Vengeance DDR5 32GB', 12990, 'Оперативная память'),
    ('Samsung 990 PRO 2TB', 18990, 'SSD');
```

### Выполнение скрипта

```bash
mysql -u root -p < database/schema.sql
```

---

## 📡 Подключение к MySQL из Node.js

### Установка mysql2

```bash
npm install mysql2 dotenv
```

### Файл .env

```env
# .env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=storedb
```

### Создание подключения (Connection Pool)

```javascript
// config/database.js

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Connection Pool — пул соединений с БД
 * 
 * Почему пул, а не одно соединение?
 * - Пул переиспользует соединения
 * - Не нужно открывать/закрывать соединение каждый раз
 * - Ограничивает максимум соединений
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'storedb',
    
    // Настройки пула
    waitForConnections: true,  // Ожидать свободное соединение
    connectionLimit: 10,       // Максимум соединений
    queueLimit: 0              // Без ограничений очереди
});

/**
 * Проверка подключения
 */
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Подключение к MySQL успешно!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Ошибка подключения к MySQL:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };
```

### Проверка подключения при запуске

```javascript
// server.js

require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    // Проверяем подключение к БД
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
        console.error('⚠️  Сервер запущен без подключения к БД');
    }
    
    app.listen(PORT, () => {
        console.log(`🚀 Сервер: http://localhost:${PORT}`);
    });
}

startServer();
```

---

## 🔍 Выполнение SQL-запросов

### Базовые операции

```javascript
const { pool } = require('../config/database');

// ==========================================
// SELECT — Получение данных
// ==========================================

// Все записи
const [rows] = await pool.query('SELECT * FROM products');

// С условием (используем ? для параметров!)
const [rows] = await pool.query(
    'SELECT * FROM products WHERE product_id = ?',
    [productId]
);

// С несколькими параметрами
const [rows] = await pool.query(
    'SELECT * FROM products WHERE product_category = ? AND product_price < ?',
    [category, maxPrice]
);

// ==========================================
// INSERT — Создание записи
// ==========================================

const [result] = await pool.query(
    'INSERT INTO products (product_name, product_price, product_category) VALUES (?, ?, ?)',
    [name, price, category]
);

console.log('ID новой записи:', result.insertId);

// ==========================================
// UPDATE — Обновление записи
// ==========================================

const [result] = await pool.query(
    'UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?',
    [name, price, id]
);

console.log('Обновлено строк:', result.affectedRows);

// ==========================================
// DELETE — Удаление записи
// ==========================================

const [result] = await pool.query(
    'DELETE FROM products WHERE product_id = ?',
    [id]
);

console.log('Удалено строк:', result.affectedRows);
```

---

## ⚠️ Защита от SQL-инъекций

### ❌ НИКОГДА не делайте так!

```javascript
// ОПАСНО! SQL-инъекция!
const id = req.params.id;  // Может содержать "1; DROP TABLE products; --"
const query = `SELECT * FROM products WHERE id = ${id}`;
```

### ✅ Всегда используйте параметризованные запросы

```javascript
// БЕЗОПАСНО! Параметры экранируются автоматически
const [rows] = await pool.query(
    'SELECT * FROM products WHERE product_id = ?',
    [req.params.id]
);
```

| Способ | Безопасность |
|--------|--------------|
| Строковая конкатенация | ❌ ОПАСНО |
| Шаблонные строки (`${}`) | ❌ ОПАСНО |
| Плейсхолдеры (?) | ✅ БЕЗОПАСНО |

---

## 📦 Service Layer с MySQL

### Product Service

```javascript
// services/product.service.js

const { pool } = require('../config/database');
const Product = require('../models/Product');

/**
 * Сервис для работы с товарами
 * Теперь использует MySQL
 */

/**
 * Получить все товары
 * @param {string} category - Фильтр по категории
 * @returns {Promise<Product[]>}
 */
exports.getAllProducts = async (category = null) => {
    let query = 'SELECT * FROM products';
    const params = [];
    
    if (category) {
        query += ' WHERE product_category = ?';
        params.push(category);
    }
    
    query += ' ORDER BY product_id DESC';
    
    const [rows] = await pool.query(query, params);
    
    // Преобразуем в объекты Product
    return rows.map(row => Product.fromObject(row));
};

/**
 * Получить товар по ID
 * @param {number} id
 * @returns {Promise<Product|null>}
 */
exports.getProductById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM products WHERE product_id = ?',
        [id]
    );
    
    if (rows.length === 0) {
        return null;
    }
    
    return Product.fromObject(rows[0]);
};

/**
 * Создать товар
 * @param {Object} data
 * @returns {Promise<Product>}
 */
exports.createProduct = async (data) => {
    const { name, price, category, image, description } = data;
    
    // Валидация
    if (!name || name.trim().length < 2) {
        throw new Error('Название должно содержать минимум 2 символа');
    }
    
    if (!price || price <= 0) {
        throw new Error('Цена должна быть положительным числом');
    }
    
    // Вставка в БД
    const [result] = await pool.query(
        `INSERT INTO products 
         (product_name, product_price, product_category, product_img, product_description) 
         VALUES (?, ?, ?, ?, ?)`,
        [name.trim(), price, category || null, image || null, description || null]
    );
    
    // Возвращаем созданный товар
    return this.getProductById(result.insertId);
};

/**
 * Обновить товар
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Product|null>}
 */
exports.updateProduct = async (id, data) => {
    // Проверяем существование
    const existing = await this.getProductById(id);
    if (!existing) {
        return null;
    }
    
    const { name, price, category, image, description } = data;
    
    await pool.query(
        `UPDATE products SET 
            product_name = COALESCE(?, product_name),
            product_price = COALESCE(?, product_price),
            product_category = COALESCE(?, product_category),
            product_img = COALESCE(?, product_img),
            product_description = COALESCE(?, product_description)
         WHERE product_id = ?`,
        [name, price, category, image, description, id]
    );
    
    return this.getProductById(id);
};

/**
 * Удалить товар
 * @param {number} id
 * @returns {Promise<boolean>}
 */
exports.deleteProduct = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM products WHERE product_id = ?',
        [id]
    );
    
    return result.affectedRows > 0;
};

/**
 * Поиск товаров
 * @param {string} searchTerm
 * @returns {Promise<Product[]>}
 */
exports.searchProducts = async (searchTerm) => {
    const [rows] = await pool.query(
        `SELECT * FROM products 
         WHERE product_name LIKE ? OR product_description LIKE ?
         ORDER BY product_name`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    
    return rows.map(row => Product.fromObject(row));
};
```

---

## 🎮 Controller с async/await

```javascript
// controllers/product.controller.js

const productService = require('../services/product.service');
const ResponseObject = require('../utils/ResponseObject');

/**
 * GET /product/all
 */
exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        
        let products;
        if (search) {
            products = await productService.searchProducts(search);
        } else {
            products = await productService.getAllProducts(category);
        }
        
        res.json(ResponseObject.success(products));
    } catch (error) {
        next(error);
    }
};

/**
 * GET /product/:id
 */
exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        
        if (!product) {
            return res.status(404).json(
                ResponseObject.error('Товар не найден')
            );
        }
        
        res.json(ResponseObject.success(product));
    } catch (error) {
        next(error);
    }
};

/**
 * POST /product
 */
exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        
        res.status(201).json(
            ResponseObject.success(product, 'Товар успешно создан')
        );
    } catch (error) {
        // Ошибки валидации
        if (error.message.includes('должен') || error.message.includes('должна')) {
            return res.status(400).json(
                ResponseObject.error(error.message)
            );
        }
        next(error);
    }
};

/**
 * PUT /product/:id
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(
            req.params.id, 
            req.body
        );
        
        if (!product) {
            return res.status(404).json(
                ResponseObject.error('Товар не найден')
            );
        }
        
        res.json(ResponseObject.success(product, 'Товар обновлён'));
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /product/:id
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        
        if (!deleted) {
            return res.status(404).json(
                ResponseObject.error('Товар не найден')
            );
        }
        
        res.json(ResponseObject.success(null, 'Товар удалён'));
    } catch (error) {
        next(error);
    }
};
```

---

## 🔄 Транзакции

Транзакции гарантируют, что все операции выполнятся, или ни одна.

```javascript
/**
 * Создание заказа (пример транзакции)
 */
exports.createOrder = async (userId, cartItems) => {
    const connection = await pool.getConnection();
    
    try {
        // Начинаем транзакцию
        await connection.beginTransaction();
        
        // 1. Создаём заказ
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total) VALUES (?, ?)',
            [userId, calculateTotal(cartItems)]
        );
        const orderId = orderResult.insertId;
        
        // 2. Добавляем позиции заказа
        for (const item of cartItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price]
            );
        }
        
        // 3. Очищаем корзину
        await connection.query(
            'DELETE FROM shopping_cart WHERE user_id = ?',
            [userId]
        );
        
        // Подтверждаем транзакцию
        await connection.commit();
        
        return orderId;
        
    } catch (error) {
        // Откатываем при ошибке
        await connection.rollback();
        throw error;
        
    } finally {
        // Возвращаем соединение в пул
        connection.release();
    }
};
```

---

## 📁 Структура проекта

```
src/
├── config/
│   └── database.js           # Настройка MySQL
│
├── controllers/
│   └── product.controller.js
│
├── services/
│   └── product.service.js    # Теперь с SQL
│
├── models/
│   └── Product.js
│
├── routes/
│   └── product.router.js
│
├── utils/
│   └── ResponseObject.js
│
├── app.js
└── server.js

database/
└── schema.sql                # SQL-схема

.env                          # Переменные окружения
```

---

## 🛡️ Обработка ошибок БД

```javascript
// middleware/error.middleware.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // Ошибки MySQL
    if (err.code) {
        switch (err.code) {
            case 'ER_DUP_ENTRY':
                return res.status(409).json({
                    success: false,
                    error: 'Запись уже существует'
                });
            
            case 'ER_NO_REFERENCED_ROW':
            case 'ER_NO_REFERENCED_ROW_2':
                return res.status(400).json({
                    success: false,
                    error: 'Связанная запись не найдена'
                });
            
            case 'ECONNREFUSED':
                return res.status(503).json({
                    success: false,
                    error: 'База данных недоступна'
                });
        }
    }
    
    // Общая ошибка
    res.status(500).json({
        success: false,
        error: 'Внутренняя ошибка сервера',
        ...(process.env.NODE_ENV === 'development' && { 
            details: err.message 
        })
    });
};

module.exports = errorHandler;
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **MySQL** | Реляционная система управления базами данных |
| **Connection Pool** | Пул соединений для переиспользования |
| **CRUD** | Create, Read, Update, Delete |
| **SQL** | Structured Query Language |
| **Транзакция** | Группа операций, выполняемых как одно целое |
| **SQL-инъекция** | Атака через вставку SQL-кода |
| **Плейсхолдер (?)** | Безопасная подстановка параметров |

---

## ➡️ Что дальше?

В следующем уроке мы реализуем **аутентификацию пользователей**:
- Регистрация и вход
- Хеширование паролей (bcrypt)
- Сессии и Cookies
- Passport.js

---

**Курс:** Backend | **Урок:** 06-nodejs-and-mysql-integration
