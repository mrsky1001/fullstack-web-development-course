const db = require("./db.service")
const Product = require("../models/product.class")

exports.findAllProducts = async (userId) => {
    const result = await db.execute(`
        select p.*,
               shopping_cart.item_id,
               shopping_cart.item_quantity,
               (item_id is not null) as is_exist_in_shopping_cart
        from products as p
                 left join shopping_cart
                           on p.product_id = shopping_cart.product_id and shopping_cart.user_id = ?;`, [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const products = listRaw.map((item) => new Product().fromDB(item)) //[1,2]
        return products
    }

}


exports.findProduct = async (userId, productId) => {
    const result = await db.execute(`
        select p.*,
               shopping_cart.item_id,
               shopping_cart.item_quantity,
               (item_id is not null) as is_exist_in_shopping_cart
        from products as p
                 left join shopping_cart
                           on p.product_id = shopping_cart.product_id and shopping_cart.user_id = ?
        where p.product_id = ?;`, [userId, productId])

    if (result && result[0]) {
        const row = result[0][0]
        const products = new Product().fromDB(row) //[1,2]
        return products
    }
}
