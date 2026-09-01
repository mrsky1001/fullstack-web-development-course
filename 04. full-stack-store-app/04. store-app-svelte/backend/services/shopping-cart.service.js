const db = require("./db.service")
const ShoppingCartRow = require("../models/shoppingCartRow.class")
const ShoppingCartProduct = require("../models/ShoppingCartProduct.class")

exports.findAllRow = async (userId) => {
    const result = await db.execute("SELECT * FROM shopping_cart where user_id = ?", [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const rows = listRaw.map((item) => new ShoppingCartRow().fromDB(item))

        return rows
    }

}

exports.findAllProducts = async (userId) => {
    const result = await db.execute(`select *
                                     from shopping_cart as s,
                                          products as p
                                     where s.product_id = p.product_id
                                       and s.user_id = ?`, [userId])

    if (result && result[0]) {
        const listRaw = result[0]
        const rows = listRaw.map((item) => new ShoppingCartProduct().fromDB(item))

        return rows
    }

}


exports.insertRow = async (row) => {
    const result = await db.execute("INSERT INTO shopping_cart (user_id, product_id, item_quantity) VALUES (?, ?, ?)",
        [row.userId, row.productId, row.quantity])

    return result
}

exports.updateQuantityRow = async (row) => {
    console.log(row)
    const result = await db.execute("UPDATE shopping_cart SET item_quantity = ? WHERE item_id = ?",
        [row.quantity, row.id])

    return result
}

exports.deleteRow = async (rowId) => {
    const result = await db.execute("DELETE from shopping_cart WHERE item_id = ?",
        [rowId])

    return result
}


