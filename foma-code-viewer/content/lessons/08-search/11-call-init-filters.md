---
title: "Запуск фильтров"
highlight: js
---

# Запуск функции

Фильтры готовы! Но мы забыли одну маленькую вещь.
При первой загрузке страницы массив отфильтрованных комнат `displayedRooms` уже создан (это полная копия `OFFICE_ROOMS`), но мы его ни разу не отрендерили!
Нам нужно вызвать `render(displayedRooms)` один раз вручную в самом конце нашей огромной функции `initCatalogFilters`.

## 🛠 Задание
Добавьте первый вызов отрисовки в конец вашей функции `initCatalogFilters`. 

И не забудьте подняться в самый верх файла `main.js` и **удалить вызов старой функции `renderCatalog()`**, заменив его на вызов новой `initCatalogFilters()` внутри `DOMContentLoaded`!

```js:start
function initCatalogFilters() {
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  // Вызовите render здесь
}
```

```js:solution
function initCatalogFilters() {
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  render(displayedRooms);
}
```
