// Шаг 5: Подсветка ошибок через класс is-invalid
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const cleanEmail = emailInput.value.trim();

    if (!cleanEmail.includes('@')) {
      emailInput.classList.add('is-invalid');
      console.log('Ошибка: email должен содержать знак @. Добавлен класс is-invalid.');
    } else {
      emailInput.classList.remove('is-invalid');
      console.log('Email валиден! Класс is-invalid удален.');
    }
  });
}
