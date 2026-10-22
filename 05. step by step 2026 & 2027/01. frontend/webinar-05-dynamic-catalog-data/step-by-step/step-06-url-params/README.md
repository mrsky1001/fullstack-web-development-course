# Шаг 6 — URLSearchParams: Передача данных через адресную строку

## 🎯 Что изучаем
Как передать ID выбранной комнаты со страницы каталога на страницу описания с помощью ссылки вида `room-details.html?id=focus-1` и прочитать этот параметр через `URLSearchParams`.

---

## 💡 Как страницы общаются между собой?

Когда пользователь нажимает «Подробнее» на карточке офиса Focus, ссылка ведёт на:
`pages/room-details.html?id=focus-1`

Знак вопроса `?` означает начало параметров.
`id=focus-1` — имя параметра и его значение.

В JavaScript страницы `room-details.html` мы пишем:
```javascript
// 1. Получаем строку параметров из адреса браузера:
const urlParams = new URLSearchParams(window.location.search);

// 2. Достаем значение параметра 'id':
const roomId = urlParams.get('id');

console.log(roomId); // 'focus-1'!
```

---

## ➡️ Следующий шаг
[Шаг 7 — Метод .find() и вывод карточки комнаты](../step-07-metod-find-room-details/README.md)
