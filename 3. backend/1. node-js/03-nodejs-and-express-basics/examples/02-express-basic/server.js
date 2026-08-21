/**
 * ====================================================================
 * ПРИМЕР: Базовый Express-сервер
 * ====================================================================
 * 
 * Сравните с примером 01-pure-node — Express делает код проще!
 * 
 * Установка:  npm install
 * Запуск:     npm start
 * 
 * ====================================================================
 */

// Подключаем Express
const express = require('express');

// Создаём приложение
const app = express();

// Порт сервера
const PORT = 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

// Парсинг JSON (для POST-запросов)
app.use(express.json());

// Простое логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();  // Передаём управление дальше
});

// ==========================================
// МАРШРУТЫ (ROUTES)
// ==========================================

/**
 * GET / — Главная страница
 */
app.get('/', (req, res) => {
    // res.send() — универсальный метод отправки
    res.send(`
        <h1>🚀 Express сервер</h1>
        <p>Добро пожаловать!</p>
        <ul>
            <li><a href="/about">/about</a></li>
            <li><a href="/api/status">/api/status</a></li>
            <li><a href="/api/products">/api/products</a></li>
        </ul>
    `);
});

/**
 * GET /about — О проекте
 */
app.get('/about', (req, res) => {
    res.send('<h1>О проекте</h1><p>Учебный сервер Express</p>');
});

/**
 * GET /api/status — Статус сервера (JSON)
 */
app.get('/api/status', (req, res) => {
    // res.json() — автоматически устанавливает Content-Type и stringify
    res.json({
        status: 'ok',
        message: 'Сервер Express работает!',
        uptime: Math.round(process.uptime()) + ' сек'
    });
});

/**
 * GET /api/products — Список товаров
 */
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Intel Core i9', price: 55990 },
        { id: 2, name: 'AMD Ryzen 9', price: 62990 },
        { id: 3, name: 'NVIDIA RTX 4090', price: 159990 }
    ];

    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

/**
 * GET /api/products/:id — Товар по ID
 * :id — параметр маршрута
 */
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);  // req.params содержит параметры URL

    const products = [
        { id: 1, name: 'Intel Core i9', price: 55990 },
        { id: 2, name: 'AMD Ryzen 9', price: 62990 },
        { id: 3, name: 'NVIDIA RTX 4090', price: 159990 }
    ];

    const product = products.find(p => p.id === id);

    if (!product) {
        // Используем res.status() для установки кода
        return res.status(404).json({
            success: false,
            error: 'Товар не найден'
        });
    }

    res.json({
        success: true,
        data: product
    });
});

/**
 * POST /api/products — Создание товара
 */
app.post('/api/products', (req, res) => {
    // req.body — тело запроса (благодаря express.json())
    const { name, price } = req.body;

    // Простая валидация
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            error: 'Поля name и price обязательны'
        });
    }

    // Создаём "новый" товар
    const newProduct = {
        id: Date.now(),  // Временный ID
        name,
        price: parseFloat(price)
    };

    // Статус 201 — Created
    res.status(201).json({
        success: true,
        message: 'Товар создан',
        data: newProduct
    });
});

/**
 * DELETE /api/products/:id — Удаление товара
 */
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // В реальности здесь было бы удаление из БД
    console.log(`Удаление товара с ID: ${id}`);

    res.json({
        success: true,
        message: `Товар ${id} удалён`
    });
});

// ==========================================
// ОБРАБОТКА ОШИБОК
// ==========================================

// 404 — Маршрут не найден
// Этот middleware вызывается, если ни один маршрут не совпал
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Маршрут ${req.method} ${req.url} не найден`
    });
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(50));
    console.log('  🎓 ПРИМЕР: Базовый Express сервер');
    console.log('='.repeat(50));
    console.log(`  ✅ Сервер запущен: http://localhost:${PORT}`);
    console.log('');
    console.log('  Маршруты:');
    console.log(`    GET  /              — Главная`);
    console.log(`    GET  /api/status    — Статус`);
    console.log(`    GET  /api/products  — Все товары`);
    console.log(`    GET  /api/products/:id — Товар по ID`);
    console.log(`    POST /api/products  — Создать товар`);
    console.log('');
    console.log('  Для остановки: Ctrl + C');
    console.log('='.repeat(50));
});
