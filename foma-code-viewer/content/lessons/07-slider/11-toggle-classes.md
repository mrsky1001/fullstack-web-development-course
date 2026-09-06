---
title: "Переключение классов"
highlight: js
---

# Переключение активного класса

Мы вычислили номер слайда, который хотим показать (переменная `currentSlide`).
Теперь нужно обновить HTML!

У интерфейса `classList` есть замечательный метод `.toggle(имя_класса, условие)`. Если `условие` равно `true`, класс будет добавлен элементу, если `false` — удален.
Мы пробежимся циклом `.forEach` по всем слайдам и точкам. Если индекс элемента в цикле (`i`) совпадает с нашим `currentSlide`, он получит класс `.active`, а все остальные — потеряют его!

## 🛠 Задание
Добавьте этот код в самый низ вашей функции `showSlide`.

```js:start
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

  }
```

```js:solution
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }
```
