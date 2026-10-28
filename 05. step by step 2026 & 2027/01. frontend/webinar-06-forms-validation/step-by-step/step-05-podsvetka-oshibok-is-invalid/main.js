// Шаг 5: Подсветка ошибок через класс is-invalid
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = document.getElementById('userEmail');

    // 1. Сначала обязательно убираем старую подсветку ошибки:
    input.classList.remove('is-invalid');

    // 2. Если поле пустое, добавляем класс ошибки:
    if (input.value.trim() === '') {
      input.classList.add('is-invalid');
      console.log('Поле не заполнено: показана красная рамка');
    } else {
      console.log('Поле заполнено корректно.');
    }
  });
}
