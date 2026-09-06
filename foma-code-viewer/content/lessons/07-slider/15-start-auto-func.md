---
title: "Запуск таймера (setInterval)"
highlight: js
---

# Автоматическое перелистывание (setInterval)

Наш слайдер уже полностью работает, если нажимать на кнопки! 
Но крутой слайдер должен листаться сам, пока пользователь его не трогает.

В JS есть встроенная функция `setInterval(действие, время)`. Она будет бесконечно вызывать переданную ей функцию каждые X миллисекунд.
В нашем случае, действием будет функция `next`, а временем — 3000 мс (3 секунды).

## 🛠 Задание
Объявите функцию `startAuto` и `stopAuto` над вашими слушателями кликов. Обратите внимание, что внутри `startAuto` мы сначала вызываем `stopAuto()`. Зачем? Чтобы случайно не запустить два таймера одновременно, которые будут перелистывать слайдер со скоростью пулемета!

```js:start
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // Добавлять сюда

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
```

```js:solution
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  function startAuto() {
    stopAuto();
    timerId = setInterval(next, 3000);
  }

  function stopAuto() {
    
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });
```
