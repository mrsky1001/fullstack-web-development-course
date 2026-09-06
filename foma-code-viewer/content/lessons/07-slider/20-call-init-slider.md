---
title: "Вызов функции слайдера"
highlight: js
---

# Вызов функции

Мы написали огромную и сложную функцию `initSlider()`. Но она не сработает сама по себе. Нам нужно сказать браузеру, когда её запускать.

По нашей старой традиции, мы добавляем вызов всех глобальных функций внутрь обработчика события `DOMContentLoaded` в самом верху нашего файла `main.js`.

## 🛠 Задание
Найдите `DOMContentLoaded` в верху файла и добавьте вызов `initSlider()`.

Поздравляем! Ваш слайдер готов. Перейдите на Главную страницу и насладитесь результатом: он листается сам, по клику на кнопки и по клику на точки. 

```js:start
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  renderCatalog();
  initRoomDetails();
  initRegisterForm();
  initLoginForm();
});
```

```js:solution
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  renderCatalog();
  initRoomDetails();
  initRegisterForm();
  initLoginForm();
});
```
