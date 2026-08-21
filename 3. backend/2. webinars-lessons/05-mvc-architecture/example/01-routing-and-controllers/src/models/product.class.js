/**
 * ====================================================================
 * MODEL: Product (Товар)
 * ====================================================================
 */

class Product {
    constructor(obj) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.price = obj.price;
            this.category = obj.category;
            this.img = obj.img;
            this.isExistInShoppingCart = obj.isExistInShoppingCart ?? false;
        }
    }
}
//
// const monitorDell = new Product({
//     id: 1,
//     name: 'Монитор DELL U2419H',
//     price: 15000,
//     category: 'Мониторы',
//     img: 'https://www.dell.ru/content/dam/uk/products/monitors/u2419h/monitor-u2419h-black-pdp-pic-1000x1000.png',
// })

module.exports = Product;
