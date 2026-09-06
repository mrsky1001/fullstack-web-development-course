---
title: "Вызов функции"
highlight: js
---

# Вызов функции

Код написан, но функция еще ни разу не запускалась.
Вы уже знаете, что нужно делать! Идем в самый-самый верх файла `main.js` и добавляем вызов `initMyBookings()` внутрь главного обработчика `DOMContentLoaded`.

## 🛠 Задание
Добавьте этот вызов! Это последняя строчка кода, которую вы напишете в этом курсе по фронтенду.

```js:start
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initCatalogFilters();
  initBookingCalc();
  initRoomDetails();
  
  initRegisterForm();
  initLoginForm();
});
```

```js:solution
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initCatalogFilters();
  initBookingCalc();
  initRoomDetails();
  initMyBookings();
  initRegisterForm();
  initLoginForm();
});
```
