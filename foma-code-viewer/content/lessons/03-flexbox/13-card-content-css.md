---
title: "Стили контента карточки"
highlight: css
---

# Стили для контента и заголовка

Сейчас текст карточки прилип к её левому краю. Давайте добавим отступы!

## 1. Стили .card-content
- `padding: 15px;` — добавляем воздух со всех сторон.
- Мы превратим и саму контентную часть во flex-контейнер: `display: flex; flex-direction: column;`. 
- И дадим ей `flex: 1;`. Это супер-трюк: если названия комнат в разных карточках будут разной длины, это свойство заставит среднюю часть карточки **растягиваться**, всегда прижимая кнопки в самый низ!

## 2. Стили .card-title
Стилизуем заголовок карточки. Он должен быть жирным и иметь отступ снизу:
- `font-size: 18px;`
- `font-weight: 700;`
- `margin-bottom: 10px;`

## 🛠 Задание

Добавьте селекторы `.card-content` и `.card-title` в конец вашего `style.css`!

```css:start
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

```

```css:solution
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}
```
