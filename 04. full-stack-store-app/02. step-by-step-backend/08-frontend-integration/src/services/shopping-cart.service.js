/**
 * ====================================================================
 * SERVICE: Shopping Cart (Корзина покупок)
 * ====================================================================
 * 
 * Управляет содержимым корзины в базе данных.
 * Все операции требуют userId (ID авторизованного пользователя).
 * 
 * ====================================================================
 */

const db = require('./db.service');

// Mock-данные
const mockCart = [];

/**
 * Получить все товары в корзине пользователя
 */
exports.findAllProducts = async (userId) => {
    try {
        // SQL JOIN — объединяем данные корзины с данными товаров
        const sql = `
            SELECT 
                s.item_id,
                s.user_id,
                s.product_id,
                s.item_quantity,
                p.product_name,
                p.product_price,
                p.product_category,
                p.product_img
            FROM shopping_cart AS s
            JOIN products AS p ON s.product_id = p.product_id
            WHERE s.user_id = ?
        `;

        const [rows] = await db.execute(sql, [userId]);

        return rows.map(row => ({
            rowId: row.item_id,
            productId: row.product_id,
            quantity: row.item_quantity,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category,
            img: row.product_img
        }));

    } catch (error) {
        console.warn('⚠️ Mock mode (cart):', error.message);
        return mockCart.filter(item => item.userId === userId);
    }
};

/**
 * Добавить товар в корзину
 */
exports.insertRow = async (row) => {
    try {
        const [result] = await db.execute(
            'INSERT INTO shopping_cart (user_id, product_id, item_quantity) VALUES (?, ?, ?)',
            [row.userId, row.productId, row.quantity]
        );
        return { insertId: result.insertId };
    } catch (error) {
        console.warn('⚠️ Mock mode (insert cart):', error.message);
        const newItem = {
            id: mockCart.length + 1,
            userId: row.userId,
            productId: row.productId,
            quantity: row.quantity
        };
        mockCart.push(newItem);
        return { insertId: newItem.id };
    }
};

/**
 * Обновить количество товара
 * ВАЖНО: проверяем user_id для безопасности!
 */
exports.updateQuantityRow = async (row, userId) => {
    try {
        const [result] = await db.execute(
            'UPDATE shopping_cart SET item_quantity = ? WHERE item_id = ? AND user_id = ?',
            [row.quantity, row.id, userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        const index = mockCart.findIndex(item =>
            item.id === row.id && item.userId === userId
        );
        if (index !== -1) {
            mockCart[index].quantity = row.quantity;
            return true;
        }
        return false;
    }
};

/**
 * Удалить товар из корзины
 * ВАЖНО: проверяем user_id для безопасности!
 */
exports.deleteRow = async (rowId, userId) => {
    try {
        const [result] = await db.execute(
            'DELETE FROM shopping_cart WHERE item_id = ? AND user_id = ?',
            [rowId, userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        const index = mockCart.findIndex(item =>
            item.id === rowId && item.userId === userId
        );
        if (index !== -1) {
            mockCart.splice(index, 1);
            return true;
        }
        return false;
    }
};
