---
title: "Подключение данных"
highlight: html
---

# Область видимости скриптов

Мы создали файл `data.js` с константой `OFFICE_ROOMS`. Как теперь нашему основному скрипту `main.js` получить доступ к этому массиву?

В браузере все переменные, объявленные в глобальной области (вне функций), попадают в общий "котел" памяти (объект `window`). 
Если мы подключим `data.js` ПЕРЕД `main.js`, то скрипт `main.js` сможет увидеть и использовать массив `OFFICE_ROOMS`!

*(Позже мы изучим модули `import/export`, но пока будем использовать этот простой метод).*

## 🛠 Задание

Перейдите во вкладку `html` (наш `index.html`). В блоке `<head>` подключите скрипт `js/data.js` с атрибутом `defer` СТРОГО перед подключением `main.js`.

```html:start
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  
  <script src="js/main.js" defer></script>
</head>
```

```html:solution
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  <script src="js/data.js" defer></script>
  <script src="js/main.js" defer></script>
</head>
```
