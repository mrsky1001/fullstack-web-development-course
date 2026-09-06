---
title: "Прозрачная кнопка с рамкой"
highlight: css
---

# Прозрачная кнопка с рамкой (Outline)

Кроме главной кнопки, нам часто нужна **второстепенная**. Например, кнопка "Больше офисов" в конце страницы. Если мы сделаем её синей, она будет перетягивать на себя слишком много внимания.

Для этого в дизайне используется стиль "Outline" — кнопка без фона, но с цветной рамкой и цветным текстом. Создадим для неё класс `.btn-outline`.

## Свойства Outline
- `background-color: transparent;` — делаем фон полностью прозрачным.
- `border-color: #007bff;` — красим рамку (ту самую, которую мы сделали прозрачной в классе `.btn`) в синий цвет.
- `color: #007bff;` — текст тоже делаем синим.

## Эффект наведения
Когда мы наводим мышку на такую кнопку, она обычно заливается цветом.
Для `.btn-outline:hover`:
- `background-color: #007bff;` — фон становится синим.
- `color: #ffffff;` — текст становится белым.

## 🛠 Задание
Добавьте классы `.btn-outline` и `.btn-outline:hover` в `style.css`. Наша дизайн-система кнопок почти готова!

```css:start
.btn-primary:hover {
  background-color: #0056b3;
}

```

```css:solution
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  border-color: #007bff;
  color: #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: #ffffff;
}
```
