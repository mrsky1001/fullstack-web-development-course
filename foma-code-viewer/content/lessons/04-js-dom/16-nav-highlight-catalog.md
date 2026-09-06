---
title: "Подсветка Каталога и Комнаты"
highlight: js
---

# Подсветка Каталога и Комнаты

Мы настроили главную страницу. Теперь нужно подсветить кнопку меню "Каталог".

Но есть нюанс: когда пользователь находится на странице конкретной комнаты (например, `room-details.html`), пункт "Каталог" тоже должен светиться, показывая, в каком разделе сайта он находится!

Поэтому мы используем конструкцию `else if` (иначе если). И проверяем наличие слова "catalog" ИЛИ "room-details" через метод `.includes()` (содержит).

## 🛠 Задание

Добавьте блок `else if` к вашему предыдущему коду подсветки.

```js:start
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    }
```

```js:solution
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
      link.classList.add('active');
    }
```
