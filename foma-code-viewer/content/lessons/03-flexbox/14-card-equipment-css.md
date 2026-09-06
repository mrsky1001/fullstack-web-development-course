---
title: "Стили списка удобств"
highlight: css
---

# Стили списка удобств

Список оборудования сейчас выглядит как стандартный HTML-список — с черными точками и лишними отступами.

## Стили .card-equipment
- `list-style: none;` — магическое свойство, которое полностью скрывает маркеры (черные точки) у списка!
- `margin-bottom: 15px;` — добавляем отступ снизу (до будущей цены).
- `flex: 1;` — заставляем именно список растягиваться по высоте, если карточки будут разного размера.

## Стили для пунктов списка (li)
Мы не будем давать класс каждому пункту `<li>`. Вместо этого мы обратимся к ним через "родителя": `.card-equipment li`.
- `font-size: 13px;` — делаем текст мелким.
- `color: #555555;` — делаем его серым.
- `margin-bottom: 4px;` — добавляем небольшое расстояние между самими пунктами.

## 🛠 Задание
Добавьте эти два правила в `style.css`. Наша карточка становится всё красивее!

```css:start
.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

```

```css:solution
.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-equipment {
  list-style: none;
  margin-bottom: 15px;
  flex: 1;
}

.card-equipment li {
  font-size: 13px;
  color: #555555;
  margin-bottom: 4px;
}
```
