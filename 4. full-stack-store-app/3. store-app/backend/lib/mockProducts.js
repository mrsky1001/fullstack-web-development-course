/**
 * MOCK DATA: Products (Тестовые товары)
 * 
 * Этот файл содержит массив с товарами, который используется,
 * если база данных недоступна или отключена.
 * 
 * Это позволяет запускать проект сразу после скачивания,
 * даже без установки и настройки MySQL.
 */

const mockProducts = [
    {
        id: 1,
        name: 'Intel Core i9-13900K',
        price: 55990,
        category: 'Процессоры',
        quantity: 15,
        img: null // null означает, что будет показана заглушка
    },
    {
        id: 2,
        name: 'AMD Ryzen 9 7950X',
        price: 62990,
        category: 'Процессоры',
        quantity: 12,
        img: null
    },
    {
        id: 3,
        name: 'NVIDIA GeForce RTX 4090',
        price: 159990,
        category: 'Видеокарты',
        quantity: 8,
        img: null
    },
    {
        id: 4,
        name: 'AMD Radeon RX 7900 XTX',
        price: 89990,
        category: 'Видеокарты',
        quantity: 10,
        img: null
    },
    {
        id: 5,
        name: 'ASUS ROG STRIX Z790-E',
        price: 42990,
        category: 'Материнские платы',
        quantity: 20,
        img: null
    },
    {
        id: 6,
        name: 'MSI MAG B650 TOMAHAWK',
        price: 28990,
        category: 'Материнские платы',
        quantity: 18,
        img: null
    },
    {
        id: 7,
        name: 'Corsair Vengeance DDR5 32GB',
        price: 15990,
        category: 'Оперативная память',
        quantity: 30,
        img: null
    },
    {
        id: 8,
        name: 'G.Skill Trident Z5 RGB 64GB',
        price: 29990,
        category: 'Оперативная память',
        quantity: 15,
        img: null
    },
    {
        id: 9,
        name: 'Samsung 990 PRO 2TB NVMe',
        price: 18990,
        category: 'Накопители',
        quantity: 25,
        img: null
    },
    {
        id: 10,
        name: 'WD Black SN850X 1TB',
        price: 12990,
        category: 'Накопители',
        quantity: 22,
        img: null
    },
    {
        id: 11,
        name: 'Corsair RM1000x 1000W',
        price: 19990,
        category: 'Блоки питания',
        quantity: 14,
        img: null
    },
    {
        id: 12,
        name: 'Be Quiet! Dark Power 13 850W',
        price: 16990,
        category: 'Блоки питания',
        quantity: 16,
        img: null
    }
];

module.exports = mockProducts;
