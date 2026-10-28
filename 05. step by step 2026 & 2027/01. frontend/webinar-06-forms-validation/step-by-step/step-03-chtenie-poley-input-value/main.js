// Шаг 3: Чтение значения поля input.value
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('userEmail');
    // Свойство .value содержит введённый текст:
    const userText = emailInput.value;

    console.log('Пользователь ввел:', userText);
  });
}
