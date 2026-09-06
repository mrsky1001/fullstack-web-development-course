---
title: "Перенос функции рендера"
highlight: js
---

# Переиспользуемая функция рендера

Теперь мы воссоздадим логику отрисовки карточек. 
Мы создадим внутреннюю функцию `render(rooms)`. Обратите внимание: она принимает аргумент `rooms`. 
Мы будем передавать в нее наш скопированный (и отфильтрованный) массив, а она будет рисовать именно его.

Это и называется **Переиспользование кода**. Мы один раз пишем HTML, а потом просто вызываем `render(отфильтрованный_массив)`.

## 🛠 Задание
Вставьте функцию `render(rooms)` внутрь `initCatalogFilters`. Обратите внимание, что мы итерируемся по массиву `rooms.map(...)`, а не по `OFFICE_ROOMS`.

```js:start
  let displayedRooms = [...OFFICE_ROOMS];

```

```js:solution
  let displayedRooms = [...OFFICE_ROOMS];

  function render(rooms) {
    container.innerHTML = rooms.map(room => `
      <div class="room-card">
        <div class="card-img-wrap">
          <a href="room-details.html?id=${room.id}">
            <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="room-details.html?id=${room.id}" style="text-decoration: none; color: inherit;">${room.title}</a>
          </h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <a href="room-details.html?id=${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
              <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
```
