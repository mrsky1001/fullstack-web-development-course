---
title: "Защита маршрута (Auth Guard)"
highlight: js
---

# Защита маршрута (Auth Guard)

Мы же не хотим, чтобы анонимные пользователи могли бронировать наши офисы! Забронировать может только тот, кто вошел в систему.

Как это проверить? Очень просто! Мы проверим наше хранилище `localStorage` на наличие ключа `currentUser`.
Если ключа нет (`!currentUser`), мы бесцеремонно перекидываем пользователя на страницу входа `login.html` и прерываем выполнение функции (`return`)!

## 🛠 Задание
Добавьте этот кусок кода (защиту) сразу после проверки наличия формы.

```js:start
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;
  
}
```

```js:solution
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
}
```
