// Шаг 4: Очистка строки методом .trim()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('userEmail');
    // Метод .trim() отрезает пробелы с краев строки:
    const cleanValue = emailInput.value.trim();

    if (cleanValue === '') {
      console.log('Поле заполнено одними пробелами или пустое.');
    } else {
      console.log('Очищенный текст:', cleanValue);
    }
  });
}
