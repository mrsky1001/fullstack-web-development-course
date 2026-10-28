// ==========================================================================
// СмартОфис — Вебинар 04: Основы JavaScript, DOM и Навигация
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

// 1. Событие DOMContentLoaded срабатывает, когда браузер полностью
// построил HTML-дерево (DOM) в памяти. Это гарантирует, что все теги
// уже существуют на странице и к ним можно безопасно обращаться.
document.addEventListener('DOMContentLoaded', function () {
  console.log('Скрипт main.js успешно подключён. DOM загружен!');
  initNavigation();
});

// 2. Функция для настройки интерактивной навигации
function initNavigation() {
  // Находим все ссылки с классом nav-link в шапке сайта
  const navLinks = document.querySelectorAll('.nav-link');

  // Перебираем каждую найденную ссылку методом forEach
  navLinks.forEach(function (link) {
    // На каждую ссылку «вешаем» слушатель события клика
    link.addEventListener('click', function () {
      // Сначала удаляем класс active у всех ссылок, чтобы подсвечивалась только одна
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      // Добавляем класс active именно той ссылке, по которой только что кликнули
      link.classList.add('active');
      console.log('Выбран пункт меню:', link.textContent.trim());
    });
  });
}
