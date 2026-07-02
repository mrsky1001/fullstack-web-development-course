// ============================================================
// TechParts — Роутер товаров (MVC — Routes)
// Маршрут: получение всех товаров
// ============================================================

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products — получить все товары из БД
router.get('/', productController.getAll);

module.exports = router;
