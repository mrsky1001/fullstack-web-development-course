---
title: "Стили для шапки сайта"
highlight: css
---

# Стили для шапки сайта

Мы создали разметку шапки, но пока её не видно. Давайте добавим ей стили в файле **style.css**.

Нам нужно стилизовать два класса: `.header` (сама полоса шапки во всю ширину экрана) и `.header-container` (контентная часть).

## 1. Стили для .header
- `border-bottom: 1px solid #dddddd;` — добавляем тонкую серую рамку снизу, чтобы отделить шапку от остального сайта.
- `padding: 18px 0;` — внутренние отступы: 18px сверху и снизу, 0 слева и справа.
- `background-color: #ffffff;` — белый фон шапки.

## 2. Стили для .header-container
Здесь мы снова используем суперсилу Flexbox! 
В будущем внутри контейнера будет два элемента: логотип (слева) и меню (справа). Чтобы раскидать их по разным углам, мы пишем:
- `display: flex;` — включаем флексбокс.
- `justify-content: space-between;` — расталкивает элементы по краям (один влево, другой вправо).
- `align-items: center;` — выравнивает элементы строго по центру по вертикали.

## 🛠 Задание

В файле `style.css` (в самом низу) создайте два селектора `.header` и `.header-container` и добавьте в них соответствующие свойства.

```css:start
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

```

```css:solution
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Шапка сайта */
.header {
  border-bottom: 1px solid #dddddd;
  padding: 18px 0;
  background-color: #ffffff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
