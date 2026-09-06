---
title: "Массив полей"
highlight: js
---

# Массив полей для проверки

В нашей форме регистрации целых 6 обязательных полей! Если мы будем писать `if` для каждого поля, код получится огромным.

Вместо этого мы используем магию массивов, которую выучили в прошлом вебинаре. Мы создадим массив `fields`, куда положим ID всех наших инпутов. 

## 🛠 Задание
Объявите массив со списком ID под вашей переменной `isValid`.

```js:start
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
  });
```

```js:solution
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
  });
```
