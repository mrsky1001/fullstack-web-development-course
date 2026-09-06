---
title: "Карточка брони (CSS)"
highlight: css
---

# Карточка отдельной заявки

Каждая заявка будет выглядеть как аккуратный белый прямоугольник с серой рамкой.
Мы используем `display: flex` и `justify-content: space-between`, чтобы информация о комнате (название, дата) прижалась влево, а цена и статус ("Подтверждено") — вправо.

## 🛠 Задание
Добавьте стили для класса `.booking-item`.

```css:start
.bookings-list {
  /* ... */
}

```

```css:solution
.bookings-list {
  /* ... */
}

.booking-item {
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 15px 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
