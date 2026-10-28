// ==========================================================================
// СмартОфис — Вебинар 08: Фильтрация, поиск и калькулятор бронирования
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Запускаем поиск комнат и калькулятор...');
  initNavigation();
  if (typeof OFFICE_ROOMS !== 'undefined') {
    renderCatalog(OFFICE_ROOMS);
    initFilters();
    initBookingCalc();
  }
});

// 1. Навигация
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Универсальная функция отрисовки каталога
// Принимает массив комнат: полный (OFFICE_ROOMS) или отфильтрованный (result)
function renderCatalog(roomsList) {
  const container = document.getElementById('catalogRooms');
  if (!container || !roomsList) return;

  // Если после фильтрации ничего не найдено:
  if (roomsList.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">По вашему запросу ничего не найдено 🔍</p>';
    return;
  }

  // Метод .map() преобразует каждую комнату в карточку
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

// 3. Модуль живого поиска и сортировки
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (!searchInput && !sortSelect) return;

  function applyFilters() {
    // Создаём поверхностную копию исходного массива через спред-оператор [...]
    // чтобы не мутировать оригинальную базу данных
    let result = [...OFFICE_ROOMS];

    // Шаг А: Фильтрация по поисковой строке
    if (searchInput && searchInput.value.trim()) {
      const query = searchInput.value.trim().toLowerCase();
      // Метод .filter() оставляет только те элементы, которые возвращают true
      result = result.filter(function (room) {
        return room.title.toLowerCase().includes(query);
      });
    }

    // Шаг Б: Сортировка по стоимости аренды
    if (sortSelect) {
      if (sortSelect.value === 'price-asc') {
        // Сортировка по возрастанию цены: от дешёвых к дорогим
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
      } else if (sortSelect.value === 'price-desc') {
        // Сортировка по убыванию: от дорогих к дешёвым
        result.sort((a, b) => b.pricePerHour - a.pricePerHour);
      }
    }

    // Отрисовываем отфильтрованный результат
    renderCatalog(result);
  }

  // Событие 'input' срабатывает мгновенно при каждом нажатии клавиши
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  // Событие 'change' срабатывает при выборе нового пункта в select
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
}

// 4. Интерактивный калькулятор стоимости аренды
function initBookingCalc() {
  const hoursInput = document.getElementById('bookingHours');
  const roomSelect = document.getElementById('bookingRoomSelect');
  const totalDisplay = document.getElementById('totalPriceDisplay');

  if (!hoursInput || !totalDisplay || typeof OFFICE_ROOMS === 'undefined') return;

  function calculateTotal() {
    const hours = parseInt(hoursInput.value) || 0;
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];

    // Формула: часы × почасовая ставка комнаты
    const total = hours * room.pricePerHour;
    totalDisplay.textContent = total + ' ₽';
  }

  hoursInput.addEventListener('input', calculateTotal);
  if (roomSelect) roomSelect.addEventListener('change', calculateTotal);

  calculateTotal();
}
