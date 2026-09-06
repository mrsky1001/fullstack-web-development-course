---
title: "UI неавторизованного пользователя"
highlight: js
---

# Состояние по умолчанию (Гость)

Мы написали отличный код для авторизованного пользователя (`if`).
Но что если `localStorage` пуст? Нам нужен блок `else`.

Здесь всё наоборот:
1. Прячем пункт "Мои бронирования": `myBookingsNavItem.style.display = 'none';`.
2. Возвращаем текст кнопки "Войти".
3. Возвращаем правильную ссылку на страницу входа (учитывая, где мы находимся — в папке `pages` или корне).
4. Обязательно сбрасываем `onclick = null`, чтобы убрать наше старое событие выхода, если оно вдруг там висело.

## 🛠 Задание
Добавьте блок `else` к вашему условию `if (currentUser)`. И на этом **Вебинар 4 полностью завершен!**

```js:start
    if (authNavBtn) {
      // ... логика кнопки Выйти ...
    }
  }
}
```

```js:solution
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}
```
