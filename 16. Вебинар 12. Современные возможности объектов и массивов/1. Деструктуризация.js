/**
 * ДЕСТРУКТУРИЗАЦИЯ в JavaScript
 *
 * Деструктуризация - это синтаксис, который позволяет извлекать данные из массивов или объектов
 * и присваивать их переменным в более компактной форме.
 *
 * Основные возможности:
 * - Деструктуризация массивов
 * - Деструктуризация объектов
 * - Значения по умолчанию
 * - Вложенная деструктуризация
 * - Обмен переменных
 */

// ДЕСТРУКТУРИЗАЦИЯ МАССИВОВ
const numbers = [1, 2, 3, 4, 5];

// Базовая деструктуризация
const [first, second, third] = numbers;
console.log('Базовая деструктуризация:', first, second, third); // 1 2 3

// Пропуск элементов
const [firstElem, , thirdElem] = numbers;
console.log('Пропуск элементов:', firstElem, thirdElem); // 1 3

// Деструктуризация с rest оператором
const [head, ...tail] = numbers;
console.log('Rest оператор:', head, tail); // 1 [2, 3, 4, 5]

// Значения по умолчанию
const [a = 10, b = 20, c = 30] = [1, 2];
console.log('Значения по умолчанию:', a, b, c); // 1 2 30

// Обмен переменных
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log('Обмен переменных:', x, y); // 2 1

// ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТОВ
const person = {
    name: 'Alice',
    age: 30,
    city: 'Paris',
    country: 'France'
};

// Базовая деструктуризация объектов
const { name, age } = person;
console.log('Деструктуризация объектов:', name, age); // Alice 30

// Переименование переменных
const { name: personName, city: residence } = person;
console.log('Переименование:', personName, residence); // Alice Paris

// Значения по умолчанию для объектов
const { name: userName, phone = 'не указан' } = person;
console.log('Значения по умолчанию:', userName, phone); // Alice не указан

// ВЛОЖЕННАЯ ДЕСТРУКТУРИЗАЦИЯ
const user = {
    id: 1,
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        contacts: {
            email: 'john@example.com',
            phone: '123-456'
        }
    }
};

// Вложенная деструктуризация объектов
const { profile: { firstName, contacts: { email } } } = user;
console.log('Вложенная деструктуризация:', firstName, email); // John john@example.com

// Деструктуризация в параметрах функции
function printUser({ name, age }) {
    console.log(`Пользователь: ${name}, возраст: ${age}`);
}
printUser(person); // Пользователь: Alice, возраст: 30