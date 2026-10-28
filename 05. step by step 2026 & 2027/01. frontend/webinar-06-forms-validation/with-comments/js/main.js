// ==========================================================================
// СмартОфис — Вебинар 06: Формы и валидация данных
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Запускаем обработку форм...');
  initNavigation();
  initRegisterForm();
  initLoginForm();
});

// 1. Навигация сайта
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Обработка и валидация формы регистрации
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    // Обязательно отменяем стандартное поведение формы:
    // по умолчанию браузер пытается отправить запрос на сервер и перезагрузить страницу
    event.preventDefault();

    // Находим поля ввода
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');

    // Флаг успешности проверки
    let isValid = true;

    // Сначала удаляем класс ошибки у всех полей
    [nameInput, emailInput, passInput, confirmInput].forEach(function (input) {
      if (input) input.classList.remove('is-invalid');
    });

    // Метод .trim() удаляет случайные пробелы в начале и в конце строки
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }
    if (!passInput.value.trim()) {
      passInput.classList.add('is-invalid');
      isValid = false;
    }

    // Проверяем, совпадают ли пароль и его подтверждение
    if (passInput.value !== confirmInput.value) {
      confirmInput.classList.add('is-invalid');
      isValid = false;
    }

    // Если все поля заполнены верно:
    if (isValid) {
      const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
      };
      // Сохраняем пользователя в localStorage в виде JSON-строки
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      alert('Регистрация успешна! Добро пожаловать, ' + newUser.name);
      window.location.href = '../index.html';
    }
  });
}

// 3. Обработка формы входа
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');

    let isValid = true;
    [emailInput, passInput].forEach(function (input) {
      if (input) input.classList.remove('is-invalid');
    });

    if (!emailInput.value.trim()) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }
    if (!passInput.value.trim()) {
      passInput.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      const user = { email: emailInput.value.trim() };
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Вход выполнен успешно!');
      window.location.href = '../index.html';
    }
  });
}
