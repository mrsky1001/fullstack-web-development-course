---
title: "Стили метрик"
highlight: css
---

# Стилизация метрик (Цифры и подписи)

Осталось сделать красивые акценты на наших цифрах! 

Сначала выстроим три блока с метриками в горизонтальный ряд:
```css
.hero-metrics {
  display: flex;
  align-items: center;
  gap: 25px;
}
```

Теперь стилизуем саму "коробочку" метрики (`.metric-item`). Внутри неё цифра стоит над подписью. Поэтому мы используем flexbox, но с направлением `column` (колонка):
```css
.metric-item {
  display: flex;
  flex-direction: column;
}
```

И самое главное — внешний вид:
- `.metric-val` (значение) — делаем синим `#007bff`, размер `20px` и жирность `800`.
- `.metric-lbl` (подпись) — делаем мелким серым шрифтом: `font-size: 12px;`, `color: #777777;`, `font-weight: 500;`.

## 🛠 Задание
Добавьте эти 4 класса в конец вашего файла `style.css`.
Поздравляю, наш Главный экран (Hero) полностью готов и выглядит потрясающе!

```css:start
.hero-subtitle {
  font-size: 17px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}

```

```css:solution
.hero-subtitle {
  font-size: 17px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}

.hero-metrics {
  display: flex;
  align-items: center;
  gap: 25px;
}

.metric-item {
  display: flex;
  flex-direction: column;
}

.metric-val {
  font-size: 20px;
  font-weight: 800;
  color: #007bff;
  letter-spacing: -0.02em;
}

.metric-lbl {
  font-size: 12px;
  color: #777777;
  font-weight: 500;
}
```
