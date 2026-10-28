// Шаг 3: Чтение значения полей
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value;
    console.log('Пользователь ввёл email:', email);
  });
}
