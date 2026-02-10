/**
 * ====================================================================
 * MODEL: Product (Товар)
 * ====================================================================
 */

class Product {
    constructor(obj) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.price = obj.price;
            this.category = obj.category;
            this.img = obj.img;
            this.isExistInShoppingCart = obj.isExistInShoppingCart ?? false;
        }
    }

    fromDB(row) {
        this.id = row.product_id;
        this.name = row.product_name;
        this.price = row.product_price;
        this.category = row.product_category;
        this.img = row.product_img;
        this.quantity = row.item_quantity;
        this.rowId = row.item_id;
        this.isExistInShoppingCart = !!row.is_exist_in_shopping_cart;
        return this;
    }
}

module.exports = Product;
