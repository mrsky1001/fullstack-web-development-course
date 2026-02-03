/**
 * ====================================================================
 * CONTROLLER: Product (Контроллер товаров)
 * ====================================================================
 * Тот же контроллер из урока 3.
 */
const msgs = require("../../lib/messages.lib")
const ResObj = require("../../models/resObj.class")
const mockProducts = require("../../lib/mockProducts")
const Product = require("../../models/product.class")

exports.getAllProducts = (req, res) => {
    res.json({
        status: 'success',
        message: 'Список товаров получен',
        data: mockProducts,
        count: mockProducts.length
    });
};

exports.getProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = new Product(mockProducts.find(p => p.id === productId));

    if (product) {
        res.json(new ResObj({
            text: msgs.PRODUCT_FOUND,
            data: product
        }));
    } else {
        // Товар не найден — возвращаем 404
        res.status(404).json(new ResObj({
            status: 404,
            text: msgs.PRODUCT_NOT_FOUND
        }));
    }
};
