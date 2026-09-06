---
title: "Страница Каталога"
highlight: html
---

# Создание страницы Каталога

Данные подключены, теперь нам нужна отдельная страница, где мы выведем полный каталог всех комнат.

Представьте, что сейчас во вкладке `html` открыт новый файл — `pages/catalog.html`.
Он очень похож на главную страницу: у него такая же шапка (header) и подвал (footer), но абсолютно другая основная часть (main).

## 🛠 Задание
Мы уже подготовили для вас "скелет" этой страницы (с измененными путями к CSS и JS, так как файл лежит в папке `pages`).
Изучите структуру блока `<main>` — там сейчас только заголовки и пустота.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <!-- ... базовые теги опущены для краткости ... -->
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <!-- ... шапка сайта ... -->
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>
      
      
    </div>
  </main>

  <footer class="footer">
    <!-- ... подвал сайта ... -->
  </footer>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Каталог офисов — СмартОфис</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <header class="header">
    <div class="container header-container">
      <a href="../index.html" class="logo">
        <img src="../img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="../index.html" class="nav-link">Главная</a></li>
          <li><a href="../pages/catalog.html" class="nav-link active">Каталог</a></li>
          <li><a href="../pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Каталог офисных пространств</h1>
      <p class="page-subtitle">Выберите подходящее помещение для индивидуальной работы или командных встреч</p>
      
      
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-info">
        <p><strong>СмартОфис</strong> — Сервис бронирования офисных комнат</p>
        <p>© 2026 СмартОфис.</p>
      </div>
    </div>
  </footer>
</body>
</html>
```
