/**
 * ====================================================================
 * CONTROLLER: Product (Контроллер товаров)
 * ====================================================================
 * Тот же контроллер из урока 3.
 */

const mockProducts = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA GeForce RTX 4090', price: 159990, category: 'Видеокарты' },
    { id: 4, name: 'AMD Radeon RX 7900 XTX', price: 89990, category: 'Видеокарты' },
    { id: 5, name: 'ASUS ROG STRIX Z790-E', price: 42990, category: 'Материнские платы' }
];

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
    const product = mockProducts.find(p => p.id === productId);

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
};
