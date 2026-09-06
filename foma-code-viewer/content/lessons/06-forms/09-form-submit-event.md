---
title: "Событие отправки (submit)"
highlight: js
---

# Событие отправки формы (submit)

У HTML-форм есть встроенное стандартное поведение. Когда пользователь нажимает кнопку `<button type="submit">`, браузер пытается отправить данные на сервер и **перезагружает страницу**.

В современных приложениях мы так не делаем. Мы хотим сами обработать данные в JavaScript и отправить их "невидимо", без перезагрузки. 

Для этого мы ловим событие `'submit'` и вызываем метод `e.preventDefault()` (предотвратить стандартное поведение).

## 🛠 Задание
Повесьте слушатель события `submit` на вашу найденную форму.

```js:start
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

}
```

```js:solution
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
  });
}
```
