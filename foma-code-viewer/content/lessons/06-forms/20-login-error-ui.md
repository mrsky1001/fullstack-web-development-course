---
title: "Вывод ошибки в интерфейс"
highlight: js
---

# Ошибка авторизации

Что делать, если пользователь ввел неверный пароль?
Мы не будем краснить рамки, как при регистрации. При авторизации принято выводить общий блок с текстом "Неверный логин или пароль", чтобы злоумышленник не смог угадать, что именно он ввел не так.

Мы используем наш блок `alertBox`. Мы запишем в него текст, добавим красный CSS класс `.alert-danger` и сделаем видимым (`display: block`). Также для надежности покажем красный всплывающий тост (тип `'danger'`).

## 🛠 Задание
Вставьте логику ошибки в блок `else`.

```js:start
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (login === 'admin' && pass === '12345') {
    // успех
  } else {
    
  }
});
```

```js:solution
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (login === 'admin' && pass === '12345') {
    // успех
  } else {
    if (alertBox) {
      alertBox.textContent = 'Неверный логин или пароль';
      alertBox.className = 'form-alert alert-danger';
      alertBox.style.display = 'block';
    }
    showNotification('Неверный логин или пароль', 'danger');
  }
});
```
