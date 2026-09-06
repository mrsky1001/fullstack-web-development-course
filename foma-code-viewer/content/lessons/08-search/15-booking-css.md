---
title: "Стили калькулятора (CSS)"
highlight: css
---

# Стилизация калькулятора

Осталось совсем немного CSS. Нам нужно красиво оформить наш блок `.calc-summary` (где выводится цена).
Мы дадим ему светло-серый фон (`#f8f9fa`), немного отступов и бордер. 

А саму итоговую цифру (`.calc-total`) сделаем крупной (`20px`), жирной (`700`) и фирменного синего цвета!

## 🛠 Задание
Перейдите во вкладку `css` (`style.css`) и добавьте эти стили в конец файла. Верстка окончена!

```css:start
.sort-actions {
  display: flex;
  gap: 10px;
}
```

```css:solution
.sort-actions {
  display: flex;
  gap: 10px;
}

/* Калькулятор стоимости на странице бронирования */
.calc-summary {
  background-color: #f8f9fa;
  border: 1px solid #dddddd;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calc-total {
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
}
```
