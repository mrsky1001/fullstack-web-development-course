---
title: "Чтение параметров из URL"
highlight: js
---

# Чтение ID комнаты из ссылки

В каталоге на карточках есть кнопка "Забронировать". Ссылка на этой кнопке выглядит так: `booking.html?room=2`. 
Знак вопроса означает начало параметров запроса. Здесь мы передаем ID комнаты (`room=2`), которую выбрал пользователь.

Мы хотим, чтобы при переходе на форму, нужная комната **уже была выбрана** в выпадающем списке!
Для этого в JS есть встроенный инструмент `URLSearchParams`. Мы читаем параметр `room` и присваиваем его в `roomSelect.value`.

## 🛠 Задание
Прочитайте параметр из адресной строки.

```js:start
  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');

```

```js:solution
  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;
```
