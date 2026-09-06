---
title: "Получение данных логина"
highlight: js
---

# Сбор данных с формы

При входе нам не нужно проверять 6 полей. Нам достаточно проверить, совпадает ли логин и пароль с правильными.

Сначала мы должны "вытащить" то, что пользователь ввел в эти два поля. Также нам понадобится блок `loginAlert` — это тот самый скрытый `div`, который мы подготовили в HTML для вывода сообщения об ошибке ("Неверный логин или пароль").

## 🛠 Задание
Внутри обработчика `submit` получите значения логина и пароля, не забыв очистить их от пробелов с помощью `.trim()`.

```js:start
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
  });
```

```js:solution
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');
  });
```
