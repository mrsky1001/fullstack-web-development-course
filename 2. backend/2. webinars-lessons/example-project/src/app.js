
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Express.js — Маршруты и Контроллеры</h1>
        <p>Урок 3: Организация кода с Router и Controller</p>
        <h3>API Endpoints:</h3>
        <ul>
            <li><a href="/product/all">GET /product/all</a> — Все товары</li>
            <li><a href="/product/1">GET /product/:id</a> — Товар по ID</li>
        </ul>
    `);
});

module.exports = app;