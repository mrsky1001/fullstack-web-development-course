// ==========================================================================
// СмартОфис — Вебинар 06: Модуль валидации форм и авторизации (auth.js)
// ==========================================================================

// 1. Обработка и валидация формы регистрации (Тема Вебинара 06)
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    // Обязательно отменяем стандартное поведение формы:
    // по умолчанию браузер пытается отправить запрос на сервер и перезагрузить страницу
    event.preventDefault();

    // Находим поля ввода по их ID из разметки
    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const passInput = document.getElementById('password') || document.getElementById('regPassword');
    const confirmInput = document.getElementById('confirmPassword') || document.getElementById('regConfirmPassword');
    const emailInput = document.getElementById('email') || document.getElementById('regEmail');
    const nameInput = document.getElementById('fullName');

    // Флаг успешности проверки
    let isValid = true;
    const requiredInputs = [loginInput, passInput, confirmInput, emailInput, nameInput].filter(Boolean);

    // Сначала удаляем класс ошибки у всех полей
    requiredInputs.forEach(function (input) {
      input.classList.remove('is-invalid');
    });

    // Метод .trim() удаляет случайные пробелы в начале и в конце строки
    requiredInputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    // Проверяем, совпадают ли пароль и его подтверждение
    if (passInput && confirmInput && passInput.value !== confirmInput.value) {
      confirmInput.classList.add('is-invalid');
      isValid = false;
    }

    // Если все поля заполнены верно:
    if (isValid) {
      const displayName = (nameInput && nameInput.value.trim()) || (loginInput && loginInput.value.trim()) || 'Пользователь';
      const newUser = {
        login: loginInput ? loginInput.value.trim() : '',
        name: displayName,
        email: emailInput ? emailInput.value.trim() : ''
      };
      // Сохраняем пользователя в localStorage в виде JSON-строки
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      if (typeof showToast === 'function') {
        showToast('Регистрация успешна! Добро пожаловать, ' + displayName);
      }
      setTimeout(function () {
        window.location.href = '../index.html';
      }, 1200);
    }
  });
}

// 2. Обработка формы входа (Тема Вебинара 06)
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginInput = document.getElementById('login') || document.getElementById('loginEmail');
    const passInput = document.getElementById('password') || document.getElementById('loginPassword');
    const alertBox = document.getElementById('loginAlert');

    let isValid = true;
    const inputs = [loginInput, passInput].filter(Boolean);

    inputs.forEach(function (input) {
      input.classList.remove('is-invalid');
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    if (isValid) {
      const user = { login: loginInput ? loginInput.value.trim() : '' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (alertBox) {
        alertBox.textContent = 'Вход выполнен успешно!';
        alertBox.style.color = '#10b981';
      }
      if (typeof showToast === 'function') {
        showToast('Вход выполнен успешно!');
      }
      setTimeout(function () {
        window.location.href = '../index.html';
      }, 1200);
    }
  });
}
