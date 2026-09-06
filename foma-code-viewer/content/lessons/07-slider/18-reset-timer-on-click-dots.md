---
title: "Сброс таймера (Точки)"
highlight: js
---

# Перезапуск при клике (Точки)

Та же самая логика распространяется и на точки-индикаторы! Если мы перепрыгнули на нужный слайд по клику на точку, таймер нужно обнулить, чтобы у нас были честные 3 секунды на просмотр.

## 🛠 Задание
Допишите `startAuto();` в цикл, где вы вешали слушатели на точки (сразу под вызовом `showSlide(idx)`).

```js:start
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      
    });
  });
```

```js:solution
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });
```
