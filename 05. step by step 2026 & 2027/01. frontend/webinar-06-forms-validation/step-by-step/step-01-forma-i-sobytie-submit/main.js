// Шаг 1: Событие submit формы
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    console.log('Событие submit формы сработало!');
  });
}
