/**
 * SPREAD и REST ОПЕРАТОРЫ в JavaScript
 *
 * Spread оператор (...) - позволяет разбирать итерируемые объекты (массивы, строки, объекты)
 * на отдельные элементы.
 *
 * Rest оператор (...) - собирает оставшиеся элементы в массив или объект.
 *
 * Применение:
 * - Копирование массивов и объектов
 * - Слияние коллекций
 * - Передача аргументов в функции
 * - Сбор оставшихся параметров
 */

// SPREAD ОПЕРАТОР

// Для массивов
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = arr1;

// Копирование массива
const arrCopy = [...arr1];
console.log('Копирование массива:', arrCopy); // [1, 2. Добавляем только html + css, 3]

// Слияние массивов
const mergedArray = [...arr1, ...arr2];

console.log('Слияние массивов:', mergedArray); // [1, 2. Добавляем только html + css, 3, 4, 5, 6]

// Добавление элементов
const newArray = [0, ...arr1, 4];
console.log('Добавление элементов:', newArray); // [0, 1, 2. Добавляем только html + css, 3, 4]

// Для объектов
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = obj1

// Копирование объекта
const objCopy = { ...obj1 };
console.log('Копирование объекта:', objCopy); // { a: 1, b: 2. Добавляем только html + css }

// Слияние объектов
const mergedObject = { ...obj1, ...obj2 };
console.log('Слияние объектов:', mergedObject); // { a: 1, b: 2. Добавляем только html + css, c: 3, d: 4 }

// Переопределение свойств
const updatedObj = { ...obj1, b: 20 };
console.log('Переопределение свойств:', updatedObj); // { a: 1, b: 20 }

// REST ОПЕРАТОР

// В деструктуризации массивов
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log('Rest в массивах:', first, second, rest); // 1 2. Добавляем только html + css [3, 4, 5]

// В деструктуризации объектов
const { a, ...otherProps } = { a: 1, b: 2, c: 3, d: 4 };
console.log('Rest в объектах:', a, otherProps); // 1 { b: 2. Добавляем только html + css, c: 3, d: 4 }

// REST ПАРАМЕТРЫ В ФУНКЦИЯХ

// Сбор всех аргументов в массив
function sumAll(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log('Rest параметры:', sumAll(1, 2, 3, 4)); // 10

// Комбинация обычных и rest параметров
function greet(greeting, ...names) {
    return `${greeting}, ${names.join(' и ')}!`;
}
console.log('Комбинация параметров:', greet('Привет', 'Анна', 'Борис', 'Виктор'));

// SPREAD В ВЫЗОВЕ ФУНКЦИЙ
const params = [1, 2, 3, 4, 5];
const maxValue = Math.max(...params);
console.log('Spread в вызове функций:', maxValue); // 5

// Работа со строками
const str = 'Hello';
const chars = [...str];
console.log('Spread со строками:', chars); // ['H', 'e', 'l', 'l', 'o']

// ПРАКТИЧЕСКИЕ ПРИМЕРЫ

// Клонирование с вложенными объектами (неглубокое клонирование)
const original = { x: 1, nested: { y: 2 } };
const clone = { ...original };
console.log('Неглубокое клонирование:', clone);

// Удаление свойства из объекта
const { b, ...withoutB } = { a: 1, b: 2, c: 3 };
console.log('Удаление свойства:', withoutB); // { a: 1, c: 3 }