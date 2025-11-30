/**
 * Класс модели товара в корзине с полной информацией о продукте
 * 
 * Расширяет базовую информацию о товаре в корзине (ShoppingCartRow)
 * дополнительными данными о самом продукте:
 * - Название продукта
 * - Цена продукта
 * - Категория продукта
 * - Изображение продукта
 */
class ShoppingCartProduct {
    /**
     * Создает новый экземпляр товара в корзине с полной информацией
     * @param {Object} [obj] - Объект с данными товара
     * @param {number} [obj.id] - ID строки в корзине
     * @param {number} [obj.userId] - ID пользователя
     * @param {number} [obj.productId] - ID продукта
     * @param {number} [obj.quantity] - Количество товара
     * @param {string} [obj.productName] - Название продукта
     * @param {number} [obj.productPrice] - Цена продукта
     * @param {string} [obj.productCategory] - Категория продукта
     * @param {string} [obj.productImg] - Путь к изображению продукта
     */
    constructor(obj) {
        if (obj) {
            this.rowId = obj.id ?? null
            this.userId = obj.userId
            this.productId = obj.productId
            this.quantity = obj.quantity
            this.productName = obj.productName
            this.productPrice = obj.productPrice
            this.productCategory = obj.productCategory
            this.productImg = obj.productImg
        }
    }

    /**
     * Преобразует данные из базы данных в объект товара в корзине
     * @param {Object} obj - Объект с данными из БД
     * @param {number} obj.item_id - ID строки в корзине
     * @param {number} obj.user_id - ID пользователя
     * @param {number} obj.product_id - ID продукта
     * @param {number} obj.item_quantity - Количество товара
     * @param {string} obj.product_name - Название продукта
     * @param {string} obj.product_category - Категория продукта
     * @param {number} obj.product_price - Цена продукта
     * @param {string} obj.product_img - Путь к изображению
     * @returns {ShoppingCartProduct} Текущий экземпляр товара в корзине
     */
    fromDB(obj) {
        this.rowId = obj.item_id
        this.userId = obj.user_id
        this.productId = obj.product_id
        this.quantity = obj.item_quantity
        this.productName = obj.product_name
        this.productCategory = obj.product_category
        this.productPrice = obj.product_price
        this.productImg = obj.product_img

        return this
    }
}

module.exports = ShoppingCartProduct