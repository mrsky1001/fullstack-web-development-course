// ==========================================================================
// СмартОфис — Вебинар 07: Модуль каталога комнат (catalog.js)
// ==========================================================================

// Рендеринг каталога (из Вебинара 05)
function renderCatalog() {
  const container = document.getElementById('catalogContainer') || document.getElementById('catalogRooms');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const html = OFFICE_ROOMS.map(function (room) {
    return `
      <div class="room-card">
        <div class="card-img-wrap">
          <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </div>
        <div class="card-content">
          <h3 class="card-title">${room.title}</h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <a href="room-details.html?id=${room.id}" class="btn btn-outline">Подробнее</a>
              <a href="catalog.html" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// ==========================================================================
// Детальная страница комнаты (из Вебинара 05)
// ==========================================================================
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [URLSearchParams] Извлекаем id комнаты из URL-адреса страницы
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id') || 'focus-1';

  // [Метод .find()] Находим комнату в массиве объектов
  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  }) || OFFICE_ROOMS[0];

  // Двухколоночная верстка: фото слева (50%), описание справа (50%)
  container.innerHTML = `
    <div class="room-details-card">
      <!-- Галерея с фото фиксированного размера -->
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/room-1.jpg'">
      </div>
      <!-- Блок описания и характеристик -->
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <div class="room-details-actions">
          <a href="catalog.html" class="btn btn-outline">← Назад в каталог</a>
        </div>
      </div>
    </div>
  `;
}
