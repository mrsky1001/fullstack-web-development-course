---
title: "Стили цены"
highlight: css
---

# Стили цены

Цена — это один из самых важных элементов карточки (после картинки), поэтому мы сделаем её жирной и заметной.

## 1. Блок цены (.card-price)
- `font-size: 18px;`
- `font-weight: 700;`
- `color: #222222;`

## 2. Подпись "в час" (.card-price span)
Мы специально обернули текст `/ час` в тег `<span>`, чтобы стилизовать его отдельно. Он не должен перетягивать на себя внимание.
- `font-size: 13px;` — делаем мельче.
- `font-weight: 400;` — убираем жирность (400 — это обычный вес текста).
- `color: #666666;` — делаем серым.

## 🛠 Задание

Добавьте эти стили в ваш `style.css`. Наша карточка готова на 99%!

```css:start
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  gap: 10px;
}

```

```css:solution
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
  gap: 10px;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #222222;
}

.card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}
```
