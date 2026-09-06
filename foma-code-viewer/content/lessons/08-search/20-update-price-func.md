---
title: "Функция перерасчета"
highlight: js
---

# Получение цены из data-атрибута

Переходим к самой математике калькулятора! Создадим внутреннюю функцию `updatePrice()`.

Как нам узнать цену выбранной в данный момент комнаты? 
1. `roomSelect.options[roomSelect.selectedIndex]` — это выбранный тег `<option>`.
2. Мы обращаемся к его свойству `dataset.price` (это то самое `data-price`, которое мы заботливо туда положили!).
3. Оборачиваем это в функцию `Number()`, чтобы превратить строку в число (для дальнейшего умножения).

## 🛠 Задание
Напишите начало функции `updatePrice()`.

```js:start
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

```

```js:solution
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    
  }
```
