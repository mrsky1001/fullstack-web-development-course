const express = require("express")
const productController = require("../controllers/product.controller")
const productRouter = express.Router()

// localhost:3000/products/all
productRouter.get("/all", productController.getAllProducts)
productRouter.get("/:id", productController.getProduct)


module.exports = productRouter