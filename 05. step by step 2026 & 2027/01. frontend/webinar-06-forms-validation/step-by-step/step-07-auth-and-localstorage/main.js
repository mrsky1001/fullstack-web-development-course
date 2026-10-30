// Шаг 7: Сохранение данных пользователя в localStorage
// Теория по этой теме подробно описана в файле README.md в этой папке.

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const login = document.getElementById('login').value.trim();
    const email = document.getElementById('email').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!login || !email) {
      alert('Пожалуйста, заполните обязательные поля.');
      return;
    }

    const userData = { login, email, fullName, phone };

    // Превращаем объект в строку и сохраняем в память браузера:
    localStorage.setItem('currentUser', JSON.stringify(userData));

    console.log('Пользователь сохранен в localStorage:', userData);
    alert('Регистрация прошла успешно! Вы вошли как: ' + login);
  });
}
