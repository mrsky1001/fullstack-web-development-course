// ==========================================================================
// СмартОфис — Вебинар 08: Модуль авторизации (auth.js)
// ==========================================================================

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const emailInput = document.getElementById('email') || document.getElementById('regEmail');
    const nameInput = document.getElementById('fullName');

    const displayName = (nameInput && nameInput.value.trim()) || (loginInput && loginInput.value.trim()) || 'Пользователь';
    localStorage.setItem('currentUser', JSON.stringify({ name: displayName }));
    if (typeof showToast === 'function') {
      showToast('Регистрация успешна! Добро пожаловать, ' + displayName);
    }
    setTimeout(function () {
      window.location.href = '../index.html';
    }, 1200);
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('loginEmail');
    const user = { login: loginInput ? loginInput.value.trim() : '' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (typeof showToast === 'function') {
      showToast('Вход выполнен успешно!');
    }
    setTimeout(function () {
      window.location.href = '../index.html';
    }, 1200);
  });
}
