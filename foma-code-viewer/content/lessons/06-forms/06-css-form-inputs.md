---
title: "Стилизация инпутов"
highlight: css
---

# Стили полей ввода

Сами инпуты (поля ввода) по умолчанию выглядят по-разному в разных браузерах (в Chrome одни, в Safari другие). Нам нужно привести их к единому, красивому дизайну.

Мы зададим им ширину 100%, добавим внутренние отступы (`padding`), аккуратную серую рамку и скругленные углы. Также не забудем указать `font-family: inherit`, чтобы они унаследовали наш красивый шрифт `Inter` (по умолчанию инпуты часто используют другой системный шрифт).

## 🛠 Задание
Добавьте стили для `.form-label` и `.form-control` под вашими предыдущими стилями.

```css:start
.form-group {
  margin-bottom: 15px;
}
```

```css:solution
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}
```
