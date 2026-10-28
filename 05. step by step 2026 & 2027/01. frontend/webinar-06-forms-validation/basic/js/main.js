// СмартОфис — Вебинар 06: Формы и валидация данных

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Инициализация форм...');
  initNavigation();
  initRegisterForm();
  initLoginForm();
});

// Навигация
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// Валидация формы регистрации
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем перезагрузку страницы

    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');

    let isValid = true;

    // Сбрасываем предыдущие ошибки
    [nameInput, emailInput, passInput, confirmInput].forEach(function (input) {
      if (input) input.classList.remove('is-invalid');
    });

    // Проверяем заполненность полей
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

    // Проверяем совпадение паролей
    if (passInput.value !== confirmInput.value) {
      confirmInput.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
      };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      alert('Регистрация успешна! Добро пожаловать, ' + newUser.name);
      window.location.href = '../index.html';
    }
  });
}

// Валидация формы входа
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
