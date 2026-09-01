/**
 * ====================================================================
 * УРОК 9: ФИНАЛЬНОЕ ПРИЛОЖЕНИЕ
 * ====================================================================
 * 
 * Это финальная версия бэкенда, включающая все лучшие практики:
 * - Валидация входных данных
 * - Стандартизированные ответы (ResObj)
 * - Классы моделей (User, Product)
 * - Константы сообщений
 * - Полная обработка ошибок
 * 
 * ====================================================================
 */

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

// Middleware
const requestLogger = require('./middlewares/logger.middleware');
const { isAuthenticated } = require('./middlewares/auth.middleware');

// Маршрутизаторы
const authRouter = require('./routes/auth.router');
const productRouter = require('./routes/product.router');
const shoppingCartRouter = require('./routes/shopping-cart.router');

// Сервисы
const userService = require('./services/user.service');

// ====================================================================
// CORS
// ====================================================================

const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// ====================================================================
// MIDDLEWARE
// ====================================================================

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================================================================
// СЕССИИ
// ====================================================================

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false
    }
}));

// ====================================================================
// PASSPORT
// ====================================================================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    userService.verifyUser
));

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser(async (email, done) => {
    try {
        const user = await userService.findUser({ email });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// ====================================================================
// МАРШРУТЫ
// ====================================================================

app.get('/', (req, res) => {
    res.send(`
        <h1>🎓 Full-Stack Backend — Финальная версия</h1>
        <p>Урок 9: Валидация и тестирование</p>
        <p>Пользователь: ${req.user ? req.user.email : 'гость'}</p>
        <hr>
        <h3>API Endpoints:</h3>
        <pre>
Auth:
  POST /auth/register
  POST /auth/login
  POST /auth/logout
  GET  /auth/check

Products:
  GET /product/all
  GET /product/:id

Shopping Cart (protected):
  GET    /shopping-cart/
  POST   /shopping-cart/add
  PUT    /shopping-cart/update/:id
  DELETE /shopping-cart/remove/:id
        </pre>
    `);
});

// Публичные
app.use('/auth', authRouter);
app.use('/product', productRouter);

// Защищённые
app.use('/shopping-cart', isAuthenticated, shoppingCartRouter);

// 404
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Маршрут ${req.method} ${req.url} не найден`,
        statusCode: 404
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Ошибка:', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Внутренняя ошибка сервера',
        statusCode: 500
    });
});

module.exports = app;
