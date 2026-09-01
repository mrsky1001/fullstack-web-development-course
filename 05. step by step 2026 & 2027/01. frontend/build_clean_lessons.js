const fs = require('fs');
const path = require('path');
const { createSvgAssets } = require('./generate_assets');

const ROOT = __dirname;

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// 16px/18px monochrome SVG open-link icon for details button
const LINK_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

// =============================================================================
// 1. CSS MODULES (Basic and With-Comments)
// =============================================================================

const GOOGLE_FONT_HEAD = `  <!-- Подключение шрифта Inter через Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

const CSS_BASE_CLEAN = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
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

/* Главный баннер (Hero) */
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

/* Всплывающие уведомления (Toast) справа внизу */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast {
  min-width: 280px;
  max-width: 380px;
  padding: 14px 18px;
  background-color: #222222;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: toastFadeIn 0.3s ease;
  pointer-events: auto;
}

.toast.toast-success {
  border-left: 4px solid #28a745;
}

.toast.toast-danger {
  border-left: 4px solid #dc3545;
}

.toast.toast-info {
  border-left: 4px solid #007bff;
}

@keyframes toastFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const CSS_BASE_COMMENTS = `/* ==========================================================================
   СБРОС СТИЛЕЙ И БАЗОВЫЕ НАСТРОЙКИ
   ========================================================================== */

/* [Теория: Селектор * выбирает абсолютно все элементы на странице] */
/* [Логика: Сбрасываем стандартные отступы браузера, чтобы верстка выглядела одинаково во всех браузерах] */
* {
  /* [Теория: box-sizing: border-box включает внутренние отступы (padding) и рамки (border) в ширину элемента] */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* [Теория: Тег body — тело веб-страницы] */
/* [Логика: Задаем базовый шрифт Inter, основной темный цвет текста и прижимаем подвал к низу экрана] */
body {
  font-family: 'Inter', sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  /* Flexbox-раскладка для прижатия футера к низу: */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1200px;
}

/* [Теория: Класс .container ограничивает ширину контента и центрирует его] */
/* [Логика: Контент сайта не разъезжается на широких мониторах, а аккуратно держится в ширине 1200px] */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* ==========================================================================
   ШАПКА САЙТА (HEADER)
   ========================================================================== */
.header {
  border-bottom: 1px solid #dddddd;
  padding: 18px 0;
  background-color: #ffffff;
}

.header-container {
  display: flex;
  /* [Теория: justify-content: space-between разносит элементы к левому и правому краям] */
  justify-content: space-between;
  /* [Теория: align-items: center выравнивает логотип и меню по центру вертикали] */
  align-items: center;
}

/* [Логика: Ссылка-логотип «СмартОфис» с векторной иконкой] */
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

/* [Логика: Список ссылок в главном меню] */
.nav-list {
  display: flex;
  list-style: none; /* Убираем точки у списка */
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

/* [Теория: Псевдокласс :hover срабатывает при наведении курсора мыши] */
.nav-link:hover {
  color: #007bff;
  background-color: #eaf2ff;
}

/* [Логика: Акцентная кнопка «Войти» в шапке] */
.nav-btn {
  background-color: #007bff;
  color: #ffffff;
  font-weight: 600;
}

.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}

/* ==========================================================================
   ОСНОВНОЕ СОДЕРЖИМОЕ (MAIN & HERO)
   ========================================================================== */
.main {
  flex: 1; /* Растягивает блок main на все доступное пространство страницы */
  padding: 40px 0;
}

/* [Логика: Главная презентационная секция Hero] */
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

/* ==========================================================================
   ПОДВАЛ САЙТА (FOOTER)
   ========================================================================== */
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dddddd;
  color: #444444;
  padding: 25px 0;
  margin-top: auto; /* Прижимает футер к низу */
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

/* ==========================================================================
   ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (TOAST) СПРАВА ВНИЗУ
   ========================================================================== */
/* [Теория: position: fixed прикрепляет контейнер к экрану независимо от прокрутки] */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast {
  min-width: 280px;
  max-width: 380px;
  padding: 14px 18px;
  background-color: #222222;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: toastFadeIn 0.3s ease;
  pointer-events: auto;
}

.toast.toast-success {
  border-left: 4px solid #28a745;
}

.toast.toast-danger {
  border-left: 4px solid #dc3545;
}

.toast.toast-info {
  border-left: 4px solid #007bff;
}

@keyframes toastFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const CSS_CARDS_CLEAN = `
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

/* Кнопка-иконка (например, «Подробнее») */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: transparent;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.btn-icon:hover {
  background-color: #eaf2ff;
  color: #0056b3;
  border-color: #0056b3;
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
  gap: 10px;
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

.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}
`;

const CSS_CARDS_COMMENTS = `
/* ==========================================================================
   КОМПОНЕНТ КНОПОК (.btn)
   ========================================================================== */
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

/* [Логика: Кнопка-иконка для компактного перехода к деталям] */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: transparent;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.btn-icon:hover {
  background-color: #eaf2ff;
  color: #0056b3;
  border-color: #0056b3;
}

/* ==========================================================================
   СЕТКА И КАРТОЧКИ ОФИСНЫХ КОМНАТ
   ========================================================================== */
/* [Теория: flex-wrap: wrap позволяет карточкам переноситься на следующую строку] */
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

/* [Теория: object-fit: cover масштабирует картинку с сохранением пропорций без сплющивания] */
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
  gap: 10px;
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

.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center-action {
  text-align: center;
  margin-top: 20px;
}
`;

const CSS_ACTIVE_NAV_CLEAN = `
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}
`;

const CSS_ACTIVE_NAV_COMMENTS = `
/* [Логика: Класс .active подсвечивает пункт меню страницы, на которой сейчас находится пользователь] */
.nav-link.active {
  color: #007bff;
  background-color: #eaf2ff;
}
`;

const CSS_ROOM_DETAILS_CLEAN = `
/* Страница описания комнаты (room-details.html) */
.room-details-card {
  display: flex;
  gap: 40px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 30px;
  margin-top: 20px;
}

.room-details-gallery {
  flex: 1;
  max-width: 550px;
  height: 380px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f0f4f8;
}

.room-details-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.room-details-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.room-details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}

.room-details-title {
  font-size: 26px;
  font-weight: 800;
  color: #222222;
}

.room-details-price {
  font-size: 24px;
  font-weight: 800;
  color: #007bff;
}

.room-details-price span {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.room-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.room-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 13px;
  color: #555555;
  font-weight: 500;
}

.room-badge.badge-popular {
  background-color: #eaf2ff;
  border-color: #007bff;
  color: #007bff;
  font-weight: 600;
}

.room-description {
  font-size: 15px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 25px;
}

.room-specs {
  margin-bottom: 30px;
}

.room-specs h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.room-details-actions {
  display: flex;
  gap: 15px;
  margin-top: auto;
}
`;

const CSS_ROOM_DETAILS_COMMENTS = `
/* ==========================================================================
   СТРАНИЦА ОПИСАНИЯ КОМНАТЫ (room-details.html)
   ========================================================================== */
.room-details-card {
  display: flex;
  gap: 40px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 30px;
  margin-top: 20px;
}

.room-details-gallery {
  flex: 1;
  max-width: 550px;
  height: 380px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f0f4f8;
}

.room-details-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.room-details-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.room-details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}

.room-details-title {
  font-size: 26px;
  font-weight: 800;
  color: #222222;
}

.room-details-price {
  font-size: 24px;
  font-weight: 800;
  color: #007bff;
}

.room-details-price span {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.room-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.room-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 13px;
  color: #555555;
  font-weight: 500;
}

.room-badge.badge-popular {
  background-color: #eaf2ff;
  border-color: #007bff;
  color: #007bff;
  font-weight: 600;
}

.room-description {
  font-size: 15px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 25px;
}

.room-specs {
  margin-bottom: 30px;
}

.room-specs h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.room-details-actions {
  display: flex;
  gap: 15px;
  margin-top: auto;
}
`;

const CSS_FORMS_CLEAN = `
/* Формы регистрации и входа */
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

const CSS_FORMS_COMMENTS = `
/* ==========================================================================
   СТИЛИЗАЦИЯ ФОРМ (ВХОД И РЕГИСТРАЦИЯ)
   ========================================================================== */
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

/* [Логика: Класс .is-invalid добавляется через JS, если пользователь ввел некорректные данные] */
.form-control.is-invalid {
  border-color: #dc3545;
  background-color: #fff8f8;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: none; /* Скрыт по умолчанию */
}

/* [Теория: Селектор со знаком + выбирает соседний элемент, идущий сразу после .is-invalid] */
.form-control.is-invalid + .error-text {
  display: block; /* Показываем подсказку об ошибке */
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

const CSS_SLIDER_CLEAN = `
/* Слайдер на главной */
.slider-section {
  margin-bottom: 40px;
}

.slider {
  position: relative;
  width: 100%;
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

const CSS_SLIDER_COMMENTS = `
/* ==========================================================================
   СЛАЙДЕР ИЗОБРАЖЕНИЙ НА ГЛАВНОЙ
   ========================================================================== */
.slider-section {
  margin-bottom: 40px;
}

.slider {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: #f8f9fa;
}

/* [Теория: position: absolute накладывает слайды друг на друга в одной точке] */
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* Невидимый по умолчанию */
  transition: opacity 0.3s; /* Плавное проявление за 0.3 секунды */
}

/* [Логика: Класс .active делает текущий слайд видимым] */
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

const CSS_TOOLBAR_CALC_CLEAN = `
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

/* Калькулятор стоимости на странице бронирования */
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

const CSS_TOOLBAR_CALC_COMMENTS = `
/* ==========================================================================
   ПАНЕЛЬ ПОИСКА И СОРТИРОВКИ (КАТАЛОГ)
   ========================================================================== */
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

/* ==========================================================================
   КАЛЬКУЛЯТОР БРОНИРОВАНИЯ (BOOKING)
   ========================================================================== */
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

const CSS_MY_BOOKINGS_CLEAN = `
/* Мои бронирования */
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

const CSS_MY_BOOKINGS_COMMENTS = `
/* ==========================================================================
   ЛИЧНЫЙ КАБИНЕТ: МОИ БРОНИРОВАНИЯ
   ========================================================================== */
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

// =============================================================================
// 2. DATA.JS
// =============================================================================

const DATA_JS_CLEAN = `// СмартОфис — База данных офисных комнат и бронирований
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    capacity: '1-2 человека',
    area: '12 м²',
    description: 'Идеальное тихое пространство для индивидуальной работы, важных звонков и глубокой концентрации. Оснащено эргономичной мебелью и монитором высокой четкости.',
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло', 'Климат-контроль'],
    image: '../img/room-1.jpg',
    isPopular: true
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    capacity: 'до 15 человек',
    area: '45 м²',
    description: 'Просторный зал для проведения презентаций, совещаний с партнерами и командных брейнштормов с современным мультимедиа-оборудованием.',
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт', 'Аудиосистема'],
    image: '../img/room-2.jpg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    capacity: '1 человек',
    area: 'Рабочее место',
    description: 'Удобное выделенное рабочее место в современном открытом пространстве с доступом к зоне отдыха и кофе-поинту.',
    equipment: ['Личный стол', 'Wi-Fi 500 Мбит/с', 'Розетки 220V и USB', 'Кофе-поинт'],
    image: '../img/room-3.jpg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    capacity: 'до 4 человек',
    area: '16 м²',
    description: 'Компактная переговорная комната для встреч тет-а-тет или работы мини-команды. Оснащена Smart TV и удобной маркерной доской.',
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска', 'Кулер с водой'],
    image: '../img/room-4.jpg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    capacity: 'до 6 человек',
    area: '35 м²',
    description: 'Представительский офис повышенной комфортности с отдельной лаунж-зоной, кофемашиной и панорамным видом на город.',
    equipment: ['Лаунж-зона', 'Кофемашина Nespresso', 'Панорамный вид', 'Сейф'],
    image: '../img/room-5.jpg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    capacity: 'до 8 человек',
    area: '28 м²',
    description: 'Креативная мастерская для дизайнеров, архитекторов и разработчиков со студийным светом и большой магнитно-маркерной стеной.',
    equipment: ['Студийный свет', 'Цветной принтер A3', 'Маркерная стена', 'Высокие столы'],
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

const DATA_JS_COMMENTS = `// СмартОфис — База данных офисных комнат и бронирований

// [Теория: Массив объектов [] — это упорядоченный список, где каждый элемент {} хранит характеристики конкретного объекта]
// [Логика: Наш каталог офисных комнат. Вместо сложного сервера мы храним список комнат прямо в JS]
const OFFICE_ROOMS = [
  {
    id: 'focus-1',                          // Уникальный идентификатор комнаты
    title: 'Мини-офис Focus',              // Название офиса
    pricePerHour: 450,                     // Цена аренды за один час (в рублях)
    capacity: '1-2 человека',              // Вместимость помещения
    area: '12 м²',                         // Площадь комнаты
    description: 'Идеальное тихое пространство для индивидуальной работы, важных звонков и глубокой концентрации. Оснащено эргономичной мебелью и монитором высокой четкости.',
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло', 'Климат-контроль'], // Массив удобств
    image: '../img/room-1.jpg',            // Путь к фотографии комнаты
    isPopular: true                        // Отметка, популярна ли комната
  },
  {
    id: 'alpha-2',
    title: 'Конференц-зал Alpha',
    pricePerHour: 1200,
    capacity: 'до 15 человек',
    area: '45 м²',
    description: 'Просторный зал для проведения презентаций, совещаний с партнерами и командных брейнштормов с современным мультимедиа-оборудованием.',
    equipment: ['Проектор 4K', 'Спикерфон', 'Флипчарт', 'Аудиосистема'],
    image: '../img/room-2.jpg',
    isPopular: true
  },
  {
    id: 'hub-3',
    title: 'Опенспейс Hub',
    pricePerHour: 250,
    capacity: '1 человек',
    area: 'Рабочее место',
    description: 'Удобное выделенное рабочее место в современном открытом пространстве с доступом к зоне отдыха и кофе-поинту.',
    equipment: ['Личный стол', 'Wi-Fi 500 Мбит/с', 'Розетки 220V и USB', 'Кофе-поинт'],
    image: '../img/room-3.jpg',
    isPopular: true
  },
  {
    id: 'solo-4',
    title: 'Переговорная Solo',
    pricePerHour: 600,
    capacity: 'до 4 человек',
    area: '16 м²',
    description: 'Компактная переговорная комната для встреч тет-а-тет или работы мини-команды. Оснащена Smart TV и удобной маркерной доской.',
    equipment: ['Звукоизоляция', 'Smart TV 55"', 'Маркерная доска', 'Кулер с водой'],
    image: '../img/room-4.jpg',
    isPopular: false
  },
  {
    id: 'exec-5',
    title: 'Премиум Сьют Executive',
    pricePerHour: 1800,
    capacity: 'до 6 человек',
    area: '35 м²',
    description: 'Представительский офис повышенной комфортности с отдельной лаунж-зоной, кофемашиной и панорамным видом на город.',
    equipment: ['Лаунж-зона', 'Кофемашина Nespresso', 'Панорамный вид', 'Сейф'],
    image: '../img/room-5.jpg',
    isPopular: false
  },
  {
    id: 'studio-6',
    title: 'Творческая студия Design',
    pricePerHour: 850,
    capacity: 'до 8 человек',
    area: '28 м²',
    description: 'Креативная мастерская для дизайнеров, архитекторов и разработчиков со студийным светом и большой магнитно-маркерной стеной.',
    equipment: ['Студийный свет', 'Цветной принтер A3', 'Маркерная стена', 'Высокие столы'],
    image: '../img/room-6.jpg',
    isPopular: false
  }
];

// [Логика: Список готовых бронирований для отображения на странице «Мои бронирования»]
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

// =============================================================================
// 3. JAVASCRIPT GENERATOR (Clean vs With-Comments)
// =============================================================================

function getJsContent(webinarNum, withComments = false) {
  const hasSlider = webinarNum >= 7;
  const hasCatalog = webinarNum === 5 || webinarNum === 6 || webinarNum === 7;
  const hasFiltersAndCalc = webinarNum >= 8;
  const hasRoomDetails = webinarNum >= 5;
  const hasMyBookings = webinarNum >= 9;
  const hasForms = webinarNum >= 6;

  let inits = ['initNavigation();'];
  if (hasSlider) inits.push('initSlider();');
  if (hasCatalog) inits.push('renderCatalog();');
  if (hasFiltersAndCalc) inits.push('initCatalogFilters();', 'initBookingCalc();');
  if (hasRoomDetails) inits.push('initRoomDetails();');
  if (hasMyBookings) inits.push('initMyBookings();');
  if (hasForms) inits.push('initRegisterForm();', 'initLoginForm();');

  if (!withComments) {
    // Чистая версия для basic
    return `// СмартОфис — Скрипт веб-приложения (Вебинар ${webinarNum})
document.addEventListener('DOMContentLoaded', () => {
  ${inits.join('\n  ')}
});

// Функция всплывающих уведомлений (Toast) справа внизу
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
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

  updateAuthNav();
}

function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}
${hasSlider ? `
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
${hasCatalog ? `
function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => \`
    <div class="room-card">
      <div class="card-img-wrap">
        <a href="room-details.html?id=\${room.id}">
          <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </a>
      </div>
      <div class="card-content">
        <h3 class="card-title">
          <a href="room-details.html?id=\${room.id}" style="text-decoration: none; color: inherit;">\${room.title}</a>
        </h3>
        <ul class="card-equipment">
          \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
        </ul>
        <div class="card-footer">
          <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
          <div class="card-btns">
            <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
            <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  \`).join('');
}` : ''}
${hasFiltersAndCalc ? `
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
          <a href="room-details.html?id=\${room.id}">
            <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="room-details.html?id=\${room.id}" style="text-decoration: none; color: inherit;">\${room.title}</a>
          </h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
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
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');

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
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value);
    const bookingDate = document.getElementById('bookingDate').value || '2026-09-01';
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;

    if (typeof MOCK_BOOKINGS !== 'undefined') {
      MOCK_BOOKINGS.unshift({
        id: String(appNumber),
        roomTitle: selectedRoom ? selectedRoom.title : 'Офис',
        date: bookingDate,
        hours: hours,
        totalPrice: total
      });
    }

    showNotification('Бронирование создано! Номер заявки: №' + appNumber, 'success');
    form.reset();
    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}` : ''}
${hasRoomDetails ? `
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = \`
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    \`;
    return;
  }

  container.innerHTML = \`
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="\${room.image}" alt="\${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">\${room.title}</h1>
          <div class="room-details-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">\${room.capacity}</span>
          <span class="room-badge">\${room.area}</span>
          \${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">\${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=\${room.id}" class="btn btn-primary" style="padding: 10px 20px; font-size: 15px;">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline" style="padding: 10px 18px; font-size: 15px;">← Назад в каталог</a>
        </div>
      </div>
    </div>
  \`;
}` : ''}
${hasMyBookings ? `
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // Если пользователь не вошел в систему — перенаправляем на страницу входа
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

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
${hasForms ? `
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
      showNotification('Пользователь зарегистрирован успешно!', 'success');
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
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
      localStorage.setItem('currentUser', login);
      if (alertBox) alertBox.style.display = 'none';
      showNotification('Успешный вход в систему!', 'success');
      setTimeout(() => {
        window.location.href = 'my-bookings.html';
      }, 1000);
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
      showNotification('Неверный логин или пароль', 'danger');
    }
  });
}` : ''}
`;
  }

  // Версия с подробными комментариями (with-comments)
  return `// СмартОфис — Скрипт веб-приложения (Вебинар ${webinarNum})

// [Теория: Событие 'DOMContentLoaded' срабатывает, когда браузер полностью построил HTML-дерево страницы]
// [Логика: Мы запускаем функции только после того, как все теги загружены и готовы к работе]
document.addEventListener('DOMContentLoaded', () => {
  ${inits.join('\n  ')}
});

// [Теория: Всплывающие уведомления (Toast) — это элементы, которые создаются через createElement и плавно исчезают через таймер]
// [Логика: Показываем красивое всплывающее сообщение в правом нижнем углу вместо устаревшего alert()]
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;

  container.appendChild(toast);

  // [Теория: setTimeout выполняет действие через указанное время (3500 мс = 3.5 секунды)]
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300); // Удаляем из DOM после плавного угасания
  }, 3500);
}

// [Теория: Функция — это многократно используемый блок кода, решающий одну понятную задачу]
// [Логика: Функция подсвечивает пункт меню той страницы, на которой сейчас находится пользователь]
function initNavigation() {
  // [Теория: document.querySelectorAll находит ВСЕ элементы с указанным CSS-классом]
  const links = document.querySelectorAll('.nav-link');
  // [Теория: window.location.pathname возвращает путь текущей страницы в строке браузера]
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Сначала снимаем активный класс со всех ссылок
    link.classList.remove('active');

    // Проверяем, совпадает ли адрес ссылки с текущей страницей
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
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

  updateAuthNav();
}

// [Теория: localStorage — встроенное хранилище браузера, позволяющее сохранять данные между страницами]
// [Логика: Обновляем меню в зависимости от того, вошел ли пользователь в систему]
function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    // Если пользователь вошел — показываем пункт «Мои бронирования» и меняем кнопку на «Выйти»
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser'); // Удаляем сохраненную авторизацию
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    // Если пользователь не вошел — скрываем «Мои бронирования» и показываем кнопку «Войти»
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}
${hasSlider ? `
// [Теория: Таймеры setInterval позволяют выполнять действие повторно через заданный интервал времени (в миллисекундах)]
// [Логика: Инициализируем интерактивный слайдер картинок с автосменой каждые 3 секунды]
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return; // Если слайдера нет на странице, ничего не делаем

  let currentSlide = 0; // Индекс текущего видимого слайда (от 0 до 3)
  let timerId = null;   // Хранилище идентификатора таймера

  // Функция переключения активного слайда
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;       // Если дошли до конца — идем в начало
    else if (index < 0) currentSlide = slides.length - 1; // Если идем назад от 0 — идем в конец
    else currentSlide = index;

    // [Теория: classList.toggle('active', условие) добавляет класс если условие истинно, и удаляет если ложно]
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // [Логика: Запуск автоматической прокрутки каждые 3 секунды (3000 мс)]
  function startAuto() {
    stopAuto(); // Сначала очищаем предыдущий таймер, чтобы они не дублировались
    timerId = setInterval(next, 3000);
  }

  // [Теория: clearInterval останавливает ранее запущенный интервал]
  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  // Обработчики кликов по кнопкам «‹» и «›»
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Обработчики кликов по нижним точкам-индикаторам
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // Запускаем автопрокрутку при загрузке
  startAuto();
}` : ''}
${hasCatalog ? `
// [Теория: Динамическая отрисовка (рендеринг) — это создание HTML-разметки из данных массива прямо в браузере]
// [Логика: Проходим по массиву OFFICE_ROOMS и создаем карточки комнат в каталоге]
function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Метод map() трансформирует каждый объект комнаты в кусок HTML-кода]
  // [Теория: Метод join('') склеивает массив получившихся строк в одну большую строку]
  container.innerHTML = OFFICE_ROOMS.map(room => \`
    <div class="room-card">
      <div class="card-img-wrap">
        <a href="room-details.html?id=\${room.id}">
          <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </a>
      </div>
      <div class="card-content">
        <h3 class="card-title">
          <a href="room-details.html?id=\${room.id}" style="text-decoration: none; color: inherit;">\${room.title}</a>
        </h3>
        <ul class="card-equipment">
          \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
        </ul>
        <div class="card-footer">
          <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
          <div class="card-btns">
            <!-- [Логика: Кнопка-иконка для перехода на страницу детального описания] -->
            <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
            <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  \`).join('');
}` : ''}
${hasFiltersAndCalc ? `
// [Логика: Поиск по названию и сортировка комнат по цене]
function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Оператор spread [...] создает независимую копию массива, чтобы сортировка не ломала исходные данные]
  let displayedRooms = [...OFFICE_ROOMS];

  // Внутренняя функция для вывода отфильтрованного списка
  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    container.innerHTML = rooms.map(room => \`
      <div class="room-card">
        <div class="card-img-wrap">
          <a href="room-details.html?id=\${room.id}">
            <img src="\${room.image}" alt="\${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="room-details.html?id=\${room.id}" style="text-decoration: none; color: inherit;">\${room.title}</a>
          </h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <!-- [Логика: Кнопка-иконка подробного просмотра] -->
              <a href="room-details.html?id=\${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
              <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }

  // [Теория: Метод filter() оставляет только те элементы, которые подходят под условие]
  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  // [Теория: Метод sort((a,b) => a - b) сортирует числа по возрастанию]
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  // [Теория: Метод sort((a,b) => b - a) сортирует числа по убыванию]
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  // Первичный вывод комнат при загрузке
  render(displayedRooms);
}

// [Логика: Интерактивный калькулятор стоимости бронирования]
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: window.location.href перенаправляет пользователя на другую страницу]
  // [Логика: Если пользователь не вошел в систему, сразу перенаправляем на форму авторизации]
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');

  // Заполняем выпадающий список <select> всеми доступными комнатами
  roomSelect.innerHTML = OFFICE_ROOMS.map(r => \`
    <option value="\${r.id}" data-price="\${r.pricePerHour}">\${r.title} (\${r.pricePerHour} ₽/час)</option>
  \`).join('');

  // [Теория: URLSearchParams позволяет легко прочитать параметр ?room=id из адресной строки]
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

  // [Логика: Функция мгновенного пересчета цены: тариф × количество часов]
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
  updatePrice(); // Считаем цену сразу при открытии страницы

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Запрещаем перезагрузку страницы
    const appNumber = Math.floor(10000 + Math.random() * 90000); // Генерируем 5-значный номер заявки
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value);
    const bookingDate = document.getElementById('bookingDate').value || '2026-09-01';
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;

    // Добавляем созданное бронирование в список MOCK_BOOKINGS
    if (typeof MOCK_BOOKINGS !== 'undefined') {
      MOCK_BOOKINGS.unshift({
        id: String(appNumber),
        roomTitle: selectedRoom ? selectedRoom.title : 'Офис',
        date: bookingDate,
        hours: hours,
        totalPrice: total
      });
    }

    showNotification('Бронирование создано! Номер заявки: №' + appNumber, 'success');
    form.reset();
    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}` : ''}
${hasRoomDetails ? `
// [Логика: Отображение подробной информации о комнате на странице room-details.html]
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Считываем параметр ?id=... из адресной строки]
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  
  // [Теория: Метод find() ищет первый элемент массива, удовлетворяющий условию]
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = \`
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    \`;
    return;
  }

  // Формируем подробную карточку выбранной комнаты
  container.innerHTML = \`
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="\${room.image}" alt="\${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">\${room.title}</h1>
          <div class="room-details-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">\${room.capacity}</span>
          <span class="room-badge">\${room.area}</span>
          \${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">\${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=\${room.id}" class="btn btn-primary" style="padding: 10px 20px; font-size: 15px;">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline" style="padding: 10px 18px; font-size: 15px;">← Назад в каталог</a>
        </div>
      </div>
    </div>
  \`;
}` : ''}
${hasMyBookings ? `
// [Логика: Отображение списка бронирований на странице «Мои бронирования»]
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // [Теория: window.location.href перенаправляет на страницу авторизации]
  // [Логика: Если пользователь не вошел в систему, сразу перенаправляем на login.html]
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

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
${hasForms ? `
// [Логика: Валидация полей формы регистрации]
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Запрещаем стандартную отправку
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    
    // Проверяем каждое поле на заполненность
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

    // Проверяем совпадение пароля и подтверждения пароля
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    // Если все поля заполнены корректно — сообщаем об успехе всплывающим уведомлением
    if (isValid) {
      showNotification('Пользователь зарегистрирован успешно!', 'success');
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }
  });
}

// [Логика: Проверка авторизации на форме входа и сохранение в localStorage]
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    // Проверяем тестовые данные (admin / 12345)
    if (login === 'admin' && pass === '12345') {
      // Сохраняем имя вошедшего пользователя в localStorage
      localStorage.setItem('currentUser', login);
      if (alertBox) alertBox.style.display = 'none';
      showNotification('Успешный вход в систему!', 'success');
      setTimeout(() => {
        window.location.href = 'my-bookings.html';
      }, 1000);
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
      showNotification('Неверный логин или пароль', 'danger');
    }
  });
}` : ''}
`;
}

// =============================================================================
// 4. HTML SNIPPETS
// =============================================================================

function getHeaderHtml(relPath = '', hasBookings = false, withComments = false) {
  const p = relPath;
  if (!withComments) {
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
          ${hasBookings ? `<li id="myBookingsNavItem" style="display: none;"><a href="${p}pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>` : ''}
          <li><a href="${p}pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
  }

  return `  <!-- [Теория: Семантический тег header обозначает верхнюю шапку сайта] -->
  <header class="header">
    <div class="container header-container">
      <!-- [Логика: Логотип ведет на главную страницу при клике] -->
      <a href="${p}index.html" class="logo">
        <img src="${p}img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <!-- [Теория: Тег nav группирует навигационные ссылки] -->
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="${p}index.html" class="nav-link active">Главная</a></li>
          <li><a href="${p}pages/catalog.html" class="nav-link">Каталог</a></li>
          ${hasBookings ? `<li id="myBookingsNavItem" style="display: none;"><a href="${p}pages/my-bookings.html" class="nav-link">Мои бронирования</a></li>` : ''}
          <li><a href="${p}pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function getFooterHtml(withComments = false) {
  if (!withComments) {
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

  return `  <!-- [Теория: Семантический тег footer обозначает подвал страницы с контактами и копирайтом] -->
  <footer class="footer">
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

function getHeroHtml(withComments = false) {
  if (!withComments) {
    return `      <section class="hero-section">
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
  }

  return `      <!-- [Логика: Главный баннер (Hero-блок) с ключевым предложением и преимуществами] -->
      <section class="hero-section">
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
}

function getPopularCardsHtml(webinarNum, withComments = false) {
  const l1 = webinarNum >= 5 ? 'pages/room-details.html?id=focus-1' : 'pages/catalog.html';
  const l2 = webinarNum >= 5 ? 'pages/room-details.html?id=alpha-2' : 'pages/catalog.html';
  const l3 = webinarNum >= 5 ? 'pages/room-details.html?id=hub-3' : 'pages/catalog.html';

  if (!withComments) {
    return `      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l1}">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l1}" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="${l1}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=focus-1' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l2}">
                <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l2}" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
              <ul class="card-equipment">
                <li>Проектор 4K</li>
                <li>Спикерфон</li>
                <li>Флипчарт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="${l2}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=alpha-2' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l3}">
                <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l3}" style="text-decoration: none; color: inherit;">Опенспейс Hub</a></h3>
              <ul class="card-equipment">
                <li>Личный стол</li>
                <li>Wi-Fi</li>
                <li>Кофе-поинт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="${l3}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=hub-3' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>`;
  }

  return `      <!-- [Логика: Секция с 3 популярными комнатами на главной странице] -->
      <section class="popular-section">
        <h2 class="page-title">Популярные офисные комнаты</h2>
        <p class="page-subtitle">Наиболее востребованные пространства с полным техническим оснащением</p>

        <!-- [Теория: Контейнер-сетка Flexbox выстраивает карточки в красивый ряд] -->
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l1}">
                <!-- [Теория: onerror подставит картинку-заглушку, если файл не загрузится] -->
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l1}" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <!-- [Логика: Кнопка-иконка для перехода на страницу детального описания] -->
                  <a href="${l1}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=focus-1' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l2}">
                <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l2}" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
              <ul class="card-equipment">
                <li>Проектор 4K</li>
                <li>Спикерфон</li>
                <li>Флипчарт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="${l2}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=alpha-2' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="${l3}">
                <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="${l3}" style="text-decoration: none; color: inherit;">Опенспейс Hub</a></h3>
              <ul class="card-equipment">
                <li>Личный стол</li>
                <li>Wi-Fi</li>
                <li>Кофе-поинт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="${l3}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее">${LINK_ICON_SVG}</a>
                  <a href="${webinarNum >= 8 ? 'pages/booking.html?room=hub-3' : 'pages/catalog.html'}" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="center-action">
          <a href="pages/catalog.html" class="btn btn-outline">Больше офисов</a>
        </div>
      </section>`;
}

function getSliderHtml(withComments = false) {
  if (!withComments) {
    return `      <section class="slider-section">
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
  }

  return `      <!-- [Логика: Интерактивный слайдер фотографий с автоматической сменой] -->
      <section class="slider-section">
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
          <!-- Кнопки управления слайдером -->
          <button class="slider-btn slider-prev">‹</button>
          <button class="slider-btn slider-next">›</button>
          <!-- Точки-индикаторы текущего слайда -->
          <div class="slider-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </section>`;
}

// =============================================================================
// 5. WEBINAR BUILDER
// =============================================================================

function buildWebinar(num, folderName) {
  const dir = path.join(ROOT, folderName);
  const hasCards = num >= 3;
  const hasJs = num >= 4;
  const hasCatalog = num >= 5;
  const hasRoomDetails = num >= 5;
  const hasData = num >= 5;
  const hasForms = num >= 6;
  const hasSlider = num >= 7;
  const hasBookingPage = num >= 8;
  const hasMyBookingsPage = num >= 9;

  // Собираем CSS для чистой версии
  let cssClean = CSS_BASE_CLEAN;
  if (hasCards) cssClean += CSS_CARDS_CLEAN;
  if (hasJs) cssClean += CSS_ACTIVE_NAV_CLEAN;
  if (hasRoomDetails) cssClean += CSS_ROOM_DETAILS_CLEAN;
  if (hasForms) cssClean += CSS_FORMS_CLEAN;
  if (hasSlider) cssClean += CSS_SLIDER_CLEAN;
  if (num >= 8) cssClean += CSS_TOOLBAR_CALC_CLEAN;
  if (num >= 9) cssClean += CSS_MY_BOOKINGS_CLEAN;

  // Собираем CSS для версии с комментариями
  let cssComments = CSS_BASE_COMMENTS;
  if (hasCards) cssComments += CSS_CARDS_COMMENTS;
  if (hasJs) cssComments += CSS_ACTIVE_NAV_COMMENTS;
  if (hasRoomDetails) cssComments += CSS_ROOM_DETAILS_COMMENTS;
  if (hasForms) cssComments += CSS_FORMS_COMMENTS;
  if (hasSlider) cssComments += CSS_SLIDER_COMMENTS;
  if (num >= 8) cssComments += CSS_TOOLBAR_CALC_COMMENTS;
  if (num >= 9) cssComments += CSS_MY_BOOKINGS_COMMENTS;

  ['basic', 'with-comments'].forEach(type => {
    const isComments = type === 'with-comments';
    const bDir = path.join(dir, type);

    // 1. Создаем изображения и иконки
    createSvgAssets(path.join(bDir, 'img'));

    // 2. Записываем CSS
    write(path.join(bDir, 'css', 'style.css'), isComments ? cssComments : cssClean);

    // 3. Записываем JS
    if (hasData) {
      write(path.join(bDir, 'js', 'data.js'), isComments ? DATA_JS_COMMENTS : DATA_JS_CLEAN);
    }
    if (hasJs) {
      write(path.join(bDir, 'js', 'main.js'), getJsContent(num, isComments));
    }

    // 4. index.html
    const indexContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  ${hasData ? '<script src="js/data.js" defer></script>' : ''}
  ${hasJs ? '<script src="js/main.js" defer></script>' : ''}
</head>
<body>
${getHeaderHtml('', hasMyBookingsPage, isComments)}

  <main class="main">
    <div class="container">
${getHeroHtml(isComments)}
${hasSlider ? '\n' + getSliderHtml(isComments) : ''}
${hasCards ? '\n' + getPopularCardsHtml(num, isComments) : ''}
    </div>
  </main>

${getFooterHtml(isComments)}
</body>
</html>`;
    write(path.join(bDir, 'index.html'), indexContent);

    // 5. pages/catalog.html
    if (hasCatalog) {
      const catalogContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог офисов — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', hasMyBookingsPage, isComments)}

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

${getFooterHtml(isComments)}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'catalog.html'), catalogContent);
    }

    // 6. pages/room-details.html (начиная с вебинара 5)
    if (hasRoomDetails) {
      const roomDetailsContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Описание комнаты — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', hasMyBookingsPage, isComments)}

  <main class="main">
    <div class="container" id="roomDetailsContainer">
      <!-- Контент формируется динамически через initRoomDetails() на основе ?id=... -->
    </div>
  </main>

${getFooterHtml(isComments)}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'room-details.html'), roomDetailsContent);
    }

    // 7. pages/register.html & pages/login.html
    if (hasForms) {
      const registerContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Регистрация — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', hasMyBookingsPage, isComments)}

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

${getFooterHtml(isComments)}
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
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', hasMyBookingsPage, isComments)}

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

${getFooterHtml(isComments)}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'login.html'), loginContent);
    }

    // 8. pages/booking.html
    if (hasBookingPage) {
      const bookingContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Бронирование — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', hasMyBookingsPage, isComments)}

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

${getFooterHtml(isComments)}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'booking.html'), bookingContent);
    }

    // 9. pages/my-bookings.html
    if (hasMyBookingsPage) {
      const myBookingsContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мои бронирования — СмартОфис</title>
${GOOGLE_FONT_HEAD}
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
${getHeaderHtml('../', true, isComments)}

  <main class="main">
    <div class="container">
      <h1 class="page-title">Мои бронирования</h1>
      <p class="page-subtitle">История ваших заявок на аренду рабочих пространств</p>

      <div class="bookings-list" id="myBookingsList"></div>
    </div>
  </main>

${getFooterHtml(isComments)}
</body>
</html>`;
      write(path.join(bDir, 'pages', 'my-bookings.html'), myBookingsContent);
    }
  });
}

// Запускаем сборку всех вебинаров со 2 по 9
console.log('Building all webinar codebases...');
buildWebinar(2, 'webinar-02-markup-and-styles');
buildWebinar(3, 'webinar-03-flexbox-grid-cards');
buildWebinar(4, 'webinar-04-js-dom-navigation');
buildWebinar(5, 'webinar-05-dynamic-catalog-data');
buildWebinar(6, 'webinar-06-forms-validation');
buildWebinar(7, 'webinar-07-slider-timers');
buildWebinar(8, 'webinar-08-filters-and-booking-calc');
buildWebinar(9, 'webinar-09-final-assembly-my-bookings');

console.log('All codebases built successfully!');
