// Шаг 2: Отмена перезагрузки через event.preventDefault()
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Страница больше НЕ перезагружается!
    console.log('Отправка отменена, данные остаются на экране!');
  });
}
