/**
 * ====================================================================
 * CONTROLLER: Auth (Аутентификация)
 * ====================================================================
 * 
 * Управляет:
 * - Регистрацией
 * - Входом (login)
 * - Выходом (logout)
 * - Проверкой статуса
 * 
 * ====================================================================
 */

const passport = require('passport');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');

/**
 * POST /auth/register
 * Регистрация нового пользователя
 */
exports.registration = async (req, res) => {
    const { name, email, password } = req.body;

    // Валидация
    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Необходимо указать email и password'
        });
    }

    try {
        // Проверяем, существует ли пользователь
        const existingUser = await userService.findUser({ email });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'Пользователь с таким email уже существует'
            });
        }

        // ====================================================================
        // ХЕШИРОВАНИЕ ПАРОЛЯ
        // ====================================================================
        // НИКОГДА не храните пароли в открытом виде!
        // bcrypt.hashSync(password, saltRounds) создаёт безопасный хеш.
        // 
        // saltRounds (10) — "сложность" хеширования.
        // Чем больше — тем безопаснее, но медленнее.
        // 10 — хороший баланс для большинства приложений.
        // ====================================================================

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Создаём пользователя
        const newUser = {
            name: name || 'Пользователь',
            email,
            password: hashedPassword,
            role: 'клиент'
        };

        await userService.insertUser(newUser);

        // Автоматически входим после регистрации
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Ошибка входа после регистрации'
                });
            }

            res.status(201).json({
                status: 'success',
                message: 'Регистрация успешна',
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка при регистрации'
        });
    }
};

/**
 * POST /auth/login
 * Вход пользователя
 */
exports.login = (req, res, next) => {
    // ====================================================================
    // PASSPORT.AUTHENTICATE
    // ====================================================================
    // passport.authenticate() — основной метод для аутентификации.
    // Первый аргумент — имя стратегии ('local').
    // Второй — callback для обработки результата.
    // 
    // Callback получает:
    // - err: ошибка (если есть)
    // - user: найденный пользователь (или false)
    // - info: дополнительная информация
    // ====================================================================

    passport.authenticate('local', (err, user, info) => {
        // Ошибка сервера
        if (err) {
            return next(err);
        }

        // Пользователь не найден или неверный пароль
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Неверный email или пароль'
            });
        }

        // Успешная аутентификация — создаём сессию
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({
                status: 'success',
                message: 'Вход выполнен',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });
    })(req, res, next);
};

/**
 * POST /auth/logout
 * Выход из системы
 */
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Ошибка при выходе'
            });
        }

        res.json({
            status: 'success',
            message: 'Вы успешно вышли из системы'
        });
    });
};

/**
 * GET /auth/check
 * Проверка статуса авторизации
 */
exports.check = (req, res) => {
    // req.isAuthenticated() — метод Passport, проверяет наличие сессии
    if (req.isAuthenticated()) {
        res.json({
            status: 'success',
            message: 'Пользователь авторизован',
            isAuth: true,
            user: {
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } else {
        res.json({
            status: 'success',
            message: 'Пользователь не авторизован',
            isAuth: false
        });
    }
};
