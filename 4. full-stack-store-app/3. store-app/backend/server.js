/**
 * ГЛАВНЫЙ ФАЙЛ СЕРВЕРА (ENTRY POINT)
 * 
 * Здесь происходит:
 * 1. Загрузка переменных окружения из .env файла.
 * 2. Подключение необходимых библиотек (Express, CORS, Session, Passport).
 * 3. Настройка конфигурации сервера (безопасность, парсинг данных).
 * 4. Подключение маршрутизаторов (Routers) для обработки запросов.
 * 5. Запуск сервера на настроенном порту.
 */

// --- 0. Загрузка переменных окружения ---
// ВАЖНО: dotenv должен загружаться ПЕРВЫМ, до всех остальных импортов!
// Это позволяет другим модулям (например, db.service.js) использовать process.env
require('dotenv').config();

// --- 1. Подключение зависимостей ---

// Express - фреймворк для создания веб-серверов на Node.js.
// Он упрощает обработку HTTP-запросов и маршрутизацию.
const express = require("express");
const server = express(); // Создаем экземпляр приложения Express

// CORS (Cross-Origin Resource Sharing) - механизм, позволяющий браузеру
// делать запросы к серверу с другого домена (например, с frontend на backend).
const cors = require('cors');

// express-session - библиотека для управления сессиями пользователей.
// Позволяет серверу "запоминать" пользователя между запросами (хранит данные в памяти или базе).
const session = require("express-session");

// Passport.js - библиотека для аутентификации (входа) пользователей.
// Поддерживает разные стратегии (логин/пароль, Google, Facebook и т.д.).
const passport = require("passport");
const LocalStrategy = require("passport-local"); // Стратегия входа по логину и паролю

// Импорт маршрутизаторов (Routers)
// Маршрутизаторы группируют обработчики запросов по темам (auth, products, cart).
const authRouter = require("./routers/auth.router");
const productRouter = require("./routers/product.router");
const shoppingCartRouter = require("./routers/shopping-cart.router");

// Импорт сервисов и middleware
const userService = require("./services/user.service");
const { isAuthenticated } = require("./middleware/auth.middleware");

// --- 2. Настройка CORS (Безопасность и Доступ) ---

// Конфигурация CORS определяет, кому разрешено обращаться к этому серверу.
const corsOptions = {
    origin: true, // true означает, что разрешены запросы с любых доменов (удобно для разработки)
    credentials: true, // Разрешает передачу cookies и авторизационных заголовков
    optionsSuccessStatus: 200 // Код ответа для предварительных (preflight) запросов
};

server.use(cors(corsOptions));

// Дополнительная ручная настройка заголовков для максимальной совместимости
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Если это предварительный запрос (OPTIONS), сразу отвечаем "OK"
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next(); // Передаем управление следующему обработчику
});

// --- 3. Настройка парсинга данных ---

server.use(express.json()); // Позволяет читать JSON данные из тела запроса (req.body)
server.use(express.urlencoded({ extended: true })); // Позволяет читать данные форм (application/x-www-form-urlencoded)

// --- 4. Настройка Сессий (Sessions) ---

// Настройка cookie сессии.
// Сессия создается при первом запросе и живет указанное время.
// ВАЖНО: Секретный ключ берется из переменных окружения!
server.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production', // Секрет из .env (обязательно заменить!)
    resave: false, // Не сохранять сессию, если она не менялась
    saveUninitialized: false, // Не создавать пустую сессию для гостей
    name: 'sessionId', // Имя cookie, которая будет отправлена клиенту
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Время жизни cookie (24 часа)
        // ⚠️ ВНИМАНИЕ: Для production-сайта нужно установить:
        // httpOnly: true (защита от XSS-атак)
        // secure: true (только HTTPS)
        // sameSite: 'strict' или 'lax' (защита от CSRF)
        httpOnly: process.env.NODE_ENV === 'production',  // В dev = false для отладки
        secure: process.env.NODE_ENV === 'production',    // В dev = false (работаем по http)
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false
    },
}));

// --- 5. Логирование (Logging) ---

// Простое логирование каждого запроса в консоль сервера.
// Помогает видеть, что происходит в реальном времени.
server.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.path}`);
    next();
});

// --- 6. Настройка Passport (Аутентификация) ---

server.use(passport.initialize()); // Инициализация passport
server.use(passport.session()); // Подключение passport к сессиям

// Настройка стратегии "Local":
// Указываем, какие поля в body запроса считать логином и паролем.
// Функция userService.verifyUser будет проверять правильность данных.
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    userService.verifyUser
));

// Сериализация: Что сохранить в сессию после входа? (сохраняем email)
passport.serializeUser((user, callback) => {
    callback(null, user.email);
});

// Десериализация: Как восстановить пользователя по данным из сессии?
// Берем email из сессии и ищем пользователя в базе данных.
passport.deserializeUser(async (email, callback) => {
    try {
        const foundedUser = await userService.findUser({ email });
        callback(null, foundedUser);
    } catch (err) {
        console.error('Ошибка при восстановлении пользователя из сессии:', err);
        callback(err);
    }
});

// --- 7. Маршрутизация (Routing) ---

// Подключаем группы маршрутов по базовым путям
server.use('/auth', authRouter);          // Все запросы авторизации (login, register...)
server.use('/product', productRouter);    // Запросы товаров
server.use('/shopping-cart',isAuthenticated, shoppingCartRouter); // Корзина (доступна ТОЛЬКО авторизованным)

// --- 8. Запуск сервера ---

// Порт берётся из переменных окружения (по умолчанию 3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`\n🚀 Сервер запущен и ожидает подключений!`);
    console.log(`📍 Адрес: http://localhost:${PORT}`);
    console.log(`🔧 Режим: ${process.env.NODE_ENV || 'development'}`);
    console.log(`----------------------------------------`);
});

module.exports = server;