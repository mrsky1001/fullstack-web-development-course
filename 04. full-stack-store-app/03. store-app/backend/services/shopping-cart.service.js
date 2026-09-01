/**
 * SERVICE: ShoppingCartService (Сервис Корзины)
 * 
 * Управляет содержимым корзины покупок в базе данных.
 * Позволяет добавлять, удалять и изменять количество товаров,
 * а также получать список товаров в корзине конкретного пользователя.
 */

const db = require("./db.service");
const ShoppingCartRow = require("../models/shoppingCartRow.class");
const ShoppingCartProduct = require("../models/shoppingCartProduct.class");

/**
 * Получает "сырые" строки корзины пользователя (без данных о товаре, только ID).
 * 
 * @param {number} userId - ID пользователя
 * @returns {Promise<ShoppingCartRow[]>}
 */
exports.findAllRow = async (userId) => {
    // Выполняем простой SELECT запрос
    const [rows] = await db.execute("SELECT * FROM shopping_cart WHERE user_id = ?", [userId]);

    if (rows) {
        // Преобразуем ответ БД в массив объектов ShoppingCartRow
        return rows.map((item) => new ShoppingCartRow().fromDB(item));
    }
    return [];
};

/**
 * Получает ПОЛНУЮ информацию о корзине, включая данные о самих товарах.
 * Использует SQL JOIN для объединения таблиц `shopping_cart` и `products`.
 * 
 * @param {number} userId - ID пользователя
 * @returns {Promise<ShoppingCartProduct[]>}
 */
exports.findAllProducts = async (userId) => {
    // Объединяем таблицу корзины (s) и таблицу товаров (p)
    // чтобы получить сразу название, цену и картинку товара, лежащего в корзине.
    const sql = `
        SELECT *
        FROM shopping_cart AS s
        JOIN products AS p ON s.product_id = p.product_id
        WHERE s.user_id = ?
    `;

    const [rows] = await db.execute(sql, [userId]);

    if (rows) {
        return rows.map((item) => new ShoppingCartProduct().fromDB(item));
    }
    return [];
};

/**
 * Добавляет новую запись в корзину (новый товар).
 * 
 * @param {ShoppingCartRow} row - Объект с данными для вставки
 * @returns {Promise<Object>} - Результат выполнения запроса
 */
exports.insertRow = async (row) => {
    // Вставка новой строки. ID записи (item_id) генерируется базой автоматически.
    const result = await db.execute(
        "INSERT INTO shopping_cart (user_id, product_id, item_quantity) VALUES (?, ?, ?)",
        [row.userId, row.productId, row.quantity]
    );

    return result;
};

/**
 * Обновляет количество товара в существующей записи корзины.
 * 
 * ВАЖНО: Добавлена проверка user_id для безопасности!
 * Без неё злоумышленник мог бы изменить чужую корзину, зная item_id.
 * 
 * @param {Object} row - Объект с обновленными данными
 * @param {number} row.quantity - Новое количество
 * @param {number} row.id - ID записи в корзине (item_id)
 * @param {number} userId - ID текущего пользователя (для проверки владельца)
 */
exports.updateQuantityRow = async (row, userId) => {
    // Добавлена проверка AND user_id = ? для безопасности
    const result = await db.execute(
        "UPDATE shopping_cart SET item_quantity = ? WHERE item_id = ? AND user_id = ?",
        [row.quantity, row.id, userId]
    );

    return result;
};

/**
 * Удаляет запись из корзины по её ID.
 * 
 * ВАЖНО: Добавлена проверка user_id для безопасности!
 * Это предотвращает возможность удаления чужих товаров.
 * 
 * @param {number} rowId - ID записи в корзине (item_id)
 * @param {number} userId - ID текущего пользователя (для проверки владельца)
 */
exports.deleteRow = async (rowId, userId) => {
    // Добавлена проверка AND user_id = ? для безопасности
    const result = await db.execute(
        "DELETE FROM shopping_cart WHERE item_id = ? AND user_id = ?",
        [rowId, userId]
    );

    return result;
};
