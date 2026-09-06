---
title: "Форма регистрации (HTML)"
highlight: html
---

# Верстка формы регистрации

Обратите внимание на типы полей (`type`):
- `type="email"` — на мобильных устройствах сразу откроет клавиатуру с символом `@`.
- `type="tel"` — откроет цифровую клавиатуру для ввода телефона.

И самое главное — ID формы теперь `registerForm`. Именно по этому ID наш JavaScript-код будет понимать, на какой странице находится пользователь.

## 🛠 Задание

Скопируйте большую форму регистрации и вставьте её под подзаголовком.

```html:start
      <h1 class="page-title">Создание аккаунта</h1>
      <p class="page-subtitle">Зарегистрируйтесь, чтобы получить доступ к бронированию</p>
      
      <!-- Вставьте код сюда -->
```

```html:solution
      <h1 class="page-title">Создание аккаунта</h1>
      <p class="page-subtitle">Зарегистрируйтесь, чтобы получить доступ к бронированию</p>
      
      <div class="form-card">
        <form id="registerForm">
          <div class="form-group">
            <label class="form-label" for="fullName">ФИО</label>
            <input type="text" id="fullName" class="form-control" placeholder="Иванов Иван Иванович">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="phone">Телефон</label>
            <input type="tel" id="phone" class="form-control" placeholder="+7 (999) 000-00-00">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">E-mail</label>
            <input type="email" id="email" class="form-control" placeholder="ivanov@example.com">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="Придумайте логин">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="Придумайте пароль">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="confirmPassword">Повторите пароль</label>
            <input type="password" id="confirmPassword" class="form-control" placeholder="Пароли должны совпадать">
            <div class="error-text">Пароли не совпадают</div>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Зарегистрироваться</button>
          
          <div style="text-align: center; margin-top: 20px; font-size: 14px;">
            Уже есть аккаунт? <a href="login.html" style="color: #007bff; text-decoration: none;">Войти</a>
          </div>
        </form>
      </div>
```
