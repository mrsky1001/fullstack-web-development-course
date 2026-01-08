/**
 * CONTROLLER: Product
 */
const productService = require('../services/product.service');

exports.getAllProducts = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const products = await productService.findAllProducts(userId);
        res.json({ status: 'success', data: products, count: products.length });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Ошибка' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const product = await productService.findProduct(userId, parseInt(req.params.id));
        if (product) {
            res.json({ status: 'success', data: product });
        } else {
            res.status(404).json({ status: 'error', message: 'Не найден' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Ошибка' });
    }
};
