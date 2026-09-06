---
title: "Проверка на пустоту"
highlight: js
---

# Вывод пустого состояния

Сразу проверяем длину нашего массива `MOCK_BOOKINGS` (куда мы складывали заявки из калькулятора).

Если его длина равна `0` (или его вообще не существует), мы вставляем в наш `container` красивую заглушку `.empty-message`, которую верстали на шаге 3. И прерываем выполнение функции (`return`), чтобы не рисовать пустой список.

## 🛠 Задание
Добавьте логику проверки на пустоту под Auth Guard.

```js:start
function initMyBookings() {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

}
```

```js:solution
function initMyBookings() {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }
}
```
