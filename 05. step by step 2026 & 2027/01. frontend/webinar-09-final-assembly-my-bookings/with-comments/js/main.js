// ==========================================================================
// СмартОфис — Вебинар 09: Финальная сборка веб-приложения
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('СмартОфис: запуск финальной сборки приложения...');
  // Инициализируем все модули проекта
  initNavigation();
  initSlider();
  renderCatalog(typeof OFFICE_ROOMS !== 'undefined' ? OFFICE_ROOMS : []);
  initRoomDetails();
  initFilters();
  initBookingForm();
  initMyBookings();
  initAuthForms();
});

// 1. Модуль навигации
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Модуль слайдера
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

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

// 3. Модуль каталога
function renderCatalog(roomsList) {
  const container = document.getElementById('catalogRooms');
  if (!container || !roomsList) return;

  if (roomsList.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">Комнаты не найдены 🔍</p>';
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
            ${room.equipment ? room.equipment.map(item => `<li>${item}</li>`).join('') : ''}
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

// 4. Модуль карточки комнаты
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const roomId = new URLSearchParams(window.location.search).get('id');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) return;

  container.innerHTML = `
    <div class="room-details-card">
      <img src="${room.image}" alt="${room.title}" class="room-details-img">
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

// 5. Модуль поиска и фильтров
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  if (!searchInput && !sortSelect) return;

  function applyFilters() {
    let result = [...OFFICE_ROOMS];
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q));
    }
    if (sortSelect) {
      if (sortSelect.value === 'price-asc') result.sort((a, b) => a.pricePerHour - b.pricePerHour);
      else if (sortSelect.value === 'price-desc') result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }
    renderCatalog(result);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
}

// 6. Форма бронирования
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const hoursInput = document.getElementById('bookingHours');
  const roomSelect = document.getElementById('bookingRoomSelect');
  const totalDisplay = document.getElementById('totalPriceDisplay');

  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  function updateTotal() {
    if (!hoursInput || !totalDisplay) return;
    const hours = parseInt(hoursInput.value) || 0;
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];
    totalDisplay.textContent = (hours * room.pricePerHour) + ' ₽';
  }

  if (hoursInput) hoursInput.addEventListener('input', updateTotal);
  if (roomSelect) roomSelect.addEventListener('change', updateTotal);
  updateTotal();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];
    const hours = parseInt(hoursInput.value) || 1;

    const newBooking = {
      id: 'book-' + Date.now(),
      roomId: room.id,
      roomTitle: room.title,
      hours: hours,
      totalPrice: hours * room.pricePerHour,
      createdAt: new Date().toLocaleDateString('ru-RU')
    };

    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(bookings));

    alert('Бронирование оформлено! Переходим в раздел «Мои бронирования».');
    window.location.href = 'my-bookings.html';
  });
}

// 7. Отрисовка списка «Мои бронирования»
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container) return;

  function renderList() {
    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');

    if (bookings.length === 0) {
      container.innerHTML = '<p class="empty-bookings" style="text-align: center; color: #94a3b8; padding: 40px;">У вас пока нет активных бронирований.</p>';
      return;
    }

    container.innerHTML = bookings.map(function (b) {
      return `
        <div class="booking-item" style="background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="color: #38bdf8; margin-bottom: 6px;">${b.roomTitle}</h3>
            <p style="color: #cbd5e1; font-size: 14px;">Дата: ${b.createdAt} | Длительность: ${b.hours} ч.</p>
            <p style="color: #10b981; font-weight: bold; margin-top: 6px;">Сумма: ${b.totalPrice} ₽</p>
          </div>
          <button class="btn btn-outline" onclick="cancelBooking('${b.id}')" style="color: #ef4444; border-color: #ef4444;">Отменить</button>
        </div>
      `;
    }).join('');
  }

  // Функция отмены бронирования
  window.cancelBooking = function (id) {
    let bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('myBookings', JSON.stringify(bookings));
    renderList();
  };

  renderList();
}

// 8. Авторизация пользователей
function initAuthForms() {
  const regForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('regEmail').value.trim();
      if (email) {
        localStorage.setItem('currentUser', JSON.stringify({ email: email }));
        alert('Регистрация успешна!');
        window.location.href = '../index.html';
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      if (email) {
        localStorage.setItem('currentUser', JSON.stringify({ email: email }));
        alert('Вход выполнен!');
        window.location.href = '../index.html';
      }
    });
  }
}
