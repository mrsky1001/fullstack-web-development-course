// СмартОфис — Вебинар 04: Основы JavaScript, DOM и Навигация

document.addEventListener('DOMContentLoaded', function () {
  console.log('Скрипт подключён. DOM загружен!');
  initNavigation();
});

// Функция управления активной ссылкой в меню
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Снимаем класс active со всех ссылок
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      // Добавляем класс active нажатой ссылке
      link.classList.add('active');
    });
  });
}
