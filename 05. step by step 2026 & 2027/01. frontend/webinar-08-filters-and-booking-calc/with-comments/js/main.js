// ==========================================================================
// СмартОфис — Вебинар 08: Фильтрация, поиск и калькулятор бронирования
// Подробная учебная версия с комментариями к каждой функции для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Запускаем поиск комнат и калькулятор...');
  initNavigation();
  initSlider();
  renderCatalog(typeof OFFICE_ROOMS !== 'undefined' ? OFFICE_ROOMS : []);
  initRoomDetails();
  initFilters();
  initBookingCalc();
  initRegisterForm();
  initLoginForm();
});

// 1. Навигация (из Вебинара 04)
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Слайдер на главной (из Вебинара 07)
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAuto() {
    clearInterval(timerId);
    timerId = setInterval(() => showSlide(currentSlide + 1), 3500);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => { showSlide(idx); startAuto(); });
  });

  startAuto();
}

// 3. Универсальная функция отрисовки каталога (из Вебинара 05)
// Принимает массив комнат: полный (OFFICE_ROOMS) или отфильтрованный (result)
function renderCatalog(roomsList) {
  // Поддерживаем оба ID контейнера: catalogContainer и catalogRooms
  const container = document.getElementById('catalogContainer') || document.getElementById('catalogRooms');
  if (!container || !roomsList) return;

  // Если после фильтрации ничего не найдено:
  if (roomsList.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">По вашему запросу ничего не найдено</p>';
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

// 4. Детальная страница комнаты (из Вебинара 05)
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) return;

  container.innerHTML = `
    <div class="room-details-card">
      <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <a href="booking.html?id=${room.id}" class="btn btn-primary btn-large">Забронировать</a>
      </div>
    </div>
  `;
}

// 5. Модуль живого поиска и сортировки (Тема Вебинара 08)
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');

  if (!searchInput && !sortSelect && !sortAscBtn && !sortDescBtn) return;

  let currentSort = 'default';

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
    if (currentSort === 'price-asc') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (currentSort === 'price-desc') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    // Отрисовываем отфильтрованный результат
    renderCatalog(result);
  }

  // Событие 'input' срабатывает мгновенно при каждом нажатии клавиши
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Событие 'change' срабатывает при выборе нового пункта в select
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = sortSelect.value;
      applyFilters();
    });
  }

  // Кнопка быстрой сортировки по возрастанию цены
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', function () {
      currentSort = 'price-asc';
      if (sortSelect) sortSelect.value = 'price-asc';
      applyFilters();
    });
  }

  // Кнопка быстрой сортировки по убыванию цены
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', function () {
      currentSort = 'price-desc';
      if (sortSelect) sortSelect.value = 'price-desc';
      applyFilters();
    });
  }
}

// 6. Интерактивный калькулятор стоимости аренды (Тема Вебинара 08)
function initBookingCalc() {
  const hoursInput = document.getElementById('hoursInput') || document.getElementById('bookingHours');
  const roomSelect = document.getElementById('roomSelect') || document.getElementById('bookingRoomSelect');
  const totalDisplay = document.getElementById('totalPrice') || document.getElementById('totalPriceDisplay');
  const pricePerHourDisplay = document.getElementById('pricePerHour');

  if (!hoursInput || !totalDisplay || typeof OFFICE_ROOMS === 'undefined') return;

  // Если список комнат в select пустой, динамически заполняем его данными
  if (roomSelect && roomSelect.options.length === 0) {
    OFFICE_ROOMS.forEach(function (room) {
      const opt = document.createElement('option');
      opt.value = room.id;
      opt.textContent = `${room.title} (${room.pricePerHour} ₽/час)`;
      roomSelect.appendChild(opt);
    });

    const urlId = new URLSearchParams(window.location.search).get('id');
    if (urlId) roomSelect.value = urlId;
  }

  function calculateTotal() {
    const hours = parseInt(hoursInput.value) || 0;
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];

    if (pricePerHourDisplay && room) {
      pricePerHourDisplay.textContent = `${room.pricePerHour} ₽`;
    }

    // Формула: часы × почасовая ставка комнаты
    const total = room ? hours * room.pricePerHour : 0;
    totalDisplay.textContent = total + ' ₽';
  }

  hoursInput.addEventListener('input', calculateTotal);
  calculateTotal();

  // Обработка кнопки отправки формы на вебинаре 08
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Стоимость рассчитана! Сохранение бронирований в список «Мои бронирования» изучается на следующем Вебинаре 09.');
    });
  }
}

// 7. Авторизация (из Вебинара 06)
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const nameInput = document.getElementById('fullName');
    const displayName = (nameInput && nameInput.value.trim()) || (loginInput && loginInput.value.trim()) || 'Пользователь';
    localStorage.setItem('currentUser', JSON.stringify({ name: displayName }));
    alert('Регистрация успешна! Добро пожаловать, ' + displayName);
    window.location.href = '../index.html';
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('loginEmail');
    const user = { login: loginInput ? loginInput.value.trim() : '' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Вход выполнен успешно!');
    window.location.href = '../index.html';
  });
}
