// Шаг 2: Отмена перезагрузки страницы (event.preventDefault)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    // Останавливаем стандартную отправку и перезагрузку страницы браузером:
    event.preventDefault();
    console.log('Перезагрузка страницы успешно отменена через event.preventDefault()!');
  });
}
