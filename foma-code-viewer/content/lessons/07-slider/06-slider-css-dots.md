---
title: "Стиль индикаторов (Точки)"
highlight: css
---

# Точки-индикаторы

Последний штрих в верстке — точки внизу слайдера. 
Мы используем тот же трюк для центрирования по горизонтали: `left: 50%` и `transform: translateX(-50%)`.
Сами точки (класс `.dot`) мы сделаем маленькими белыми полупрозрачными кружочками. 

Активная точка (`.dot.active`) будет окрашиваться в наш фирменный синий цвет `#007bff`.

## 🛠 Задание
Добавьте стили для точек в конец файла `style.css`.
Верстка завершена! Обратите внимание, как сейчас выглядит слайдер: видна первая картинка и синяя первая точка.

```css:start
.slider-next { right: 15px; }
```

```css:solution
.slider-next { right: 15px; }

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.dot.active {
  background-color: #007bff;
}
```
