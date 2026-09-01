const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopping-cart.controller');

router.get('/', controller.getAllProducts);
router.post('/add', controller.addShoppingCartRow);
router.put('/update/:id', controller.changeQuantityShoppingCartRow);
router.delete('/remove/:id', controller.removeShoppingCartRow);

module.exports = router;
