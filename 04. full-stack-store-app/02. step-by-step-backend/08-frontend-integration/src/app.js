/**
 * ====================================================================
 * УРОК 8: ИНТЕГРАЦИЯ С ФРОНТЕНДОМ - ПРИЛОЖЕНИЕ
 * ====================================================================
 * 
 * В этом уроке мы добавляем:
 * 1. CORS — разрешение запросов с фронтенда
 * 2. Корзину покупок — защищённую авторизацией
 * 
 * CORS (Cross-Origin Resource Sharing):
 * ------------------------------------
 * Браузер по умолчанию запрещает JavaScript делать запросы
 * на другой домен/порт (это называется Same-Origin Policy).
 * 
 * Если фронтенд на http://localhost:8000, а бэкенд на http://localhost:3000,
 * это РАЗНЫЕ origin'ы, и запросы будут заблокированы БЕЗ настройки CORS.
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
// CORS - РАЗРЕШЕНИЕ КРОСС-ДОМЕННЫХ ЗАПРОСОВ
// ====================================================================
// 
// Без CORS браузер заблокирует все запросы с фронтенда!
// 
// Важные настройки:
// - origin: откуда разрешены запросы (true = все, или конкретный URL)
// - credentials: разрешить отправку cookies (нужно для сессий!)
// 
// ====================================================================

const corsOptions = {
    origin: true,           // Разрешить все origin'ы (для разработки)
    credentials: true,      // ВАЖНО: разрешить cookies для сессий!
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Дополнительные заголовки для надёжности
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Preflight запросы (OPTIONS) сразу отвечаем OK
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
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
        <h1>🌐 Интеграция Backend + Frontend</h1>
        <p>Урок 8: CORS и защищённая корзина</p>
        <p>Текущий пользователь: ${req.user ? req.user.email : 'гость'}</p>
    `);
});

// Публичные маршруты
app.use('/auth', authRouter);
app.use('/product', productRouter);

// ЗАЩИЩЁННЫЕ маршруты (только для авторизованных!)
// isAuthenticated проверяет, вошёл ли пользователь
app.use('/shopping-cart', isAuthenticated, shoppingCartRouter);

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
