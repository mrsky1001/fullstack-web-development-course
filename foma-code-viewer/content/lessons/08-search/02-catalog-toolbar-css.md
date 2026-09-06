---
title: "Панель поиска (CSS)"
highlight: css
---

# Оформление панели поиска

Чтобы панель выглядела аккуратно, мы используем наш любимый `display: flex`. Он выстроит строку поиска и блок с кнопками в один ряд.
А свойство `justify-content: space-between` растолкает их по краям (поиск прижмется влево, а кнопки — вправо).

Строке поиска мы зададим `flex: 1`, чтобы она заняла всё свободное пространство!

## 🛠 Задание
Добавьте эти стили в конец вашего файла `style.css`.

```css:start
.dot.active {
  background-color: #007bff;
}
```

```css:solution
.dot.active {
  background-color: #007bff;
}

/* Панель поиска и сортировки в каталоге */
.catalog-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  border-radius: 6px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.sort-actions {
  display: flex;
  gap: 10px;
}
```
