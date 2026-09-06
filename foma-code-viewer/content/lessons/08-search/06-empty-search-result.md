---
title: "Пустой результат поиска"
highlight: js
---

# Защита от пустого результата

Что если пользователь введет в поиск слово "Космос"? Таких комнат у нас нет. Наш отфильтрованный массив `rooms` окажется пустым.
Если мы попытаемся его отрендерить, на экране будет просто белое пятно. 

Давайте добавим проверку в самое начало нашей новой функции `render`. Если массив пуст (`!rooms.length`), мы выведем красивое сообщение "Комнаты не найдены".

## 🛠 Задание
Добавьте этот `if` внутрь функции `render`.

```js:start
  function render(rooms) {
    
    container.innerHTML = rooms.map(room => `
```

```js:solution
  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    
    container.innerHTML = rooms.map(room => `
```
