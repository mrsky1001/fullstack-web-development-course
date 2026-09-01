
const ProductModel = require('../models/product.model')
const products = require('../lib/test-data.products')

exports.getAllProducts = (req, res) => {
    // Формируем стандартизированный ответ
    // В будущем мы создадим класс ResObj для этого
    const rawData = products

    // 1
    // const productsForResponse = []

    // for (let i = 0; i < rawData.length; i++) {
    //     const rawProduct = rawData[i]
    //     // const product = new ProductModel(rawProduct.name, rawProduct.price, rawProduct.description)
    //     const product = new ProductModel(rawProduct)
    //     productsForResponse.push(product)
    // }

    // 2
    const productsForResponse = rawData.map((rawProduct)=> new ProductModel(rawProduct))

    const dataForResponse = {
        status: 'success',
        message: 'Список товаров успешно отправлен!',
        data: productsForResponse,
    }

    res.json(dataForResponse);
}