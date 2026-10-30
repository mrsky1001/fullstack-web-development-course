// ==========================================================================
// СмартОфис — Вебинар 04: Основы JavaScript, DOM и Навигация
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

// 1. Запуск инициализации навигации (скрипт подключен с defer, DOM уже готов)
console.log('Скрипт main.js успешно подключён!');
initNavigation();

// 2. Функция для настройки интерактивной навигации
function initNavigation() {
  // Находим все ссылки с классом nav-link в шапке сайта
  const navLinks = document.querySelectorAll('.nav-link');
  // Получаем путь текущей страницы из адресной строки браузера (например, "catalog.html")
  const currentPath = window.location.pathname.toLowerCase();

  // Перебираем каждую найденную ссылку методом forEach
  navLinks.forEach(function (link) {
    // Шаг А. Сначала удаляем класс active у всех ссылок
    link.classList.remove('active');

    // Шаг Б. Узнаём имя страницы, на которую ведёт эта ссылка
    const href = link.getAttribute('href');
    if (href) {
      // Берём только имя файла (например, "catalog.html")
      const pageName = href.split('/').pop().toLowerCase();

      // Если открытая страница заканчивается этим именем — подсвечиваем ссылку
      if (pageName && currentPath.endsWith(pageName)) {
        link.classList.add('active');
      } else if (currentPath.includes('room-details') && pageName.includes('catalog')) {
        // Если мы на странице детального просмотра комнаты — подсвечиваем Каталог
        link.classList.add('active');
      }
    }

    // Шаг В. На каждую ссылку «вешаем» слушатель события клика
    link.addEventListener('click', function () {
      // Снимаем класс active у всех кнопок
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      // Добавляем класс active той ссылке, по которой только что кликнули
      link.classList.add('active');
      console.log('Выбран пункт меню:', link.textContent.trim());
    });
  });

  // Шаг Г. Если мы на главной странице (или ни одна ссылка не совпала) — подсвечиваем первую ссылку
  const hasActive = document.querySelector('.nav-link.active');
  if (!hasActive && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
}
