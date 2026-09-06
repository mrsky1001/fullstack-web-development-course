---
title: "Изучаем localStorage"
highlight: js
---

# Изучаем localStorage

Как сайт "помнит", что вы авторизованы, даже если вы закроете вкладку или обновите страницу?

Один из способов — **localStorage (Локальное хранилище)**. Это встроенная в браузер мини-база данных, куда JavaScript может записывать строки. Данные там хранятся бесконечно долго, пока скрипт их не удалит (или вы не очистите кэш браузера).

С помощью метода `localStorage.getItem('currentUser')` мы попытаемся прочитать имя пользователя. Если его нет — браузер вернет `null` (гость).

Также мы найдем элементы меню, с которыми будем взаимодействовать (`myBookingsNavItem` и `authNavBtn`).

## 🛠 Задание

Внутри функции `updateAuthNav` найдите текущего пользователя и элементы меню.

```js:start
function updateAuthNav() {
  
}
```

```js:solution
function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');
}
```
