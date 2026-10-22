# Шаг 6 — События: addEventListener

## 🎯 Что изучаем
Как JS слушает действия пользователя (клик, нажатие клавиши) и реагирует на них.

---

## 💡 Объяснение простыми словами

**Событие** — это «что-то произошло». Пользователь кликнул, навёл мышь, нажал клавишу, страница загрузилась.

`addEventListener` — это **подписка** на событие. Говоришь: «Когда произойдёт вот это событие — вызови вот эту функцию».

Аналогия: ты подписан на уведомления в телефоне. Когда приходит сообщение (событие) — телефон звонит (вызывается функция).

---

## 📖 Синтаксис

```javascript
элемент.addEventListener('имя события', функция);

// Пример из нашего проекта:
rightSliderBtnEl.addEventListener('click', sliderClick);
//                ↑ 'click' = событие клика мышью
//                               ↑ sliderClick = функция-обработчик
//                                 (БЕЗ скобок! Мы передаём саму функцию, не вызываем)
```

---

## ⚠️ Важно: со скобками или без?

```javascript
// ✅ ПРАВИЛЬНО — передаём функцию (без скобок)
button.addEventListener('click', sliderClick);

// ❌ НЕПРАВИЛЬНО — вызываем функцию сразу!
button.addEventListener('click', sliderClick()); // Вызов произойдёт сейчас, не при клике!
```

---

## 🔗 Из кода проекта

Вот ПОЛНЫЙ код из `main.js` проекта — это то что написали студенты:

```javascript
// Находим элементы
const slide1El = document.getElementById('slide1');
const slide3El = document.getElementById('slide3');
const rightSliderBtnEl = document.getElementById('rightSliderBtn');

// Функция-обработчик
function sliderClick() {
    slide1El.classList.remove('active');
    slide3El.classList.add('active');
}

// Подписываемся на событие клика!
rightSliderBtnEl.addEventListener('click', sliderClick);
// Теперь при каждом нажатии правой кнопки вызывается sliderClick()
```

---

## ✅ Задание
1. Открой `index.html` — нажми правую стрелку слайдера. Работает?
2. Попробуй добавить обработчик для левой кнопки.
3. Что если нажать правую кнопку несколько раз? Почему слайд не продолжает переключаться?

---

## ➡️ Следующий шаг
[Шаг 7 — querySelectorAll и forEach](../step-07-massiv-i-foreach/README.md)
