---
title: "Навигация (Меню)"
highlight: html
---

# Разметка навигации (Меню)

Логотип мы разместили слева. Теперь добавим меню навигации, которое благодаря нашему `.header-container` улетит в правую часть шапки.

Семантически меню всегда оборачивается в тег `<nav>` (от слова Navigation). 
Внутри него располагается маркированный список `<ul>`, пункты которого `<li>` содержат ссылки `<a>`.

## 🛠 Задание

В файле `index.html` сразу **под** закрывающим тегом `</a>` нашего логотипа добавьте блок навигации:

1. Тег `<nav class="nav">`.
2. Внутри него список `<ul class="nav-list">`.
3. Внутри списка добавьте три пункта меню `<li>`.
   - Первый пункт: `<a href="index.html" class="nav-link active">Главная</a>`
   - Второй пункт: `<a href="pages/catalog.html" class="nav-link">Каталог</a>`
   - Третий пункт: `<a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a>`

*Обратите внимание: мы добавили множество классов, чтобы позже обратиться к ним в CSS. У кнопки "Войти" целых два класса и id!*

```html:start
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      
    </div>
  </header>
</body>
```

```html:solution
<body>
  <header class="header">
    <div class="container header-container">
      <a href="index.html" class="logo">
        <img src="img/logo.svg" alt="Логотип" class="logo-icon">
        <span>СмартОфис</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html" class="nav-link active">Главная</a></li>
          <li><a href="pages/catalog.html" class="nav-link">Каталог</a></li>
          
          <li><a href="pages/login.html" class="nav-link nav-btn" id="authNavBtn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>
</body>
```
