/**
 * ================================================
 * УРОК 11: МАССИВЫ И ОБЪЕКТЫ
 * ================================================
 */

// ================================================
// РАЗДЕЛ 1: СОЗДАНИЕ МАССИВОВ
// ================================================

// Литерал массива
const fruits = ['яблоко', 'банан', 'апельсин'];

// Конструктор (не рекомендуется)
const numbers = new Array(1, 2, 3, 4, 5);

console.log(fruits);
console.log(numbers);

// ================================================
// РАЗДЕЛ 2: МЕТОДЫ МАССИВОВ
// ================================================

// Добавление/удаление
const items = [1, 2, 3];

items.push(4);       // Добавить в конец: [1, 2, 3, 4]
items.pop();         // Удалить с конца: [1, 2, 3]
items.unshift(0);    // Добавить в начало: [0, 1, 2, 3]
items.shift();       // Удалить с начала: [1, 2, 3]

console.log(items);

// Поиск
const nums = [10, 20, 30, 40, 50];

console.log(nums.indexOf(30));      // 2 (индекс элемента)
console.log(nums.includes(30));     // true (есть ли элемент)
console.log(nums.find(n => n > 25)); // 30 (первый подходящий)
console.log(nums.findIndex(n => n > 25)); // 2 (индекс первого подходящего)

// Трансформация
const prices = [100, 200, 300];

// map — создаёт новый массив с преобразованными элементами
const withTax = prices.map(price => price * 1.2);
console.log(withTax); // [120, 240, 360]

// filter — создаёт новый массив с отфильтрованными элементами
const expensive = prices.filter(price => price > 150);
console.log(expensive); // [200, 300]

// reduce — сворачивает массив в одно значение
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 600

// ================================================
// РАЗДЕЛ 3: ОБЪЕКТЫ
// ================================================

// Создание объекта
const user = {
    name: 'Иван',
    age: 25,
    email: 'ivan@example.com',
    isActive: true,

    // Метод объекта
    greet() {
        return `Привет, я ${this.name}!`;
    }
};

// Доступ к свойствам
console.log(user.name);          // 'Иван'
console.log(user['age']);        // 25
console.log(user.greet());       // 'Привет, я Иван!'

// Изменение
user.age = 26;
user.city = 'Москва';

// Удаление
delete user.isActive;

console.log(user);

// ================================================
// РАЗДЕЛ 4: ДЕСТРУКТУРИЗАЦИЯ
// ================================================

// Деструктуризация массива
const colors = ['красный', 'зелёный', 'синий'];
const [first, second, third] = colors;
console.log(first);  // 'красный'
console.log(second); // 'зелёный'

// Пропуск элементов
const [, , blue] = colors;
console.log(blue); // 'синий'

// Деструктуризация объекта
const person = { name: 'Мария', age: 30, city: 'Казань' };
const { name, age, city } = person;
console.log(name, age, city);

// С переименованием
const { name: personName } = person;
console.log(personName); // 'Мария'

// Значение по умолчанию
const { country = 'Россия' } = person;
console.log(country); // 'Россия'

// ================================================
// РАЗДЕЛ 5: SPREAD И REST
// ================================================

// Spread — развернуть массив/объект
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Копирование объекта
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };
console.log(copy); // { a: 1, b: 2, c: 3 }

// ================================================
// РАЗДЕЛ 6: ПРАКТИЧЕСКИЙ ПРИМЕР
// ================================================

const products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Книга', price: 500, category: 'books' },
    { id: 3, name: 'Телефон', price: 30000, category: 'electronics' },
    { id: 4, name: 'Журнал', price: 200, category: 'books' }
];

// Найти все товары электроники
const electronics = products.filter(p => p.category === 'electronics');
console.log('Электроника:', electronics);

// Получить только названия
const productNames = products.map(p => p.name);
console.log('Названия:', productNames);

// Посчитать общую стоимость
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
console.log('Общая стоимость:', totalPrice);

// Цепочка методов
const expensiveElectronics = products
    .filter(p => p.category === 'electronics')
    .filter(p => p.price > 40000)
    .map(p => p.name);
console.log('Дорогая электроника:', expensiveElectronics);
