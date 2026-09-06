---
title: "Стили контейнера списка"
highlight: css
---

# Вертикальный Flexbox

Мы на финишной прямой! Переходим к странице `my-bookings.html`.

Для начала зададим стили контейнеру списка броней. Нам нужно, чтобы новые заявки выстраивались в красивый столбик одна под другой.
Для этого мы снова используем Флексбокс, но изменим его направление с помощью `flex-direction: column;`. Теперь элементы будут выстраиваться не в строку, а в колонку!

А чтобы список не растягивался на огромных мониторах, мы ограничим его ширину (`max-width: 800px`) и отцентрируем по горизонтали (`margin: 30px auto 0 auto;`).

## 🛠 Задание
Откройте вкладку `css` (`style.css`) и добавьте эти стили в самый конец файла.

```css:start
.calc-total {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
}
```

```css:solution
.calc-total {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
}

/* Мои бронирования */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 30px auto 0 auto;
}
```
