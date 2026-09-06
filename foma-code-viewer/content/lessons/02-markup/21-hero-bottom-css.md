---
title: "Стили нижней части и подзаголовка"
highlight: css
---

# Стили нижней части (hero-bottom)

Мы добавили метрики, но они встали под описанием столбиком. Снова зовем на помощь Flexbox!

Нам нужно стилизовать обертку `.hero-bottom`. 
Мы сделаем толстую темную рамку сверху, чтобы отделить эту часть от огромного заголовка, и раскидаем подзаголовок (текст) и метрики по разным углам:
- `border-top: 2px solid #222222;` — верхняя граница.
- `padding-top: 20px;` — отступ внутри от этой границы вниз.
- `display: flex; justify-content: space-between; align-items: center;` — уже знакомая нам связка, чтобы разнести элементы по краям.
- `gap: 40px;` — страховочное расстояние между текстом и метриками.

## Стили для подзаголовка
Текст подзаголовка (`.hero-subtitle`) сделаем серым и ограничим по ширине, чтобы он не тянулся на весь экран:
- `font-size: 17px;`
- `line-height: 1.5;`
- `color: #555555;` (серый)
- `max-width: 600px;` (максимальная ширина — половина экрана).

## 🛠 Задание
Добавьте эти два класса в `style.css`!

```css:start
.brand-highlight {
  color: #007bff;
}

```

```css:solution
.brand-highlight {
  color: #007bff;
}

.hero-bottom {
  border-top: 2px solid #222222;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}
```
