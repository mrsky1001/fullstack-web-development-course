// ==========================================================================
// СмартОфис — Вебинар 08: Модуль каталога комнат (catalog.js)
// ==========================================================================

// Отрисовка комнат
function renderCatalog(roomsList) {
  const container = document.getElementById('catalogContainer') || document.getElementById('catalogRooms');
  if (!container || !roomsList) return;

  if (roomsList.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">По вашему запросу ничего не найдено</p>';
    return;
  }

  container.innerHTML = roomsList.map(function (room) {
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
              <a href="booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Детальная страница комнаты (Тема Вебинара 05, дополнена в Вебинаре 08)
// ==========================================================================
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [URLSearchParams] Извлекаем id комнаты из URL-адреса страницы
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id') || 'focus-1';

  // [Метод .find()] Находим комнату в базе данных
  const room = OFFICE_ROOMS.find(r => r.id === roomId) || OFFICE_ROOMS[0];

  // Двухколоночная верстка: фото слева (50%), описание и кнопка бронирования справа (50%)
  container.innerHTML = `
    <div class="room-details-card">
      <!-- Галерея с фото фиксированного размера -->
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/room-1.jpg'">
      </div>
      <!-- Блок описания, характеристик и действий -->
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <!-- Кнопки: переход к расчету бронирования и возврат в каталог -->
        <div class="room-details-actions">
          <a href="booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
          <a href="catalog.html" class="btn btn-outline">← В каталог</a>
        </div>
      </div>
    </div>
  `;
}
