---
title: "Событие выхода"
highlight: js
---

# Событие выхода из системы

Мы поменяли текст кнопки на "Выйти" и обнулили ссылку. Но сама по себе кнопка ничего не делает. 
Мы должны повесить на неё **обработчик события**.

Событие клика называется `onclick`. Мы присвоим ему стрелочную функцию `(e) => { ... }`.
Буква `e` (сокращение от event) — это объект события, который браузер передаст в нашу функцию.

## Что внутри функции?
1. `e.preventDefault();` — отменяет стандартное поведение браузера (чтобы при клике на ссылку `#` страница не дергалась вверх).
2. `localStorage.removeItem('currentUser');` — удаляем пользователя из памяти браузера!
3. `showNotification('Вы вышли из системы', 'info');` — **Ура!** Мы наконец-то используем нашу функцию тостов на практике!

## 🛠 Задание
Внутри блока `if (authNavBtn) { ... }` добавьте обработчик `onclick` для кнопки выхода.

```js:start
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
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
      };
    }
```
