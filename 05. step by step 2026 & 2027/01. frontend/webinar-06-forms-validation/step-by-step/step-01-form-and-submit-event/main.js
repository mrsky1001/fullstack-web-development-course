// Шаг 1: Событие submit формы
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    console.log('Событие submit сработало на форме регистрации!');
  });
}
