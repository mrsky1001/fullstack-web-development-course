---
title: "Отрисовка контента"
highlight: js
---

# Отрисовка контента

Комната найдена! Осталось самое простое — засунуть её данные в красивую HTML-обертку, точно так же, как мы это делали с карточками в каталоге.

Мы используем `container.innerHTML` и шаблонные строки. Обратите внимание на обработчик ошибки загрузки картинки (`onerror`). Если фото не загрузится (вдруг его удалили на сервере), мы покажем картинку-заглушку `no-image.svg`.

## 🛠 Задание
После блока `if (!room)` вставьте HTML-код карточки деталей. Заметьте, что мы уже расставили `${room.title}`, `${room.pricePerHour}` и другие переменные!

```js:start
  if (!room) {
    // ... обработка ошибки ...
    return;
  }
}
```

```js:solution
  if (!room) {
    // ... обработка ошибки ...
    return;
  }

  container.innerHTML = `
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">${room.title}</h1>
          <div class="room-details-price">${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">${room.capacity}</span>
          <span class="room-badge">${room.area}</span>
        </div>

        <p class="room-description">${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=${room.id}" class="btn btn-primary" style="padding: 10px 20px; font-size: 15px;">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline" style="padding: 10px 18px; font-size: 15px;">← Назад в каталог</a>
        </div>
      </div>
    </div>
  `;
}
```
