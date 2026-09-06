---
title: "Скелет JS функции"
highlight: js
---

# Инициализация страницы

Откройте вкладку `js` (`main.js`). 
Создадим нашу последнюю функцию — `initMyBookings()`.

Её задача: найти контейнер `myBookingsList`, и если он существует (и база данных `MOCK_BOOKINGS` подключена без ошибок), начать работу.

## 🛠 Задание
Вставьте эту функцию в самый низ вашего файла.

```js:start
function initRoomDetails() {
  // ... код страницы одной комнаты ...
}

```

```js:solution
function initRoomDetails() {
  // ... код страницы одной комнаты ...
}

function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;
}
```
