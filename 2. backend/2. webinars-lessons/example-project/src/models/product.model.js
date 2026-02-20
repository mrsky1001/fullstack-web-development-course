class ProductModel {
    // name: string
    // price: number
    // description: string
    // image: string
    // category: string
    // stock: number
    id = 0
    name = ""
    price = 0
    description = ""
    image = ""
    category = ""
    stock = 0

    //'lg monitor', 1000, 'lg monitor 22 inch', 'null', 'monitors', '10'
    // constructor(name, price, description, image, category, stock) {
    //
    //     if (image === undefined || image === null) {
    //         this.image = 'images/default.jpg'
    //     }
    //
    //     this.name = name
    //     this.price = price
    //     this.description = description
    //     this.image = image
    //     this.category = category
    //     this.stock = stock
    // }
    constructor(obj) {

        if (obj.img === undefined || obj.img === null) {
            this.image = 'images/default.jpg'
        } else {
            this.image = obj.img
        }

        this.id = obj.id
        this.name = obj.name
        this.price = obj.price
        this.description = obj.description
        this.category = obj.category
        this.stock = obj.stock
    }

    //
    // details() {
    //     return "Details: " + this.name + " " + this.price
    // }
}

module.exports = ProductModel
// //
// // const customProduct1 = {
// //     name: "lg monitor",
// //     price: 0,
// //     description: "lg monitor 22 inch",
// //     image: null,
// //     category: "monitors",
// //     stock: 0,
// //     details: function () {
// //         return "Details: " + this.name + " " + this.price
// //     }
// // }
// //
// // const customProduct2 = {
// //     name: "keyboard lg",
// //     price: 0,
// //     description: "lg monitor 22 inch",
// //     image: null,
// //     category: "monitors",
// //     stock: 0,
// //     details: function () {
// //         return "Details: " + this.name + " " + this.price
// //     }
// // }
// //
// //
// // console.log(product.name, product.price)
// //
// // const product1 = new Product('lg monitor', 1000, 'lg monitor 22 inch', 'null', 'monitors', '10')
// const product2 = new Product('dell keyboard', 100, 'dell keyboard', 'null', 'keyboards', '110')

// console.log(product1.details(), product2.details())


