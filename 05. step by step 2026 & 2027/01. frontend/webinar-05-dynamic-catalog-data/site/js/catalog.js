// ==========================================================================
// СмартОфис — Вебинар 05: Модуль каталога и комнат (catalog.js)
// ==========================================================================

// Рендеринг карточек комнат в каталоге
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
              <a href="booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
  console.log('Отрисовано комнат в каталоге:', OFFICE_ROOMS.length);
}

// ==========================================================================
// Отображение детальной информации о комнате (Тема Вебинара 05)
// ==========================================================================
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: URLSearchParams] Получаем параметр ?id=... из адресной строки браузера
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id') || 'focus-1';

  // [Логика: метод .find()] Ищем в массиве комнат объект с совпадающим id
  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  }) || OFFICE_ROOMS[0];

  // Формируем аккуратную двухколоночную карточку: слева фото в галерее, справа описание и характеристики
  container.innerHTML = `
    <div class="room-details-card">
      <!-- Блок 1: Фотография комнаты в фиксированном контейнере-галерее (50% ширины) -->
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/room-1.jpg'">
      </div>
      <!-- Блок 2: Текстовая информация о помещении (50% ширины) -->
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <!-- Кнопка возврата в общий каталог -->
        <div class="room-details-actions">
          <a href="catalog.html" class="btn btn-outline">← Назад в каталог</a>
        </div>
      </div>
    </div>
  `;
}
