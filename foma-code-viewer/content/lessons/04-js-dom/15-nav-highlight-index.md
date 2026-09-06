---
title: "Подсветка Главной страницы"
highlight: js
---

# Подсветка Главной страницы

Теперь самое интересное — проверка совпадений. Мы внутри цикла, проверяем конкретную ссылку.

Нам нужно написать условие `if` (если).
Мы хотим подсветить Главную страницу. Ее путь в браузере (`current`) может заканчиваться на `index.html`, просто `/` или быть вообще пустым `''` (если сайт открыли по корневому домену). 
А в самом HTML ссылка может вести на `index.html` или `../index.html` (если мы переходим из вложенной папки).

Знак `||` в JavaScript означает "ИЛИ". Знак `&&` означает "И".

Метод `.endsWith()` проверяет, "заканчивается ли строка на...".
Метод `classList.add('active')` вешает наш красивый CSS-класс на ссылку!

## 🛠 Задание
Внутри цикла `forEach` (сразу под `.remove`) добавьте это длинное, но очень логичное условие.

```js:start
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');
    
  });
```

```js:solution
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    }
  });
```
