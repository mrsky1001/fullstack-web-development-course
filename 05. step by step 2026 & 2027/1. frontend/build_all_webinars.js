const fs = require('fs');
const path = require('path');
const { createSvgAssets } = require('./generate_assets');

const ROOT = __dirname;

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
}

// Google Fonts snippet
const GOOGLE_FONT_HEAD = `  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

// Local font example comment
const LOCAL_FONT_COMMENT = `/* ==========================================================================
   ПРИМЕР ПОДКЛЮЧЕНИЯ ЛОКАЛЬНЫХ ШРИФТОВ (раскомментировать при наличии файлов):
   @font-face {
     font-family: 'Inter';
     src: url('../fonts/Inter-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
   }
   @font-face {
     font-family: 'Inter';
     src: url('../fonts/Inter-Bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
   }
   ========================================================================== */

`;

// CSS Modules
const CSS_BASE = LOCAL_FONT_COMMENT + `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1200px;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Шапка сайта */
.header {
  border-bottom: 1px solid #dddddd;
  padding: 18px 0;
  background-color: #ffffff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #222222;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 12px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #222222;
  padding: 8px 14px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}

.nav-link:hover {
  color: #007bff;
  background-color: #eaf2ff;
}

.nav-btn {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}

.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}

/* Основной блок */
.main {
  flex: 1;
  padding: 40px 0;
}

/* Дизайнерская типографическая секция (Hero во всю ширину) */
.hero-section {
  padding: 20px 0 50px 0;
  margin-bottom: 30px;
}

.hero-title {
  font-size: 108px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #222222;
  margin-bottom: 25px;
}

.brand-highlight {
  color: #007bff;
}

.hero-bottom {
  border-top: 2px solid #222222;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}

.hero-metrics {
  display: flex;
  align-items: center;
  gap: 25px;
}

.metric-item {
  display: flex;
  flex-direction: column;
}

.metric-val {
  font-size: 20px;
  font-weight: 800;
  color: #007bff;
  letter-spacing: -0.02em;
}

.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
}

.page-subtitle {
  color: #666666;
  text-align: center;
  font-size: 15px;
}

/* Подвал сайта */
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dddddd;
  color: #444444;
  padding: 25px 0;
  margin-top: auto;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-contacts p {
  font-size: 14px;
  margin-bottom: 4px;
}

.footer-contacts a {
  color: #007bff;
  text-decoration: none;
}
`;

const CSS_CARDS = `
/* Кнопки */
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  border-color: #007bff;
  color: #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: #ffffff;
}

/* Сетка карточек комнат */
.rooms-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.room-card {
  width: 373px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.card-img-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f4f8;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-equipment {
  list-style: none;
  margin-bottom: 15px;
  flex: 1;
}

.card-equipment li {
  font-size: 13px;
  color: #555555;
  margin-bottom: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #222222;
}

.card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}
`;

const CSS_ACTIVE_NAV = `
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}
`;

const CSS_FORMS = `
/* Стилизация форм (Регистрация и Вход) */
.form-card {
  max-width: 480px;
  margin: 30px auto 0 auto;
  padding: 25px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background-color: #ffffff;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

/* Красная подсветка поля при ошибке валидации */
.form-control.is-invalid {
  border-color: #dc3545;
  background-color: #fff8f8;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: none;
}

.form-control.is-invalid + .error-text {
  display: block;
}

.form-alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  display: none;
}

.form-alert.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  display: block;
}
`;

const CSS_SLIDER = `
/* Слайдер на главной (800x400) */
.slider-section {
  margin-bottom: 40px;
}

.slider {
  position: relative;
  width: 800px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: #f8f9fa;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;
}

.slide.active {
  opacity: 1;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn:hover {
  background-color: #007bff;
}

.slider-prev { left: 15px; }
.slider-next { right: 15px; }

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.dot.active {
  background-color: #007bff;
}
`;

const CSS_TOOLBAR_CALC = `
/* Панель поиска и сортировки в каталоге */
.catalog-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 6px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.sort-actions {
  display: flex;
  gap: 10px;
}

/* Блок калькулятора бронирования */
.calc-summary {
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calc-total {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
}
`;

const CSS_MY_BOOKINGS = `
/* Личный кабинет (Мои бронирования) */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 30px auto 0 auto;
}

.booking-item {
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 15px 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-message {
  text-align: center;
  padding: 30px;
  color: #666666;
  border: 1px dashed #dddddd;
  border-radius: 6px;
  max-width: 600px;
  margin: 30px auto 0 auto;
}
`;

// HTML Hero Component (Full-width title + Under-the-line description & metrics)
const HERO_HTML = `      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">24/7</span>
              <span class="metric-lbl">Доступ</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">от 250 ₽</span>
              <span class="metric-lbl">Почасовая аренда</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">0 ₽</span>
              <span class="metric-lbl">Без комиссии</span>
            </div>
          </div>
        </div>
      </section>`;

const POPULAR_CARDS_HTML = `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
            </div>
            <div class="card-content">
              <h3 class="card-title">Мини-офис Focus</h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <a href="pages/catalog.html" class="btn btn-primary">Подробнее</a>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
            </div>
            <div class="card-content">
              <h3 class="card-title">Конференц-зал Alpha</h3>
              <ul class="card-equipment">
                <li>Проектор 4K</li>
                <li>Спикерфон</li>
                <li>Флипчарт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <a href="pages/catalog.html" class="btn btn-primary">Подробнее</a>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
            </div>
            <div class="card-content">
              <h3 class="card-title">Опенспейс Hub</h3>
              <ul class="card-equipment">
                <li>Личный стол</li>
                <li>Wi-Fi</li>
                <li>Кофе-поинт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <a href="pages/catalog.html" class="btn btn-primary">Подробнее</a>
              </div>
            </div>
          </div>
        </div>

        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>`;

const SLIDER_HTML = `      <section class="slider-section">
        <div class="slider">
          <div class="slide active">
            <img src="img/slider-1.jpg" alt="Слайд 1" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-2.jpg" alt="Слайд 2" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-3.jpg" alt="Слайд 3" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-4.jpg" alt="Слайд 4" class="slide-img">
          </div>
          <button class="slider-btn slider-prev">‹</button>
          <button class="slider-btn slider-next">›</button>
          <div class="slider-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </section>`;

function getHeader(relPath = '', hasBookings = false) {
  const p = relPath;
  return `  <header class="header">
    <div class="container header-container">
      <a href="${p}index.html" class="logo">
        <img src="${p}img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="${p}index.html" class="nav-link active">Главная</a></li>
          <li><a href="${p}pages/catalog.html" class="nav-link">Каталог</a></li>
          ${hasBookings ? `<li><a href="${p}pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>` : ''}
          <li><a href="${p}pages/login.html" class="nav-link nav-btn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function getFooter() {
  return `  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-info">
        <p><strong>СмартОфис</strong> — Сервис бронирования офисных комнат</p>
        <p>© 2026 СмартОфис. Все права защищены.</p>
      </div>
      <div class="footer-contacts">
        <p>Email: <a href="mailto:info@smartoffice.ru">info@smartoffice.ru</a></p>
        <p>Телефон: <a href="tel:+78005553535">+7 (800) 555-35-35</a></p>
      </div>
    </div>
  </footer>`;
}

// Data.js
const DATA_JS = `// СмартОфис — Mock-данные офисных комнат
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло'],
    image: '../img/room-1.jpg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт'],
    image: '../img/room-2.jpg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    equipment: ['Личный стол', 'Wi-Fi', 'Кофе-поинт'],
    image: '../img/room-3.jpg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска'],
    image: '../img/room-4.jpg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    equipment: ['Лаунж-зона', 'Кофемашина', 'Панорамный вид'],
    image: '../img/room-5.jpg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    equipment: ['Студийный свет', 'Цветной принтер', 'Маркерная стена'],
    image: '../img/room-6.jpg',
    isPopular: false
  }
];

const MOCK_BOOKINGS = [
  {
    id: '74829',
    roomTitle: 'Мини-офис Focus',
    date: '2026-09-01',
    hours: 3,
    totalPrice: 1350
  },
  {
    id: '74830',
    roomTitle: 'Конференц-зал Alpha',
    date: '2026-09-03',
    hours: 2,
    totalPrice: 2400
  }
];
`;

// JS generator according to webinar features
function getJsForWebinar(num) {
  let inits = ['initNavigation();'];
  if (num >= 7) inits.push('initSlider();');
  if (num === 5 || num === 6 || num === 7) inits.push('renderCatalog();');
  if (num >= 8) inits.push('initCatalogFilters();', 'initBookingCalc();');
  if (num >= 9) inits.push('initMyBookings();');
  if (num >= 6) inits.push('initRegisterForm();', 'initLoginForm();');

  return `// СмартОфис — Скрипт веб-приложения (Вебинар ${num})
document.addEventListener('DOMContentLoaded', () => {
  ${inits.join('\n  ')}
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
${num >= 7 ? `
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
}` : ''}
${(num === 5 || num === 6 || num === 7) ? `
function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
    <div class="room-card">
      <div class="card-img-wrap">
        <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="card-content">
        <h3 class="card-title">\${room.title}</h3>
        <ul class="card-equipment">
          \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
        </ul>
        <div class="card-footer">
          <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
          <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
        </div>
      </div>
    </div>
  \`).join('');
}` : ''}
${num >= 8 ? `
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
    container.innerHTML = rooms.map(room => \`
      <div class="room-card">
        <div class="card-img-wrap">
          <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </div>
        <div class="card-content">
          <h3 class="card-title">\${room.title}</h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
            <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    \`).join('');
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

  roomSelect.innerHTML = OFFICE_ROOMS.map(r => \`
    <option value="\${r.id}" data-price="\${r.pricePerHour}">\${r.title} (\${r.pricePerHour} ₽/час)</option>
  \`).join('');

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
}` : ''}
${num >= 9 ? `
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }

  container.innerHTML = MOCK_BOOKINGS.map(item => \`
    <div class="booking-item">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 5px;">\${item.roomTitle}</h3>
        <div style="font-size: 13px; color: #666;">
          Дата: <strong>\${item.date}</strong> | Длительность: <strong>\${item.hours} ч.</strong> | Заявка №\${item.id}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 700; color: #007bff;">\${item.totalPrice} ₽</div>
        <span style="font-size: 12px; color: #28a745;">Подтверждено</span>
      </div>
    </div>
  \`).join('');
}` : ''}
${num >= 6 ? `
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
}` : ''}
`;
}

// Build helper for each webinar
function buildWebinar(num, folderName, options = {}) {
  const dir = path.join(ROOT, folderName);
  const hasBookings = num >= 9;
  const hasSlider = num >= 7;
  const hasCards = num >= 3;
  const hasJs = num >= 4;
  const hasData = num >= 5;
  const hasForms = num >= 6;
  const hasCatalog = num >= 5;
  const hasBookingPage = num >= 8;
  const hasMyBookingsPage = num >= 9;

  let css = CSS_BASE;
  if (hasCards) css += CSS_CARDS;
  if (hasJs) css += CSS_ACTIVE_NAV;
  if (hasForms) css += CSS_FORMS;
  if (hasSlider) css += CSS_SLIDER;
  if (num >= 8) css += CSS_TOOLBAR_CALC;
  if (num >= 9) css += CSS_MY_BOOKINGS;

  ['basic', 'with-comments'].forEach(type => {
    const bDir = path.join(dir, type);
    createSvgAssets(path.join(bDir, 'img'));
    write(path.join(bDir, 'css', 'style.css'), css);

    if (hasData) write(path.join(bDir, 'js', 'data.js'), DATA_JS);
    if (hasJs) write(path.join(bDir, 'js', 'main.js'), getJsForWebinar(num));

    // index.html
    const indexContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="css/style.css">
  ${hasData ? '<script src="js/data.js" defer></script>' : ''}
  ${hasJs ? '<script src="js/main.js" defer></script>' : ''}
</head>
<body>
${getHeader('', hasBookings)}

  <main class="main">
    <div class="container">
${HERO_HTML}
${hasSlider ? '\n' + SLIDER_HTML : ''}
${hasCards ? '\n' + POPULAR_CARDS_HTML : ''}
    </div>
  </main>

${getFooter()}
</body>
</html>`;
    write(path.join(bDir, 'index.html'), indexContent);

    // pages/catalog.html
    if (hasCatalog) {
      const catalogContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог офисов — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeader('../', hasBookings)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>

      ${num >= 8 ? `<div class="catalog-toolbar">
        <input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию офиса...">
        <div class="sort-actions">
          <button id="sortAsc" class="btn btn-outline">Цена: по возрастанию ↑</button>
          <button id="sortDesc" class="btn btn-outline">Цена: по убыванию ↓</button>
        </div>
      </div>` : ''}

      <div class="rooms-grid" id="catalogContainer"></div>
    </div>
  </main>

${getFooter()}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'catalog.html'), catalogContent);
    }

    // pages/register.html & pages/login.html
    if (hasForms) {
      const registerContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Регистрация — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeader('../', hasBookings)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Регистрация в СмартОфис</h1>
      <p class="page-subtitle">Создайте аккаунт для быстрого бронирования рабочих мест</p>

      <div class="form-card">
        <form id="registerForm" novalidate>
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="Введите логин" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="Минимум 6 символов" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="confirmPassword">Подтверждение пароля</label>
            <input type="password" id="confirmPassword" class="form-control" placeholder="Повторите пароль" required>
            <div class="error-text">Пароли не совпадают</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="fullName">ФИО</label>
            <input type="text" id="fullName" class="form-control" placeholder="Иванов Иван Иванович" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="example@mail.ru" required>
            <div class="error-text">Введите корректный email</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="phone">Телефон</label>
            <input type="tel" id="phone" class="form-control" placeholder="+7 (999) 000-00-00" required>
            <div class="error-text">Поле обязательно для заполнения</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </main>

${getFooter()}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'register.html'), registerContent);

      const loginContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Вход — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeader('../', hasBookings)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Авторизация</h1>
      <p class="page-subtitle">Войдите в личный кабинет (тестовые данные: admin / 12345)</p>

      <div class="form-card">
        <div id="loginAlert" class="form-alert"></div>
        <form id="loginForm" novalidate>
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="admin" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="12345" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Войти</button>
        </form>
      </div>
    </div>
  </main>

${getFooter()}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'login.html'), loginContent);
    }

    // pages/booking.html
    if (hasBookingPage) {
      const bookingContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Бронирование — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeader('../', hasBookings)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Оформление бронирования</h1>
      <p class="page-subtitle">Заполните параметры аренды для мгновенного бронирования</p>

      <div class="form-card">
        <form id="bookingForm">
          <div class="form-group">
            <label class="form-label" for="roomSelect">Выберите комнату</label>
            <select id="roomSelect" class="form-control" required></select>
          </div>

          <div class="form-group">
            <label class="form-label" for="bookingDate">Дата бронирования</label>
            <input type="date" id="bookingDate" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="hoursInput">Количество часов</label>
            <input type="number" id="hoursInput" class="form-control" min="1" max="24" value="2" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="commentInput">Комментарий (необязательно)</label>
            <textarea id="commentInput" class="form-control" rows="3" placeholder="Пожелания к рассадке, оборудованию..."></textarea>
          </div>

          <div class="calc-summary">
            <div>
              <div>Тариф: <span id="pricePerHour">0 ₽</span>/час</div>
              <div style="font-size: 12px; color: #666;">Без скрытых комиссий</div>
            </div>
            <div class="calc-total" id="totalPrice">0 ₽</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Забронировать</button>
        </form>
      </div>
    </div>
  </main>

${getFooter()}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'booking.html'), bookingContent);
    }

    // pages/my-bookings.html
    if (hasMyBookingsPage) {
      const myBookingsContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мои бронирования — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeader('../', true)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Мои бронирования</h1>
      <p class="page-subtitle">История ваших заявок на аренду рабочих пространств</p>

      <div class="bookings-list" id="myBookingsList"></div>
    </div>
  </main>

${getFooter()}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'my-bookings.html'), myBookingsContent);
    }
  });

  // README.md
  write(path.join(dir, 'README.md'), `# Вебинар ${num}. ${options.title || ''}\n\n## 📋 Описание занятия\n- **Тема:** ${options.theme || ''}\n`);
}

// Generate all 8 lessons (Webinars 2 to 9)
buildWebinar(2, 'webinar-02-markup-and-styles', { title: 'Основы разметки и стилизации', theme: 'Семантическая разметка HTML5, шрифт Inter, чистый типографический Hero-блок, шапка и подвал.' });
buildWebinar(3, 'webinar-03-flexbox-grid-cards', { title: 'Современные методы верстки', theme: 'Секция «Популярные офисные комнаты», Flexbox-карточки, стилизация картинок, кнопки.' });
buildWebinar(4, 'webinar-04-js-dom-navigation', { title: 'Введение в программирование интерфейсов', theme: 'Подключение JS, подсветка активной ссылки в навигации.' });
buildWebinar(5, 'webinar-05-dynamic-catalog-data', { title: 'Работа с динамическими данными', theme: 'Массивы объектов data.js, генерация каталога через map() и шаблонные строки.' });
buildWebinar(6, 'webinar-06-forms-validation', { title: 'Клиентская валидация форм', theme: 'Страницы регистрации и входа, валидация полей, класс is-invalid, уведомления.' });
buildWebinar(7, 'webinar-07-slider-timers', { title: 'Функциональный подход и таймеры', theme: 'Слайдер 800x400 на главной, автосмена 3 сек, кнопки переключения, точки.' });
buildWebinar(8, 'webinar-08-filters-and-booking-calc', { title: 'Интерактивная логика и расчеты', theme: 'Поиск и сортировка в каталоге, интерактивный калькулятор на странице бронирования.' });
buildWebinar(9, 'webinar-09-final-assembly-my-bookings', { title: 'Итоговая сборка и ревью проекта', theme: 'Страница «Мои бронирования», интеграция всех страниц, чек-лист экзамена.' });

console.log('SUCCESSFULLY REBUILT ALL WEBINARS MODULARLY!');
