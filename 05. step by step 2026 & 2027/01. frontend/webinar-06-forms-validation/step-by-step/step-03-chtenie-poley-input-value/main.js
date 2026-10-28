// Шаг 3: Чтение значений полей ввода через свойство .value
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginInput = document.getElementById('login');
    const emailInput = document.getElementById('email');

    console.log('Введенный логин:', loginInput.value);
    console.log('Введенный email:', emailInput.value);
  });
}
