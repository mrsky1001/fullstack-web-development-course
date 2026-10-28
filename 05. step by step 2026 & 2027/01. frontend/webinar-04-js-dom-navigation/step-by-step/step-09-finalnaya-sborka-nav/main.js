// Шаг 9: Финальная сборка модуля навигации
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Ждем полной загрузки структуры документа браузером
document.addEventListener('DOMContentLoaded', function () {
  console.log('Страница готова. Запускаем навигацию...');
  initNavigation();
});

// Функция настройки меню
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Сброс активности у всех пунктов
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });

      // Включение активности у нажатого пункта
      link.classList.add('active');
    });
  });

  console.log('Навигация готова к работе.');
}
