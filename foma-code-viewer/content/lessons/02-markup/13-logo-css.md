---
title: "Стили логотипа"
highlight: css
---

# Стилизация логотипа

Разметка логотипа готова, но выглядит он пока не очень: текст стал синим и подчеркнутым (так браузер по умолчанию стилизует все ссылки), а иконка и текст стоят криво.

Давайте исправим это в `style.css`! Нам нужно стилизовать класс `.logo` и класс `.logo-icon`.

## 1. Стили для .logo
- Чтобы выстроить картинку и текст в ровный ряд, мы снова используем Flexbox: `display: flex; align-items: center;`.
- Чтобы задать расстояние между иконкой и текстом: `gap: 10px;`.
- Чтобы убрать подчеркивание ссылки: `text-decoration: none;`.
- Цвет текста: `color: #222222;`.
- Шрифт: `font-size: 20px;`, жирность `font-weight: 800;` (очень жирный).
- Расстояние между буквами (трекинг): `letter-spacing: -0.02em;` (делает текст чуть плотнее, выглядит современнее).

## 2. Стили для .logo-icon
- Жестко задаем размеры картинки: `width: 32px;` и `height: 32px;`.

## 🛠 Задание

В `style.css` добавьте селекторы `.logo` и `.logo-icon` с описанными выше свойствами.

```css:start
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

```

```css:solution
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #222222;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.logo-icon {
  width: 32px;
  height: 32px;
}
```
