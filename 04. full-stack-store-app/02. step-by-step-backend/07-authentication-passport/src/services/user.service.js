/**
 * ====================================================================
 * SERVICE: User (Пользователи)
 * ====================================================================
 * 
 * Отвечает за:
 * 1. Поиск пользователя в БД
 * 2. Регистрацию нового пользователя
 * 3. Проверку пароля при входе
 * 
 * ====================================================================
 */

const db = require('./db.service');
const bcrypt = require('bcryptjs');

// Mock-данные для работы без БД
const mockUsers = [];

/**
 * Найти пользователя по ID или Email
 * 
 * @param {Object} searchParams - { id } или { email }
 * @returns {Promise<Object|null>}
 */
exports.findUser = async (searchParams) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE user_id = ? OR user_email = ?',
            [searchParams.id ?? null, searchParams.email ?? null]
        );

        if (rows.length > 0) {
            const row = rows[0];
            return {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
                role: row.user_role || 'клиент',
                password: row.user_password // Нужен для проверки при входе
            };
        }
        return null;

    } catch (error) {
        console.warn('⚠️ Mock mode (user):', error.message);

        // Mock-поиск
        return mockUsers.find(u =>
            u.id === searchParams.id || u.email === searchParams.email
        ) || null;
    }
};

/**
 * Создать нового пользователя
 * 
 * @param {Object} userData - { name, email, password (уже хешированный!) }
 */
exports.insertUser = async (userData) => {
    try {
        await db.execute(
            'INSERT INTO users (user_name, user_role, user_email, user_password) VALUES (?, ?, ?, ?)',
            [userData.name, userData.role || 'клиент', userData.email, userData.password]
        );
    } catch (error) {
        console.warn('⚠️ Mock mode (insert user):', error.message);

        // Mock-создание
        mockUsers.push({
            id: mockUsers.length + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'клиент',
            password: userData.password
        });
    }
};

/**
 * Проверка пользователя при входе (для Passport.js)
 * 
 * Эта функция вызывается стратегией LocalStrategy.
 * Она должна:
 * 1. Найти пользователя по email
 * 2. Сравнить введённый пароль с хешем в БД
 * 3. Вызвать callback с результатом
 * 
 * @param {string} email - Email (логин)
 * @param {string} password - Пароль (открытый текст)
 * @param {Function} done - Callback: done(error, user|false, info)
 */
exports.verifyUser = async (email, password, done) => {
    try {
        // ШАГ 1: Ищем пользователя по email
        const user = await exports.findUser({ email });

        // ШАГ 2: Если пользователь не найден
        if (!user) {
            return done(null, false, { message: 'Пользователь не найден' });
        }

        // ШАГ 3: Сравниваем пароли
        // bcrypt.compareSync хеширует введённый пароль и сравнивает с сохранённым хешем
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (isValidPassword) {
            // Пароль верный — возвращаем пользователя
            return done(null, user);
        } else {
            // Пароль неверный
            return done(null, false, { message: 'Неверный пароль' });
        }

    } catch (error) {
        return done(error);
    }
};
