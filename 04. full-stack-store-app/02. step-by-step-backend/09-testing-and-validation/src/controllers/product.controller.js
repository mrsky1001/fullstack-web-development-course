/**
 * CONTROLLER: Product (Финальная версия)
 */

const productService = require('../services/product.service');
const ResObj = require('../models/resObj.class');
const msgs = require('../lib/messages.lib');

exports.getAllProducts = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const products = await productService.findAllProducts(userId);

        res.json(new ResObj({
            text: msgs.PRODUCTS_LOADED,
            data: products
        }));
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({
            status: 500,
            text: msgs.SERVER_ERROR
        }));
    }
};

exports.getProduct = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const productId = parseInt(req.params.id);

        // Валидация ID
        if (isNaN(productId) || productId <= 0) {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Некорректный ID товара'
            }));
        }

        const product = await productService.findProduct(userId, productId);

        if (product) {
            res.json(new ResObj({
                text: msgs.PRODUCT_FOUND,
                data: product
            }));
        } else {
            res.status(404).json(new ResObj({
                status: 404,
                text: msgs.PRODUCT_NOT_FOUND
            }));
        }
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({
            status: 500,
            text: msgs.SERVER_ERROR
        }));
    }
};
