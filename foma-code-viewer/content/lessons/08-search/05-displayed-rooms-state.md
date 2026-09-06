---
title: "Массив отображаемых комнат"
highlight: js
---

# Массив отображаемых комнат

Если пользователь ввел "Mini" в поиск, мы должны скрыть остальные комнаты. 
Можно ли просто удалить комнаты из `OFFICE_ROOMS`? **НЕТ!** Если мы удалим их из базы, как мы их вернем, когда пользователь сотрет текст в поиске? Оригинальные данные трогать запрещено.

Поэтому мы создадим **копию** базы данных!
`let displayedRooms = [...OFFICE_ROOMS];`

Три точки `...` — это "spread" оператор. Он берет все элементы оригинального массива и "высыпает" их в новый массив. С этим новым массивом мы можем делать что угодно — фильтровать, сортировать, удалять элементы. Оригинал при этом не пострадает!

## 🛠 Задание
Добавьте эту строчку внутри вашей новой функции.

```js:start
function initCatalogFilters() {
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

}
```

```js:solution
function initCatalogFilters() {
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  let displayedRooms = [...OFFICE_ROOMS];
}
```
