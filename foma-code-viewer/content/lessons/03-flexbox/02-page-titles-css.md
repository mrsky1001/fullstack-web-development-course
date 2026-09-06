---
title: "Стилизация заголовков"
highlight: css
---

# Стилизация заголовков

Разметка готова, но заголовки прижались к левому краю и выглядят скучно. Мы добавили им классы `.page-title` и `.page-subtitle`. Давайте стилизуем их в `style.css`!

Это будут универсальные классы. Если на других страницах (например, в каталоге) нам понадобится такой же заголовок, мы просто дадим ему класс `.page-title`, и он сразу станет красивым. Это принцип **переиспользования кода**.

## Свойства заголовка
Для `.page-title`:
- Сделаем текст по центру: `text-align: center;`.
- Увеличим размер: `font-size: 28px;`.
- Сделаем жирным: `font-weight: 800;`.
- Немного сожмем расстояние между буквами: `letter-spacing: -0.02em;`.
- Добавим отступ снизу до подзаголовка: `margin-bottom: 8px;`.

Для `.page-subtitle`:
- Тоже по центру: `text-align: center;`.
- Сделаем серым: `color: #666666;`.
- Размер шрифта: `font-size: 15px;`.

## 🛠 Задание

Перейдите в `style.css`. Перед стилями подвала (перед комментарием `/* Подвал сайта */`) добавьте эти два новых класса и их свойства.

```css:start
.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

/* Подвал сайта */
```

```css:solution
.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
}

.page-subtitle {
  color: #666666;
  text-align: center;
  font-size: 15px;
}

/* Подвал сайта */
```
