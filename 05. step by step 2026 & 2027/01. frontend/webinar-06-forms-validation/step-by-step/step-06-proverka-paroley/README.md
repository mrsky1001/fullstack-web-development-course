# Шаг 6 — Проверка совпадения паролей

## 🎯 Что изучаем
Как в форме регистрации проверить, что пароль и подтверждение пароля в точности совпадают (`pass.value === confirm.value`).

---

## 💡 Зачем подтверждать пароль?

Когда пользователь вводит пароль, символы скрыты за точками `••••••`. Очень легко опечататься в одну букву и потом не смочь войти! Поэтому в форме регистрации просят ввести пароль дважды.

```javascript
const pass = document.getElementById('password');
const confirm = document.getElementById('confirmPassword');

// Проверяем несовпадение:
if (pass.value !== confirm.value) {
    confirm.classList.add('is-invalid');
    console.log('Пароли не совпадают!');
} else {
    confirm.classList.remove('is-invalid');
    console.log('Пароли совпали!');
}
```

---

## ➡️ Следующий шаг
[Шаг 7 — Авторизация и localStorage](../step-07-avtorizatsiya-i-localstorage/README.md)
