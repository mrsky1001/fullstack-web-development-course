const express = require('express');
const productController = require('../controllers/product.controller');
// Создаём экземпляр Router
const productRouter = express.Router();

// http://localhost:3000/product/all
productRouter.get('/product/all', productController.getAllProducts)

module.exports = productRouter;