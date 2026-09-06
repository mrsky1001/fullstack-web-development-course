---
title: "Разметка логотипа"
highlight: html
---

# Разметка логотипа

Пришло время добавить контент внутрь нашей шапки. Начнем с логотипа компании.

Обычно логотип — это кликабельная ссылка, которая ведет на главную страницу (чтобы пользователь мог быстро вернуться на стартовый экран откуда угодно). Поэтому мы обернем наш логотип в тег ссылки `<a>`.

Внутри ссылки у нас будет два элемента:
1. Картинка (иконка логотипа) — тег `<img>`.
2. Текстовое название компании — тег `<span>` (строчный контейнер для текста).

## 🛠 Задание

Перейдите в `index.html`. Внутри `<div class="container header-container">` создайте ссылку:
1. Тег `<a href="index.html" class="logo">`.
2. Внутри ссылки добавьте картинку: `<img src="img/logo.svg" alt="Логотип" class="logo-icon">`.
3. Под картинкой (все еще внутри ссылки) добавьте текст: `<span>СмартОфис</span>`.
4. Закройте тег `</a>`.

```html:start
<body>
  <header class="header">
    <div class="container header-container">
      
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
    </div>
  </header>
</body>
```
