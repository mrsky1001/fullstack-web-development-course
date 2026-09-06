---
title: "Выравнивание кнопок"
highlight: css
---

# Выравнивание кнопок

Последний штрих для одной карточки! 
Посмотрите на кнопки "Подробнее" (со стрелочкой) и "Забронировать". Сейчас они прилипли друг к другу.

Дело в том, что они лежат внутри `<div class="card-btns">`. Нам нужно добавить небольшое расстояние между ними. И здесь нам снова поможет Flexbox!

## Стили .card-btns
- `display: flex;`
- `align-items: center;`
- `gap: 8px;` — добавляем красивый отступ ровно в 8 пикселей между кнопками.

## 🛠 Задание

В файле `style.css` добавьте селектор `.card-btns` и эти три свойства. Поздравляю, вы закончили верстку идеальной карточки товара!

```css:start
.card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

```

```css:solution
.card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

.card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}
```
