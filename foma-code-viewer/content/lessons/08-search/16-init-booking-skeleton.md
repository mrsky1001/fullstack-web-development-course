---
title: "Инициализация калькулятора"
highlight: js
---

# Начало JS-логики калькулятора

Возвращаемся в наш любимый `main.js`.
Создадим новую функцию `initBookingCalc()`. В ней мы найдем форму бронирования. 
Если формы на странице нет (значит мы не на странице бронирования), функция тихонько завершит работу через `return`.

## 🛠 Задание
Откройте вкладку `js` (`main.js`). Создайте функцию где-нибудь внизу файла, например, после `initCatalogFilters`.

```js:start
function initCatalogFilters() {
  // ... код фильтров ...
}

```

```js:solution
function initCatalogFilters() {
  // ... код фильтров ...
}

function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;
}
```
