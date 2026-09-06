---
title: "Функция фильтрации"
highlight: js
---

# Подготовка JS-функции

Переходим в `main.js`. 
Раньше у нас была простая функция `renderCatalog()`, которая брала все комнаты из базы данных и выводила их на экран. 
Но теперь нам нужно выводить только *часть* комнат (если пользователь что-то ищет). Поэтому старую функцию мы **удалим** и напишем вместо нее новую, более мощную!

Мы назовем ее `initCatalogFilters()`. 
Первым делом найдем все новые элементы (инпут и две кнопки) по их ID.

## 🛠 Задание
Полностью **УДАЛИТЕ** вашу старую функцию `renderCatalog` из файла. Вместо нее создайте `initCatalogFilters`.

*(Не забудьте в самом верху файла, внутри `DOMContentLoaded`, тоже заменить вызов `renderCatalog()` на `initCatalogFilters()`!)*

```js:start
// УДАЛИТЬ ЭТО:
// function renderCatalog() {
//   ...
// }
```

```js:solution
function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
}
```
