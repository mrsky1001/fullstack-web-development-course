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