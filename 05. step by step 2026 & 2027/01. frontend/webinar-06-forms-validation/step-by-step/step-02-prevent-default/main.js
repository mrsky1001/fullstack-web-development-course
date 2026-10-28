// Шаг 2: Отмена перезагрузки страницы через preventDefault
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    // Отменяем стандартное поведение браузера (перезагрузку страницы)
    event.preventDefault();

    console.log('Перезагрузка отменена, данные на экране сохранены.');
  });
}
