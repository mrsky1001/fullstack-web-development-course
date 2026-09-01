const db = require('./db.service');

exports.findAllProducts = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');

        return rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category,
            img: row.product_img
        }));

    } catch (error) {
        console.warn('⚠️ БД недоступна, используем mock-данные:', error.message);
        useMockData = true;
        return mockProducts;
    }
};