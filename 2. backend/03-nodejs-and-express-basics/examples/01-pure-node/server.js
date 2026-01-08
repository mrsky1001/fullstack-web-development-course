/**
 * ====================================================================
 * ПРИМЕР: Базовый HTTP-сервер на чистом Node.js
 * ====================================================================
 * 
 * Этот пример демонстрирует создание сервера БЕЗ Express
 * Показывает, что Express делает "под капотом"
 * 
 * Запуск: node server.js
 * Затем откройте: http://localhost:3000
 * 
 * ====================================================================
 */

// Подключаем встроенный модуль http
// Этот модуль есть в Node.js изначально, не требует npm install
const http = require('http');

// Настройки сервера
const HOST = 'localhost';
const PORT = 3000;

/**
 * Создаём HTTP-сервер
 * 
 * Функция-callback вызывается при КАЖДОМ входящем запросе
 * @param {http.IncomingMessage} req - объект запроса
 * @param {http.ServerResponse} res - объект ответа
 */
const server = http.createServer((req, res) => {

    // Логируем входящий запрос
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // ==========================================
    // МАРШРУТИЗАЦИЯ (ручная!)
    // ==========================================

    // Главная страница
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Первый сервер</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #333; }
                    a { color: #0066cc; margin-right: 20px; }
                </style>
            </head>
            <body>
                <h1>🚀 Добро пожаловать на сервер Node.js!</h1>
                <p>Это ваш первый HTTP-сервер без использования фреймворков.</p>
                
                <h2>Попробуйте маршруты:</h2>
                <ul>
                    <li><a href="/">/</a> — Главная (эта страница)</li>
                    <li><a href="/about">/about</a> — О проекте</li>
                    <li><a href="/api/status">/api/status</a> — API статус (JSON)</li>
                    <li><a href="/api/time">/api/time</a> — Текущее время (JSON)</li>
                    <li><a href="/not-exists">/not-exists</a> — Страница 404</li>
                </ul>
            </body>
            </html>
        `);
    }

    // Страница "О проекте"
    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>О проекте</title></head>
            <body>
                <h1>📚 О проекте</h1>
                <p>Это учебный HTTP-сервер для курса Backend-разработки.</p>
                <p><a href="/">← Назад</a></p>
            </body>
            </html>
        `);
    }

    // API: Статус сервера (JSON)
    else if (req.url === '/api/status' && req.method === 'GET') {
        // Для JSON обязательно указываем Content-Type
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

        // Отправляем JSON
        res.end(JSON.stringify({
            status: 'ok',
            message: 'Сервер работает!',
            uptime: Math.round(process.uptime()) + ' секунд',
            nodeVersion: process.version
        }, null, 2));  // null, 2 — красивое форматирование
    }

    // API: Текущее время
    else if (req.url === '/api/time' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

        const now = new Date();
        res.end(JSON.stringify({
            date: now.toLocaleDateString('ru-RU'),
            time: now.toLocaleTimeString('ru-RU'),
            timestamp: now.toISOString(),
            unix: Date.now()
        }, null, 2));
    }

    // Обработка POST запроса (пример)
    else if (req.url === '/api/echo' && req.method === 'POST') {
        let body = '';

        // Собираем тело запроса по частям (chunks)
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Когда всё получено
        req.on('end', () => {
            console.log('Получено:', body);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                message: 'Данные получены!',
                receivedData: body,
                method: req.method
            }));
        });
    }

    // 404 — Страница не найдена
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>404</title></head>
            <body>
                <h1>❌ Ошибка 404</h1>
                <p>Страница "${req.url}" не найдена.</p>
                <p><a href="/">← На главную</a></p>
            </body>
            </html>
        `);
    }
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================

server.listen(PORT, HOST, () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 ПРИМЕР: HTTP-сервер на чистом Node.js');
    console.log('='.repeat(55));
    console.log(`  ✅ Сервер запущен!`);
    console.log(`  📍 Адрес: http://${HOST}:${PORT}`);
    console.log('');
    console.log('  Для остановки: Ctrl + C');
    console.log('='.repeat(55));
    console.log('');
});

// Обработка ошибок
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Порт ${PORT} уже занят!`);
    } else {
        console.error('❌ Ошибка сервера:', err.message);
    }
    process.exit(1);
});
