---
title: "Заполнение списка комнат"
highlight: js
---

# Заполнение выпадающего списка `<select>`

В нашем HTML мы создали пустой `<select id="roomSelect">`. Нам нужно заполнить его всеми комнатами из `OFFICE_ROOMS`. Мы сделаем это динамически через знакомый нам метод `.map()`.

Каждому пункту `<option>` мы зададим:
1. `value="${r.id}"` (ID комнаты).
2. Пользовательский атрибут `data-price="${r.pricePerHour}"`. Это очень важный хак: мы прячем цену прямо в тег опции, чтобы потом легко ее прочитать при расчетах!

## 🛠 Задание
Найдите все нужные элементы на странице и заполните `roomSelect.innerHTML`.

```js:start
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

```

```js:solution
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');

  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');
```
