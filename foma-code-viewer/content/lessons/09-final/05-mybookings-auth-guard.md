---
title: "Защита от незваных гостей"
highlight: js
---

# Защита маршрута (снова)

Как и на странице бронирования, мы не можем показывать эту страницу неавторизованным людям. Ведь мы не знаем, чьи заявки им показывать!
Поэтому мы скопируем наш старый добрый код защиты.

Если в `localStorage` нет ключа `currentUser`, немедленно отправляем человека на страницу `login.html`.

## 🛠 Задание
Добавьте проверку авторизации внутрь функции.

```js:start
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;
  
}
```

```js:solution
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
}
```
