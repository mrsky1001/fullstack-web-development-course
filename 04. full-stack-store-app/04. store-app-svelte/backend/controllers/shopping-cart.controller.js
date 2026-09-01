const {findAllProducts, insertRow, updateQuantityRow, deleteRow} = require('../services/shopping-cart.service')
const ShoppingCartRow = require("../models/shoppingCartRow.class")
const ResObj = require("../models/resObj.class")
const msgs = require("../lib/messages.lib")

exports.getAllProducts = async (req, res) => {
    try {
        const user = await req.user
        const rows = await findAllProducts(user.id)

        res.send(new ResObj({
            text: msgs.SUCCESS_OPERATION,
            data: rows,
        }))
    } catch (err) {
        res.send(new ResObj({
            text: msgs.ERROR_OPERATION + err,
            status: 500,
        }))
    }
}

exports.addShoppingCartRow = async (req, res) => {
    const rawData = req.body
    const user = await req.user

    // console.log('--------------------------start------------------')
    // console.log('user')
    // console.log(user)
    // console.log(rawData)

    const shoppingCartRow = new ShoppingCartRow({
        userId: user.id,
        productId: rawData.productId,
        quantity: rawData.quantity,
    })

    // console.log(shoppingCartRow)
    // console.log('--------------------------end------------------')

    await insertRow(shoppingCartRow)

    res.send(new ResObj({
        text: msgs.SUCCESS_OPERATION,
    }))
}

exports.changeQuantityShoppingCartRow = async (req, res) => {
    const rawData = req.body
    const shoppingCartRow = new ShoppingCartRow(rawData)


    if (shoppingCartRow.quantity <= 0) {
        req.params.id = shoppingCartRow.id
        await this.removeShoppingCartRow(req, res)
    } else {
        await updateQuantityRow(shoppingCartRow)

        res.send(new ResObj({
            text: msgs.SUCCESS_OPERATION,
        }))
    }
}

exports.removeShoppingCartRow = async (req, res) => {
    const rowId = req.params.id

    console.log('--------------------------start------------------')
    console.log('rowId')
    console.log(rowId)
    console.log('--------------------------end------------------')

    await deleteRow(rowId)

    res.send(new ResObj({
        text: msgs.SUCCESS_OPERATION,
    }))
}