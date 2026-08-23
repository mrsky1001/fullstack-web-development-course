// СмартОфис — Скрипт веб-приложения (Вебинар 8)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initCatalogFilters();
  initBookingCalc();
  initRegisterForm();
  initLoginForm();
});

function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if (href.includes('catalog.html') && current.includes('catalog.html')) {
      link.classList.add('active');
    } else if (href.includes('booking.html') && current.includes('booking.html')) {
      link.classList.add('active');
    } else if (href.includes('my-bookings.html') && current.includes('my-bookings.html')) {
      link.classList.add('active');
    } else if (href.includes('login.html') && current.includes('login.html')) {
      link.classList.add('active');
    } else if (href.includes('register.html') && current.includes('register.html')) {
      link.classList.add('active');
    }
  });
}

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

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  function startAuto() {
    stopAuto();
    timerId = setInterval(next, 3000);
  }

  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  startAuto();
}


function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  let displayedRooms = [...OFFICE_ROOMS];

  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    container.innerHTML = rooms.map(room => `
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
            <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  render(displayedRooms);
}

function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = price * hours;

    if (pricePerHourSpan) pricePerHourSpan.textContent = price + ' ₽';
    if (totalPriceSpan) totalPriceSpan.textContent = total + ' ₽';
  }

  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const appNumber = Math.floor(10000 + Math.random() * 90000);
    alert('Бронирование создано! Номер заявки: №' + appNumber);
    form.reset();
    updatePrice();
  });
}


function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      alert('Пользователь зарегистрирован успешно!');
      form.reset();
      window.location.href = 'login.html';
    }
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      if (alertBox) alertBox.style.display = 'none';
      alert('Успешный вход в систему!');
      window.location.href = '../index.html';
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
    }
  });
}
