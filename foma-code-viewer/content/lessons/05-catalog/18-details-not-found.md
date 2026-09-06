---
title: "Обработка ошибки (Not Found)"
highlight: js
---

# Обработка ошибки 404

Что если пользователь ввел в адресную строку `?id=hacker-123`? Наш метод `.find()` ничего не найдет и вернет пустоту.
В этом случае мы не должны показывать пустую страницу! Мы должны вывести красивое сообщение "Комната не найдена".

Мы напишем условие `if (!room)` и вставим внутрь контейнера заглушку с кнопкой возврата в каталог. Не забываем про `return;` в конце, чтобы функция остановила дальнейшее выполнение.

## 🛠 Задание
Вставьте этот блок обработки ошибки.

```js:start
function initDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);
  
}
```

```js:solution
function initDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = `
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    `;
    return;
  }
}
```
