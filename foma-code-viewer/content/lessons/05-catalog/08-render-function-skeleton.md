---
title: "Функция рендеринга"
highlight: js
---

# Функция генерации каталога

Возвращаемся в JavaScript (`main.js`). 
Нам нужно написать функцию, которая возьмет массив `OFFICE_ROOMS` и нарисует его на экране. Процесс рисования данных на экране в программировании называется **рендеринг** (от слова render).

## Проверки безопасности
В начале функции мы обязательно найдем контейнер по ID. 
Затем мы напишем защитную строчку `if (!container || typeof OFFICE_ROOMS === 'undefined') return;`.
Она означает: "Если на текущей странице нет контейнера каталога ИЛИ файл с данными почему-то не загрузился — прерви выполнение функции и не выдавай ошибку".

## 🛠 Задание
1. Внизу файла `main.js` создайте функцию `renderCatalog()`.
2. Напишите проверки внутри.
3. Вызовите эту функцию в самом верху внутри `DOMContentLoaded`!

```js:start
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
});

// ... другой код ...

function updateAuthNav() {
  // ...
}
```

```js:solution
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCatalog();
});

// ... другой код ...

function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
  
}
```
