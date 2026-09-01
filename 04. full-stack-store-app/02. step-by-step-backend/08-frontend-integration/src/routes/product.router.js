const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/product.controller');

productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', productController.getProduct);

module.exports = productRouter;
