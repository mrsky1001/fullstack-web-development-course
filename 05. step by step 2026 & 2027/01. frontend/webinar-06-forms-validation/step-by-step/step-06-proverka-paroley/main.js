// Шаг 6: Проверка совпадения паролей
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
    } else if (pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      console.log('Ошибка: пароли не совпадают!');
    } else {
      console.log('Пароли успешно совпали!');
    }
  });
}
