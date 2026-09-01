# Урок 09: Основы JavaScript

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Объяснить, что такое **JavaScript** и где он выполняется
- Использовать **переменные** (let, const, var)
- Работать с **типами данных**
- Применять **операторы** (арифметические, сравнения, логические)
- Использовать **условные конструкции** (if, switch)
- Создавать **циклы** (for, while)
- Отлаживать код с помощью **консоли**

---

## 📚 Теоретическая часть

### Что такое JavaScript?

**JavaScript (JS)** — это высокоуровневый, интерпретируемый язык программирования, созданный для добавления интерактивности веб-страницам.

| Характеристика | Описание |
|----------------|----------|
| **Тип** | Динамически типизированный |
| **Парадигмы** | Объектно-ориентированный, функциональный |
| **Среда выполнения** | Браузер, Node.js |
| **Создатель** | Брендан Айк (Brendan Eich), 1995 |

### Где работает JavaScript?

| Среда | Описание | Применение |
|-------|----------|------------|
| **Браузер** | Встроенный движок JS | Интерактивные веб-страницы |
| **Node.js** | Серверная платформа | Бэкенд, CLI-инструменты |
| **Electron** | Десктоп-приложения | VS Code, Discord |
| **React Native** | Мобильные приложения | iOS, Android |

### Подключение JavaScript к HTML

```html
<!-- Способ 1: Внешний файл (рекомендуется) -->
<script src="js/script.js"></script>

<!-- Способ 2: Встроенный скрипт -->
<script>
    console.log('Привет, мир!');
</script>

<!-- Атрибуты для внешних скриптов -->
<script src="script.js" defer></script>  <!-- Загрузка параллельно, выполнение после DOM -->
<script src="script.js" async></script>  <!-- Загрузка и выполнение параллельно -->
```

> **Рекомендация:** Размещайте `<script>` перед `</body>` или используйте `defer`.

---

## 🔧 Консоль разработчика

### Вывод в консоль

```javascript
// Обычное сообщение
console.log('Привет, мир!');

// Предупреждение
console.warn('Это предупреждение');

// Ошибка
console.error('Это ошибка');

// Информация
console.info('Информационное сообщение');

// Таблица (для массивов и объектов)
console.table([{name: 'Иван', age: 25}, {name: 'Мария', age: 30}]);

// Группировка сообщений
console.group('Группа');
console.log('Сообщение 1');
console.log('Сообщение 2');
console.groupEnd();

// Очистка консоли
console.clear();
```

---

## 📦 Переменные

### Объявление переменных

JavaScript имеет три способа объявления переменных:

```javascript
// const — константа (нельзя переприсвоить)
const PI = 3.14159;
const name = 'Иван';

// let — переменная (можно переприсвоить)
let age = 25;
age = 26;  // OK

// var — устаревший способ (избегайте)
var oldVariable = 'устарело';
```

### Правила именования

```javascript
// Допустимые имена
let userName;
let user_name;
let _private;
let $element;
let camelCaseNaming;  // рекомендуется

// Недопустимые имена
// let 123name;     // нельзя начинать с цифры
// let my-variable; // нельзя дефис
// let let;         // нельзя зарезервированные слова
```

### Const vs Let

| Характеристика | const | let |
|----------------|-------|-----|
| Переприсваивание | ❌ Нельзя | ✅ Можно |
| Область видимости | Блочная | Блочная |
| Hoisting | ❌ Temporal Dead Zone | ❌ Temporal Dead Zone |

```javascript
const name = 'Иван';
// name = 'Пётр';  // Ошибка!

let age = 25;
age = 26;  // OK

// НО: const для объектов разрешает изменять свойства
const user = { name: 'Иван' };
user.name = 'Пётр';  // OK, объект тот же
// user = {};       // Ошибка! Нельзя присвоить новый объект
```

---

## 🏷 Типы данных

### Примитивные типы

```javascript
// String — строка
let greeting = 'Привет';
let message = "Мир";
let template = `Шаблон: ${greeting}`;  // Шаблонная строка

// Number — число (целое и дробное)
let integer = 42;
let float = 3.14;
let negative = -100;
let infinity = Infinity;
let notANumber = NaN;

// Boolean — логический тип
let isActive = true;
let isDeleted = false;

// Null — намеренное отсутствие значения
let emptyValue = null;

// Undefined — переменная объявлена, но не инициализирована
let notDefined;  // undefined
let explicit = undefined;

// BigInt — большие целые числа (ES2020)
let bigNumber = 9007199254740991n;

// Symbol — уникальный идентификатор (ES6)
let sym = Symbol('description');
```

### Проверка типа

```javascript
console.log(typeof 'hello');     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (исторический баг!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

### Преобразование типов

```javascript
// В строку
String(123);      // "123"
(123).toString(); // "123"
'' + 123;         // "123"

// В число
Number('123');    // 123
parseInt('123px'); // 123
parseFloat('3.14'); // 3.14
+'123';           // 123 (унарный плюс)

// В булево
Boolean(1);       // true
Boolean(0);       // false
Boolean('');      // false
Boolean('text');  // true
!!value;          // Двойное отрицание
```

### Falsy и Truthy значения

```javascript
// Falsy (приводятся к false)
false
0
-0
''
null
undefined
NaN

// Truthy (всё остальное)
true
1
'text'
[]      // пустой массив — truthy!
{}      // пустой объект — truthy!
```

---

## ➕ Операторы

### Арифметические

```javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13 — сложение
console.log(a - b);   // 7 — вычитание
console.log(a * b);   // 30 — умножение
console.log(a / b);   // 3.333... — деление
console.log(a % b);   // 1 — остаток от деления
console.log(a ** b);  // 1000 — возведение в степень (ES7)

// Инкремент и декремент
let c = 5;
c++;  // c = 6 (постфиксный)
++c;  // c = 7 (префиксный)
c--;  // c = 6
```

### Сравнения

```javascript
// Нестрогое сравнение (с приведением типов)
console.log(5 == '5');   // true
console.log(0 == false); // true

// Строгое сравнение (рекомендуется!)
console.log(5 === '5');  // false
console.log(5 === 5);    // true

// Другие операторы
console.log(5 !== '5');  // true (строгое неравенство)
console.log(5 > 3);      // true
console.log(5 >= 5);     // true
console.log(5 < 3);      // false
console.log(5 <= 5);     // true
```

### Логические

```javascript
// И (&&) — возвращает первое ложное или последнее значение
console.log(true && true);    // true
console.log(true && false);   // false
console.log('hello' && 42);   // 42

// ИЛИ (||) — возвращает первое истинное или последнее значение
console.log(true || false);   // true
console.log(false || 'default'); // 'default'
console.log(null || undefined || 'value'); // 'value'

// НЕ (!)
console.log(!true);   // false
console.log(!0);      // true
console.log(!!null);  // false (двойное отрицание для приведения к boolean)

// Нулевое слияние (??) — ES2020
console.log(null ?? 'default');      // 'default'
console.log(undefined ?? 'default'); // 'default'
console.log(0 ?? 'default');         // 0 (отличие от ||)
console.log('' ?? 'default');        // '' (отличие от ||)
```

### Присваивания

```javascript
let x = 10;

x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
x %= 4;   // x = x % 4 → 2
x **= 3;  // x = x ** 3 → 8

// Логическое присваивание (ES2021)
x ||= 5;  // x = x || 5
x &&= 5;  // x = x && 5
x ??= 5;  // x = x ?? 5
```

---

## 🔀 Условные конструкции

### If / Else

```javascript
let age = 18;

if (age >= 18) {
    console.log('Вы совершеннолетний');
} else {
    console.log('Вы несовершеннолетний');
}

// С несколькими условиями
let score = 85;

if (score >= 90) {
    console.log('Отлично');
} else if (score >= 70) {
    console.log('Хорошо');
} else if (score >= 50) {
    console.log('Удовлетворительно');
} else {
    console.log('Неудовлетворительно');
}
```

### Тернарный оператор

```javascript
let age = 20;

// условие ? если_true : если_false
let status = age >= 18 ? 'взрослый' : 'ребёнок';
console.log(status);  // 'взрослый'

// Можно вкладывать (но лучше не злоупотреблять)
let result = score >= 90 ? 'A' 
           : score >= 80 ? 'B'
           : score >= 70 ? 'C'
           : 'D';
```

### Switch

```javascript
let day = 'понедельник';

switch (day) {
    case 'понедельник':
        console.log('Начало недели');
        break;
    case 'пятница':
        console.log('Почти выходные!');
        break;
    case 'суббота':
    case 'воскресенье':
        console.log('Выходной!');
        break;
    default:
        console.log('Обычный день');
}
```

---

## 🔄 Циклы

### For

```javascript
// Классический for
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// Обратный порядок
for (let i = 4; i >= 0; i--) {
    console.log(i);  // 4, 3, 2, 1, 0
}

// С шагом
for (let i = 0; i < 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8
}
```

### While

```javascript
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
```

### Do...While

```javascript
let num = 0;

// Выполнится минимум один раз
do {
    console.log(num);
    num++;
} while (num < 5);
```

### Break и Continue

```javascript
// break — полностью прерывает цикл
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i);  // 0, 1, 2, 3, 4
}

// continue — пропускает текущую итерацию
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);  // 0, 1, 3, 4
}
```

---

## 📁 Структура урока

```
09-javascript-fundamentals/
│
├── README.md                    # Этот файл
├── examples/
│   ├── 01-variables/            # Переменные
│   ├── 02-data-types/           # Типы данных
│   ├── 03-operators/            # Операторы
│   ├── 04-conditions/           # Условия
│   └── 05-loops/                # Циклы
├── practice/
│   ├── 01-calculator/           # Калькулятор
│   ├── 02-fizzbuzz/             # FizzBuzz
│   └── 03-guessing-game/        # Угадай число
└── assets/
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Переменная** | Контейнер для хранения данных |
| **Константа** | Переменная, значение которой нельзя изменить |
| **Тип данных** | Категория данных (строка, число, логическое) |
| **Оператор** | Символ, выполняющий операцию над значениями |
| **Условие** | Конструкция для ветвления логики |
| **Цикл** | Конструкция для повторения кода |
| **Scope** | Область видимости переменной |

