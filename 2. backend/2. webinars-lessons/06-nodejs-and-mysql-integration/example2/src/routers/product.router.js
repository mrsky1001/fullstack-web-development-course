/**
 * ROUTER: Product
 */

const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/product.controller');

// localhost:3000/product/all
productRouter.get('/all', productController.getAllProducts);
// localhost:3000/product/:id
productRouter.get('/:id', productController.getProduct);

module.exports = productRouter;