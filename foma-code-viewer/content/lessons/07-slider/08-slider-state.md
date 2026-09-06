---
title: "Состояние слайдера"
highlight: js
---

# Хранение состояния

Любой интерактивный компонент (слайдер, таймер, корзина товаров) должен где-то хранить свое текущее **состояние** (state).

Для слайдера состоянием является **номер текущего слайда**.
Мы объявим переменную `currentSlide` и изначально присвоим ей `0` (так как нумерация элементов в JS начинается с нуля, первый слайд имеет индекс 0).

Также мы заранее создадим переменную `timerId` (она понадобится нам позже для функции авто-перелистывания). Присвоим ей `null` (пустота).

## 🛠 Задание
Объявите переменные состояния внутри `initSlider()`.

```js:start
function initSlider() {
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

}
```

```js:solution
function initSlider() {
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;
}
```
