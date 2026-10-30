// Шаг 6: Проверка совпадения паролей
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');

    // Проверяем длину основного пароля:
    if (passwordInput.value.length < 6) {
      passwordInput.classList.add('is-invalid');
      console.log('Ошибка: пароль должен содержать не менее 6 символов!');
      return;
    } else {
      passwordInput.classList.remove('is-invalid');
    }

    // Проверяем совпадение с полем подтверждения:
    if (passwordInput.value !== confirmInput.value) {
      confirmInput.classList.add('is-invalid');
      console.log('Ошибка: введенные пароли не совпадают!');
    } else {
      confirmInput.classList.remove('is-invalid');
      console.log('Пароли успешно совпали!');
    }
  });
}
