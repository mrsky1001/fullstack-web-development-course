// Шаг 9: Финальная сборка скрипта навигации
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Событие DOMContentLoaded ждет, пока браузер построит полное дерево страницы:
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) {
        item.classList.remove('active');
      });
      link.classList.add('active');
    });
  });

  console.log('Интерактивная навигация СмартОфис успешно инициализирована.');
}
