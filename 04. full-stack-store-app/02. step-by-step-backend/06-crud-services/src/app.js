/**
 * ====================================================================
 * УРОК 6: CRUD ОПЕРАЦИИ - ПРИЛОЖЕНИЕ
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
        <h1>🚀 CRUD Операции</h1>
        <p>Урок 6: Create, Read, Update, Delete</p>
        <h3>Product API:</h3>
        <table border="1" cellpadding="10">
            <tr><th>Метод</th><th>URL</th><th>Описание</th></tr>
            <tr><td>GET</td><td>/product/all</td><td>Получить все товары</td></tr>
            <tr><td>GET</td><td>/product/:id</td><td>Получить товар по ID</td></tr>
            <tr><td>POST</td><td>/product/add</td><td>Создать новый товар</td></tr>
            <tr><td>PUT</td><td>/product/:id</td><td>Обновить товар</td></tr>
            <tr><td>DELETE</td><td>/product/:id</td><td>Удалить товар</td></tr>
        </table>
    `);
});

app.use('/product', productRouter);

// 404
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Маршрут ${req.method} ${req.url} не найден`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Ошибка:', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Внутренняя ошибка сервера'
    });
});

module.exports = app;
