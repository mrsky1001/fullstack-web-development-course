# Урок 11: Массивы и объекты

## 🎯 Цели урока

- Создавать и изменять **массивы**
- Использовать методы массивов (**map, filter, forEach**)
- Работать с **объектами**
- Понимать **деструктуризацию**

---

## 📚 Массивы

```javascript
// Создание
const fruits = ['яблоко', 'банан', 'апельсин'];
const numbers = [1, 2, 3, 4, 5];

// Доступ
console.log(fruits[0]); // 'яблоко'
console.log(fruits.length); // 3

// Изменение
fruits.push('груша');    // добавить в конец
fruits.pop();            // удалить с конца
fruits.unshift('киви');  // добавить в начало
fruits.shift();          // удалить с начала
```

---

## 🔄 Методы массивов

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach — для каждого элемента
numbers.forEach(num => console.log(num));

// map — преобразование
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

// filter — фильтрация
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// find — найти первый
const found = numbers.find(num => num > 3);
// 4

// reduce — свёртка
const sum = numbers.reduce((acc, num) => acc + num, 0);
// 15
```

---

## 📦 Объекты

```javascript
// Создание объекта
const user = {
    name: 'Иван',
    age: 25,
    isActive: true,
    
    // Метод
    greet() {
        return `Привет, я ${this.name}`;
    }
};

// Доступ
console.log(user.name);      // 'Иван'
console.log(user['age']);    // 25

// Изменение
user.email = 'ivan@mail.ru';
delete user.isActive;
```

---

## 🔓 Деструктуризация

```javascript
// Массивы
const [first, second] = [1, 2, 3];

// Объекты
const { name, age } = user;

// С переименованием
const { name: userName } = user;

// Значение по умолчанию
const { city = 'Москва' } = user;
```

---

## 📁 Структура урока

```
11-javascript-arrays-and-objects/
├── README.md
├── examples/
│   ├── 01-arrays/
│   ├── 02-array-methods/
│   ├── 03-objects/
│   └── 04-destructuring/
└── practice/
```
