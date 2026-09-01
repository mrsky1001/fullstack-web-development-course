# Вебинар 6. Клиентская валидация форм: Регистрация и Авторизация

## 📋 О занятии простыми словами
Сегодня мы научимся делать формы регистрации и входа по-настоящему удобными и надежными!

Мы создадим две страницы: `pages/register.html` и `pages/login.html`, а затем напишем JavaScript-код, который проверяет заполненность полей, совпадение паролей и подсвечивает ошибки красивой красной рамкой.

---

## 🎯 Что мы сегодня сделаем:
1. Сверстаем форму регистрации (Логин, Пароль, Подтверждение, ФИО, Email, Телефон).
2. Сверстаем форму входа (Логин и Пароль).
3. Научимся останавливать стандартную перезагрузку страницы через `e.preventDefault()`.
4. Реализуем подсветку незаполненных полей классом `.is-invalid`.
5. Сделаем проверку тестового пользователя (`admin` / `12345`).

---

## 💡 Теория простыми словами

### 1. Почему страница перезагружается при отправке формы?
По умолчанию браузер пытается отправить данные формы на сервер и перезагружает страницу.  
Чтобы перехватить отправку и сначала всё проверить через JavaScript, мы пишем:
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Останавливаем перезагрузку!
});
```

### 2. Как работает метод `.trim()`?
Если пользователь нажал только пробелы, поле кажется заполненным, но на самом деле пустое.  
Метод `input.value.trim()` удаляет все лишние пробелы по краям и позволяет легко проверить, ввел ли пользователь реальные символы.

### 3. Подсветка ошибок в CSS (`.is-invalid`)
Мы добавляем класс `.is-invalid` к неверно заполненному полю. В CSS для него настроена красная рамка (`border-color: #dc3545`) и показ подсказки с ошибкой.

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Функции валидации в `js/main.js`
```javascript
// Валидация формы регистрации
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];

    // Проверяем каждое поле
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    // Проверяем совпадение паролей
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      alert('Пользователь зарегистрирован успешно!');
      form.reset();
      window.location.href = 'login.html';
    }
  });
}

// Проверка входа в систему
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      if (alertBox) alertBox.style.display = 'none';
      alert('Успешный вход в систему!');
      window.location.href = '../index.html';
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
    }
  });
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] При отправке пустой формы регистрации поля загораются красным цветом.
- [x] Если пароли не совпадают, поле подтверждения подсвечивается ошибкой.
- [x] При успешной регистрации выводится всплывающее сообщение и открывается `login.html`.
- [x] На странице входа данные `admin` / `12345` успешно пропускают на главную страницу.
