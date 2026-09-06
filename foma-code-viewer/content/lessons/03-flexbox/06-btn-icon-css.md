---
title: "Кнопка-иконка"
highlight: css
---

# Кнопка-иконка

Иногда нам нужны небольшие квадратные кнопки, внутри которых находится только иконка. У нас в макете есть такая кнопка рядом с кнопкой "Забронировать" (в ней будет лежать иконка со стрелочкой).

Так как эта кнопка сильно отличается от обычных (она квадратная и у нее нет текста), мы создадим для неё полностью отдельный класс `.btn-icon` (без использования базового `.btn`).

## Свойства иконки
- Мы используем `display: inline-flex;`, чтобы легко отцентрировать иконку внутри квадрата через `align-items: center;` и `justify-content: center;`.
- Жестко задаем размеры квадрата: `width: 36px;` и `height: 36px;`.
- `padding: 0;` — убираем внутренние отступы, так как размеры уже заданы.
- `border-radius: 4px;` — скругляем углы так же, как у других кнопок.
- Делаем синюю рамку: `border: 1px solid #007bff;`.
- Делаем прозрачный фон и синий цвет для самой иконки (SVG): `background-color: transparent; color: #007bff;`.
- И не забываем `cursor: pointer;` и `text-decoration: none;`.

## Эффект наведения
При наведении (`.btn-icon:hover`) мы сделаем фон светло-синим (`#eaf2ff`), а саму рамку и иконку темно-синими (`#0056b3`).

## 🛠 Задание
Добавьте эти стили в CSS. И на этом наша система кнопок завершена!

```css:start
.btn-outline:hover {
  background-color: #007bff;
  color: #ffffff;
}

```

```css:solution
.btn-outline:hover {
  background-color: #007bff;
  color: #ffffff;
}

/* Кнопка-иконка (например, «Подробнее») */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: transparent;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.btn-icon:hover {
  background-color: #eaf2ff;
  color: #0056b3;
  border-color: #0056b3;
}
```
