---
title: "Скелет логики регистрации"
highlight: js
---

# Функция регистрации

Переходим к "мозгу" нашей формы — во вкладку JavaScript (`main.js`).

По аналогии с деталями комнаты, мы создадим функцию `initRegisterForm()`.
Её первая задача — попытаться найти на текущей странице элемент с ID `registerForm`. Если его нет (мы не на странице регистрации), функция просто завершит работу с помощью `return`, чтобы не сломать сайт.

## 🛠 Задание
Создайте новую функцию в самом низу вашего файла `main.js`. И сразу пропишите её вызов в событии `DOMContentLoaded` в самом верху (рядом с `initRoomDetails()`).

```js:start
// ... конец функции initRoomDetails ...
```

```js:solution
// В самом верху не забудьте:
// document.addEventListener('DOMContentLoaded', () => {
//   // ...
//   initRegisterForm();
// });

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
}
```
