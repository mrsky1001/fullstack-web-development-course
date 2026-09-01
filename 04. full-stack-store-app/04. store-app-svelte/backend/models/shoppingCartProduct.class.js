class ShoppingCartProduct {
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