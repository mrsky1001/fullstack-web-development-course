/**
 * ====================================================================
 * УРОК 5: ПОДКЛЮЧЕНИЕ К MySQL - ПРИЛОЖЕНИЕ (app.js)
 * ====================================================================
 */

const express = require('express');
const app = express();

// Middleware
const requestLogger = require('./middlewares/logger.middleware');

// Маршрутизаторы
const productRouter = require('./routes/product.router');

// ====================================================================
// MIDDLEWARE
// ====================================================================

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================================================================
// МАРШРУТЫ
// ====================================================================

app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Подключение к MySQL</h1>
        <p>Урок 5: База данных и переменные окружения</p>
        <h3>API Endpoints:</h3>
        <ul>
            <li><a href="/product/all">GET /product/all</a> — Товары из БД</li>
            <li><a href="/product/1">GET /product/:id</a> — Товар по ID</li>
        </ul>
        <h3>Конфигурация (из .env):</h3>
        <pre>
DB_HOST: ${process.env.DB_HOST || 'не задан'}
DB_NAME: ${process.env.DB_NAME || 'не задан'}
NODE_ENV: ${process.env.NODE_ENV || 'development'}
        </pre>
    `);
});

app.use('/product', productRouter);

// Обработка 404
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Маршрут ${req.method} ${req.url} не найден`,
        statusCode: 404
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('❌ Ошибка:', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Внутренняя ошибка сервера',
        statusCode: 500
    });
});

module.exports = app;
