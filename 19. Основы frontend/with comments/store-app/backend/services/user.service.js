/**
 * Сервис для работы с пользователями
 * 
 * Этот модуль предоставляет основные функции для:
 * - Поиска пользователей в базе данных
 * - Создания новых пользователей
 * - Верификации пользователей при аутентификации
 */

const User = require('../models/user.class') // Модель пользователя
const db = require('./db.service') // Сервис для работы с базой данных
const bcrypt = require('bcryptjs') // Библиотека для хеширования паролей

/**
 * Поиск пользователя в базе данных
 * @param {Object} user - Объект с параметрами поиска
 * @param {number} [user.id] - ID пользователя
 * @param {string} [user.email] - Email пользователя
 * @returns {Promise<User|null>} Объект пользователя или null, если пользователь не найден
 */
exports.findUser = async (user) => {
    try {
        // Поиск пользователя по ID или email
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ? or user_email = ?',
            [user.id ?? null, user.email ?? null])

        if (rows.length > 0) {
            return new User().fromDB(rows[0]) // Преобразование данных из БД в объект User
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

/**
 * Создание нового пользователя в базе данных
 * @param {Object} user - Объект с данными пользователя
 * @param {string} user.name - Имя пользователя
 * @param {string} user.role - Роль пользователя
 * @param {string} user.email - Email пользователя
 * @param {string} user.password - Хешированный пароль пользователя
 * @returns {Promise<void>}
 */
exports.insertUser = async (user) => {
    try {
        await db.execute(
            "INSERT INTO users (user_name, user_role, user_email, user_password) VALUES (?,?,?,?)",
            [user.name, user.role, user.email, user.password]
        )
    } catch (err) {
        throw err
    }
}

/**
 * Верификация пользователя при аутентификации
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль пользователя
 * @param {Function} callback - Функция обратного вызова
 * @returns {Promise<void>}
 * 
 * Функция проверяет:
 * 1. Существование пользователя с указанным email
 * 2. Совпадение хеша пароля
 * 
 * В случае успеха передает объект пользователя в callback
 * В случае неудачи передает false
 */
exports.verifyUser = (email, password, callback) => {
    this.findUser({ email }).then((user) => {
        if (user) {
            // Сравнение хеша введенного пароля с хешем в базе данных
            const isValid = bcrypt.compareSync(password, user.password)

            if (isValid) {
                return callback(null, user) // Успешная аутентификация
            } else {
                return callback(null, false) // Неверный пароль
            }
        } else {
            return callback(null, false) // Пользователь не найден
        }
    }).catch(callback)
}