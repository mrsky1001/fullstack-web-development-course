# Урок 03: Node.js и Express — Основы

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Создать HTTP-сервер на **чистом Node.js**
- Установить и настроить **Express.js**
- Обрабатывать **GET** и **POST** запросы
- Отправлять **JSON-ответы**
- Понимать структуру Express-приложения

---

## 📚 Теоретическая часть

### Node.js — встроенный модуль http

Node.js имеет встроенный модуль `http`, который позволяет создавать веб-серверы без дополнительных библиотек.

```javascript
/**
 * Базовый HTTP-сервер на Node.js
 * Без использования Express
 */

// Подключаем встроенный модуль http
const http = require('http');

// Настройки сервера
const HOST = 'localhost';
const PORT = 3000;

// Создаём сервер
const server = http.createServer((req, res) => {
    // req (request) — информация о запросе
    // res (response) — объект для отправки ответа
    
    console.log(`${req.method} ${req.url}`);
    
    // Простая маршрутизация
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Главная страница</h1>');
    } 
    else if (req.url === '/api/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', time: new Date() }));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Страница не найдена</h1>');
    }
});

// Запускаем сервер
server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
```

### Проблемы чистого Node.js

| Проблема | Описание |
|----------|----------|
| Много кода | Даже простые задачи требуют много строк |
| Ручной парсинг | Нужно самому парсить URL, query, body |
| Нет middleware | Нет готовых решений для типичных задач |
| Сложная маршрутизация | Ручные if/else для каждого маршрута |

---

## ⚡ Express.js — Веб-фреймворк

**Express.js** — минималистичный веб-фреймворк для Node.js. Он упрощает создание серверов и API.

### Установка Express

```bash
# Инициализация проекта (если ещё не сделали)
npm init -y

# Установка Express
npm install express
```

### Первое Express-приложение

```javascript
/**
 * Базовое Express-приложение
 */

// Подключаем Express
const express = require('express');

// Создаём приложение
const app = express();

// Настройки
const PORT = 3000;

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.send('<h1>Привет от Express!</h1>');
});

// Маршрут для API
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Сервер работает!',
        timestamp: new Date()
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
```

### Сравнение: Node.js vs Express

| Операция | Node.js (http) | Express |
|----------|----------------|---------|
| Создание сервера | `http.createServer()` | `express()` |
| GET маршрут | `if (req.url === '/')` | `app.get('/', ...)` |
| Отправка JSON | `res.end(JSON.stringify())` | `res.json()` |
| Статус код | `res.writeHead(200)` | `res.status(200)` |
| Заголовки | Вручную | Автоматически |

---

## 🛣️ Маршрутизация в Express

### Базовая маршрутизация

```javascript
// Синтаксис: app.МЕТОД(ПУТЬ, ОБРАБОТЧИК)

// GET запрос
app.get('/products', (req, res) => {
    res.json({ message: 'Список товаров' });
});

// POST запрос
app.post('/products', (req, res) => {
    res.json({ message: 'Товар создан' });
});

// PUT запрос
app.put('/products/:id', (req, res) => {
    res.json({ message: `Товар ${req.params.id} обновлён` });
});

// DELETE запрос
app.delete('/products/:id', (req, res) => {
    res.json({ message: `Товар ${req.params.id} удалён` });
});
```

### Параметры маршрута (:id)

```javascript
// URL: /products/5
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;  // "5" (строка!)
    
    res.json({
        message: `Запрошен товар с ID: ${productId}`
    });
});

// Несколько параметров
// URL: /users/10/orders/25
app.get('/users/:userId/orders/:orderId', (req, res) => {
    const { userId, orderId } = req.params;
    
    res.json({
        userId,    // "10"
        orderId    // "25"
    });
});
```

### Query параметры (?key=value)

```javascript
// URL: /products?category=phones&sort=price
app.get('/products', (req, res) => {
    const category = req.query.category;  // "phones"
    const sort = req.query.sort;          // "price"
    
    res.json({
        category,
        sort,
        allQuery: req.query  // { category: 'phones', sort: 'price' }
    });
});
```

---

## 📤 Объект Response (res)

### Методы отправки ответа

```javascript
app.get('/examples', (req, res) => {
    
    // Отправка текста/HTML
    res.send('<h1>Hello</h1>');
    
    // Отправка JSON (автоматически устанавливает Content-Type)
    res.json({ name: 'iPhone', price: 99990 });
    
    // Установка статус-кода
    res.status(201).json({ message: 'Создано' });
    
    // Отправка файла
    res.sendFile('/path/to/file.pdf');
    
    // Перенаправление
    res.redirect('/new-url');
    
    // Установка заголовка
    res.set('X-Custom-Header', 'value');
    
    // Установка cookie
    res.cookie('session', 'abc123');
});
```

### Цепочка методов

```javascript
app.get('/user', (req, res) => {
    res
        .status(200)
        .set('X-Powered-By', 'My App')
        .json({ name: 'Иван' });
});
```

---

## 📥 Объект Request (req)

### Свойства запроса

```javascript
app.post('/products/:id', (req, res) => {
    
    // Информация о запросе
    console.log(req.method);      // "POST"
    console.log(req.url);         // "/products/5?active=true"
    console.log(req.path);        // "/products/5"
    console.log(req.protocol);    // "http"
    console.log(req.hostname);    // "localhost"
    
    // Параметры
    console.log(req.params);      // { id: "5" }
    console.log(req.query);       // { active: "true" }
    console.log(req.body);        // { name: "..." } (нужен middleware!)
    
    // Заголовки
    console.log(req.headers);                    // Все заголовки
    console.log(req.get('Content-Type'));        // Конкретный заголовок
    console.log(req.headers['user-agent']);      // User-Agent браузера
    
    res.json({ received: true });
});
```

---

## 📦 Обработка POST-запросов (Body Parser)

По умолчанию Express **не парсит тело запроса**. Нужно подключить middleware.

### Встроенный парсер (Express 4.16+)

```javascript
const express = require('express');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для парсинга URL-encoded (формы)
app.use(express.urlencoded({ extended: true }));

// Теперь req.body доступен!
app.post('/products', (req, res) => {
    console.log(req.body);  // { name: 'iPhone', price: 99990 }
    
    const { name, price } = req.body;
    
    res.status(201).json({
        message: 'Товар создан',
        product: { name, price }
    });
});
```

### Тестирование POST в Postman

1. Метод: **POST**
2. URL: `http://localhost:3000/products`
3. Tab **Body** → **raw** → **JSON**
4. Содержимое:
```json
{
    "name": "iPhone 15",
    "price": 99990
}
```

---

## 🔧 Middleware — Основы

**Middleware** — это функции, которые выполняются между получением запроса и отправкой ответа.

```javascript
// Middleware — это функция с тремя параметрами
const myMiddleware = (req, res, next) => {
    console.log('Middleware выполнен!');
    next();  // Передаём управление следующему обработчику
};

// Применение ко всем маршрутам
app.use(myMiddleware);

// Применение к конкретному маршруту
app.get('/protected', myMiddleware, (req, res) => {
    res.json({ message: 'Секретные данные' });
});
```

### Встроенные middleware

```javascript
// Парсинг JSON
app.use(express.json());

// Парсинг форм
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static('public'));
```

### Пример: Логирование запросов

```javascript
// Middleware для логирования
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Все запросы будут логироваться
app.get('/', (req, res) => {
    res.send('Hello!');
});
```

---

## 📁 Структура проекта

### Минимальная структура

```
my-server/
├── node_modules/          # Установленные библиотеки
├── package.json           # Конфигурация проекта
├── package-lock.json      # Фиксация версий
└── server.js              # Главный файл
```

### Рекомендуемая структура

```
my-server/
├── src/
│   ├── server.js          # Точка входа, запуск сервера
│   └── app.js             # Конфигурация Express
├── node_modules/
├── package.json
└── README.md
```

### Разделение server.js и app.js

```javascript
// app.js — Конфигурация приложения
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello!' });
});

module.exports = app;
```

```javascript
// server.js — Запуск сервера
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});
```

---

## ⚙️ Переменные окружения

**Переменные окружения** хранят конфигурацию (порт, пароли БД) вне кода.

### Установка dotenv

```bash
npm install dotenv
```

### Файл .env

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PASSWORD=secret123
```

### Использование в коде

```javascript
// Подключаем dotenv в самом начале
require('dotenv').config();

const express = require('express');
const app = express();

// Используем переменные
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

console.log(`Режим: ${NODE_ENV}`);  // "development"

app.listen(PORT, () => {
    console.log(`Сервер на порту ${PORT}`);
});
```

> ⚠️ **ВАЖНО:** Файл `.env` не должен попадать в Git!
> Добавьте его в `.gitignore`

---

## 🚫 Обработка ошибок

### 404 — Маршрут не найден

```javascript
// Этот middleware должен быть ПОСЛЕДНИМ
app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.url
    });
});
```

### Обработчик ошибок

```javascript
// Middleware для ошибок имеет 4 параметра!
app.use((err, req, res, next) => {
    console.error('Ошибка:', err.message);
    
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: err.message
    });
});
```

### Выброс ошибки в маршруте

```javascript
app.get('/risky', (req, res, next) => {
    try {
        // Какая-то опасная операция
        throw new Error('Что-то пошло не так!');
    } catch (err) {
        next(err);  // Передаём ошибку в error handler
    }
});
```

---

## 📋 Полный пример

```javascript
/**
 * Полный пример Express-приложения
 */
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

// Парсинг JSON
app.use(express.json());

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// МАРШРУТЫ
// ==========================================

// Главная страница
app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в API!',
        endpoints: {
            products: '/api/products',
            status: '/api/status'
        }
    });
});

// Статус API
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Тестовые данные
const products = [
    { id: 1, name: 'iPhone 15', price: 99990 },
    { id: 2, name: 'Samsung S24', price: 89990 },
    { id: 3, name: 'Pixel 8', price: 69990 }
];

// Получить все товары
app.get('/api/products', (req, res) => {
    res.json({ data: products });
});

// Получить товар по ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json({ data: product });
});

// Создать товар
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ 
            error: 'Поля name и price обязательны' 
        });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        message: 'Товар создан',
        data: newProduct
    });
});

// ==========================================
// ОБРАБОТКА ОШИБОК
// ==========================================

// 404 — маршрут не найден
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Общий обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(50));
    console.log(`  🚀 Сервер запущен: http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('');
});
```

---

## 📁 Структура урока

```
03-nodejs-and-express-basics/
│
├── README.md                    # Этот файл (теория)
│
├── examples/
│   ├── 01-pure-node/            # HTTP сервер без Express
│   │   ├── server.js
│   │   └── package.json
│   │
│   ├── 02-express-basic/        # Базовый Express
│   │   ├── server.js
│   │   └── package.json
│   │
│   └── 03-express-full/         # Полный пример
│       ├── src/
│       │   ├── app.js
│       │   └── server.js
│       ├── .env.example
│       └── package.json
│
├── practice/
│   └── 01-build-api/
│       └── task.md              # Задание: создайте свой API
│
└── assets/
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Express** | Веб-фреймворк для Node.js |
| **app** | Экземпляр Express-приложения |
| **Route** | Маршрут = Метод + URL + Обработчик |
| **Handler** | Функция-обработчик маршрута |
| **req** | Объект запроса (request) |
| **res** | Объект ответа (response) |
| **Middleware** | Промежуточная функция обработки |
| **next()** | Функция передачи управления дальше |
| **Body Parser** | Middleware для разбора тела запроса |
| **.env** | Файл с переменными окружения |

---

## ➡️ Что дальше?

В следующем уроке мы научимся **организовывать код** приложения:
- Express Router для группировки маршрутов
- Controller Pattern
- Middleware для логирования и авторизации
- Структура папок проекта

---

**Курс:** Backend | **Урок:** 03-nodejs-and-express-basics
