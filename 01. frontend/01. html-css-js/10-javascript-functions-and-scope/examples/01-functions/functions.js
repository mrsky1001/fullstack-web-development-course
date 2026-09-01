/**
 * ================================================
 * УРОК 10: ФУНКЦИИ JAVASCRIPT
 * ================================================
 * 
 * Примеры различных способов создания и использования функций.
 */

// ================================================
// РАЗДЕЛ 1: ОБЪЯВЛЕНИЕ ФУНКЦИЙ
// ================================================

// Function Declaration
// Функция поднимается (hoisting) — можно вызвать до объявления
function greet(name) {
    return `Привет, ${name}!`;
}

console.log(greet('Иван')); // "Привет, Иван!"

// Function Expression
// НЕ поднимается — нельзя вызвать до объявления
const sayHello = function (name) {
    return `Здравствуйте, ${name}!`;
};

console.log(sayHello('Мария')); // "Здравствуйте, Мария!"

// ================================================
// РАЗДЕЛ 2: СТРЕЛОЧНЫЕ ФУНКЦИИ
// ================================================

// Полная форма
const add = (a, b) => {
    return a + b;
};

// Сокращённая (если одно выражение — return не нужен)
const multiply = (a, b) => a * b;

// Один параметр — скобки не нужны
const double = x => x * 2;

// Без параметров — пустые скобки обязательны
const getRandomNumber = () => Math.random();

console.log(add(5, 3));         // 8
console.log(multiply(4, 2));    // 8
console.log(double(10));        // 20
console.log(getRandomNumber()); // 0.xxx

// ================================================
// РАЗДЕЛ 3: ПАРАМЕТРЫ ПО УМОЛЧАНИЮ
// ================================================

function greetUser(name = 'Гость', greeting = 'Привет') {
    return `${greeting}, ${name}!`;
}

console.log(greetUser());               // "Привет, Гость!"
console.log(greetUser('Иван'));         // "Привет, Иван!"
console.log(greetUser('Иван', 'Здравствуй')); // "Здравствуй, Иван!"

// ================================================
// РАЗДЕЛ 4: REST-ПАРАМЕТРЫ
// ================================================

// ...numbers собирает все аргументы в массив
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Комбинация обычных и rest-параметров
function introduce(greeting, ...names) {
    return `${greeting}, ${names.join(' и ')}!`;
}

console.log(introduce('Привет', 'Иван', 'Мария', 'Пётр'));
// "Привет, Иван и Мария и Пётр!"

// ================================================
// РАЗДЕЛ 5: CALLBACK-ФУНКЦИИ
// ================================================

// Функция, которая принимает другую функцию как аргумент
function processNumber(num, callback) {
    return callback(num);
}

console.log(processNumber(5, double));      // 10
console.log(processNumber(5, x => x * x));  // 25

// Практический пример с массивом
const numbers = [1, 2, 3, 4, 5];

// forEach — выполнить для каждого
numbers.forEach(num => console.log(num));

// map — преобразовать каждый элемент
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter — отфильтровать
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// ================================================
// РАЗДЕЛ 6: ОБЛАСТЬ ВИДИМОСТИ (SCOPE)
// ================================================

const globalVar = 'Я глобальная';

function outer() {
    const outerVar = 'Я из outer';

    function inner() {
        const innerVar = 'Я из inner';

        // inner видит все переменные
        console.log(globalVar); // OK
        console.log(outerVar);  // OK
        console.log(innerVar);  // OK
    }

    inner();

    // outer НЕ видит innerVar
    // console.log(innerVar); // ReferenceError
}

outer();

// ================================================
// РАЗДЕЛ 7: ЗАМЫКАНИЯ (CLOSURES)
// ================================================

function createCounter() {
    let count = 0; // Приватная переменная

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getValue() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getValue());  // 1
// count недоступен извне!

// ================================================
// ИТОГ
// ================================================

console.log('\n--- Итог ---');
console.log('Функции — основа JavaScript!');
console.log('Используйте стрелочные функции для краткости.');
console.log('Помните про область видимости и замыкания.');
