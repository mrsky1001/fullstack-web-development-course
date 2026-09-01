/**
 * ====================================================================
 * ROUTER: Shopping Cart (Корзина)
 * ====================================================================
 * 
 * ВАЖНО: Все маршруты защищены middleware isAuthenticated
 * (подключён в app.js через app.use('/shopping-cart', isAuthenticated, ...))
 * 
 * ====================================================================
 */

const express = require('express');
const shoppingCartRouter = express.Router();
const controller = require('../controllers/shopping-cart.controller');

// GET /shopping-cart/ — Получить корзину
shoppingCartRouter.get('/', controller.getAllProducts);

// POST /shopping-cart/add — Добавить товар
shoppingCartRouter.post('/add', controller.addShoppingCartRow);

// PUT /shopping-cart/update/:id — Изменить количество
shoppingCartRouter.put('/update/:id', controller.changeQuantityShoppingCartRow);

// DELETE /shopping-cart/remove/:id — Удалить товар
shoppingCartRouter.delete('/remove/:id', controller.removeShoppingCartRow);

module.exports = shoppingCartRouter;
