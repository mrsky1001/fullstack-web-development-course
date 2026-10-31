// ==========================================================================
// СмартОфис — Вебинар 08: Модуль авторизации (auth.js)
// ==========================================================================

// 1. Форма регистрации
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const emailInput = document.getElementById('email') || document.getElementById('regEmail');
    const nameInput = document.getElementById('fullName');

    const displayName = (nameInput && nameInput.value.trim()) || (loginInput && loginInput.value.trim()) || 'Пользователь';
    // [Теория: localStorage] Сохраняем имя пользователя
    localStorage.setItem('currentUser', JSON.stringify({ name: displayName }));

    // [Toast-уведомление] Сообщаем об успехе
    if (typeof showToast === 'function') {
      showToast('Регистрация успешна! Добро пожаловать, ' + displayName);
    }
    setTimeout(function () {
      window.location.href = '../index.html';
    }, 1200);
  });
}

// 2. Форма авторизации (Вход)
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const loginInput = document.getElementById('login') || document.getElementById('loginEmail');
    const user = { login: loginInput ? loginInput.value.trim() : '' };
    // [Теория: localStorage] Сохраняем логин пользователя
    localStorage.setItem('currentUser', JSON.stringify(user));

    // [Toast-уведомление]
    if (typeof showToast === 'function') {
      showToast('Вход выполнен успешно!');
    }
    setTimeout(function () {
      window.location.href = '../index.html';
    }, 1200);
  });
}
