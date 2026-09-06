---
title: "Кнопки Вперед / Назад"
highlight: css
---

# Стилизация кнопок

Кнопки в слайдере обычно располагаются по краям и "висят" поверх картинки по центру по вертикали.

Мы снова используем абсолютное позиционирование. Чтобы выровнять кнопку идеально по центру вертикали, мы применяем трюк:
`top: 50%;` (опускает верхний край кнопки на середину)
`transform: translateY(-50%);` (поднимает кнопку обратно вверх на половину её собственной высоты).

Сами кнопки мы сделаем круглыми, черными и полупрозрачными.

## 🛠 Задание
Стилизуйте кнопки навигации.

```css:start
.slide-img {
  /* ... стили ... */
}
```

```css:solution
.slide-img {
  /* ... стили ... */
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn:hover {
  background-color: #007bff;
}

.slider-prev { left: 15px; }
.slider-next { right: 15px; }
```
