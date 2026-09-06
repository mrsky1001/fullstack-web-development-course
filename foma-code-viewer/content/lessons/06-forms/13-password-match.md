---
title: "Проверка совпадения паролей"
highlight: js
---

# Проверка совпадения паролей

Наш цикл отлично проверяет, что поля не пустые. Но для паролей есть особое правило: Пароль и Подтверждение пароля должны быть идентичны!

Мы должны написать отдельную проверку после цикла.
Мы находим оба поля. Если они оба заполнены, но их значения `!==` (не равны), мы "красним" поле подтверждения и снова опускаем флаг `isValid = false`.

## 🛠 Задание
Добавьте эту проверку сразу после цикла.

```js:start
    // ... конец цикла forEach ...

```

```js:solution
    // ... конец цикла forEach ...

    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }
```
