---
title: "Страница одной комнаты"
highlight: html
---

# Страница отдельной комнаты

Осталось самое сложное — страница `room-details.html`. Когда пользователь кликает по карточке, он попадает на эту страницу. 

Страница сама по себе "глупая", она не знает, какую комнату показывать. Но у нее в адресной строке есть подсказка — параметр `?id=...`. Наш JavaScript должен будет прочитать этот параметр и отрисовать нужную комнату.

## 🛠 Задание
Представьте, что вы открыли файл `pages/room-details.html`. Его структура тоже очень простая. В нем есть только пустой контейнер `<div class="container" id="roomDetailsContainer"></div>`.

Изучите разметку.

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <!-- ... шапка ... -->
</head>
<body>
  <header class="header">
    <!-- ... навигация ... -->
  </header>

  <main class="main">
    <div class="container" id="roomDetailsContainer">
      <!-- Контент формируется динамически через JS -->
    </div>
  </main>

  <footer class="footer">
    <!-- ... подвал ... -->
  </footer>
</body>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Описание комнаты — СмартОфис</title>
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
          <li><a href="../pages/catalog.html" class="nav-link">Каталог</a></li>
          <li><a href="../pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container" id="roomDetailsContainer">
      <!-- Контент формируется динамически через initRoomDetails() на основе ?id=... -->
    </div>
  </main>

  <footer class="footer">
    <!-- ... подвал ... -->
  </footer>
</body>
</html>
```
