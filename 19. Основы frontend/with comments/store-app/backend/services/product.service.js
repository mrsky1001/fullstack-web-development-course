/**
 * Сервис для работы с продуктами
 * 
 * Этот модуль предоставляет функции для:
 * - Получения списка всех продуктов
 * - Поиска конкретного продукта
 * - Интеграции с корзиной покупок
 * 
 * Особенности:
 * - Возвращает информацию о наличии продукта в корзине пользователя
 * - Преобразует данные из БД в объекты Product
 */

const db = require("./db.service") // Сервис для работы с базой данных
const Product = require("../models/product.class") // Модель продукта

/**
 * Получение списка всех продуктов с информацией о корзине
 * @param {number} userId - ID пользователя для проверки корзины
 * @returns {Promise<Product[]>} Массив продуктов с информацией о наличии в корзине
 * 
 * Запрос объединяет таблицы products и shopping_cart для получения:
 * - Основной информации о продукте
 * - ID элемента в корзине (если есть)
 * - Количества в корзине (если есть)
 * - Флага наличия в корзине
 */
exports.findAllProducts = async (userId) => {
    const result = await db.execute(`
        select p.*,
               shopping_cart.item_id,
               shopping_cart.item_quantity,
               (item_id is not null) as is_exist_in_shopping_cart
        from products as p
                 left join shopping_cart
                           on p.product_id = shopping_cart.product_id and shopping_cart.user_id = ?;`, [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const products = listRaw.map((item) => new Product().fromDB(item)) // Преобразование данных в объекты Product
        return products
    }
}

/**
 * Поиск конкретного продукта с информацией о корзине
 * @param {number} userId - ID пользователя для проверки корзины
 * @param {number} productId - ID искомого продукта
 * @returns {Promise<Product|null>} Объект продукта с информацией о наличии в корзине или null
 * 
 * Запрос аналогичен findAllProducts, но с фильтрацией по конкретному product_id
 */
exports.findProduct = async (userId, productId) => {
    const result = await db.execute(`
        select p.*,
               shopping_cart.item_id,
               shopping_cart.item_quantity,
               (item_id is not null) as is_exist_in_shopping_cart
        from products as p
                 left join shopping_cart
                           on p.product_id = shopping_cart.product_id and shopping_cart.user_id = ?
        where p.product_id = ?;`, [userId, productId])

    if (result && result[0]) {
        const row = result[0][0]
        const products = new Product().fromDB(row) // Преобразование данных в объект Product
        return products
    }
}
