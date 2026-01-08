/**
 * ====================================================================
 * ROUTER: Product (Полный CRUD)
 * ====================================================================
 * 
 * Соответствие HTTP методов и CRUD операций:
 * 
 * | HTTP метод | CRUD      | URL               | Описание            |
 * |------------|-----------|-------------------|---------------------|
 * | GET        | Read      | /product/all      | Получить все        |
 * | GET        | Read      | /product/:id      | Получить один       |
 * | POST       | Create    | /product/add      | Создать новый       |
 * | PUT        | Update    | /product/:id      | Обновить полностью  |
 * | DELETE     | Delete    | /product/:id      | Удалить             |
 * 
 * ====================================================================
 */

const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/product.controller');

// READ - Чтение
productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', productController.getProduct);

// CREATE - Создание
productRouter.post('/add', productController.createProduct);

// UPDATE - Обновление
productRouter.put('/:id', productController.updateProduct);

// DELETE - Удаление
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
