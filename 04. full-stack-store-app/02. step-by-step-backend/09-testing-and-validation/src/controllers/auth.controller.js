/**
 * ====================================================================
 * CONTROLLER: Auth (Финальная версия с валидацией)
 * ====================================================================
 */

const passport = require('passport');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');
const ResObj = require('../models/resObj.class');
const msgs = require('../lib/messages.lib');

/**
 * POST /auth/register
 * Регистрация с валидацией
 */
exports.registration = async (req, res) => {
    const { name, email, password } = req.body;

    // Валидация
    if (!email || !password) {
        return res.status(400).json(new ResObj({
            status: 400,
            text: msgs.INCORRECT_DATA_FORM
        }));
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(new ResObj({
            status: 400,
            text: 'Некорректный формат email'
        }));
    }

    // Валидация пароля (минимум 6 символов)
    if (password.length < 6) {
        return res.status(400).json(new ResObj({
            status: 400,
            text: 'Пароль должен содержать минимум 6 символов'
        }));
    }

    try {
        const existing = await userService.findUser({ email });
        if (existing) {
            return res.status(409).json(new ResObj({
                status: 409,
                text: msgs.USER_ALREADY_EXISTS
            }));
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            name: name || 'Пользователь',
            email,
            password: hashedPassword,
            role: 'клиент'
        };

        await userService.insertUser(newUser);

        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json(new ResObj({
                    status: 500,
                    text: msgs.ERROR_OPERATION
                }));
            }

            res.status(201).json(new ResObj({
                text: msgs.USER_REGISTERED_SUCCESS,
                user: { name: newUser.name, email: newUser.email, role: newUser.role }
            }));
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json(new ResObj({
            status: 500,
            text: msgs.USER_NOT_REGISTERED
        }));
    }
};

/**
 * POST /auth/login
 */
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    // Базовая валидация
    if (!email || !password) {
        return res.status(400).json(new ResObj({
            status: 400,
            text: msgs.INCORRECT_DATA_FORM
        }));
    }

    passport.authenticate('local', (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json(new ResObj({
                status: 401,
                text: msgs.INVALID_CREDENTIALS
            }));
        }

        req.login(user, (err) => {
            if (err) return next(err);

            res.json(new ResObj({
                text: msgs.LOGIN_SUCCESS,
                user: user
            }));
        });
    })(req, res, next);
};

/**
 * POST /auth/logout
 */
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json(new ResObj({
                status: 500,
                text: msgs.ERROR_OPERATION
            }));
        }

        res.json(new ResObj({
            text: msgs.LOGOUT_SUCCESS
        }));
    });
};

/**
 * GET /auth/check
 */
exports.check = (req, res) => {
    if (req.isAuthenticated()) {
        res.json(new ResObj({
            text: msgs.AUTH_SUCCESS,
            user: req.user,
            isAuth: true
        }));
    } else {
        res.json(new ResObj({
            text: msgs.AUTH_FAIL,
            isAuth: false
        }));
    }
};
