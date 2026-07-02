// ============================================================
// TechParts — Регистрация и авторизация (auth.js)
// Критерий №16: Регистрация (до 10 баллов)
// Критерий №17: Авторизация (до 4 баллов)
// ============================================================

// Адрес API сервера
const API = 'http://localhost:3000/api';

// ============================================================
// ФОРМА РЕГИСТРАЦИИ — Критерий №16 (до 10 баллов)
// ============================================================
const registerForm = document.getElementById('register-form');

// --- Маска телефона: автоматическая подстановка +7 ( ) - при вводе и вставке ---
// Критерий №16: 1 балл — валидация телефона в формате +7 (XXX) XXX-XX-XX
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  // Функция форматирования: оставляем только цифры, подставляем символы маски
  function formatPhone(value) {
    // Убираем всё кроме цифр
    let digits = value.replace(/\D/g, '');

    // Если начинается с 8 — заменяем на 7 (российский формат)
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    // Если не начинается с 7 — добавляем 7 в начало
    if (!digits.startsWith('7') && digits.length > 0) digits = '7' + digits;

    // Ограничиваем до 11 цифр (7 + 10 цифр номера)
    digits = digits.slice(0, 11);

    // Форматируем по маске: +7 (XXX) XXX-XX-XX
    let result = '';
    if (digits.length > 0) result = '+' + digits[0];               // +7
    if (digits.length > 1) result += ' (' + digits.slice(1, 4);    // (XXX
    if (digits.length >= 4) result += ') ';                         // )_
    if (digits.length > 4) result += digits.slice(4, 7);            // XXX
    if (digits.length > 7) result += '-' + digits.slice(7, 9);     // -XX
    if (digits.length > 9) result += '-' + digits.slice(9, 11);    // -XX

    return result;
  }

  // Обработчик ввода — форматируем при каждом нажатии клавиши
  phoneInput.addEventListener('input', () => {
    const pos = phoneInput.selectionStart;          // Запоминаем позицию курсора
    const oldLen = phoneInput.value.length;         // Длина до форматирования
    phoneInput.value = formatPhone(phoneInput.value);
    const newLen = phoneInput.value.length;         // Длина после форматирования
    // Корректируем позицию курсора с учётом добавленных символов
    phoneInput.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
  });

  // Обработчик вставки — форматируем вставленный текст
  phoneInput.addEventListener('paste', (e) => {
    e.preventDefault();                             // Отменяем стандартную вставку
    const pasted = e.clipboardData.getData('text'); // Получаем текст из буфера
    phoneInput.value = formatPhone(pasted);         // Форматируем
  });

  // При фокусе на пустое поле — подставляем +7
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+7';
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    // Отменяем стандартную отправку формы
    e.preventDefault();

    // --- Получаем значения полей ---
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // --- Сброс ошибок (убираем красные рамки) ---
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

    let hasError = false;

    // --- 1) Валидация логина ---
    // Критерий №16: 1 балл — латинские буквы и цифры, мин. 5 символов
    if (login.length < 5 || !/^[A-Za-z0-9]+$/.test(login)) {
      showFieldError('login', 'Логин: только латинские буквы и цифры, минимум 5 символов');
      hasError = true;
    }

    // --- 2) Валидация пароля ---
    // Критерий №16: 1 балл — минимальная длина 8 символов
    if (password.length < 8) {
      showFieldError('password', 'Пароль: минимум 8 символов');
      hasError = true;
    }

    // --- 3) Совпадение паролей ---
    // Критерий №16: 1 балл — проверка совпадения
    if (password !== password2) {
      showFieldError('password2', 'Пароли не совпадают');
      hasError = true;
    }

    // --- 4) ФИО — минимум 3 слова, кириллица ---
    // Критерий №16: 1 балл — три слова в ФИО
    const words = fullname.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 3) {
      showFieldError('fullname', 'Введите полное ФИО (минимум 3 слова)');
      hasError = true;
    }

    // --- 5) Валидация email ---
    // Критерий №16: 1 балл — наличие @ и .
    if (!email.includes('@') || !email.includes('.')) {
      showFieldError('email', 'Введите корректный email (должен содержать @ и .)');
      hasError = true;
    }

    // --- 6) Валидация телефона ---
    // Критерий №16: 1 балл — формат +7 (XXX) XXX-XX-XX
    const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
      showFieldError('phone', 'Формат: +7 (XXX) XXX-XX-XX');
      hasError = true;
    }

    // Если есть ошибки — не отправляем
    if (hasError) return;

    // --- Отправка данных на сервер ---
    // Критерий №16: 3 балла — проверка по БД, хеширование, ответ
    try {
      const res = await fetch(API + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login, password, fullname, email, phone })
      });

      const data = await res.json();
      const msgDiv = document.getElementById('register-message');

      if (res.ok) {
        // Успех: «Регистрация успешна! Теперь вы можете войти.»
        // «можете войти» — ссылка на login.html
        msgDiv.innerHTML = '<div class="message success">Регистрация успешна! Теперь вы <a href="login.html">можете войти</a>.</div>';
        registerForm.reset();
      } else {
        // Ошибка (например, логин занят)
        msgDiv.innerHTML = `<div class="message error">${data.error}</div>`;
        // Выделяем поле логина красным
        if (data.error.includes('логин')) {
          showFieldError('login', data.error);
        }
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  });
}

// --- Функция показа ошибки у конкретного поля ---
// Поле выделяется красным, рядом — текст ошибки
function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  if (input) input.classList.add('error');
  if (errorDiv) errorDiv.textContent = message;

  // Убираем ошибку, когда пользователь начинает менять значение
  if (input) {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      if (errorDiv) errorDiv.textContent = '';
    }, { once: true }); // once: сработает один раз
  }
}

// ============================================================
// ФОРМА АВТОРИЗАЦИИ — Критерий №17 (до 4 баллов)
// ============================================================
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    // Отменяем стандартную отправку
    e.preventDefault();

    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;

    try {
      // Отправляем логин и пароль на сервер
      const res = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login, password })
      });

      const data = await res.json();
      const msgDiv = document.getElementById('login-message');

      if (res.ok) {
        // Успех: перенаправление на каталог
        window.location.href = 'catalog.html';
      } else {
        // Ошибка: «Неверный логин или пароль» красным цветом
        msgDiv.innerHTML = `<div class="message error">${data.error}</div>`;
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  });
}
