---
title: "Метод массива filter()"
highlight: js
---

# Магия фильтрации (.filter)

Это один из самых полезных методов в JavaScript! Метод `.filter()` проходит по всему оригинальному массиву `OFFICE_ROOMS` и возвращает **новый массив**, в который попадут только те комнаты, для которых условие вернуло `true`.

Наше условие: название комнаты (тоже переведенное в нижний регистр) должно содержать (`.includes()`) то слово, которое ввел пользователь.
Результат фильтрации мы запишем в наш локальный массив `displayedRooms`, а затем попросим `render` отрисовать его!

## 🛠 Задание
Допишите фильтрацию и рендер внутрь функции `applyFilter`.

```js:start
  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    
  }
```

```js:solution
  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }
```
