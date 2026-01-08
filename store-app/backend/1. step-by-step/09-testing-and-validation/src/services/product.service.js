/**
 * SERVICE: Product (Финальная версия с моделью)
 */

const db = require('./db.service');
const Product = require('../models/product.class');
const mockProducts = require('../lib/mockProducts');

let useMockData = false;

exports.findAllProducts = async (userId) => {
    try {
        const sql = `
            SELECT p.*,
                   s.item_id,
                   s.item_quantity,
                   (s.item_id IS NOT NULL) as is_exist_in_shopping_cart
            FROM products as p
            LEFT JOIN shopping_cart s 
                   ON p.product_id = s.product_id 
                   AND s.user_id = ?
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows.map(row => new Product().fromDB(row));
    } catch (error) {
        console.warn('⚠️ Mock mode:', error.message);
        useMockData = true;
        return mockProducts.map(p => ({ ...p, isExistInShoppingCart: false }));
    }
};

exports.findProduct = async (userId, productId) => {
    try {
        const sql = `
            SELECT p.*,
                   s.item_id,
                   s.item_quantity,
                   (s.item_id IS NOT NULL) as is_exist_in_shopping_cart
            FROM products as p
            LEFT JOIN shopping_cart s 
                   ON p.product_id = s.product_id 
                   AND s.user_id = ?
            WHERE p.product_id = ?
        `;
        const [rows] = await db.execute(sql, [userId, productId]);
        if (rows.length > 0) {
            return new Product().fromDB(rows[0]);
        }
        return null;
    } catch (error) {
        useMockData = true;
        const product = mockProducts.find(p => p.id === productId);
        return product ? { ...product, isExistInShoppingCart: false } : null;
    }
};
