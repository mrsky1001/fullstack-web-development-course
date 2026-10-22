# Шаг 8 — Переменная состояния currentSlide

## 🎯 Что изучаем
Как «запомнить» текущий слайд в переменной и сделать кнопки ‹/› по-настоящему рабочими.

---

## 💡 Объяснение простыми словами

Проблема: функция `showSlide(index)` отлично показывает слайд по номеру. Но откуда кнопка «›» знает — какой слайд сейчас активен, чтобы показать **следующий**?

Решение: заводим переменную **состояния** — `let currentSlide = 0`. Она всегда хранит индекс текущего слайда.

Аналогия: счётчик посещений в музее. Каждый раз когда кто-то входит — счётчик увеличивается. Мы всегда знаем сколько людей вошло.

---

## 📖 Полная логика

```javascript
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');

// Переменная состояния — ТЕКУЩИЙ индекс слайда
let currentSlide = 0;

function showSlide(index) {
    // Обработка границ: после последнего → первый, до первого → последний
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0)         currentSlide = slides.length - 1;
    else                        currentSlide = index;

    // Обновляем классы
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d   => d.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Кнопка вперёд: currentSlide + 1
rightBtn.addEventListener('click', function() {
    showSlide(currentSlide + 1);
});

// Кнопка назад: currentSlide - 1
leftBtn.addEventListener('click', function() {
    showSlide(currentSlide - 1);
});
```

---

## ✅ Задание
1. Открой `index.html` — нажимай ‹ и › несколько раз. Слайдер переключается по кругу!
2. Нажми F12 → Console — там виден `currentSlide` после каждого клика.
3. В консоли напиши: `currentSlide` — посмотри текущее значение.

---

## ➡️ Следующий шаг
[Шаг 9 — Полный слайдер с setInterval (Финал!)](../step-09-polniy-slayder/README.md)
