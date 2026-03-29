const userService = require('../services/user.service');

/**
 * РЕГИСТРАЦИЯ
 */
const register = (req, res) => {
    const { name, email, password } = req.body;

    // ШАГ 1: Проверка занятости email
    const existingUser = userService.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ 
            status: 'error', 
            message: 'Email уже занят' 
        });
    }

    // ШАГ 2: Создание пользователя (через сервис)
    const newUser = userService.createUser({ name, email, password });

    res.status(201).json({ 
        status: 'success', 
        message: 'Пользователь зарегистрирован!',
        user: { name: newUser.name, email: newUser.email }
    });
};

/**
 * ВХОД (Успешный ответ)
 * Сама аутентификация происходит в роутере через Passport.js
 */
const login = (req, res) => {
    // Если мы попали сюда, значит Passport успешно аутентифицировал пользователя
    res.json({
        status: 'success',
        message: 'Успешный вход!',
        user: { name: req.user.name, email: req.user.email }
    });
};

/**
 * ПРОФИЛЬ (Только для авторизованных)
 */
const getProfile = (req, res) => {
    // Данные пользователя берем из req.user (Passport.js добавляет его после входа)
    res.json({
        status: 'success',
        message: 'Добро пожаловать в профиль!',
        user: { name: req.user.name, email: req.user.email }
    });
};

/**
 * ВЫХОД
 */
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ 
                status: 'error', 
                message: 'Ошибка при выходе' 
            });
        }
        res.json({ 
            status: 'success', 
            message: 'Вы вышли из системы' 
        });
    });
};

module.exports = {
    register,
    login,
    getProfile,
    logout
};
