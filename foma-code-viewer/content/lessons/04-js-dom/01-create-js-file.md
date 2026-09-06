---
title: "Подключение JavaScript"
highlight: html
---

# Добро пожаловать в мир JavaScript!

В этом вебинаре мы вдохнем жизнь в наш сайт! До сих пор он был статичным (просто текст и картинки), но с помощью **JavaScript (JS)** мы научим его реагировать на действия пользователя.

Первым делом нам нужно подключить JS-файл к нашему HTML. 
JS-файлы подключаются с помощью тега `<script>`. Обычно их кладут в папку `js`.

## Атрибут defer
Обратите внимание на атрибут `defer` в теге `<script>`. 
Браузер читает HTML-код сверху вниз. Если он встретит скрипт в самом верху (в `<head>`), он остановит загрузку страницы, скачает скрипт и выполнит его. Это может сильно замедлить появление сайта на экране.

Атрибут `defer` говорит браузеру: "Скачай этот скрипт в фоновом режиме, но **выполни его только тогда, когда весь HTML будет полностью загружен и отрисован**". Это правило хорошего тона в современной веб-разработке.

## 🛠 Задание

В файле `index.html` найдите раздел `<head>`. Сразу после подключения иконки добавьте тег `<script src="js/main.js" defer></script>`.

```html:start
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  
</head>
```

```html:solution
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
  <script src="js/main.js" defer></script>
</head>
```
