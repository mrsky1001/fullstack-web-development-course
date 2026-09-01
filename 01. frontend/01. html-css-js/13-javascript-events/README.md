# Урок 13: События JavaScript

## 🎯 Цели урока

- Понимать концепцию **событий**
- Добавлять **обработчики событий**
- Работать с **объектом события**
- Использовать **делегирование событий**

---

## 📡 Добавление обработчиков

```javascript
const button = document.querySelector('.btn');

// addEventListener (рекомендуется)
button.addEventListener('click', function(event) {
    console.log('Кнопка нажата!');
});

// Стрелочная функция
button.addEventListener('click', (e) => {
    console.log('Клик!');
});

// Удаление обработчика
function handleClick() {
    console.log('Клик!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

---

## 🎯 Типы событий

```javascript
// Мышь
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);

// Клавиатура
input.addEventListener('keydown', handler);
input.addEventListener('keyup', handler);
input.addEventListener('keypress', handler);

// Формы
form.addEventListener('submit', handler);
input.addEventListener('input', handler);
input.addEventListener('change', handler);
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);

// Документ
document.addEventListener('DOMContentLoaded', handler);
window.addEventListener('load', handler);
window.addEventListener('scroll', handler);
window.addEventListener('resize', handler);
```

---

## 📋 Объект события

```javascript
button.addEventListener('click', function(event) {
    event.target;           // элемент, на котором сработало
    event.currentTarget;    // элемент с обработчиком
    event.type;             // тип события ('click')
    event.preventDefault(); // отменить действие по умолчанию
    event.stopPropagation(); // остановить всплытие
});
```

---

## 🎈 Делегирование событий

```javascript
// Вместо обработчика на каждой кнопке
document.querySelector('.buttons').addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        console.log('Нажата кнопка:', e.target.textContent);
    }
});
```

---

## 📁 Структура урока

```
13-javascript-events/
├── README.md
├── examples/
│   ├── 01-event-listeners/
│   ├── 02-event-object/
│   ├── 03-form-events/
│   └── 04-delegation/
└── practice/
```
