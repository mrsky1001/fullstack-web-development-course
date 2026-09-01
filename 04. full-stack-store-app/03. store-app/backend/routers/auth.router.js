/**
 * ROUTER: Authentication (Маршрутизатор Аутентификации)
 * 
 * Определяет маршруты для входа, регистрации и выхода из системы.
 * Базовый URL: /auth
 */

const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

// --- Определение маршрутов (Endpoints) ---

// POST /auth/login - Вход пользователя (отправка формы логина)
authRouter.post("/login", authController.login);

// POST /auth/register - Регистрация нового пользователя
// Мы используем единый стандартный путь /register.
authRouter.post("/register", authController.registration);

// POST /auth/logout - Выход из системы (удаление сессии)
authRouter.post("/logout", authController.logout);

// GET /auth/check - Проверка текущего статуса (залогинен ли пользователь?)
// Используется фронтендом при загрузке страницы.
authRouter.get("/check", authController.check);

module.exports = authRouter;