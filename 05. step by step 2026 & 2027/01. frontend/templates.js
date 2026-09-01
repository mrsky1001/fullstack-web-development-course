const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
}

// -------------------------------------------------------------
// HTML Snippets (Clean Light Theme)
// -------------------------------------------------------------
function getHeader(relPath = '', activePage = 'home') {
  const p = relPath;
  return `  <header class="header">
    <div class="container header-container">
      <a href="${p}index.html" class="logo">
        <img src="${p}img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="${p}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Главная</a></li>
          <li><a href="${p}pages/catalog.html" class="nav-link ${activePage === 'catalog' ? 'active' : ''}">Каталог</a></li>
          <li><a href="${p}pages/login.html" class="nav-link nav-btn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function getHeaderFinal(relPath = '', activePage = 'home') {
  const p = relPath;
  return `  <header class="header">
    <div class="container header-container">
      <a href="${p}index.html" class="logo">
        <img src="${p}img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="${p}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Главная</a></li>
          <li><a href="${p}pages/catalog.html" class="nav-link ${activePage === 'catalog' ? 'active' : ''}">Каталог</a></li>
          <li><a href="${p}pages/my-bookings.html" class="nav-link ${activePage === 'my-bookings' ? 'active' : ''}">Мои бронирования</a></li>
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

// -------------------------------------------------------------
// MINIMAL LIGHT CSS (3 Colors: White, Black, Blue)
// -------------------------------------------------------------
const CSS_SIMPLE = `/* СмартОфис — Минимальные стили (Светлая тема: белый, черный, голубой) */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Шапка */
.header {
  border-bottom: 1px solid #dddddd;
  padding: 15px 0;
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
  font-weight: bold;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 15px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #222222;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-link:hover,
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}

.nav-btn {
  background-color: #007bff;
  color: #ffffff;
}

.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}

/* Контент */
.main {
  flex: 1;
  padding: 30px 0;
}

.page-title {
  font-size: 26px;
  margin-bottom: 10px;
  text-align: center;
}

.page-subtitle {
  color: #666666;
  text-align: center;
  margin-bottom: 30px;
}

/* Кнопки */
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
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

/* Слайдер (800x400) */
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

/* Сетка карточек */
.rooms-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
  font-weight: bold;
  color: #222222;
}

.card-price span {
  font-size: 13px;
  font-weight: normal;
  color: #666666;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}

/* Панель каталога */
.catalog-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
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
}

.sort-actions {
  display: flex;
  gap: 10px;
}

/* Формы */
.form-card {
  max-width: 480px;
  margin: 0 auto;
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
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
}

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
  font-weight: bold;
  color: #007bff;
}

/* Личный кабинет */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
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
}

/* Подвал */
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

// -------------------------------------------------------------
// DATA JS
// -------------------------------------------------------------
const DATA_JS_BASIC = `// СмартОфис — База mock-данных
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло'],
    image: '../img/room-1.svg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт'],
    image: '../img/room-2.svg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    equipment: ['Личный стол', 'Wi-Fi', 'Кофе-поинт'],
    image: '../img/room-3.svg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска'],
    image: '../img/room-4.svg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    equipment: ['Лаунж-зона', 'Кофемашина', 'Панорамный вид'],
    image: '../img/room-5.svg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    equipment: ['Студийный свет', 'Цветной принтер', 'Маркерная стена'],
    image: '../img/room-6.svg',
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

const DATA_JS_COMMENTS = `/**
 * ============================================================================
 * СмартОфис — База mock-данных (с комментариями)
 * Имитирует данные с сервера для каталога и личного кабинета
 * ============================================================================
 */

// Массив объектов офисных комнат для каталога
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло'],
    image: '../img/room-1.svg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт'],
    image: '../img/room-2.svg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    equipment: ['Личный стол', 'Wi-Fi', 'Кофе-поинт'],
    image: '../img/room-3.svg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска'],
    image: '../img/room-4.svg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    equipment: ['Лаунж-зона', 'Кофемашина', 'Панорамный вид'],
    image: '../img/room-5.svg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    equipment: ['Студийный свет', 'Цветной принтер', 'Маркерная стена'],
    image: '../img/room-6.svg',
    isPopular: false
  }
];

// Массив mock-данных для страницы «Мои бронирования»
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

module.exports = {
  ROOT,
  write,
  getHeader,
  getHeaderFinal,
  getFooter,
  CSS_SIMPLE,
  DATA_JS_BASIC,
  DATA_JS_COMMENTS
};
