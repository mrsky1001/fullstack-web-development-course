/**
 * Класс модели продукта
 * 
 * Представляет товар в системе со следующими характеристиками:
 * - Идентификатор
 * - Название
 * - Цена
 * - Категория
 * - Количество
 * - Изображение
 * - Информация о наличии в корзине
 */
class Product {
    /**
     * Создает новый экземпляр продукта
     * @param {Object} [obj] - Объект с данными продукта
     * @param {number} [obj.id] - ID продукта
     * @param {string} [obj.name] - Название продукта
     * @param {number} [obj.price] - Цена продукта
     * @param {number} [obj.rowId] - ID строки в корзине (если есть)
     * @param {string} [obj.category] - Категория продукта
     * @param {number} [obj.quantity] - Количество продукта
     * @param {string} [obj.img] - Путь к изображению продукта
     */
    constructor(obj) {
        if (obj) {
            this.id = obj.id
            this.name = obj.name
            this.price = obj.price
            this.rowId = obj.rowId
            this.category = obj.category
            this.quantity = obj.quantity
            this.img = obj.img

            this.isExistInShoppingCart = false
        }
    }

    /**
     * Преобразует данные из базы данных в объект продукта
     * @param {Object} obj - Объект с данными из БД
     * @param {number} obj.product_id - ID продукта
     * @param {string} obj.product_name - Название продукта
     * @param {number} obj.product_price - Цена продукта
     * @param {string} obj.product_category - Категория продукта
     * @param {number} [obj.item_quantity] - Количество в корзине
     * @param {number} [obj.item_id] - ID строки в корзине
     * @param {string} [obj.product_img] - Путь к изображению
     * @param {boolean} [obj.is_exist_in_shopping_cart] - Флаг наличия в корзине
     * @returns {Product} Текущий экземпляр продукта
     */
    fromDB(obj) {
        this.id = obj.product_id
        this.name = obj.product_name
        this.price = obj.product_price
        this.category = obj.product_category
        this.quantity = obj.item_quantity
        this.rowId = obj.item_id
        this.img = obj.product_img
        this.isExistInShoppingCart = obj.is_exist_in_shopping_cart

        return this
    }
}

module.exports = Product