---
title: "Google Fonts"
highlight: html
---

# Подключение красивых шрифтов

По умолчанию браузер использует скучные системные шрифты (например, Times New Roman или Arial). Чтобы наш дизайн выглядел современно и дорого, мы подключим нестандартный шрифт.

В вебе стандартом де-факто является сервис **Google Fonts** — огромная бесплатная библиотека шрифтов от Google. 

Для проекта «СмартОфис» мы выбрали шрифт **Inter** — это очень чистый, строгий и прекрасно читаемый шрифт без засечек. Он отлично подходит для бизнес-порталов.

## Как подключить шрифт?
Мы снова используем тег `<link>`. Сервис Google Fonts выдает нам специальный код, который мы должны просто скопировать и вставить в наш `<head>`.

Этот код состоит из трех ссылок. Первые две (`preconnect`) говорят браузеру заранее подготовиться к соединению с серверами Google для ускорения загрузки. Третья ссылка (`stylesheet`) непосредственно скачивает сам шрифт **Inter** (мы скачиваем разную толщину: 400, 500, 600, 700, 800).

## 🛠 Задание

Скопируйте предложенные строки и вставьте их внутрь `<head>` прямо перед тегом `<link rel="icon"...>`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

```html:start
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>

  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
</html>
```

```html:solution
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Бронирование офисных комнат</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
</html>
```
