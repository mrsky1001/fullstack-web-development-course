/**
 * CONTROLLER: Authentication (Контроллер Аутентификации)
 * 
 * Управляет логикой входа, регистрации и выхода.
 * Получает данные от маршрутизатора (req), 
 * обрабатывает их (иногда с помощью сервисов) 
 * и отправляет ответ клиенту (res).
 */

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user.class");
const userService = require("../services/user.service");
const msgs = require("../lib/messages.lib"); // Библиотека с текстовыми сообщениями
const ResObj = require("../models/resObj.class"); // Стандартный формат ответа

/**
 * Логин пользователя.
 * Использует стратегию 'local' из passport.js.
 */
exports.login = (req, res, next) => {
    // passport.authenticate возвращает функцию-middleware, которую мы сразу вызываем (req, res, next)
    passport.authenticate('local', (err, user, info) => {
        // 1. Ошибка сервера при попытке аутентификации
        if (err) return next(err);

        // 2. Если пользователь не найден или пароль неверен (user === false)
        if (!user) {
            return res.status(401).json(new ResObj({
                text: msgs.USER_NOT_AUTH, // "Неверный логин или пароль"
                status: 401
            }));
        }

        // 3. Если всё ок, "заходим" пользователем (создаем сессию)
        req.login(user, (err) => {
            if (err) return next(err);

            // Отправляем успешный ответ
            return res.json(new ResObj({
                text: msgs.SUCCESS_OPERATION,
                user: user
            }));
        });
    })(req, res, next);
};

/**
 * Регистрация нового пользователя.
 */
exports.registration = async (req, res) => {
    const rawUser = req.body; // Данные формы (email, password, name)

    if (!rawUser || !rawUser.email || !rawUser.password) {
        return res.status(400).json(new ResObj({
            text: msgs.INCORRECT_DATA_FORM,
            status: 400
        }));
    }

    try {
        // 1. Проверяем, существует ли пользователь (хорошая практика добавить такую проверку, 
        // хотя БД может выдать ошибку уникальности)
        const existingUser = await userService.findUser({ email: rawUser.email });
        if (existingUser) {
            return res.status(409).json(new ResObj({
                text: msgs.USER_ALREADY_EXISTS,
                status: 409
            }));
        }

        // 2. Хешируем пароль перед сохранением (НИКОГДА не храним пароли в открытом виде!)
        // '10' - это "соль" (cost factor), сложность шифрования.
        const hashedPassword = bcrypt.hashSync(rawUser.password, 10);

        // 3. Создаем объект пользователя
        const newUser = new User({
            ...rawUser,
            password: hashedPassword
        });

        // 4. Сохраняем в БД
        await userService.insertUser(newUser);

        // 5. Сразу авторизуем пользователя после регистрации (удобно для UX)
        req.login(newUser, (err) => {
            if (err) throw err;

            res.status(201).json(new ResObj({
                text: msgs.USER_REGISTERED_SUCCESS,
                user: newUser
            }));
        });

    } catch (err) {
        console.error("Ошибка при регистрации:", err);
        res.status(500).json(new ResObj({
            text: msgs.USER_NOT_REGISTERED,
            status: 500
        }));
    }
};

/**
 * Выход из системы (Logout).
 */
exports.logout = (req, res) => {
    // req.logout удаляет данные пользователя из сессии
    req.logout((err) => {
        if (err) {
            return res.status(500).json(new ResObj({
                text: msgs.ERROR_OPERATION,
                status: 500
            }));
        }

        res.json(new ResObj({
            text: msgs.LOGOUT_SUCCESS
        }));
    });
};

/**
 * Проверка статуса авторизации.
 * Фронтенд вызывает это, чтобы понять, кого показывать в шапке (Профиль или Войти).
 */
exports.check = (req, res) => {
    // req.isAuthenticated() - метод passport, возвращает true/false
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
