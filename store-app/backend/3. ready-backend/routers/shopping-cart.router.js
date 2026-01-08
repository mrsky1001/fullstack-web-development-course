/**
 * ROUTER: ShoppingCart (Маршрутизатор Корзины)
 * 
 * Определяет маршруты для управления корзиной покупок.
 * Базовый URL: /shopping-cart
 * 
 * ВАЖНО: Все маршруты здесь защищены middleware `isAuthenticated` 
 * (проверка подключена в server.js), поэтому мы уверены, что req.user существует.
 */

const express = require("express");
const shoppingCartController = require("../controllers/shopping-cart.controller");
const shoppingCartRouter = express.Router();

// --- 1. Получение данных ---

// GET /shopping-cart/ - Получить все товары в корзине текущего пользователя
shoppingCartRouter.get("/", shoppingCartController.getAllProducts);

// --- 2. Изменение данных ---

// POST /shopping-cart/add - Добавить товар в корзину
// Ожидает body: { productId, quantity }
shoppingCartRouter.post("/add", shoppingCartController.addShoppingCartRow);

// PUT /shopping-cart/update/:id - Изменить количетсво товара
// :id - это ID записи в корзине (item_id), а не ID товара!
// Ожидает body: { quantity }
shoppingCartRouter.put("/update/:id", shoppingCartController.changeQuantityShoppingCartRow);

// DELETE /shopping-cart/remove/:id - Удалить товар из корзины
// :id - это ID записи в корзине (item_id)
shoppingCartRouter.delete("/remove/:id", shoppingCartController.removeShoppingCartRow);

module.exports = shoppingCartRouter;