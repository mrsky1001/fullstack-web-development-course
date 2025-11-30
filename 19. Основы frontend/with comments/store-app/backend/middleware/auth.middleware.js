/**
 * Middleware для проверки аутентификации
 * 
 * Этот модуль предоставляет middleware для:
 * - Проверки аутентификации пользователя
 * - Защиты маршрутов от неавторизованного доступа
 */

const msgs = require("../lib/messages.lib") // Библиотека сообщений

/**
 * Middleware проверки аутентификации пользователя
 * 
 * Проверяет, аутентифицирован ли пользователь через Passport.js
 * Если пользователь не аутентифицирован, возвращает ошибку 401
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next - Функция для передачи управления следующему middleware
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next() // Пользователь аутентифицирован, продолжаем
    }

    // Пользователь не аутентифицирован, отправляем ошибку
    res.send({
        text: msgs.USER_NOT_AUTH,
        status: 401,
    })
}

