# Урок 10: Функции JavaScript

## 🎯 Цели урока

- Создавать и вызывать **функции**
- Понимать **параметры и аргументы**
- Использовать **return**
- Знать **стрелочные функции**
- Понимать **область видимости**

---

## 📝 Объявление функций

```javascript
// Function Declaration
function greet(name) {
    return `Привет, ${name}!`;
}

// Function Expression
const greet2 = function(name) {
    return `Привет, ${name}!`;
};

// Arrow Function
const greet3 = (name) => `Привет, ${name}!`;
```

---

## 🔧 Параметры

```javascript
// Параметры по умолчанию
function greet(name = 'Гость') {
    return `Привет, ${name}!`;
}

// Rest-параметры
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
```

---

## 🔙 Return

```javascript
function multiply(a, b) {
    return a * b; // Возвращает значение
}

const result = multiply(5, 3); // 15

// Без return функция возвращает undefined
function logMessage(msg) {
    console.log(msg);
    // return undefined (неявно)
}
```

---

## ➡️ Стрелочные функции

```javascript
// Полная форма
const add = (a, b) => {
    return a + b;
};

// Сокращённая (неявный return)
const add2 = (a, b) => a + b;

// Один параметр — скобки не нужны
const double = x => x * 2;

// Без параметров — пустые скобки
const random = () => Math.random();
```

---

## 📁 Структура урока

```
10-javascript-functions-and-scope/
├── README.md
├── examples/
│   ├── 01-function-declaration/
│   ├── 02-parameters/
│   ├── 03-arrow-functions/
│   └── 04-scope/
└── practice/
```
