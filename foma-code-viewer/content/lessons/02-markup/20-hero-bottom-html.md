---
title: "Разметка метрик и подзаголовка"
highlight: html
---

# Разметка метрик и подзаголовка

Под огромным заголовком мы расположим блок с подзаголовком (описанием) и ключевыми метриками сервиса. 

Они будут стоять в одну линию: слева текст, а справа три цифры (24/7, от 250 ₽, 0 ₽).

Всю эту нижнюю часть мы обернем в `<div class="hero-bottom">`.
Внутри будут два элемента:
1. Абзац с подзаголовком `<p class="hero-subtitle">Удобный выбор...</p>`.
2. Контейнер для метрик `<div class="hero-metrics">`.

Внутри `.hero-metrics` будет три одинаковых блока `<div class="metric-item">`. 
Каждый из них содержит:
- Большую цифру: `<span class="metric-val">24/7</span>`
- Маленькую подпись: `<span class="metric-lbl">Доступ</span>`

## 🛠 Задание

Сразу под вашим `</h1>` добавьте эту разметку. Попробуйте скопировать структуру из блока ниже!

```html:start
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        
```

```html:solution
        <h1 class="hero-title">
          Портал бронирования офисных комнат <span class="brand-highlight">«СмартОфис»</span>
        </h1>
        <div class="hero-bottom">
          <p class="hero-subtitle">
            Удобный выбор и быстрое бронирование рабочих пространств в центре города
          </p>
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">24/7</span>
              <span class="metric-lbl">Доступ</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">от 250 ₽</span>
              <span class="metric-lbl">Почасовая аренда</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">0 ₽</span>
              <span class="metric-lbl">Без комиссии</span>
            </div>
          </div>
        </div>
```
