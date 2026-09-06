---
title: "Форма входа (HTML)"
highlight: html
---

# Верстка формы входа

Форма оборачивается в тег `<form>` и обязательно получает `id`, чтобы мы могли найти её через JavaScript. 

- `input type="text"` — обычное текстовое поле (для логина).
- `input type="password"` — поле с цензурой (текст заменяется точками).
- `label` — название поля (привязывается к инпуту через атрибут `for="id_инпута"`).

Обратите внимание на блок `.error-text`. По умолчанию мы скроем его с помощью CSS, а будем показывать только тогда, когда пользователь забыл заполнить поле.

## 🛠 Задание
Вставьте HTML-код формы входа под подзаголовком.

```html:start
      <h1 class="page-title">Вход в систему</h1>
      <p class="page-subtitle">Войдите, чтобы управлять бронированиями</p>
      
      <!-- Вставьте код сюда -->
```

```html:solution
      <h1 class="page-title">Вход в систему</h1>
      <p class="page-subtitle">Войдите, чтобы управлять бронированиями</p>
      
      <div class="form-card">
        <div class="form-alert" id="loginAlert"></div>
        <form id="loginForm">
          <div class="form-group">
            <label class="form-label" for="login">Логин</label>
            <input type="text" id="login" class="form-control" placeholder="Введите логин">
            <div class="error-text">Обязательное поле</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input type="password" id="password" class="form-control" placeholder="Введите пароль">
            <div class="error-text">Обязательное поле</div>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Войти</button>
          
          <div style="text-align: center; margin-top: 20px; font-size: 14px;">
            Нет аккаунта? <a href="register.html" style="color: #007bff; text-decoration: none;">Зарегистрироваться</a>
          </div>
        </form>
      </div>
```
