/**
 * MODEL: ShoppingCartRow (Строка в таблице корзины)
 * 
 * Представляет одну запись в таблице базы данных shopping_cart.
 * Связывает пользователя и товар, указывая количество.
 */
class ShoppingCartRow {
    constructor(obj) {
        if (obj) {
            this.id = obj.id ?? null;       // ID записи
            this.userId = obj.userId;       // ID пользователя
            this.productId = obj.productId; // ID товара
            this.quantity = obj.quantity;   // Количество
        }
    }

    /**
     * Конвертация из "сырой" записи БД
     */
    fromDB(obj) {
        this.id = obj.item_id;
        this.userId = obj.user_id;
        this.productId = obj.product_id;
        this.quantity = obj.item_quantity;

        return this;
    }
}

module.exports = ShoppingCartRow;