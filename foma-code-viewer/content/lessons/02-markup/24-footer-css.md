---
title: "Стили Подвала и финал"
highlight: css
---

# Стили Подвала и финал!

Остался последний рывок! Нам нужно стилизовать подвал в `style.css`.

Мы дадим подвалу (`.footer`) светло-серый фон (`#f8f9fa`), серый текст и рамку сверху. 
Самое важное свойство здесь — `margin-top: auto;`. Помните, мы делали `body` flex-контейнером? Это свойство заставит подвал **всегда отталкиваться** от верхнего контента и прилипать к самому низу экрана, даже если на странице мало текста!

Контейнер подвала (`.footer-container`) мы снова раскидаем по краям с помощью `justify-content: space-between`.

А ссылки внутри контактов (`.footer-contacts a`) сделаем синими и уберем подчеркивание.

## 🛠 Задание

Скопируйте финальные стили подвала из решения и вставьте их в конец файла `style.css`.

**Вы потрясающие!** 🎉 Мы с нуля сверстали целую главную страницу, которая выглядит очень современно. Теперь вы знаете, как работают HTML-теги и CSS-свойства.

```css:start
.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

```

```css:solution
.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

/* Подвал сайта */
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dddddd;
  color: #444444;
  padding: 25px 0;
  margin-top: auto;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-contacts p {
  font-size: 14px;
  margin-bottom: 4px;
}

.footer-contacts a {
  color: #007bff;
  text-decoration: none;
}
```
