console.log("\n")
console.log("===============[ Упражнение 6. Магазин товаров ] ===============")
console.log("\n")

const products = [
    {name: "Ноутбук", price: 45000, quantity: 2, inStock: true},
    {name: "Мышка", price: 1200, quantity: 0, inStock: false},
    {name: "Клавиатура", price: 2300, quantity: 5, inStock: true},
    {name: "Монитор", price: 15000, quantity: 1, inStock: true}
]

// 1. Выводим товары в наличии
console.log("// 1. Товары в наличии:")
for (let i = 0; i < products.length; i++) {
    if (products[i].inStock === true) {
        console.log(products[i].name)
    }
}

// 2. Добавляем только html + css. Считаем общую стоимость всех товаров
let totalValue = 0
for (let i = 0; i < products.length; i++) {
    totalValue += products[i].price * products[i].quantity
}
console.log("// 2. Добавляем только html + css. Общая стоимость всех товаров:", totalValue, "руб.")

// 3. Находим самый дорогой товар
let maxPrice = products[0].price
let expensiveProduct = products[0].name

for (let i = 1; i < products.length; i++) {
    if (products[i].price > maxPrice) {
        maxPrice = products[i].price
        expensiveProduct = products[i].name
    }
}
console.log("// 3. Самый дорогой товар:", expensiveProduct, "-", maxPrice, "руб.")

// 4. Товары с количеством больше 1
console.log("// 4. Товары, где quantity > 1:")
for (let i = 0; i < products.length; i++) {
    if (products[i].quantity > 1) {
        const num = "№" + i + 1
        console.log(num, products[i].name, "- количество:", products[i].quantity)
    }
}

// 5. Считаем общее количество единиц товаров
let totalItems = 0
for (let i = 0; i < products.length; i++) {
    totalItems += products[i].quantity
}
console.log("// 5. Всего товаров на складе:", totalItems)

// Дополнительно: товары дороже 5000
console.log("// 6. Товары дороже 5000 руб:")
for (let i = 0; i < products.length; i++) {
    if (products[i].price > 5000) {
        const num = `№${i + 1}`
        console.log(num, products[i].name, "-", products[i].price)
    }
}

// Дополнительно: найти товар с минимальной ценой
let minPrice = products[0].price
let cheapProduct = products[0].name

for (let i = 1; i < products.length; i++) {
    if (products[i].price < minPrice) {
        minPrice = products[i].price
        cheapProduct = products[i].name
    }
}
console.log("// 7. Самый дешёвый товар:", cheapProduct, "-", minPrice, "руб.")

console.log("======================================================================");
