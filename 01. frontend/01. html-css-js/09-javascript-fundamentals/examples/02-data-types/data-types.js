/**
 * ================================================
 * УРОК 09: ТИПЫ ДАННЫХ JAVASCRIPT
 * ================================================
 */

// ================================================
// ПРИМИТИВНЫЕ ТИПЫ ДАННЫХ
// ================================================

// 1. STRING — Строки
const name = 'Иван';
const greeting = "Привет, мир!";
const template = `Привет, ${name}!`;  // Шаблонная строка

console.log('--- STRING ---');
console.log(name);
console.log(template);
console.log(typeof name);  // "string"

// 2. NUMBER — Числа
const integer = 42;
const float = 3.14;
const negative = -100;
const infinity = Infinity;
const notANumber = NaN;

console.log('\n--- NUMBER ---');
console.log(integer, float, negative);
console.log(typeof integer);  // "number"
console.log(0.1 + 0.2);       // 0.30000000000000004 (особенность!)

// 3. BOOLEAN — Логический тип
const isActive = true;
const isCompleted = false;

console.log('\n--- BOOLEAN ---');
console.log(isActive);
console.log(typeof isActive);  // "boolean"

// 4. UNDEFINED — Неопределённое значение
let notDefined;

console.log('\n--- UNDEFINED ---');
console.log(notDefined);       // undefined
console.log(typeof notDefined); // "undefined"

// 5. NULL — Пустое значение (намеренно пустое)
const empty = null;

console.log('\n--- NULL ---');
console.log(empty);           // null
console.log(typeof empty);    // "object" (ошибка языка!)

// 6. SYMBOL — Уникальный идентификатор (ES6)
const id = Symbol('id');
const id2 = Symbol('id');

console.log('\n--- SYMBOL ---');
console.log(id === id2);      // false (всегда уникальны)

// 7. BIGINT — Большие целые числа (ES2020)
const bigNumber = 9007199254740991n;

console.log('\n--- BIGINT ---');
console.log(bigNumber);
console.log(typeof bigNumber); // "bigint"

// ================================================
// ПРЕОБРАЗОВАНИЕ ТИПОВ
// ================================================

console.log('\n--- ПРЕОБРАЗОВАНИЕ ТИПОВ ---');

// В строку
console.log(String(123));       // "123"
console.log(String(true));      // "true"
console.log((123).toString());  // "123"

// В число
console.log(Number('42'));      // 42
console.log(Number('abc'));     // NaN
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(parseInt('42px'));  // 42
console.log(parseFloat('3.14')); // 3.14

// В булево
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean(''));       // false
console.log(Boolean('hello'));  // true

// ================================================
// TRUTHY И FALSY
// ================================================

console.log('\n--- FALSY VALUES ---');

// Falsy (ложные) значения:
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(-0));        // false
console.log(Boolean(''));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Всё остальное — truthy (истинное)!
console.log('\n--- TRUTHY VALUES ---');
console.log(Boolean('0'));       // true (строка, не пустая!)
console.log(Boolean([]));        // true (массив)
console.log(Boolean({}));        // true (объект)
console.log(Boolean(-1));        // true (ненулевое число)
