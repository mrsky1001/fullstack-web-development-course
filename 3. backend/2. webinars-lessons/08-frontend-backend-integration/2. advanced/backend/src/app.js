/**
 * ====================================================================
 * УРОК 7: АУТЕНТИФИКАЦИЯ - ПРИЛОЖЕНИЕ (app.js)
 * ====================================================================
 * 
 * В этом уроке мы добавляем:
 * 1. Сессии (express-session) — для "запоминания" пользователя
 * 2. Passport.js — библиотека для аутентификации
 * 3. bcrypt — хеширование паролей
 * 
 * Как работает аутентификация:
 * 1. Пользователь отправляет email + password
 * 2. Сервер проверяет пароль (сравнивает хеши)
 * 3. Если верно — создаётся сессия (cookie отправляется клиенту)
 * 4. При следующих запросах cookie отправляется автоматически
 * 5. Сервер восстанавливает пользователя из сессии
 * 
 * ====================================================================
 */

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

// Middleware
const requestLogger = require('./middlewares/logger.middleware');

// Маршрутизаторы
const authRouter = require('./routes/auth.router');
const productRouter = require('./routes/product.router');

// Сервисы
const userService = require('./services/user.service');

// ====================================================================
// MIDDLEWARE: Логирование и парсинг
// ====================================================================

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================================================================
// СЕССИИ (express-session)
// ====================================================================
// 
// Сессия — это способ "запомнить" пользователя между запросами.
// HTTP протокол сам по себе "без состояния" (stateless).
// Сессии решают эту проблему через cookies.
// 
// При первом запросе сервер создаёт сессию и отправляет cookie с ID сессии.
// При следующих запросах клиент отправляет этот cookie,
// и сервер находит данные сессии (в памяти или БД).
// 
// ====================================================================

app.use(session({
    // Секретный ключ для подписи cookie (должен быть случайным!)
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',

    // Не сохранять сессию, если она не менялась (оптимизация)
    resave: false,

    // Не создавать сессию для гостей (пока не авторизуются)
    saveUninitialized: false,

    // Имя cookie
    name: 'sessionId',

    // Настройки cookie
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 часа
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false
    }
}));

// ====================================================================
// PASSPORT.JS - Инициализация
// ====================================================================
// 
// Passport.js — модульная библиотека для аутентификации.
// Она поддерживает разные "стратегии" (способы входа):
// - Local (логин + пароль)
// - Google OAuth
// - Facebook
// - JWT токены
// и более 500 других!
// 
// ====================================================================

// Инициализация Passport
app.use(passport.initialize());

// Подключение Passport к сессиям
// Это позволяет восстанавливать пользователя при каждом запросе
app.use(passport.session());

// ====================================================================
// PASSPORT.JS - Стратегия Local
// ====================================================================
// 
// LocalStrategy определяет, как проверять логин и пароль.
// Мы указываем:
// 1. Какие поля из req.body использовать (usernameField, passwordField)
// 2. Функцию проверки (verify callback)
// 
// ====================================================================

passport.use(new LocalStrategy(
    // Опции: какие поля в body содержат логин и пароль
    {
        usernameField: 'email',     // Используем email как логин
        passwordField: 'password'   // Поле с паролем
    },
    // Функция проверки (вызывается при passport.authenticate('local'))
    // Делегируем проверку в userService
    userService.verifyUser
));

// ====================================================================
// PASSPORT.JS - Сериализация/Десериализация
// ====================================================================
// 
// После успешного входа нужно "сериализовать" пользователя в сессию.
// То есть решить, ЧТО сохранить в сессии (обычно только ID или email).
// 
// При следующем запросе нужно "десериализовать" — 
// по сохранённому значению найти полного пользователя.
// 
// ====================================================================

// Сериализация: ЧТО сохранить в сессию?
// Мы сохраняем только email (минимум данных в cookie)
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Десериализация: КАК восстановить пользователя?
// По email находим пользователя в БД
passport.deserializeUser(async (email, done) => {
    try {
        const user = await userService.findUser({ email });
        done(null, user);
    } catch (err) {
        console.error('Ошибка десериализации:', err);
        done(err);
    }
});

// ====================================================================
// МАРШРУТЫ
// ====================================================================

app.get('/', (req, res) => {
    const user = req.user;
    res.send(`
        <h1>🔐 Аутентификация с Passport.js</h1>
        <p>Урок 7: Вход, регистрация и сессии</p>
        
        <h3>Текущий пользователь:</h3>
        <pre>${user ? JSON.stringify(user, null, 2) : 'Не авторизован'}</pre>
        
        <h3>Auth API:</h3>
        <ul>
            <li>POST /auth/register — Регистрация</li>
            <li>POST /auth/login — Вход</li>
            <li>POST /auth/logout — Выход</li>
            <li>GET /auth/check — Проверка статуса</li>
        </ul>
        
        <h3>Product API:</h3>
        <ul>
            <li><a href="/product/all">GET /product/all</a></li>
        </ul>
    `);
});

// Auth маршруты
app.use('/auth', authRouter);

// Product маршруты
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
