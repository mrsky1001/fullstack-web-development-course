---
title: "Стили контейнера (slider)"
highlight: css
---

# Стили контейнера

Сначала мы ограничим размеры нашего слайдера в CSS.
Мы зададим ему высоту `400px` и ширину `100%`.
Самое важное здесь — свойство `overflow: hidden;`. Оно заставит контейнер работать как "окошко", обрезая все элементы, которые вылезают за его пределы. Без этого свойства картинки растянутся на всю страницу!

Также мы зададим ему `position: relative`, чтобы мы могли позиционировать кнопки и слайды внутри него.

## 🛠 Задание
Откройте `style.css` и добавьте стили для слайдера в самый конец файла.

```css:start
.form-alert.alert-danger {
  /* ... стили из прошлого урока ... */
}
```

```css:solution
.form-alert.alert-danger {
  /* ... стили из прошлого урока ... */
}

/* Слайдер на главной */
.slider-section {
  margin-bottom: 40px;
}

.slider {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: #f8f9fa;
}
```
