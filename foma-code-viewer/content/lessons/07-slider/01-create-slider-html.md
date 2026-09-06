---
title: "HTML разметка слайдера"
highlight: html
---

# Разметка слайдера

Слайдер (карусель) состоит из нескольких логических частей:
1. Окно просмотра (в котором виден только 1 слайд).
2. Сами картинки (слайды).
3. Кнопки управления (Вперед / Назад).
4. Точки-индикаторы внизу (показывают, какой по счету слайд открыт).

Мы добавим этот блок на Главную страницу, сразу под блоком "Преимущества" (о нас).

## 🛠 Задание
Откройте вкладку `html` (`index.html`). Найдите закрывающий тег `</section>` секции преимуществ (`about-section`) и вставьте под ним новую секцию слайдера.

```html:start
        </div>
      </section>

      <!-- Вставьте слайдер сюда -->

      <section class="popular-section">
```

```html:solution
        </div>
      </section>

      <section class="slider-section">
        <div class="slider">
          <div class="slide active">
            <img src="img/slider-1.jpg" alt="Слайд 1" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-2.jpg" alt="Слайд 2" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-3.jpg" alt="Слайд 3" class="slide-img">
          </div>
          <div class="slide">
            <img src="img/slider-4.jpg" alt="Слайд 4" class="slide-img">
          </div>
          
          <button class="slider-btn slider-prev">‹</button>
          <button class="slider-btn slider-next">›</button>
          
          <div class="slider-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </section>

      <section class="popular-section">
```
