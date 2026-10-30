// СмартОфис — Вебинар 04: Основы JavaScript, DOM и Навигация

console.log('Скрипт подключён.');
initNavigation();

// Функция управления активной ссылкой в меню
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  // Получаем адрес текущей страницы в браузере (например: "catalog.html")
  const currentPath = window.location.pathname.toLowerCase();

  // 1. При загрузке страницы: определяем, какая страница открыта, и подсвечиваем её
  navLinks.forEach(function (link) {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href) {
      const pageName = href.split('/').pop().toLowerCase();
      // Если адрес страницы заканчивается именем файла ссылки — подсвечиваем её
      if (pageName && currentPath.endsWith(pageName)) {
        link.classList.add('active');
      } else if (currentPath.includes('room-details') && pageName.includes('catalog')) {
        link.classList.add('active');
      }
    }

    // 2. При клике: переключаем подсветку
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });
      link.classList.add('active');
    });
  });

  // 3. Если открыта Главная или ни одна ссылка не совпала — подсвечиваем «Главная»
  const hasActive = document.querySelector('.nav-link.active');
  if (!hasActive && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
}
