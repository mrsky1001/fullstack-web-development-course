---
title: "UI авторизованного пользователя"
highlight: js
---

# UI авторизованного пользователя

У нас есть переменная `currentUser`. Теперь напишем логику: "Если пользователь вошел в систему".

Мы используем условие `if (currentUser)`.
Внутри него мы делаем интерфейсные изменения:
1. Показываем секретный пункт меню "Мои бронирования" (если он есть на странице), меняя ему свойство `style.display` на `'block'`.
2. Меняем текст кнопки входа на "Выйти" (`authNavBtn.textContent = 'Выйти'`).
3. Меняем ссылку кнопки на `#` (чтобы она никуда не вела, потому что мы будем ловить клик по ней через JavaScript в следующем шаге).

## 🛠 Задание

Напишите условие `if` и интерфейсные изменения.

```js:start
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');
  
}
```

```js:solution
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
    }
  }
}
```
