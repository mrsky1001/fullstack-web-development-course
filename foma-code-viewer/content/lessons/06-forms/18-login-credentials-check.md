---
title: "Проверка доступов (Хардкод)"
highlight: js
---

# Заглушка авторизации (Хардкод)

В настоящих приложениях фронтенд отправляет логин и пароль на сервер, а сервер сверяет их со своей защищенной базой данных. Мы пока так не умеем, поэтому мы сымитируем этот процесс. 

Мы "захардкодим" (жестко пропишем в коде) правильные данные. Пусть логин будет `admin`, а пароль `12345`. 

## 🛠 Задание
Напишите условие `if / else`. Если логин и пароль совпадают с эталонными, мы выполним логику успеха. Если нет — логику ошибки.

```js:start
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

```

```js:solution
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
      // Пользователь ввел верные данные
    } else {
      // Ошибка авторизации
    }
```
