---
title: "Главный заголовок"
highlight: html
---

# Главный заголовок

Каждой странице нужен главный заголовок первого уровня — `<h1>`. Он должен быть огромным и привлекать внимание!

Внутри `<section class="hero-section">` мы напишем:
```html
<h1 class="hero-title">
  Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
</h1>
```
Обратите внимание на тег `<span>`. Мы обернули название "СмартОфис" в отдельный строчный тег с классом `.brand-highlight`. Это позволит нам в CSS покрасить только это слово в синий цвет, не трогая остальной заголовок!

## Стилизация
В файл `style.css` нам нужно добавить стили для новых блоков:
- `.main` — дадим `flex: 1;` (чтобы основная часть растягивалась, прижимая подвал к низу) и `padding: 40px 0;`.
- `.hero-section` — зададим внутренние отступы `padding: 20px 0 50px 0;` и нижний отступ `margin-bottom: 30px;`.
- `.hero-title` — делаем текст ОГРОМНЫМ! `font-size: 108px;`, очень жирным `font-weight: 800;` и уменьшаем высоту строки `line-height: 0.95;`, чтобы слова не разбегались. `letter-spacing: -0.04em;` и цвет `#222222;`.
- `.brand-highlight` — цвет `#007bff;`.

## 🛠 Задание

1. В `index.html` добавьте заголовок `<h1>` внутрь `.hero-section`.
2. В `style.css` добавьте селекторы `.main`, `.hero-section`, `.hero-title` и `.brand-highlight` с нужными свойствами.

*(Подсказка: просто перенесите код заголовка в HTML, а CSS скопируйте из текста выше или посмотрите решение).*

```html:start
  <main class="main">
    <div class="container">
      <section class="hero-section">
        
      </section>
    </div>
  </main>
```

```css:start
.nav-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}

```

```html:solution
  <main class="main">
    <div class="container">
      <section class="hero-section">
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
      </section>
    </div>
  </main>
```

```css:solution
/* Основной блок */
.main {
  flex: 1;
  padding: 40px 0;
}

/* Главный баннер (Hero) */
.hero-section {
  padding: 20px 0 50px 0;
  margin-bottom: 30px;
}

.hero-title {
  font-size: 108px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #222222;
  margin-bottom: 25px;
}

.brand-highlight {
  color: #007bff;
}
```
