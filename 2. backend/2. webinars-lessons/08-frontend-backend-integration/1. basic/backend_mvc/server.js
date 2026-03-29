const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// Импортируем конфигурации из файлов
const initializePassport = require('./config/passport.config');
const authRoutes = require('./routes/auth.routes');

const app = express();

// ==========================================
// 1. НАСТРОЙКИ (CORS, JSON, Middleware)
// ==========================================
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json()); // Парсинг JSON в теле запроса
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. СЕССИИ
// ==========================================
app.use(session({
    secret: 'super-secret-key',     // Ключ для подписи куки
    resave: false,                  // Не пересохранять сессию без изменений
    saveUninitialized: false,       // Не создавать сессию "пустым" посетителям
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 часа
    } 
}));

// ==========================================
// 3. PASSPORT.JS
// ==========================================
initializePassport(passport);       // Настраиваем стратегию из config/passport.config.js
app.use(passport.initialize());     // Подключаем Passport
app.use(passport.session());        // Связываем Passport с сессиями

// ==========================================
// 4. МАРШРУТЫ (РОУТЫ)
// ==========================================
// Главная приветственная страница
app.get('/', (req, res) => {
    res.send(`
        <h2>Backend MVC: Пример Авторизации</h2>
        <p>1. <code>POST /auth/register</code> — Регистрация</p>
        <p>2. <code>POST /auth/login</code> — Вход (Паспортная аутентификация)</p>
        <p>3. <code>GET /auth/profile</code> — Защищенный маршрут профиля</p>
        <p>4. <code>POST /auth/logout</code> — Выход</p>
    `);
});

// Подключаем все роуты авторизации (без префикса для совместимости)
app.use('/', authRoutes);

// ==========================================
// 5. ЗАПУСК
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Сервер (MVC) запущен на порту ${PORT}`);
    console.log(`🔗 Откройте http://localhost:${PORT}`);
});
