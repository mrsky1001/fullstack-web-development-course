// ============================================================
// TechParts — Роутер авторизации (MVC — Routes)
// Маршруты: register, login, logout, check
// ============================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register — регистрация нового пользователя
router.post('/register', authController.register);

// POST /api/auth/login — авторизация (вход в систему)
router.post('/login', authController.login);

// POST /api/auth/logout — выход из системы
router.post('/logout', authController.logout);

// GET /api/auth/check — проверка статуса авторизации
router.get('/check', authController.check);

module.exports = router;
