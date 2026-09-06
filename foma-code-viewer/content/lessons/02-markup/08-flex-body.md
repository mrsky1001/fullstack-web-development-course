---
title: "Flexbox и высота страницы"
highlight: css
---

# Flexbox и высота страницы

Продолжаем работать с тегом `body`. На современных сайтах подвал (Footer) всегда прижат к самому низу экрана, даже если на странице мало текста. 

Чтобы добиться этого, мы используем технологию **Flexbox** (гибкие блоки).
Мы превращаем наш `body` во flex-контейнер. Это даст нам суперсилу управлять расположением всех главных блоков на странице!

Добавим в `body`:
1. `display: flex;` — включаем режим Flexbox.
2. `flex-direction: column;` — по умолчанию flex-блоки выстраиваются в ряд (слева направо). Это свойство заставляет их строиться в колонку (сверху вниз), как и положено сайту.
3. `min-height: 100vh;` — `vh` расшифровывается как Viewport Height (высота экрана). `100vh` означает "100% от высоты экрана вашего устройства". Мы говорим, что `body` всегда должен занимать минимум весь экран, даже если он пустой.
4. `min-width: 1200px;` — так как наш сайт не адаптивный (он рассчитан на компьютеры), мы жестко задаем минимальную ширину, чтобы верстка не ломалась на узких экранах.

## 🛠 Задание

Добавьте эти четыре новых свойства в ваш селектор `body`.

```css:start
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
}
```

```css:solution
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: #222222;
  background-color: #ffffff;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1200px;
}
```
