---
title: "Условный рендеринг (Тернарный оператор)"
highlight: js
---

# Условный рендеринг (Тернарный оператор)

В базе данных у некоторых комнат `isPopular: true`, а у некоторых `false`. Как вывести бейдж "Популярное" только для избранных комнат?

В JavaScript внутри шаблонных строк нельзя писать обычный `if / else`. Но можно использовать **тернарный оператор**.
Синтаксис: `условие ? если_да : если_нет`

`room.isPopular ? '<span...>' : ''` 
(Если комната популярна, выведи HTML тег `span`, иначе выведи пустую строку `''`).

## 🛠 Задание
Внутри функции `initRoomDetails`, найдите блок `room-badges` и добавьте туда строчку с тернарным оператором, чтобы у популярных комнат появился бейдж.

```js:start
        <div class="room-badges">
          <span class="room-badge">${room.capacity}</span>
          <span class="room-badge">${room.area}</span>
          
        </div>
```

```js:solution
        <div class="room-badges">
          <span class="room-badge">${room.capacity}</span>
          <span class="room-badge">${room.area}</span>
          ${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>
```
