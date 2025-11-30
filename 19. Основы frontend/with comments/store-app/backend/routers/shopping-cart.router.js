/**
 * Роутер для работы с корзиной покупок
 * 
 * Определяет маршруты для:
 * - Получения содержимого корзины
 * - Добавления товаров в корзину
 * - Изменения количества товаров
 * - Удаления товаров из корзины
 * 
 * Базовый путь: /shopping-cart
 * Все маршруты требуют аутентификации
 */

const express = require("express") // Express для создания роутера
const shoppingCartController = require("../controllers/shopping-cart.controller") // Контроллер корзины
const shoppingCartRouter = express.Router()

// Маршруты корзины покупок
shoppingCartRouter.get("/all", shoppingCartController.getAllProducts) // GET /shopping-cart/all - получение всех товаров
shoppingCartRouter.post("/add", shoppingCartController.addShoppingCartRow) // POST /shopping-cart/add - добавление товара
shoppingCartRouter.put("/change", shoppingCartController.changeQuantityShoppingCartRow) // PUT /shopping-cart/change - изменение количества
shoppingCartRouter.delete("/remove/:id", shoppingCartController.removeShoppingCartRow) // DELETE /shopping-cart/remove/:id - удаление товара

module.exports = shoppingCartRouter