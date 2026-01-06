/**
 * MODEL: ShoppingCartProduct (Товар в корзине со свойствами)
 * 
 * Это расширенная модель. Она объединяет данные:
 * 1. О самом товаре (название, цена, картинка).
 * 2. О записи в корзине (сколько штук добавлено).
 * 
 * Используется для отображения списка товаров в корзине.
 */
class ShoppingCartProduct {
    constructor(obj) {
        if (obj) {
            this.rowId = obj.id ?? null;       // ID записи в таблице корзины
            this.userId = obj.userId;          // Чья корзина
            this.productId = obj.productId;    // ID самого товара
            this.quantity = obj.quantity;      // Количество этого товара в корзине

            // Данные о товаре (приходят из JOIN запроса)
            this.name = obj.name;
            this.price = obj.price;
            this.category = obj.category;
            this.img = obj.img;
        }
    }

    /**
     * Конвертация из строки БД (результат JOIN запроса)
     */
    fromDB(obj) {
        this.rowId = obj.item_id;
        this.userId = obj.user_id;
        this.productId = obj.product_id;
        this.quantity = obj.item_quantity;

        this.name = obj.product_name;
        this.category = obj.product_category;
        this.price = obj.product_price;
        this.img = obj.product_img;

        return this;
    }
}

module.exports = ShoppingCartProduct;