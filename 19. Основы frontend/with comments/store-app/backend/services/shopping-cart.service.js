/**
 * Сервис для работы с корзиной покупок
 * 
 * Этот модуль предоставляет функции для:
 * - Получения содержимого корзины пользователя
 * - Добавления товаров в корзину
 * - Обновления количества товаров
 * - Удаления товаров из корзины
 * 
 * Особенности:
 * - Работает с двумя моделями: ShoppingCartRow и ShoppingCartProduct
 * - Поддерживает полную информацию о товарах в корзине
 */

const db = require("./db.service") // Сервис для работы с базой данных
const ShoppingCartRow = require("../models/shoppingCartRow.class") // Модель строки корзины
const ShoppingCartProduct = require("../models/ShoppingCartProduct.class") // Модель товара в корзине

/**
 * Получение всех строк корзины пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<ShoppingCartRow[]>} Массив строк корзины
 * 
 * Возвращает базовую информацию о товарах в корзине без деталей продукта
 */
exports.findAllRow = async (userId) => {
    const result = await db.execute("SELECT * FROM shopping_cart where user_id = ?", [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const rows = listRaw.map((item) => new ShoppingCartRow().fromDB(item))

        return rows
    }

}

/**
 * Получение всех товаров в корзине с полной информацией о продуктах
 * @param {number} userId - ID пользователя
 * @returns {Promise<ShoppingCartProduct[]>} Массив товаров с полной информацией
 * 
 * Объединяет информацию из таблиц shopping_cart и products
 * для получения полных данных о каждом товаре в корзине
 */
exports.findAllProducts = async (userId) => {
    const result = await db.execute(`select *
                                     from shopping_cart as s,
                                          products as p
                                     where s.product_id = p.product_id
                                       and s.user_id = ?`, [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const rows = listRaw.map((item) => new ShoppingCartProduct().fromDB(item))

        return rows
    }

}

/**
 * Добавление нового товара в корзину
 * @param {Object} row - Данные для добавления
 * @param {number} row.userId - ID пользователя
 * @param {number} row.productId - ID продукта
 * @param {number} row.quantity - Количество товара
 * @returns {Promise<Object>} Результат операции
 */
exports.insertRow = async (row) => {
    const result = await db.execute("INSERT INTO shopping_cart (user_id, product_id, item_quantity) VALUES (?, ?, ?)",
        [row.userId, row.productId, row.quantity])

    return result
}

/**
 * Обновление количества товара в корзине
 * @param {Object} row - Данные для обновления
 * @param {number} row.id - ID строки в корзине
 * @param {number} row.quantity - Новое количество товара
 * @returns {Promise<Object>} Результат операции
 */
exports.updateQuantityRow = async (row) => {
    console.log(row)
    const result = await db.execute("UPDATE shopping_cart SET item_quantity = ? WHERE item_id = ?",
        [row.quantity, row.id])

    return result
}

/**
 * Удаление товара из корзины
 * @param {number} rowId - ID строки в корзине для удаления
 * @returns {Promise<Object>} Результат операции
 */
exports.deleteRow = async (rowId) => {
    const result = await db.execute("DELETE from shopping_cart WHERE item_id = ?",
        [rowId])

    return result
}


