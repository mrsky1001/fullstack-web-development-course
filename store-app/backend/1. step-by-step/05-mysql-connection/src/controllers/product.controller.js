/**
 * ====================================================================
 * CONTROLLER: Product (Контроллер товаров)
 * ====================================================================
 * 
 * Теперь контроллер использует Service для работы с данными.
 * Контроллер обрабатывает HTTP, сервис — бизнес-логику.
 * 
 * ====================================================================
 */

const productService = require('../services/product.service');

/**
 * Получить все товары
 */
exports.getAllProducts = async (req, res) => {
    try {
        // Вызываем сервис для получения данных
        const products = await productService.findAllProducts();

        res.json({
            status: 'success',
            message: 'Список товаров получен',
            data: products,
            count: products.length
        });
    } catch (error) {
        console.error('Ошибка получения товаров:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка при получении списка товаров',
            statusCode: 500
        });
    }
};

/**
 * Получить товар по ID
 */
exports.getProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        // Вызываем сервис
        const product = await productService.findProduct(productId);

        if (product) {
            res.json({
                status: 'success',
                message: 'Товар найден',
                data: product
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `Товар с ID ${productId} не найден`,
                statusCode: 404
            });
        }
    } catch (error) {
        console.error('Ошибка получения товара:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка при получении товара',
            statusCode: 500
        });
    }
};
