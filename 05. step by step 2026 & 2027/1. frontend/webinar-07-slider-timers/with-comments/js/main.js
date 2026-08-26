// СмартОфис — Скрипт веб-приложения (Вебинар 7)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  // [Логика: Запускаем инициализацию слайдера на главной странице]
  initSlider();
  renderCatalog();
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

// [Теория: JS позволяет управлять DOM-элементами во времени, используя функции setInterval и setTimeout]
// [Логика: Инициализация автоматического слайдера изображений]
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  // [Логика: Если слайдов нет (мы на другой странице), прерываем выполнение]
  if (!slides.length) return;

  // [Логика: Переменная для хранения индекса текущего слайда]
  let currentSlide = 0;
  // [Логика: Переменная для хранения ID запущенного таймера (чтобы можно было его остановить)]
  let timerId = null;

  // [Логика: Функция показа слайда по индексу]
  function showSlide(index) {
    // [Логика: Обработка закольцованности (если индекс вышел за границы массива)]
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // [Теория: Метод classList.toggle(className, force) добавляет класс, если force === true, и удаляет, если false]
    // [Логика: Проходим по всем слайдам и точкам, добавляя класс 'active' только текущему индексу]
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // [Логика: Запуск автоматического перелистывания]
  function startAuto() {
    stopAuto(); // Сначала останавливаем старый таймер, чтобы они не накладывались
    // [Теория: setInterval(func, ms) вызывает функцию func каждые ms миллисекунд и возвращает свой ID]
    timerId = setInterval(next, 3000); // 3000 мс = 3 секунды
  }

  // [Логика: Остановка автоматического перелистывания]
  function stopAuto() {
    // [Теория: clearInterval(id) останавливает таймер с указанным ID]
    if (timerId) clearInterval(timerId);
  }

  // [Логика: Навешиваем обработчики на кнопки. При ручном клике таймер перезапускается]
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // [Логика: Навешиваем обработчики на нижние точки]
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // [Логика: Сразу после загрузки страницы запускаем автоматическое перелистывание]
  startAuto();
}

function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => `
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
      form.reset();
      showModal('Пользователь зарегистрирован успешно!', 'login.html');
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
      showModal('Успешный вход в систему!', '../index.html');
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
    }
  });
}


// Вспомогательная функция для показа модального окна
function showModal(message, redirectUrl = null) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = '<div class="modal-content"><p>' + message + '</p><button class="btn btn-primary" id="modalCloseBtn">OK</button></div>';
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('#modalCloseBtn');
  closeBtn.addEventListener('click', () => {
    modal.remove();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
}
