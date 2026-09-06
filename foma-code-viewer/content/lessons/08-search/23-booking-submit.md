---
title: "Оформление заявки"
highlight: js
---

# Отправка формы

Калькулятор работает. Теперь пользователь нажимает кнопку "Забронировать".
Снова перехватываем событие `'submit'` и делаем `e.preventDefault()`.

Мы сгенерируем красивый 5-значный номер заявки случайным образом (с помощью `Math.random()`). 
Также мы найдем все введенные пользователем данные (комнату, дату, часы), чтобы сформировать "Чек".

## 🛠 Задание
Добавьте обработчик отправки формы.

```js:start
  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice();

```

```js:solution
  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const appNumber = Math.floor(10000 + Math.random() * 90000);
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value);
    const bookingDate = document.getElementById('bookingDate').value || '2026-09-01';
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;
    
  });
```
