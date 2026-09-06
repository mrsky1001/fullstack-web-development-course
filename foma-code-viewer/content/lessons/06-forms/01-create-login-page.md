---
title: "Страница авторизации"
highlight: html
---

# Создание страницы авторизации

До этого момента наш интерфейс был "режим чтения" — мы просто выводили пользователю данные. Теперь нам нужно получить данные ОТ пользователя. Для этого существуют веб-формы (тег `<form>`).

Начнем с самого простого — страницы Входа (Авторизации).
Представьте, что вы создали новый файл `pages/login.html`.

## 🛠 Задание

Изучите каркас страницы авторизации. Внутри `<main>` пока есть только заголовки.
*(Скопируйте этот каркас в свой редактор, если вы пишете код локально, или просто переходите к следующему шагу).*

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Вход в систему — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo"><span>СмартОфис</span></a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="../pages/login.html" class="nav-link active" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Вход в систему</h1>
      <p class="page-subtitle">Войдите, чтобы управлять бронированиями</p>
      
      <!-- Место для формы входа -->

    </div>
  </main>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Вход в систему — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo"><span>СмартОфис</span></a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="../pages/login.html" class="nav-link active" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Вход в систему</h1>
      <p class="page-subtitle">Войдите, чтобы управлять бронированиями</p>
      
      <!-- Место для формы входа -->

    </div>
  </main>
</body>
</html>
```
