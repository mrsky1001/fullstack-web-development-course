# Шаг 4 — classList: управление классами CSS

## 🎯 Что изучаем
Как JS добавляет и убирает CSS-классы у элементов — именно так слайдер показывает и скрывает слайды!

---

## 💡 Объяснение простыми словами

Каждый HTML-элемент может иметь CSS-классы. Через JS мы можем **добавлять**, **убирать** и **переключать** классы прямо во время работы страницы.

Аналогия: класс — это **значок** на одежде. `classList.add` — приколоть значок. `classList.remove` — снять. `classList.toggle` — если есть — снять, нет — приколоть.

---

## 📖 Три метода classList

```javascript
const slide1El = document.getElementById('slide1');

// Добавить класс
slide1El.classList.add('active');      // slide1 становится видимым

// Убрать класс
slide1El.classList.remove('active');   // slide1 становится невидимым

// Переключить (если есть — убрать, нет — добавить)
slide1El.classList.toggle('active');

// Проверить наличие класса
if (slide1El.classList.contains('active')) {
    console.log('slide1 видим!');
}
```

---

## 🔗 Как это работает в слайдере?

В CSS у класса `.slide` стоит `opacity: 0` (невидимый).  
А у `.slide.active` — `opacity: 1` (видимый).

Значит: **добавить `.active`** = показать слайд, **убрать `.active`** = скрыть!

```javascript
// Из реального кода студентов (main.js):
slide1El.classList.remove('active');  // Прячем слайд 1
slide3El.classList.add('active');     // Показываем слайд 3
```

---

## ✅ Задание
1. Нажимай кнопки в `index.html` — смотри как слайды переключаются.
2. В консоли (F12) напиши: `slide1El.classList.remove('active')` — слайд 1 исчезнет!
3. Потом: `slide2El.classList.add('active')` — появится слайд 2.

---

## ➡️ Следующий шаг
[Шаг 5 — Функции](../step-05-funktsiya/README.md)
