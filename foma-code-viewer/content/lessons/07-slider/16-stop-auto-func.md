---
title: "Остановка таймера (clearInterval)"
highlight: js
---

# Остановка таймера

У нас есть функция запуска, а как остановить таймер?
Функция `setInterval` всегда возвращает "номерок" (ID) созданного таймера (именно его мы сохраняем в переменную `timerId`). 

Чтобы убить таймер, нужно отдать этот номерок в специальную функцию `clearInterval(номерок)`. 

## 🛠 Задание
Заполните внутренности функции `stopAuto()`.

```js:start
  function stopAuto() {
    
  }
```

```js:solution
  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }
```
