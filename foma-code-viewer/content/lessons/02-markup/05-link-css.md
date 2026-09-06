---
title: "CSS-файл и тег Body"
highlight: html
---

# Подключение стилей и тег Body

Мы почти закончили с настройками страницы! Остался последний, но очень важный шаг в `<head>`.

Мы будем писать много CSS-кода (дизайна) для нашего сайта. Писать его прямо внутри HTML-файла — плохая практика, код превратится в нечитаемую кашу. 
Стили принято выносить в отдельный файл (обычно его называют `style.css`). Но браузер сам по себе не догадается, что нужно применить этот файл. Нам нужно их **связать**!

## Подключение CSS
Для подключения файла стилей мы снова используем тег `<link>`.
- `rel="stylesheet"` — мы говорим браузеру, что подключаем таблицу стилей (*Style Sheet*).
- `href="css/style.css"` — указываем путь до файла.

## Тег <body>
С секцией `<head>` покончено! Теперь мы готовы создавать видимую часть сайта. Для этого сразу после закрывающего тега `</head>` мы открываем парный тег `<body>` (тело).
Абсолютно **весь видимый контент** сайта (кнопки, картинки, тексты) всегда пишется строго внутри `<body>`.

## 🛠 Задание

1. Внутри `<head>`, прямо перед подключением иконки, добавьте ссылку на наш файл стилей: `<link rel="stylesheet" href="css/style.css">`.
2. После закрывающего тега `</head>` (но до `</html>`) добавьте пустой парный тег `<body></body>`.

Поздравляю, вы создали идеальный базовый каркас HTML-документа по всем стандартам!

```html:start
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
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="img/logo.svg">
</head>
<body>
</body>
</html>
```
