---
title: "Поиск всех ссылок"
highlight: js
---

# Поиск всех элементов и текущего URL

Чтобы понять, какую ссылку подсвечивать, нам нужны две вещи:
1. Список всех ссылок меню.
2. Текущий адрес страницы, на которой находится пользователь.

## querySelectorAll
Ранее мы искали один элемент по ID (`getElementById`). Но у ссылок меню одинаковый класс `.nav-link`, и их много.
Функция `document.querySelectorAll('.nav-link')` найдет **ВСЕ** элементы с таким классом и сложит их в своеобразный список (массив), который мы запишем в переменную `links`.

## window.location
В браузере есть встроенный объект `window` (Окно браузера). У него есть свойство `location.pathname`, которое содержит текущий путь (например, `/pages/catalog.html` или `/index.html`).

## 🛠 Задание

Внутри `initNavigation` найдите все ссылки и текущий путь.

```js:start
function initNavigation() {
  
}
```

```js:solution
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;
}
```
