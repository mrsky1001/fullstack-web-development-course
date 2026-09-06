---
title: "Создание контейнера"
highlight: js
---

# Создание элементов на лету (createElement)

Что делать, если `document.getElementById` ничего не нашел? Он вернет специальное значение `null` (пустота).

Мы напишем условие `if (!container)` (читается как "если НЕ контейнер", то есть если он пуст). Внутри этого условия мы впервые в жизни **создадим HTML-тег с помощью JavaScript**!

## Магия DOM:
1. `document.createElement('div')` — создает виртуальный тег `<div>`. Он пока существует только в памяти браузера, на экране его нет!
2. `container.id = 'toastContainer'` — вешаем на него тот самый ID, чтобы в следующий раз функция смогла его найти.
3. `container.className = 'toast-container'` — вешаем на него CSS-класс. Этот класс мы заранее написали в CSS во втором вебинаре (он прилепляет контейнер в правый нижний угол экрана `position: fixed`).
4. `document.body.appendChild(container)` — самая важная строка! Мы берем наш виртуальный `<div>` и физически "втыкаем" его в самый конец HTML-тега `<body>` на странице.

## 🛠 Задание

Добавьте эту логику создания контейнера в вашу функцию.

```js:start
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  
}
```

```js:solution
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}
```
