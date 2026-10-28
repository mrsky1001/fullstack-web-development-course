// Шаг 5: Подсветка ошибок
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = document.getElementById('userEmail');
    input.classList.remove('is-invalid'); // сброс

    if (input.value.trim() === '') {
      input.classList.add('is-invalid');
      console.log('Поле подсвечено красным: ошибка валидации!');
    } else {
      console.log('Поле заполнено корректно.');
    }
  });
}
