// СмартОфис — Вебинар 05: Динамический каталог и работа с данными

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM загружен. Инициализация каталога...');
  initNavigation();
  renderCatalog();
  initRoomDetails();
});

// Навигация (из Вебинара 04)
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// Рендеринг карточек комнат в каталоге
function renderCatalog() {
  const container = document.getElementById('catalogRooms');
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

// Отображение детальной информации о комнате
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // Получаем id из адресной строки: room-details.html?id=focus-1
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id');

  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  });

  if (!room) {
    container.innerHTML = '<h2>Комната не найдена</h2><p>Пожалуйста, вернитесь в каталог.</p>';
    return;
  }

  container.innerHTML = `
    <div class="room-details-card">
      <img src="${room.image}" alt="${room.title}" class="room-details-img">
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <a href="booking.html?id=${room.id}" class="btn btn-primary btn-large">Забронировать эту комнату</a>
      </div>
    </div>
  `;
}
