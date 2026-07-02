// ============================================================
// TechParts — Роутер заказов (MVC — Routes)
// Маршруты: создание заказа, получение своих заказов
// ============================================================

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders — создать заказ (только для авторизованных)
// authMiddleware проверяет наличие сессии перед вызовом контроллера
router.post('/', authMiddleware, orderController.create);

// GET /api/orders/my — получить заказы текущего пользователя
router.get('/my', authMiddleware, orderController.getMyOrders);

module.exports = router;
