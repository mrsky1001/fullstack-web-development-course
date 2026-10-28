// Шаг 1: Событие submit формы
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    console.log('Событие submit сработало!');
  });
}
