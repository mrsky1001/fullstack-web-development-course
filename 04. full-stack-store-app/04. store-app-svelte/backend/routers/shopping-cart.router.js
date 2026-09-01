const express = require("express")
const shoppingCartController = require("../controllers/shopping-cart.controller")
const shoppingCartRouter = express.Router()

// localhost:3000/shoppingCart/all
shoppingCartRouter.get("/all", shoppingCartController.getAllProducts)
shoppingCartRouter.post("/add", shoppingCartController.addShoppingCartRow)
shoppingCartRouter.put("/change", shoppingCartController.changeQuantityShoppingCartRow)
shoppingCartRouter.delete("/remove/:id", shoppingCartController.removeShoppingCartRow)


module.exports = shoppingCartRouter