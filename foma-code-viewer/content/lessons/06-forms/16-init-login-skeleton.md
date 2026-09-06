---
title: "Скелет логики входа"
highlight: js
---

# Функция авторизации

Мы закончили с регистрацией. Теперь напишем логику для страницы входа (`login.html`).

Создадим новую функцию `initLoginForm()`. Она будет находить форму с ID `loginForm` и "слушать" её отправку точно так же, как мы это делали с регистрацией.

## 🛠 Задание
Создайте новую функцию в самом низу файла `main.js`. Добавьте в нее `e.preventDefault()`, чтобы страница не перезагружалась при попытке войти.

```js:start
// ... конец функции initRegisterForm ...
```

```js:solution
// ... конец функции initRegisterForm ...

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
  });
}
```
