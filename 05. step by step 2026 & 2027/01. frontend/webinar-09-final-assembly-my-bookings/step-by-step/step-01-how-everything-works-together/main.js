// Шаг 1: Проверка сессии пользователя из localStorage
// Теория по этой теме подробно описана в файле README.md в этой папке.

checkUserSession();

function checkUserSession() {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const loginBtn = document.querySelector('.nav-btn');

  if (user && loginBtn) {
    loginBtn.textContent = user.login || 'Личный кабинет';
    console.log('Пользователь авторизован:', user.login);
  } else {
    console.log('Пользователь не авторизован (гостевой режим).');
  }
}
