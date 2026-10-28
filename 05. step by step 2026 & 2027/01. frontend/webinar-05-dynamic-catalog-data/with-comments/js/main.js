// ==========================================================================
// СмартОфис — Вебинар 05: Динамический каталог и данные
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Запускаем инициализацию...');
  initNavigation();
  renderCatalog();
  initRoomDetails();
});

// 1. Навигация сайта
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Функция динамической отрисовки каталога
function renderCatalog() {
  // Находим контейнер для карточек (поддерживаем оба варианта ID: catalogContainer и catalogRooms)
  const container = document.getElementById('catalogContainer') || document.getElementById('catalogRooms');
  // Если на этой странице нет каталога (например, мы на Главной), выходим
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // Метод .map() проходит по каждому объекту room в массиве OFFICE_ROOMS
  // и превращает его в строку с HTML-разметкой карточки
  const htmlCards = OFFICE_ROOMS.map(function (room) {
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
  }).join(''); // Метод .join('') склеивает массив строк в один сплошной HTML

  // Вставляем сгенерированный HTML внутрь контейнера
  container.innerHTML = htmlCards;
  console.log('Отрисовано карточек комнат:', OFFICE_ROOMS.length);
}

// 3. Функция показа детальной страницы комнаты
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // Считываем параметр id из адреса: например, room-details.html?id=focus-1
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id');

  // Ищем нужную комнату в массиве методом .find()
  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  });

  if (!room) {
    container.innerHTML = '<h2>Комната не найдена</h2><p>Пожалуйста, вернитесь в каталог.</p>';
    return;
  }

  // Отрисовываем подробную карточку выбранной комнаты
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
