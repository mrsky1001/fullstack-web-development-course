# Шаг 7 — querySelectorAll и forEach

## 🎯 Что изучаем
Как получить сразу ВСЕ слайды одной строкой и пройти по ним циклом — вместо 4 отдельных переменных.

---

## 💡 Объяснение простыми словами

**Массив** — список значений. `['яблоко', 'банан', 'апельсин']`.

`querySelectorAll` возвращает похожую **коллекцию** (NodeList) — все элементы с нужным классом.

`forEach` — «для каждого» — проходит по списку и выполняет функцию для каждого элемента.

Аналогия: у тебя 4 лампочки. Вместо того чтобы выключать каждую отдельно — ты идёшь и **для каждой** лампочки нажимаешь выключатель.

---

## 📖 Код

```javascript
// СТАРЫЙ способ — 4 переменные (неудобно!)
const slide1El = document.getElementById('slide1');
const slide2El = document.getElementById('slide2');
const slide3El = document.getElementById('slide3');
const slide4El = document.getElementById('slide4');
slide1El.classList.remove('active');
slide2El.classList.remove('active');
slide3El.classList.remove('active');
slide4El.classList.remove('active');

// НОВЫЙ способ — querySelectorAll + forEach (профессионально!)
const slides = document.querySelectorAll('.slide'); // Все 4 слайда сразу

// Убрать active у ВСЕХ слайдов:
slides.forEach(function(slide) {
    slide.classList.remove('active');
});

// Стрелочный синтаксис (то же самое, короче):
slides.forEach(slide => slide.classList.remove('active'));
```

---

## 🔗 Как это улучшает слайдер

```javascript
// Функция которая показывает слайд по индексу (0, 1, 2, 3)
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');

function showSlide(index) {
    // 1. Убираем active у ВСЕХ слайдов и точек
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // 2. Добавляем active только нужному
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Теперь можно показать любой слайд:
showSlide(0); // Первый слайд
showSlide(2); // Третий слайд
```

---

## ✅ Задание
1. Открой `index.html` — нажми кнопки, смотри как работает showSlide(index).
2. В консоли (F12) напиши: `showSlide(3)` — должен появиться 4-й слайд!
3. Теперь напиши `showSlide(0)` — вернётся первый.

---

## ➡️ Следующий шаг
[Шаг 8 — Переменная состояния currentSlide](../step-08-currentslide/README.md)
