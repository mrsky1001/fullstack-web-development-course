---
title: "Метод массива find()"
highlight: js
---

# Поиск в массиве (find)

У нас есть ID нужной комнаты (например, `'focus-1'`) в переменной `roomId`.
Как найти в нашем массиве `OFFICE_ROOMS` объект с таким же ID?

Для этого есть метод `.find()`. Он проходит по массиву и возвращает ПЕРВЫЙ элемент, для которого условие окажется истинным. Если такого элемента нет, он вернет `undefined`.

## 🛠 Задание
Сразу после получения `roomId` напишите поиск комнаты.

```js:start
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  
}
```

```js:solution
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);
}
```
