const {findAllProducts, findProduct} = require("../services/product.service")
const msgs = require("../lib/messages.lib")
const ResObj = require("../models/resObj.class")

exports.getAllProducts = async (req, res) => {
    const user = await req.user
    const userId = user ? user.id : null

    const allProducts = await findAllProducts(userId)

    res.send(new ResObj({
        data: allProducts,
    }))
}

exports.getProduct = async (req, res) => {
    const user = await req.user
    const userId = user ? user.id : null
    const productId = req.params.id

    const product = await findProduct(userId, productId)

    res.send(new ResObj({
        data: product,
    }))
}