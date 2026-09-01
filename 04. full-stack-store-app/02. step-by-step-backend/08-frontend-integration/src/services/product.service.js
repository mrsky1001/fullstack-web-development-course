/**
 * SERVICE: Product
 */
const db = require('./db.service');

const mockProducts = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA GeForce RTX 4090', price: 159990, category: 'Видеокарты' }
];

exports.findAllProducts = async (userId) => {
    try {
        const sql = `
            SELECT p.*,
                   s.item_id,
                   s.item_quantity,
                   (s.item_id IS NOT NULL) as is_in_cart
            FROM products as p
            LEFT JOIN shopping_cart s 
                   ON p.product_id = s.product_id 
                   AND s.user_id = ?
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category,
            img: row.product_img,
            isInCart: !!row.is_in_cart
        }));
    } catch (error) {
        return mockProducts.map(p => ({ ...p, isInCart: false }));
    }
};

exports.findProduct = async (userId, productId) => {
    try {
        const sql = `
            SELECT p.*,
                   s.item_id,
                   (s.item_id IS NOT NULL) as is_in_cart
            FROM products as p
            LEFT JOIN shopping_cart s 
                   ON p.product_id = s.product_id 
                   AND s.user_id = ?
            WHERE p.product_id = ?
        `;
        const [rows] = await db.execute(sql, [userId, productId]);
        if (rows.length > 0) {
            const row = rows[0];
            return {
                id: row.product_id,
                name: row.product_name,
                price: row.product_price,
                category: row.product_category,
                img: row.product_img,
                isInCart: !!row.is_in_cart
            };
        }
        return null;
    } catch (error) {
        return mockProducts.find(p => p.id === productId) || null;
    }
};
