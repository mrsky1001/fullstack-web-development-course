---
title: "Чтение параметров URL"
highlight: js
---

# Чтение параметров URL

Как прочитать параметр `?id=focus-1` из адресной строки?
В JS есть встроенный инструмент `URLSearchParams`. Мы передаем ему `window.location.search` (это строка, содержащая всё, что идет после знака вопроса в URL).

Затем мы используем метод `.get('id')`, чтобы извлечь конкретное значение.

## 🛠 Задание
Внутри функции `initRoomDetails` напишите код для получения ID комнаты из URL. 
*(Мы добавим `|| urlParams.get('room')` на всякий случай, если параметр будет называться `room`).*

```js:start
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;
  
}
```

```js:solution
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
}
```
