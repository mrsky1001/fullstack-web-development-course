/**
 * Роутер для работы с продуктами
 * 
 * Определяет маршруты для:
 * - Получения списка всех продуктов
 * - Получения информации о конкретном продукте
 * 
 * Базовый путь: /product
 */

const express = require("express") // Express для создания роутера
const productController = require("../controllers/product.controller") // Контроллер продуктов
const productRouter = express.Router()

// Маршруты продуктов
productRouter.get("/all", productController.getAllProducts) // GET /product/all - получение всех продуктов
productRouter.get("/:id", productController.getProduct) // GET /product/:id - получение продукта по ID

module.exports = productRouter