/**
 * ================================================
 * УРОК 09: ОПЕРАТОРЫ JAVASCRIPT
 * ================================================
 */

// ================================================
// АРИФМЕТИЧЕСКИЕ ОПЕРАТОРЫ
// ================================================

console.log('--- АРИФМЕТИЧЕСКИЕ ОПЕРАТОРЫ ---');

const a = 10;
const b = 3;

console.log('a =', a, 'b =', b);
console.log('a + b =', a + b);   // 13 (сложение)
console.log('a - b =', a - b);   // 7  (вычитание)
console.log('a * b =', a * b);   // 30 (умножение)
console.log('a / b =', a / b);   // 3.333... (деление)
console.log('a % b =', a % b);   // 1  (остаток от деления)
console.log('a ** b =', a ** b); // 1000 (возведение в степень)

// Инкремент и декремент
let count = 5;
console.log('\n--- ИНКРЕМЕНТ/ДЕКРЕМЕНТ ---');
console.log('count =', count);
console.log('++count =', ++count); // 6 (сначала увеличить, потом вернуть)
console.log('count++ =', count++); // 6 (сначала вернуть, потом увеличить)
console.log('count =', count);     // 7
console.log('--count =', --count); // 6

// ================================================
// ОПЕРАТОРЫ СРАВНЕНИЯ
// ================================================

console.log('\n--- ОПЕРАТОРЫ СРАВНЕНИЯ ---');

console.log('5 > 3:', 5 > 3);     // true
console.log('5 < 3:', 5 < 3);     // false
console.log('5 >= 5:', 5 >= 5);   // true
console.log('5 <= 4:', 5 <= 4);   // false

// Равенство
console.log('\n--- РАВЕНСТВО ---');
console.log('5 == "5":', 5 == '5');   // true (нестрогое, с преобразованием)
console.log('5 === "5":', 5 === '5'); // false (строгое, без преобразования)
console.log('5 != "5":', 5 != '5');   // false
console.log('5 !== "5":', 5 !== '5'); // true

// ВАЖНО: Всегда используйте === и !== !

// ================================================
// ЛОГИЧЕСКИЕ ОПЕРАТОРЫ
// ================================================

console.log('\n--- ЛОГИЧЕСКИЕ ОПЕРАТОРЫ ---');

const x = true;
const y = false;

console.log('x && y:', x && y);  // false (И — оба должны быть true)
console.log('x || y:', x || y);  // true  (ИЛИ — хотя бы один true)
console.log('!x:', !x);          // false (НЕ — инверсия)

// Практические примеры
const age = 25;
const hasLicense = true;

console.log('\n--- ПРАКТИЧЕСКИЙ ПРИМЕР ---');
console.log('Может водить:', age >= 18 && hasLicense); // true

// Короткое замыкание
console.log('\n--- КОРОТКОЕ ЗАМЫКАНИЕ ---');

const user = null;
const userName = user || 'Гость';
console.log('userName:', userName); // "Гость"

const settings = { theme: 'dark' };
const theme = settings && settings.theme;
console.log('theme:', theme); // "dark"

// Оператор ?? (nullish coalescing)
const value = 0;
console.log('value || 10:', value || 10);   // 10 (0 — falsy)
console.log('value ?? 10:', value ?? 10);   // 0  (0 — не null/undefined)

// ================================================
// ОПЕРАТОРЫ ПРИСВАИВАНИЯ
// ================================================

console.log('\n--- ОПЕРАТОРЫ ПРИСВАИВАНИЯ ---');

let num = 10;
console.log('num =', num);

num += 5;  // num = num + 5
console.log('num += 5:', num);  // 15

num -= 3;  // num = num - 3
console.log('num -= 3:', num);  // 12

num *= 2;  // num = num * 2
console.log('num *= 2:', num);  // 24

num /= 4;  // num = num / 4
console.log('num /= 4:', num);  // 6

num %= 4;  // num = num % 4
console.log('num %= 4:', num);  // 2

// ================================================
// ТЕРНАРНЫЙ ОПЕРАТОР
// ================================================

console.log('\n--- ТЕРНАРНЫЙ ОПЕРАТОР ---');

const userAge = 20;
const status = userAge >= 18 ? 'Взрослый' : 'Несовершеннолетний';
console.log('Статус:', status);  // "Взрослый"

// Вложенный тернарный (не рекомендуется для читаемости)
const score = 85;
const grade = score >= 90 ? 'A'
    : score >= 80 ? 'B'
        : score >= 70 ? 'C'
            : 'D';
console.log('Оценка:', grade);  // "B"
