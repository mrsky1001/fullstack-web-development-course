---
title: "Цикл по ссылкам"
highlight: js
---

# Цикл (forEach) и очистка классов

У нас есть список всех ссылок в переменной `links`. Как нам проверить каждую из них? Для этого существуют **циклы**.
Метод `.forEach()` (для каждого) берет список и по очереди применяет код к каждому его элементу. Элемент внутри цикла мы назовем `link`.

Внутри цикла мы сделаем две вещи:
1. Прочитаем атрибут `href` у ссылки, чтобы понять, куда она ведет (`link.getAttribute('href')`). Если атрибута нет — пропускаем ссылку (`if (!href) return`).
2. Очистим ссылку от класса `active`. Это нужно на случай, если класс там уже был (например, остался от старой страницы). Метод `classList.remove` идеально для этого подходит.

## 🛠 Задание

Внутри `initNavigation` добавьте этот цикл:

```js:start
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;
  
}
```

```js:solution
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');
    
  });
}
```
