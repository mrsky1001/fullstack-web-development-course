/**
 * SERVICE: UserService (Сервис Пользователей)
 * 
 * Отвечает за:
 * 1. Получение данных пользователя.
 * 2. Регистрацию новых пользователей.
 * 3. Проверку пароля при входе.
 */

const User = require('../models/user.class');
const db = require('./db.service');
const bcrypt = require('bcryptjs'); // Библиотека для хеширования (шифрования) паролей

/**
 * Ищет пользователя в базе данных по ID или Email.
 * 
 * @param {Object} user - Объект с полями id или email
 * @returns {Promise<User|null>} - Найденный пользователь или null
 */
exports.findUser = async (user) => {
    try {
        // Ищем пользователя, у которого совпадает либо ID, либо Email
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE user_id = ? OR user_email = ?',
            [user.id ?? null, user.email ?? null]
        );

        if (rows.length > 0) {
            return new User().fromDB(rows[0]);
        } else {
            return null; // Пользователь не найден
        }
    } catch (err) {
        throw err;
    }
};

/**
 * Регистрирует нового пользователя в базе данных.
 * 
 * @param {User} user - Объект пользователя для сохранения
 */
exports.insertUser = async (user) => {
    try {
        // ВАЖНО: Мы сохраняем не сам пароль, а его хэш!
        // Хэширование происходит в контроллере перед вызовом этого метода.
        await db.execute(
            "INSERT INTO users (user_name, user_role, user_email, user_password) VALUES (?,?,?,?)",
            [user.name, user.role, user.email, user.password]
        );
    } catch (err) {
        throw err;
    }
};

/**
 * Метод для проверки пользователя (используется PassportJS).
 * Сравнивает введенный пароль с хешем в базе данных.
 * 
 * @param {string} email - Email (логин)
 * @param {string} password - Пароль введенный пользователем
 * @param {Function} callback - Функция обратного вызова (error, userOrFalse)
 */
exports.verifyUser = (email, password, callback) => {
    // 1. Ищем пользователя по email
    exports.findUser({ email }).then((user) => {

        if (user) {
            // 2. Если пользователь найден, сравниваем хэши паролей
            // bcrypt.compareSync берет обычный пароль, хеширует его так же как в базе
            // и сравнивает результаты.
            const isValid = bcrypt.compareSync(password, user.password);

            if (isValid) {
                // Пароль верный - возвращаем пользователя
                return callback(null, user);
            } else {
                // Пароль неверный
                return callback(null, false);
            }
        } else {
            // Пользователь с таким email не найден
            return callback(null, false);
        }
    }).catch(callback); // В случае ошибки БД передаем её в callback
};