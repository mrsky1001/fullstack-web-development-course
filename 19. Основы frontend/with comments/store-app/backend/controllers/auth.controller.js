/**
 * Контроллер аутентификации
 * 
 * Обрабатывает запросы для:
 * - Входа в систему
 * - Регистрации новых пользователей
 * 
 * Использует:
 * - Passport.js для аутентификации
 * - bcrypt для хеширования паролей
 * - User модель для работы с данными пользователя
 */

const passport = require("passport") // Passport.js для аутентификации
const bcrypt = require("bcryptjs") // Библиотека для хеширования паролей
const User = require("../models/user.class") // Модель пользователя
const userService = require("../services/user.service") // Сервис пользователей
const msgs = require("../lib/messages.lib") // Библиотека сообщений
const ResObj = require("../models/resObj.class") // Модель ответа

/**
 * Обработчик входа в систему
 * 
 * Аутентифицирует пользователя через Passport.js
 * При успешной аутентификации создает сессию
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next - Функция для передачи управления следующему middleware
 */
exports.login = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(401).json(new ResObj({
                text: msgs.USER_NOT_AUTH,
            }))

            req.login(user, (err) => {
                if (err) return next(err)

                return res.json(new ResObj({
                    text: msgs.SUCCESS_OPERATION,
                }))
            })
        }
    )(req, res, next)
}

/**
 * Обработчик регистрации нового пользователя
 * 
 * Создает нового пользователя с хешированным паролем
 * При успешной регистрации автоматически аутентифицирует пользователя
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * Ожидает в теле запроса:
 * - email
 * - password
 * - name
 * - role (опционально)
 */
exports.registration = async (req, res) => {
    const rawUser = req.body

    if (rawUser) {
        try {
            // Хеширование пароля
            const hashedPassword = bcrypt.hashSync(rawUser.password, 10)
            const newUser = new User({
                ...rawUser,
                password: hashedPassword
            })

            // Сохранение пользователя и автоматическая аутентификация
            userService.insertUser(newUser).then(() => {
                req.login(newUser, (err) => {
                    if (err) {
                        throw err
                    }

                    res.send(new ResObj({
                        text: msgs.USER_REGISTERED_SUCCESS,
                    }))
                })
            })

        } catch (err) {
            console.error(msgs.USER_NOT_REGISTERED, err)

            res.send(new ResObj({
                text: msgs.USER_NOT_REGISTERED,
                status: 500
            }))
        }
    } else {
        console.error(msgs.INCORRECT_DATA_FORM)

        res.send(new ResObj({
            text: msgs.INCORRECT_DATA_FORM,
            status: 500
        }))
    }
}