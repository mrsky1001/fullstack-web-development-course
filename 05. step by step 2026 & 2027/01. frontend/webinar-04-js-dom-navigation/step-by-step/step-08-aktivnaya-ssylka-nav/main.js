// Шаг 8: Переключение активного пункта меню при клике
// Теория по этой теме подробно описана в файле README.md в этой папке.

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    // 1. Снимаем класс active со всех ссылок в меню:
    navLinks.forEach(function (item) {
      item.classList.remove('active');
    });

    // 2. Добавляем класс active только той ссылке, на которую нажали:
    link.classList.add('active');

    console.log('Выбран пункт меню:', link.textContent.trim());
  });
});
