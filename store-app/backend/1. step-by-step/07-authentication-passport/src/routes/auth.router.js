/**
 * ====================================================================
 * ROUTER: Auth (Аутентификация)
 * ====================================================================
 */

const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/register — Регистрация
authRouter.post('/register', authController.registration);

// POST /auth/login — Вход
authRouter.post('/login', authController.login);

// POST /auth/logout — Выход
authRouter.post('/logout', authController.logout);

// GET /auth/check — Проверка статуса
authRouter.get('/check', authController.check);

module.exports = authRouter;
