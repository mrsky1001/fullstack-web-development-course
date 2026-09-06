---
title: "Запуск при старте"
highlight: js
---

# Запуск авто-прокрутки

Мы написали все функции, но ни разу не вызвали `startAuto()` самостоятельно (только при кликах).
Это значит, что слайдер будет стоять на месте, пока мы не кликнем по нему в первый раз.

Нужно запустить таймер сразу же после инициализации всех кнопок!

## 🛠 Задание
В самом-самом конце вашей огромной функции `initSlider()` вызовите `startAuto()`.

```js:start
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // Впишите вызов здесь
}

function renderCatalog() {
```

```js:solution
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  startAuto();
}

function renderCatalog() {
```
