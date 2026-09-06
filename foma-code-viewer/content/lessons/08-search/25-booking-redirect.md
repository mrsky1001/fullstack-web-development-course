---
title: "Завершение и редирект"
highlight: js
---

# Уведомление и переадресация

Все данные сохранены. Осталось обрадовать пользователя! 
Мы покажем зеленый всплывающий тост с номером его заявки. 
Затем очистим форму (`form.reset()`). 
И через секунду (`setTimeout`) переадресуем его на нашу пока еще пустую страницу `my-bookings.html`.

## 🛠 Задание
Завершите логику отправки формы. И самое главное: **не забудьте вызвать `initBookingCalc()` в самом верху вашего файла внутри `DOMContentLoaded`!** 

Вы огромный молодец! Переходите в браузере, авторизуйтесь под `admin` (пароль `12345`), нажмите "Забронировать" у любой комнаты и поиграйтесь с калькулятором!

```js:start
function initBookingCalc() {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (typeof MOCK_BOOKINGS !== 'undefined') {
      // сохранение бронирования
    }
  });
}
```

```js:solution
function initBookingCalc() {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (typeof MOCK_BOOKINGS !== 'undefined') {
      // сохранение бронирования
    }

    showNotification('Бронирование создано! Номер заявки: №' + appNumber, 'success');
    form.reset();
    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}
```
