class ShoppingCartRow {
    constructor(obj) {
        if (obj) {
            this.id = obj.id ?? null
            this.userId = obj.userId
            this.productId = obj.productId
            this.quantity = obj.quantity
        }
    }

    fromDB(obj) {
        this.id = obj.item_id
        this.userId = obj.user_id
        this.productId = obj.product_id
        this.quantity = obj.item_quantity

        return this
    }
}

module.exports = ShoppingCartRow