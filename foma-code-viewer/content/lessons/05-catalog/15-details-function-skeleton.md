---
title: "Инициализация карточки"
highlight: js
---

# Функция инициализации карточки

Возвращаемся в файл `main.js`. Нам нужна функция, которая будет работать со страницей детализации комнаты.

Назовем ее `initRoomDetails`. Она должна найти контейнер `roomDetailsContainer`. Если его нет (мы находимся на другой странице), функция должна немедленно прервать работу (`return`).

## 🛠 Задание
В самом низу файла `main.js` создайте эту функцию. Не забудьте также вызвать её в самом верху внутри `DOMContentLoaded` вместе с `renderCatalog()`!

```js:start
// ... другой код ...

function renderCatalog() {
  // ...
}
```

```js:solution
// В самом верху файла добавьте вызов initRoomDetails();
// document.addEventListener('DOMContentLoaded', () => {
//   initNavigation();
//   renderCatalog();
//   initRoomDetails();
// });

// ... другой код ...

function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}
```
