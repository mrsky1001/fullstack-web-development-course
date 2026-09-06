---
title: "Сохранение в базу"
highlight: js
---

# Метод массива unshift()

У нас в файле `data.js` заготовлен пустой массив `MOCK_BOOKINGS`. Это фейковая база данных бронирований.
Нам нужно добавить в нее только что созданную бронь в виде Объекта `{}`.

Можно было бы использовать метод `.push()`, но он добавит элемент в самый конец списка. А мы хотим, чтобы новые брони появлялись сверху списка!
Для этого мы используем метод **`.unshift()`** — он кладет элемент в самое НАЧАЛО массива.

## 🛠 Задание
Сохраните объект в базу внутри обработчика `submit`.

```js:start
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;
  
});
```

```js:solution
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;

  if (typeof MOCK_BOOKINGS !== 'undefined') {
    MOCK_BOOKINGS.unshift({
      id: String(appNumber),
      roomTitle: selectedRoom ? selectedRoom.title : 'Офис',
      date: bookingDate,
      hours: hours,
      totalPrice: total
    });
  }
});
```
