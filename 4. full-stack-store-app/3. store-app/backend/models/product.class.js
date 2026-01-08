/**
 * MODEL: Product (Товар)
 * 
 * Этот класс отвечает за представление данных о товаре в удобном для JS формате.
 * Используется для преобразования "сырых" данных из базы (snake_case)
 * в объекты JavaScript (camelCase).
 */
class Product {
    /**
     * Создает объект товара из обычного JS объекта
     * @param {Object} obj - Объект с данными
     */
    constructor(obj) {
        if (obj) {
            this.id = obj.id;                // ID товара
            this.name = obj.name;            // Название
            this.price = obj.price;          // Цена
            this.rowId = obj.rowId;          // ID строки (например, если в списке)
            this.category = obj.category;    // Категория
            this.quantity = obj.quantity;    // Количество
            this.img = obj.img;              // Ссылка на изображение

            // Флаг: добавлен ли уже этот товар в корзину текущего пользователя
            this.isExistInShoppingCart = false;
        }
    }

    /**
     * Преобразует данные из формата базы данных (snake_case) в формат приложения.
     * База данных возвращает поля с подчеркиваниями (product_id),
     * а в JS мы используем camelCase (id).
     * 
     * @param {Object} obj - "Сырой" объект из базы данных
     * @returns {Product} - Текущий экземпляр класса с заполненными данными
     */
    fromDB(obj) {
        this.id = obj.product_id;
        this.name = obj.product_name;
        this.price = obj.product_price;
        this.category = obj.product_category;
        this.quantity = obj.item_quantity;
        this.rowId = obj.item_id;
        this.img = obj.product_img;
        this.isExistInShoppingCart = obj.is_exist_in_shopping_cart;

        return this;
    }
}

module.exports = Product;