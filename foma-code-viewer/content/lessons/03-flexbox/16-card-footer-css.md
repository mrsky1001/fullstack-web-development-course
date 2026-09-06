---
title: "Выравнивание подвала карточки"
highlight: css
---

# Выравнивание подвала карточки

Разметка подвала есть, но выглядит она пока неряшливо. Пора пустить в ход CSS!

Мы хотим, чтобы цена находилась слева, а кнопки — справа. И чтобы сверху была тонкая разделительная линия, отделяющая подвал от списка удобств.

## Свойства .card-footer
- `display: flex; justify-content: space-between; align-items: center;` — наша любимая связка для разбрасывания элементов по краям.
- `border-top: 1px solid #eeeeee;` — очень светлая линия сверху.
- `padding-top: 10px;` — отступ текста от этой линии вниз.
- `gap: 10px;` — страховочное расстояние между ценой и кнопками, если карточка вдруг сожмется.

## 🛠 Задание

Добавьте селектор `.card-footer` с этими свойствами в `style.css`.

*(Обратите внимание: кнопки уже выглядят отлично, потому что мы создали классы `.btn`, `.btn-primary` и `.btn-icon` в самом начале вебинара!)*

```css:start
.card-equipment li {
  font-size: 13px;
  color: #555555;
  margin-bottom: 4px;
}

```

```css:solution
.card-equipment li {
  font-size: 13px;
  color: #555555;
  margin-bottom: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  gap: 10px;
}
```
