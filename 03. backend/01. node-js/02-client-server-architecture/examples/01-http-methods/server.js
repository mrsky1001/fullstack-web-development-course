/**
 * ====================================================================
 * ПРИМЕР: Демонстрация HTTP методов и статус-кодов
 * ====================================================================
 * 
 * Этот пример показывает различные HTTP методы и статус-коды
 * Используйте Postman или Thunder Client для тестирования
 * 
 * Запуск: npm start
 * ====================================================================
 */

const express = require('express');
const app = express();

app.use(express.json());

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📥 ${req.method} ${req.url}`);
    console.log(`Headers:`, JSON.stringify(req.headers, null, 2).slice(0, 200));
    if (Object.keys(req.body).length > 0) {
        console.log(`Body:`, req.body);
    }
    console.log('='.repeat(50));
    next();
});

// ==========================================
// HTTP МЕТОДЫ
// ==========================================

/**
 * GET — Получение данных
 * Не изменяет состояние сервера
 */
app.get('/api/demo/get', (req, res) => {
    res.json({
        method: 'GET',
        description: 'Получение данных',
        query: req.query,
        message: 'GET запросы используются для получения данных'
    });
});

/**
 * POST — Создание ресурса
 * Изменяет состояние сервера
 */
app.post('/api/demo/post', (req, res) => {
    res.status(201).json({
        method: 'POST',
        description: 'Создание ресурса',
        receivedData: req.body,
        message: 'POST запросы создают новые ресурсы'
    });
});

/**
 * PUT — Полное обновление ресурса
 */
app.put('/api/demo/put/:id', (req, res) => {
    res.json({
        method: 'PUT',
        description: 'Полная замена ресурса',
        resourceId: req.params.id,
        newData: req.body,
        message: 'PUT заменяет ресурс целиком'
    });
});

/**
 * PATCH — Частичное обновление
 */
app.patch('/api/demo/patch/:id', (req, res) => {
    res.json({
        method: 'PATCH',
        description: 'Частичное обновление',
        resourceId: req.params.id,
        updates: req.body,
        message: 'PATCH обновляет только указанные поля'
    });
});

/**
 * DELETE — Удаление ресурса
 */
app.delete('/api/demo/delete/:id', (req, res) => {
    res.json({
        method: 'DELETE',
        description: 'Удаление ресурса',
        deletedId: req.params.id,
        message: 'DELETE удаляет ресурс'
    });
});

// ==========================================
// HTTP СТАТУС-КОДЫ
// ==========================================

// 2xx — Успех
app.get('/status/200', (req, res) => {
    res.status(200).json({
        code: 200,
        name: 'OK',
        description: 'Запрос успешно выполнен'
    });
});

app.post('/status/201', (req, res) => {
    res.status(201).json({
        code: 201,
        name: 'Created',
        description: 'Ресурс успешно создан'
    });
});

app.get('/status/204', (req, res) => {
    // 204 No Content — нет тела ответа
    res.status(204).end();
});

// 3xx — Перенаправление
app.get('/status/301', (req, res) => {
    res.redirect(301, '/status/200');
});

app.get('/status/302', (req, res) => {
    res.redirect(302, '/status/200');
});

// 4xx — Ошибки клиента
app.get('/status/400', (req, res) => {
    res.status(400).json({
        code: 400,
        name: 'Bad Request',
        description: 'Некорректный запрос'
    });
});

app.get('/status/401', (req, res) => {
    res.status(401).json({
        code: 401,
        name: 'Unauthorized',
        description: 'Требуется аутентификация'
    });
});

app.get('/status/403', (req, res) => {
    res.status(403).json({
        code: 403,
        name: 'Forbidden',
        description: 'Доступ запрещён'
    });
});

app.get('/status/404', (req, res) => {
    res.status(404).json({
        code: 404,
        name: 'Not Found',
        description: 'Ресурс не найден'
    });
});

app.get('/status/422', (req, res) => {
    res.status(422).json({
        code: 422,
        name: 'Unprocessable Entity',
        description: 'Ошибка валидации данных'
    });
});

// 5xx — Ошибки сервера
app.get('/status/500', (req, res) => {
    res.status(500).json({
        code: 500,
        name: 'Internal Server Error',
        description: 'Внутренняя ошибка сервера'
    });
});

app.get('/status/503', (req, res) => {
    res.status(503).json({
        code: 503,
        name: 'Service Unavailable',
        description: 'Сервис временно недоступен'
    });
});

// ==========================================
// REST API ПРИМЕР
// ==========================================

const users = [
    { id: 1, name: 'Иван', email: 'ivan@example.com' },
    { id: 2, name: 'Мария', email: 'maria@example.com' }
];

// GET /users — Список всех пользователей
app.get('/users', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// GET /users/:id — Один пользователь
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'Пользователь не найден'
        });
    }

    res.json({ success: true, data: user });
});

// POST /users — Создать пользователя
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Поля name и email обязательны'
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: 'Пользователь создан',
        data: newUser
    });
});

// ==========================================
// ИНФОРМАЦИЯ
// ==========================================

app.get('/', (req, res) => {
    res.json({
        title: 'Урок 02: HTTP и REST API',
        description: 'Демонстрация HTTP методов и статус-кодов',

        httpMethods: {
            'GET /api/demo/get': 'Получение данных',
            'POST /api/demo/post': 'Создание (отправьте JSON)',
            'PUT /api/demo/put/:id': 'Полное обновление',
            'PATCH /api/demo/patch/:id': 'Частичное обновление',
            'DELETE /api/demo/delete/:id': 'Удаление'
        },

        statusCodes: {
            '2xx': '/status/200, /status/201, /status/204',
            '3xx': '/status/301, /status/302',
            '4xx': '/status/400, /status/401, /status/403, /status/404',
            '5xx': '/status/500, /status/503'
        },

        restExample: {
            'GET /users': 'Все пользователи',
            'GET /users/:id': 'Один пользователь',
            'POST /users': 'Создать { name, email }'
        }
    });
});

// ==========================================
// СТАРТ
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 Урок 02: HTTP методы и статус-коды');
    console.log('='.repeat(55));
    console.log(`  🚀 Сервер: http://localhost:${PORT}`);
    console.log('');
    console.log('  Откройте http://localhost:3000 для списка endpoints');
    console.log('  Используйте Postman для тестирования');
    console.log('='.repeat(55));
});
