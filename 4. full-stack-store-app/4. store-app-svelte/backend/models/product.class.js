class Product {
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