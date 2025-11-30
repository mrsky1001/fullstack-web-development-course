/**
 * Роутер для аутентификации
 * 
 * Определяет маршруты для:
 * - Входа в систему
 * - Регистрации новых пользователей
 * 
 * Базовый путь: /auth
 */

const express = require("express") // Express для создания роутера
const authController = require("../controllers/auth.controller") // Контроллер аутентификации

const authRouter = express.Router()

// Маршруты аутентификации
authRouter.post("/login", authController.login) // POST /auth/login - вход в систему
authRouter.post("/registration", authController.registration) // POST /auth/registration - регистрация

module.exports = authRouter