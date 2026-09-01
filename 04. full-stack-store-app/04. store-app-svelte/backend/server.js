/**
 * Подключение и настройка зависимостей
 */
const express = require("express")// Подключаем библиотеку express для упрощения создания API
const server = express() // создаем объект приложения
const cors = require('cors')
const session = require("express-session")// Подключаем библиотеку express для упрощения создания API
const passport = require("passport")
const LocalStrategy = require("passport-local")

const authRouter = require("./routers/auth.router")
const productRouter = require("./routers/product.router")
const shoppingCartRouter = require("./routers/shopping-cart.router")

const userService = require("./services/user.service")

const {isAuthenticated} = require("./middleware/auth.middleware")

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5174',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(express.json()) // устанавливаем автоматически парсинг тела запроса в json
server.use(cors(corsOptions))

// Middlewares, которые должны быть определены до passport:
server.use(express.urlencoded({extended: true}))
server.use(session({
    secret: 'secret-keyasdas das dasd asd asd asd as',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false,
    },
}))

/**
 * Подключение и настройка PassportJS
 */

server.use(passport.initialize())
server.use(passport.session())

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, userService.verifyUser))

passport.serializeUser((user, callback) => {
    console.log(user)
    callback(null, user.email)
})
passport.deserializeUser((email, callback) => {
    try {
        console.log('---')
        const foundedUser = userService.findUser({email})
        callback(null, foundedUser)
    } catch (err) {
        callback(err)
    }
})

/**
 * Инициализация маршрутизаторов
 */

server.use('/auth', authRouter)
server.use('/product', productRouter)
server.use('/shopping-cart', isAuthenticated, shoppingCartRouter)

/**
 * Запуск прослушивания обращений на localhost:3000
 */
server.listen(3000, () => {
    console.log("Сервер ожидает подключения по адресу localhost:30...")
})

module.exports = server