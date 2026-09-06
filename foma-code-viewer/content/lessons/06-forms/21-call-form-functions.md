---
title: "Запуск функций при загрузке"
highlight: js
---

# Вызов функций при загрузке страницы

Функции `initRegisterForm` и `initLoginForm` написаны, но браузер не знает, когда их запускать. 
Как мы обсуждали в 4-м вебинаре, самый безопасный момент для запуска любых скриптов, работающих с HTML — это событие `DOMContentLoaded` (когда браузер полностью скачал и построил HTML структуру).

## 🛠 Задание
В самом верху файла `main.js` найдите слушатель события `DOMContentLoaded` и добавьте внутрь него вызов обеих новых функций.

На этом Вебинар 6 окончен! Вы научились круто валидировать формы. Попробуйте теперь зайти на страницу регистрации и нажать кнопку отправки, оставив поля пустыми!

```js:start
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCatalog();
  initRoomDetails();
});
```

```js:solution
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCatalog();
  initRoomDetails();
  initRegisterForm();
  initLoginForm();
});
```
