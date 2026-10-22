# Шаг 3 — DOM-дерево и поиск элемента

## 🎯 Что изучаем
Что такое DOM, как браузер строит дерево из HTML, и как JS находит нужный элемент.

---

## 💡 Объяснение простыми словами

**DOM** (Document Object Model) — это дерево объектов, которое браузер строит из HTML.

Аналогия: HTML — это **чертёж** дома. DOM — это **сам построенный дом**, по которому можно ходить, открывать двери, переставлять мебель!

```
📄 HTML-файл → 🌳 DOM-дерево в памяти браузера

document
  └── html
        ├── head
        │     └── title
        └── body
              ├── header
              ├── main
              │     └── section#slider-block
              │           ├── div#slide1  ← его мы ищем!
              │           ├── div#slide2
              │           └── button#rightSliderBtn
              └── footer
```

---

## 📖 Как найти элемент?

```javascript
// Способ 1: по id (самый быстрый)
const slide1El = document.getElementById('slide1');

// Способ 2: по CSS-селектору (как в CSS)
const slider = document.querySelector('.slider');
const firstDot = document.querySelector('.dot');

// Способ 3: НЕСКОЛЬКО элементов сразу
const allSlides = document.querySelectorAll('.slide');
// allSlides — это коллекция всех 4 слайдов!
```

---

## 🔗 Связь с нашим слайдером

Вот строки из реального кода проекта — теперь понятно что они делают:

```javascript
// Находим блок слайдера
const sliderBlockEl = document.getElementById('slider-block');

// Находим каждый слайд по его id
const slide1El = document.getElementById('slide1');
const slide2El = document.getElementById('slide2');
const slide3El = document.getElementById('slide3');
const slide4El = document.getElementById('slide4');

// Находим кнопку управления
const rightSliderBtnEl = document.getElementById('rightSliderBtn');
```

---

## ✅ Задание
1. Открой `index.html`, нажми F12 → Console.
2. Нажимай кнопки на панели — смотри что выводится в консоль.
3. Напиши сам в консоли: `document.getElementById('slide1')` и нажми Enter.

---

## ➡️ Следующий шаг
[Шаг 4 — classList: управление классами](../step-04-classlist/README.md)
