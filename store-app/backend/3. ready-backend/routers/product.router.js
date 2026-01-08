/**
 * ROUTER: Product (Маршрутизатор Товаров)
 * 
 * Определяет маршруты для получения информации о товарах.
 * Базовый URL: /product
 * 
 * Эти маршруты ПУБЛИЧНЫЕ (доступны без регистрации).
 */

const express = require("express");
const productController = require("../controllers/product.controller");
const productRouter = express.Router();

// GET /product/all - Получить список всех товаров
productRouter.get("/all", productController.getAllProducts);

// GET /product/:id - Получить данные одного товара по его ID
// :id - это параметр пути (например, /product/123)
productRouter.get("/:id", productController.getProduct);

module.exports = productRouter;