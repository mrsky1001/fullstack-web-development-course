/**
 * CONTROLLER: Auth
 */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');

exports.registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Укажите email и password' });
    }
    try {
        const existing = await userService.findUser({ email });
        if (existing) {
            return res.status(409).json({ status: 'error', message: 'Email занят' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { name: name || 'User', email, password: hashedPassword, role: 'клиент' };
        await userService.insertUser(newUser);
        req.login(newUser, (err) => {
            if (err) return res.status(500).json({ status: 'error', message: 'Ошибка' });
            res.status(201).json({ status: 'success', message: 'Зарегистрирован', user: { name: newUser.name, email, role: newUser.role } });
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Ошибка регистрации' });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ status: 'error', message: 'Неверный логин или пароль' });
        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ status: 'success', message: 'Вход выполнен', user: { name: user.name, email: user.email, role: user.role } });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ status: 'error', message: 'Ошибка' });
        res.json({ status: 'success', message: 'Выход выполнен' });
    });
};

exports.check = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ status: 'success', isAuth: true, user: { name: req.user.name, email: req.user.email, role: req.user.role } });
    } else {
        res.json({ status: 'success', isAuth: false });
    }
};
