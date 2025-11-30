/**
 * Основной файл конфигурации сервера
 * 
 * Этот файл содержит полную настройку Express сервера, включая:
 * - Настройку CORS для безопасного взаимодействия с фронтендом
 * - Конфигурацию сессий и аутентификации через Passport.js
 * - Настройку маршрутизации для различных модулей приложения
 * - Базовые middleware для обработки запросов
 * - Инициализацию сервера на порту 3000
 */

// Импорт основных зависимостей
const express = require("express") // Express - веб-фреймворк для Node.js
const server = express() // Создание экземпляра приложения Express
const cors = require('cors') // Middleware для настройки CORS
const session = require("express-session") // Middleware для управления сессиями
const passport = require("passport") // Middleware для аутентификации
const LocalStrategy = require("passport-local") // Стратегия локальной аутентификации

// Импорт маршрутизаторов
const authRouter = require("./routers/auth.router") // Маршруты аутентификации
const productRouter = require("./routers/product.router") // Маршруты для работы с продуктами
const shoppingCartRouter = require("./routers/shopping-cart.router") // Маршруты корзины покупок

// Импорт сервисов и middleware
const userService = require("./services/user.service") // Сервис для работы с пользователями
const { isAuthenticated } = require("./middleware/auth.middleware") // Middleware проверки аутентификации

// Настройка CORS для безопасного взаимодействия с фронтендом
const corsOptions = {
    credentials: true, // Разрешаем передачу учетных данных (cookies, authorization headers)
    origin: 'http://localhost:5173', // Разрешаем запросы только с указанного origin (фронтенд)
    optionsSuccessStatus: 200 // Для совместимости со старыми браузерами
}

// Настройка базовых middleware
server.use(express.json()) // Middleware для парсинга JSON в теле запроса
server.use(cors(corsOptions)) // Применяем настройки CORS

// Middleware для обработки данных форм и сессий
server.use(express.urlencoded({ extended: true })) // Middleware для парсинга URL-encoded данных
server.use(session({
    secret: 'secret-keyasdas das dasd asd asd asd as', // Секретный ключ для подписи cookie
    resave: false, // Не сохранять сессию, если она не изменилась
    saveUninitialized: false, // Не сохранять пустые сессии
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Время жизни cookie - 24 часа
        secure: false, // В продакшене рекомендуется установить true для HTTPS
    },
}))

/**
 * Настройка Passport.js для аутентификации
 * 
 * Passport.js используется для управления аутентификацией пользователей:
 * - Инициализация Passport и сессий
 * - Настройка локальной стратегии аутентификации
 * - Сериализация/десериализация пользователя
 */
server.use(passport.initialize())
server.use(passport.session())

// Настройка локальной стратегии аутентификации
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    userService.verifyUser
))

// Сериализация пользователя в сессию
passport.serializeUser((user, callback) => {
    console.log(user)
    callback(null, user.email)
})

// Десериализация пользователя из сессии
passport.deserializeUser((email, callback) => {
    try {
        console.log('---')
        const foundedUser = userService.findUser({ email })
        callback(null, foundedUser)
    } catch (err) {
        callback(err)
    }
})

/**
 * Настройка маршрутизации
 * 
 * Определение основных маршрутов приложения:
 * - /auth - маршруты аутентификации
 * - /product - маршруты для работы с продуктами
 * - /shopping-cart - маршруты корзины покупок (требует аутентификации)
 */
server.use('/auth', authRouter)
server.use('/product', productRouter)
server.use('/shopping-cart', isAuthenticated, shoppingCartRouter)

/**
 * Запуск сервера
 * 
 * Сервер начинает прослушивать порт 3000 и готов принимать HTTP запросы
 * После запуска выводится сообщение в консоль
 */
server.listen(3000, () => {
    console.log("Сервер ожидает подключения по адресу localhost:3000...")
})

// Экспортируем настроенный сервер для использования в других модулях
module.exports = server