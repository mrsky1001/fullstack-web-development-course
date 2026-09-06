---
title: "Слушатели кликов (Кнопки)"
highlight: js
---

# Оживляем кнопки

У нас есть кнопки и есть функции `next` / `prev`. Осталось связать их вместе!

Мы найдем наши переменные `nextBtn` и `prevBtn` (которые мы получили через `querySelector` в самом начале) и повесим на них слушатель события `'click'`.

## 🛠 Задание
Пропишите события клика для кнопок. Мы используем защиту `if (nextBtn)`, на случай если кто-то удалит кнопку из HTML (чтобы скрипт не сломался с ошибкой).

```js:start
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

```

```js:solution
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });
```
