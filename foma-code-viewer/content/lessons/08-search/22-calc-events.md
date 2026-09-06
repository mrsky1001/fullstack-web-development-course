---
title: "Слушатели калькулятора"
highlight: js
---

# Реактивность калькулятора

Чтобы калькулятор работал "в прямом эфире", нам нужно вызывать функцию `updatePrice()` при любых изменениях в форме.

Если пользователь меняет комнату в выпадающем списке, срабатывает событие `'change'`.
Если он вводит цифры в поле часов, срабатывает событие `'input'`.

Также мы вызовем `updatePrice()` один раз вручную сразу же, чтобы при загрузке страницы там не стояли нули!

## 🛠 Задание
Добавьте эти события под вашей функцией `updatePrice`.

```js:start
  function updatePrice() {
    // ...
  }

```

```js:solution
  function updatePrice() {
    // ...
  }

  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice();
```
