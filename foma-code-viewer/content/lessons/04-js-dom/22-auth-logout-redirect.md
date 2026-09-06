---
title: "Редирект после выхода"
highlight: js
---

# Редирект после выхода

Пользователь нажал "Выйти". Он удалился из `localStorage`, увидел синее уведомление, но... остался на той же странице!
А если он был на странице "Мои бронирования"? Ему туда больше нельзя. Нужно перекинуть его на Главную страницу.

## Логика редиректа
1. Мы проверяем, где сейчас находится пользователь: `const isPages = window.location.pathname.includes('/pages/');`
2. Мы ставим таймер `setTimeout` на 1 секунду (1000 мс), чтобы пользователь успел прочитать наше уведомление.
3. Спустя 1 секунду мы меняем адрес страницы через `window.location.href`. Если мы были во вложенной папке `/pages/`, мы выходим на уровень вверх `../index.html`, иначе просто идем на `index.html`.

## 🛠 Задание
Допишите эту логику редиректа с таймером в самый конец вашего события `onclick`.

```js:start
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
      };
```

```js:solution
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
```
