// ==========================================================================
// СмартОфис — Вебинар 09: Модуль авторизации (auth.js)
// ==========================================================================

function initAuthForms() {
  const regForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = (document.getElementById('login') || document.getElementById('regName')).value.trim();
      const email = (document.getElementById('email') || document.getElementById('regEmail')).value.trim();
      if (login || email) {
        localStorage.setItem('currentUser', JSON.stringify({ login: login, email: email }));
        if (typeof showToast === 'function') {
          showToast('Регистрация успешна! Добро пожаловать, ' + (login || 'пользователь'));
        }
        setTimeout(function () {
          window.location.href = '../index.html';
        }, 1200);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = (document.getElementById('login') || document.getElementById('loginEmail')).value.trim();
      if (login) {
        localStorage.setItem('currentUser', JSON.stringify({ login: login }));
        if (typeof showToast === 'function') {
          showToast('Вход выполнен успешно!');
        }
        setTimeout(function () {
          window.location.href = '../index.html';
        }, 1200);
      }
    });
  }
}
