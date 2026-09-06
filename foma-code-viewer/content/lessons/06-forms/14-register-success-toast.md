---
title: "Уведомление об успехе"
highlight: js
---

# Проверка итогового флага

Все проверки завершены! Теперь настает момент истины: мы смотрим на флаг `isValid`.

Если он остался `true` (то есть ни одна из предыдущих проверок не опустила его в `false`), значит все поля заполнены и пароли совпадают!
В этом случае мы вызовем нашу функцию `showNotification`, которую написали в Вебинаре 4.

## 🛠 Задание
Добавьте итоговую проверку успешной регистрации.

```js:start
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

```

```js:solution
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      showNotification('Пользователь зарегистрирован успешно!', 'success');
    }
```
