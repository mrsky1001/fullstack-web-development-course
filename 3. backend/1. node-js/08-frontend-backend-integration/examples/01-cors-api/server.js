/**
 * ====================================================================
 * ПРИМЕР: Backend с CORS для Frontend интеграции
 * ====================================================================
 * 
 * Демонстрирует:
 * - Настройка CORS
 * - Работа с cookies в кросс-доменных запросах
 * - API для frontend-приложения
 * 
 * Запуск: npm start
 * Затем откройте index.html в браузере
 * ====================================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

// ==========================================
// CORS CONFIGURATION
// ==========================================

/**
 * CORS — разрешаем запросы с frontend
 * credentials: true — разрешаем отправку cookies
 */
const corsOptions = {
    origin: [
        'http://localhost:8000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',  // Live Server
        'null'                     // Для локальных HTML файлов
    ],
    credentials: true,  // ВАЖНО для cookies!
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

// Сессии
app.use(session({
    secret: 'demo-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    if (req.session.user) {
        console.log(`  └─ User: ${req.session.user.email}`);
    }
    next();
});

// ==========================================
// "БАЗА ДАННЫХ"
// ==========================================

const users = [
    { id: 1, email: 'demo@test.com', password: 'demo123', name: 'Demo User' }
];

const products = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA RTX 4090', price: 159990, category: 'Видеокарты' },
    { id: 4, name: 'AMD RX 7900 XTX', price: 89990, category: 'Видеокарты' }
];

const carts = {};  // userId -> [{ productId, quantity }]

// ==========================================
// AUTH ROUTES
// ==========================================

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Неверный email или пароль'
        });
    }

    // Сохраняем в сессию
    req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name
    };

    res.json({
        success: true,
        message: 'Вход выполнен',
        user: req.session.user
    });
});

app.post('/auth/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Выход выполнен' });
});

app.get('/auth/status', (req, res) => {
    res.json({
        success: true,
        isAuthenticated: !!req.session.user,
        user: req.session.user || null
    });
});

// ==========================================
// PRODUCT ROUTES
// ==========================================

app.get('/api/products', (req, res) => {
    const { category } = req.query;

    let result = products;
    if (category) {
        result = products.filter(p => p.category === category);
    }

    res.json({
        success: true,
        count: result.length,
        data: result
    });
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ success: false, error: 'Not found' });
    }

    res.json({ success: true, data: product });
});

// ==========================================
// CART ROUTES (требуется авторизация)
// ==========================================

// Middleware проверки авторизации
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация'
        });
    }
    next();
};

app.get('/api/cart', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const cart = carts[userId] || [];

    // Заполняем данные о товарах
    const items = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...item,
            product,
            totalPrice: product ? product.price * item.quantity : 0
        };
    });

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    res.json({
        success: true,
        data: {
            items,
            totalItems: items.length,
            totalPrice: total
        }
    });
});

app.post('/api/cart/add', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const existing = carts[userId].find(i => i.productId === productId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        carts[userId].push({ productId, quantity });
    }

    res.json({
        success: true,
        message: 'Товар добавлен в корзину'
    });
});

app.delete('/api/cart/:productId', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const productId = parseInt(req.params.productId);

    if (carts[userId]) {
        carts[userId] = carts[userId].filter(i => i.productId !== productId);
    }

    res.json({ success: true, message: 'Товар удалён' });
});

// ==========================================
// STATIC FILES & HTML
// ==========================================

// Отдаём статические файлы
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({
        message: 'API урока 08: Frontend-Backend Integration',
        testUser: {
            email: 'demo@test.com',
            password: 'demo123'
        },
        endpoints: {
            auth: {
                'POST /auth/login': 'Вход',
                'POST /auth/logout': 'Выход',
                'GET /auth/status': 'Статус'
            },
            products: {
                'GET /api/products': 'Все товары',
                'GET /api/products/:id': 'Товар по ID'
            },
            cart: {
                'GET /api/cart': 'Корзина (auth)',
                'POST /api/cart/add': 'Добавить (auth)',
                'DELETE /api/cart/:id': 'Удалить (auth)'
            }
        }
    });
});

// ==========================================
// START
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(60));
    console.log('  🎓 Урок 08: Frontend-Backend Integration');
    console.log('='.repeat(60));
    console.log(`  🚀 API: http://localhost:${PORT}`);
    console.log('');
    console.log('  Тестовый пользователь:');
    console.log('    Email:    demo@test.com');
    console.log('    Password: demo123');
    console.log('');
    console.log('  Откройте public/index.html в браузере');
    console.log('='.repeat(60));
});
