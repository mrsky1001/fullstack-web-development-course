---
title: "Слушатели кликов (Точки)"
highlight: js
---

# Кликабельные точки

Точки внизу слайдера тоже должны быть кликабельными! Пользователь может захотеть перепрыгнуть сразу на 3-й слайд, минуя 2-й.

Так как точек несколько (целый массив `dots`), мы запустим по ним цикл `.forEach()`.
Метод `.forEach((dot, idx)` в качестве второго аргумента всегда отдает индекс (порядковый номер) элемента в цикле. Мы просто передадим этот индекс `idx` в нашу всемогущую функцию `showSlide()`!

## 🛠 Задание
Добавьте этот красивый цикл под вашими событиями кнопок.

```js:start
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });

```

```js:solution
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });
```
