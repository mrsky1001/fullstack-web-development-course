// Шаг 4: Удаление лишних пробелов с помощью метода .trim()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginInput = document.getElementById('login');
    const emailInput = document.getElementById('email');

    // Метод .trim() удаляет случайные пробелы в начале и в конце строки:
    const cleanLogin = loginInput.value.trim();
    const cleanEmail = emailInput.value.trim();

    if (cleanLogin === '') {
      console.log('Ошибка: поле логина не может быть пустым!');
    } else {
      console.log('Корректно очищенный логин:', cleanLogin);
    }
  });
}
