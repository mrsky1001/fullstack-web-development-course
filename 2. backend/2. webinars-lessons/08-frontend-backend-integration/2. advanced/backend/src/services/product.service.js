/**
 * SERVICE: Product (копия из урока 6)
 */

const db = require('./db.service');

const mockProducts = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA GeForce RTX 4090', price: 159990, category: 'Видеокарты' }
];

exports.findAllProducts = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category
        }));
    } catch (error) {
        return [...mockProducts];
    }
};

exports.findProduct = async (productId) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM products WHERE product_id = ?',
            [productId]
        );
        if (rows.length > 0) {
            const row = rows[0];
            return {
                id: row.product_id,
                name: row.product_name,
                price: row.product_price,
                category: row.product_category
            };
        }
        return null;
    } catch (error) {
        return mockProducts.find(p => p.id === productId) || null;
    }
};
