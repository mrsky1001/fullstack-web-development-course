// Шаг 9: Финальная сборка скрипта навигации
// Теория по этой теме подробно описана в файле README.md в этой папке.

initNavigation();

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.toLowerCase();

  // 1. При загрузке: автоматически определяем активную страницу по адресу в браузере
  navLinks.forEach(function (link) {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href) {
      const pageName = href.split('/').pop().toLowerCase();
      if (pageName && currentPath.endsWith(pageName)) {
        link.classList.add('active');
      } else if (currentPath.includes('room-details') && pageName.includes('catalog')) {
        link.classList.add('active');
      }
    }

    // 2. При клике: переключаем класс active
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

  console.log('Интерактивная навигация СмартОфис успешно инициализирована.');
}
