// Шаг 6: Проверка совпадения паролей
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const pass = document.getElementById('userPass');
    const confirm = document.getElementById('userConfirm');

    pass.classList.remove('is-invalid');
    confirm.classList.remove('is-invalid');

    if (!pass.value.trim()) {
      pass.classList.add('is-invalid');
      console.log('Пароль не может быть пустым');
    } else if (pass.value !== confirm.value) {
      // Пароли не равны
      confirm.classList.add('is-invalid');
      console.log('Пароли не совпадают');
    } else {
      console.log('Пароли успешно совпали');
    }
  });
}
