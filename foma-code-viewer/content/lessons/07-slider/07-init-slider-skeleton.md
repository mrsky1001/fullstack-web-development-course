---
title: "Инициализация слайдера"
highlight: js
---

# Функция инициализации

Переходим во вкладку `js`. Время оживить наш слайдер!
Создадим новую функцию `initSlider()`. 

Первое, что мы должны сделать — найти все нужные элементы на странице. Так как слайдов и точек у нас несколько, мы используем `document.querySelectorAll()`. Этот метод вернет коллекцию (NodeList) всех элементов, подходящих под селектор.

Кнопки у нас в единственном экземпляре, поэтому для них используем `document.querySelector()`.

## 🛠 Задание
Создайте функцию под функцией навигации. Добавьте проверку `if (!slides.length) return;` (если на странице вообще нет слайдов, например, мы на странице каталога — прервать функцию).

```js:start
function updateAuthNav() {
  // ...
}

```

```js:solution
function updateAuthNav() {
  // ...
}

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (!slides.length) return;
}
```
