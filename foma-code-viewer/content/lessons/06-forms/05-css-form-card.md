---
title: "Стили каркаса формы"
highlight: css
---

# Оформление формы

HTML-структура готова, но пока форма выглядит некрасиво: инпуты кривые, отступов нет. 
Переходим к CSS!

Для начала мы стилизуем саму "карточку", в которой лежит форма (`.form-card`). Мы сделаем ее белой, зададим максимальную ширину 480px, скруглим углы и разместим по центру экрана через `margin: 30px auto`.

Также зададим отступы между полями через класс `.form-group`.

## 🛠 Задание

Откройте вкладку `css` (`style.css`). В самом конце добавьте стили для карточки формы.

```css:start
/* ... предыдущие стили ... */

.center-action {
  text-align: center;
  margin-top: 20px;
}
```

```css:solution
/* ... предыдущие стили ... */

.center-action {
  text-align: center;
  margin-top: 20px;
}

/* Формы регистрации и входа */
.form-card {
  max-width: 480px;
  margin: 30px auto 0 auto;
  padding: 25px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background-color: #ffffff;
}

.form-group {
  margin-bottom: 15px;
}
```
