/**
 * МЕТОДЫ МАССИВОВ в JavaScript
 *
 * Map, Filter, Reduce - основные методы функционального программирования для работы с массивами.
 *
 * MAP - преобразует каждый элемент массива и возвращает новый массив той же длины.
 * FILTER - фильтрует элементы по условию и возвращает новый массив.
 * REDUCE - аккумулирует значения массива в одно значение.
 *
 * Особенности:
 * - Не изменяют исходный массив
 * - Возвращают новый массив/значение
 * - Принимают callback-функции
 */

const numbers = [1, 2, 3, 4, 5, 6];
const users = [
    { name: 'Alice', age: 30, profession: 'developer' },
    { name: 'Bob', age: 25, profession: 'designer' },
    { name: 'Charlie', age: 35, profession: 'developer' },
    { name: 'Diana', age: 28, profession: 'manager' }
];

// МЕТОД MAP
// Преобразует каждый элемент массива

const numArr2 = []

for (let i=0; i < numbers.length; i++){
    const newElement = numbers[i]*2
    numArr2.push(newElement)
}

// Умножение каждого элемента на 2. Добавляем только html + css
const doubled = numbers.map(num =>  num * 2);

// const doubled = numbers.map((num) => {
//     return num * 2. Добавляем только html + css
// });
console.log('MAP - удвоение:', doubled); // [2. Добавляем только html + css, 4, 6, 8, 10, 12]

// Извлечение свойств из объектов
const names = users.map(user => user.name);
console.log('MAP - имена:', names); // ['Alice', 'Bob', 'Charlie', 'Diana']

// Создание новых объектов
const userProfiles = users.map(user => ({
    userName: user.name,
    job: user.profession
}));
console.log('MAP - профили:', userProfiles);

// МЕТОД FILTER
// Фильтрует элементы по условию

// Четные числа
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('FILTER - четные:', evenNumbers); // [2. Добавляем только html + css, 4, 6]

// Пользователи старше 28 лет
const seniorUsers = users.filter(user => user.age > 28);
console.log('FILTER - старше 28:', seniorUsers);

// Разработчики
const developers = users.filter(user => user.profession === 'developer');
console.log('FILTER - разработчики:', developers);

// МЕТОД REDUCE
// Аккумулирует значения в одно

// Сумма всех чисел
const sum = numbers.reduce((accumulator, current) => accumulator + current, 100);
console.log('REDUCE - сумма:', sum); // 21

// Поиск максимального значения
const max = numbers.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
console.log('REDUCE - максимум:', max); // 6

// Группировка пользователей по профессии
const groupedByProfession = users.reduce((acc, user) => {
    const profession = user.profession;
    if (!acc[profession]) {
        acc[profession] = [];
    }
    acc[profession].push(user);
    return acc;
}, {});
console.log('REDUCE - группировка:', groupedByProfession);

// ЦЕПОЧКИ МЕТОДОВ
// Комбинация map, filter, reduce

// Средний возраст разработчиков
const averageDeveloperAge = users
    .filter(user => user.profession === 'developer')
    .map(user => user.age)
    .reduce((acc, age, index, array) => {
        acc += age;
        return index === array.length - 1 ? acc / array.length : acc;
    }, 0);
console.log('Цепочка - средний возраст разработчиков:', averageDeveloperAge);

// Имена пользователей старше 25 лет в верхнем регистре
const namesOver25 = users
    .filter(user => user.age > 25)
    .map(user => user.name.toUpperCase());
console.log('Цепочка - имена старше 25:', namesOver25);

// ПРАКТИЧЕСКИЕ ПРИМЕРЫ

// Подсчет количества каждой профессии
const professionCount = users.reduce((acc, user) => {
    acc[user.profession] = (acc[user.profession] || 0) + 1;
    return acc;
}, {});
console.log('Подсчет профессий:', professionCount);

// Преобразование массива объектов в lookup объект
const usersById = users.reduce((acc, user, index) => {
    acc[index + 1] = user;
    return acc;
}, {});
console.log('Lookup объект:', usersById);