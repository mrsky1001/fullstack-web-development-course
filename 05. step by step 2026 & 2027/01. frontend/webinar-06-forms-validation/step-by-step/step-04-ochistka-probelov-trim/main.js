// Шаг 4: Очистка строки методом .trim()
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const rawEmail = document.getElementById('userEmail').value;
    const cleanEmail = rawEmail.trim();

    if (cleanEmail === '') {
      console.log('Ошибка: поле заполнено только пробелами или пустое!');
    } else {
      console.log('Очищенный email:', cleanEmail);
    }
  });
}
