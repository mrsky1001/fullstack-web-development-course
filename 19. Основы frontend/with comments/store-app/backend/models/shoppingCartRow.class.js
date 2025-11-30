/**
 * Класс модели строки корзины покупок
 * 
 * Представляет отдельный товар в корзине пользователя со следующими характеристиками:
 * - Идентификатор строки в корзине
 * - ID пользователя
 * - ID продукта
 * - Количество товара
 */
class ShoppingCartRow {
    /**
     * Создает новый экземпляр строки корзины
     * @param {Object} [obj] - Объект с данными строки корзины
     * @param {number} [obj.id] - ID строки в корзине
     * @param {number} [obj.userId] - ID пользователя
     * @param {number} [obj.productId] - ID продукта
     * @param {number} [obj.quantity] - Количество товара
     */
    constructor(obj) {
        if (obj) {
            this.id = obj.id ?? null
            this.userId = obj.userId
            this.productId = obj.productId
            this.quantity = obj.quantity
        }
    }

    /**
     * Преобразует данные из базы данных в объект строки корзины
     * @param {Object} obj - Объект с данными из БД
     * @param {number} obj.item_id - ID строки в корзине
     * @param {number} obj.user_id - ID пользователя
     * @param {number} obj.product_id - ID продукта
     * @param {number} obj.item_quantity - Количество товара
     * @returns {ShoppingCartRow} Текущий экземпляр строки корзины
     */
    fromDB(obj) {
        this.id = obj.item_id
        this.userId = obj.user_id
        this.productId = obj.product_id
        this.quantity = obj.item_quantity

        return this
    }
}

module.exports = ShoppingCartRow