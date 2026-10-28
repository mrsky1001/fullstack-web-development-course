// Шаг 7: Авторизация и localStorage
const form = document.getElementById('demoForm');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value.trim();
    if (email) {
      const user = { email: email, loginTime: new Date().toLocaleTimeString() };
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert('Добро пожаловать! Вы авторизованы как ' + email);
      console.log('Сохранено в localStorage:', user);
    }
  });
}
