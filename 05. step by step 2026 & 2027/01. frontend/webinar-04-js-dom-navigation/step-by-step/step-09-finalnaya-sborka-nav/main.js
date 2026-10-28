// Шаг 9: Финальная сборка скрипта навигации Вебинара 04

// 1. Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Инициализируем навигацию...');
  initNavigation();
});

// 2. Функция настройки навигации
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Убираем active у всех
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      // Ставим active текущей ссылке
      link.classList.add('active');
    });
  });

  console.log('Навигация успешно настроена!');
}
