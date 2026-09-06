---
title: "Функции Вперед и Назад"
highlight: js
---

# Удобные обертки (next / prev)

Наша функция `showSlide` готова и умеет делать всё.
Чтобы нам было проще вызывать её по клику на кнопки, давайте создадим две крошечные функции-обертки: `next()` и `prev()`.

Они просто вызовут `showSlide`, передав ей текущий слайд + 1 (для "Вперед") и текущий слайд - 1 (для "Назад"). 
Вам не нужно беспокоиться о выходе за границы (например, -1), потому что мы уже написали защиту от этого внутри `showSlide`!

## 🛠 Задание
Добавьте эти функции сразу после `showSlide()`.

```js:start
  function showSlide(index) {
    // ...
  }

```

```js:solution
  function showSlide(index) {
    // ...
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }
```
