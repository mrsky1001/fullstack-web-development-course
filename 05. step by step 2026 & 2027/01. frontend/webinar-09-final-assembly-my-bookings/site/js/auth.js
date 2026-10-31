// ==========================================================================
// СмартОфис — Вебинар 09: Модуль авторизации (auth.js)
// ==========================================================================

// Инициализация обработки форм входа и регистрации (Вебинар 09)
function initAuthForms() {
  const regForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // 1. Форма регистрации
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      // Отменяем отправку формы на сервер
      e.preventDefault();
      const login = (document.getElementById('login') || document.getElementById('regName')).value.trim();
      const email = (document.getElementById('email') || document.getElementById('regEmail')).value.trim();

      if (login || email) {
        // [Теория: localStorage] Сохраняем вошедшего пользователя
        localStorage.setItem('currentUser', JSON.stringify({ login: login, email: email }));

        // [Toast-уведомление] Показываем сообщение об успешной регистрации
        if (typeof showToast === 'function') {
          showToast('Регистрация успешна! Добро пожаловать, ' + (login || 'пользователь'));
        }

        // Плавный переход на главную страницу через 1.2 секунды
        setTimeout(function () {
          window.location.href = '../index.html';
        }, 1200);
      }
    });
  }

  // 2. Форма авторизации (Вход)
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = (document.getElementById('login') || document.getElementById('loginEmail')).value.trim();

      if (login) {
        // [Теория: localStorage] Сохраняем сессию пользователя
        localStorage.setItem('currentUser', JSON.stringify({ login: login }));

        // [Toast-уведомление] Сообщаем об успешном входе
        if (typeof showToast === 'function') {
          showToast('Вход выполнен успешно!');
        }

        // Плавный переход на главную страницу
        setTimeout(function () {
          window.location.href = '../index.html';
        }, 1200);
      }
    });
  }
}
