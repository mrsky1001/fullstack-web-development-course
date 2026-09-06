---
title: "Логика зацикливания"
highlight: js
---

# Логика зацикливания (Infinity Scroll)

Что должно произойти, если сейчас открыт последний слайд (индекс 3), и пользователь снова жмет "Вперед"? Слайдер должен вернуться на первый слайд (индекс 0)!
А если пользователь жмет "Назад" на первом слайде? Слайдер должен перескочить на последний (индекс 3)!

Давайте реализуем эту проверку с помощью условных операторов `if / else if / else`. 
Если запрашиваемый `index` больше или равен количеству слайдов (`slides.length`), мы сбрасываем `currentSlide` в `0`.

## 🛠 Задание
Напишите логику проверок внутри `showSlide()`.

```js:start
  function showSlide(index) {
    
  }
```

```js:solution
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
  }
```
