// Шаг 7: Авторизация и сохранение в localStorage
// Теория по этой теме подробно описана в файле README.md в этой папке.

const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value.trim();

    if (email) {
      const user = { email: email };

      // localStorage хранит только строки, поэтому превращаем объект в JSON-строку:
      localStorage.setItem('currentUser', JSON.stringify(user));

      console.log('Пользователь сохранен в память браузера:', user);
      alert('Успешный вход: ' + email);
    }
  });
}
