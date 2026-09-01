# Вебинар 2. Основы разметки и стилизации: Каркас главной страницы

## 📋 О занятии простыми словами
Сегодня мы сделаем первые реальные шаги в веб-разработке! Мы напишем скелет главной страницы (`index.html`) и настроим файл стилей (`style.css`).

К концу занятия у нас будет готова красивая шапка сайта с логотипом, главный презентационный баннер (Hero-блок) и аккуратный подвал (футер) с контактами.

---

## 🎯 Что мы сегодня создадим:
1. Файл `index.html` с правильной семантической структурой HTML5.
2. Шапку сайта (`<header>`) с векторным логотипом «СмартОфис» и навигационным меню.
3. Главный баннер (`<section class="hero-section">`) с крупным заголовком и преимуществами (24/7 доступ, от 250 ₽/час, 0 ₽ комиссия).
4. Подвал сайта (`<footer>`) с кликабельными контактами (телефон и email).
5. Файл `css/style.css` со сбросом отступов, шрифтом Inter и центрирующим контейнером на 1200px.

---

## 💡 Теория простыми словами

### 1. Что такое семантические теги HTML5?
Раньше сайты верстали сплошными бессмысленными блоками `<div>`. В современном вебе мы используем теги, которые говорят сами за себя:
- `<header>` — шапка сайта (верхняя часть с логотипом и меню).
- `<nav>` — блок навигации (ссылки для перехода по сайту).
- `<main>` — главное уникальное содержимое страницы.
- `<section>` — логический раздел (секция) страницы.
- `<footer>` — подвал сайта (нижняя часть с копирайтом и контактами).

### 2. Зачем нужен класс `.container`?
Если открыть сайт на огромном мониторе, текст без контейнера растянется на всю ширину и читать его будет неудобно.  
Контейнер с шириной `width: 1200px` и отступом `margin: 0 auto` аккуратно центрирует содержимое по центру экрана!

### 3. Как работает сброс стилей (`*`)?
У каждого браузера есть свои стандартные отступы. Чтобы сайт выглядел абсолютно одинаково в Chrome, Firefox, Safari и Edge, мы пишем в начале CSS:
```css
* {
  box-sizing: border-box; /* padding и border не увеличивают ширину блока */
  margin: 0;             /* сбрасываем внешние отступы */
  padding: 0;            /* сбрасываем внутренние отступы */
}
```

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Создаем структуру файлов
В папке проекта создаем:
- `index.html`
- `css/style.css`
- `img/logo.svg`

### Шаг 2. Размечаем `index.html`
Подключаем шрифт Inter через Google Fonts и наш файл стилей:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
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
          <li><a href="pages/login.html" class="nav-link nav-btn">Войти</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">24/7</span>
              <span class="metric-lbl">Доступ</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">от 250 ₽</span>
              <span class="metric-lbl">Почасовая аренда</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">0 ₽</span>
              <span class="metric-lbl">Без комиссии</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-info">
        <p><strong>СмартОфис</strong> — Сервис бронирования офисных комнат</p>
        <p>© 2026 СмартОфис. Все права защищены.</p>
      </div>
      <div class="footer-contacts">
        <p>Email: <a href="mailto:info@smartoffice.ru">info@smartoffice.ru</a></p>
        <p>Телефон: <a href="tel:+78005553535">+7 (800) 555-35-35</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
```

---

## ⚠️ Частые ошибки новичков
1. **Забыли `rel="stylesheet"`:** Если написать просто `<link href="css/style.css">`, стили не применятся. Обязательно указывайте `rel="stylesheet"`.
2. **Ошиблись в пути к файлу:** Файл `style.css` лежит в папке `css/`, поэтому путь пишется `css/style.css`.
3. **Не закрыли тег:** Проверяйте, чтобы у каждого открытого тега (например, `<div>`) был соответствующий закрывающий тег (`</div>`).

---

## 🏁 Чек-лист для самопроверки
- [x] Страница открывается в браузере без ошибок.
- [x] Текст отображается современным шрифтом Inter.
- [x] Шапка и подвал расположены по краям, контент отцентрирован по ширине 1200px.
- [x] Ссылки в меню и контакты в футере кликабельны.
