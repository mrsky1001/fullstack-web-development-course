---
title: "Цикл валидации"
highlight: js
---

# Цикл валидации

Теперь мы запустим метод `.forEach()` (для каждого) по нашему массиву `fields`. 

Внутри цикла мы:
1. Найдем инпут на странице по его `id`.
2. Получим его значение `input.value` и очистим от случайных пробелов по краям с помощью метода `.trim()`.
3. Если значение пустое `!input.value.trim()`:
   - Мы добавляем инпуту красный класс с ошибкой: `input.classList.add('is-invalid')`.
   - И самое главное: опускаем флаг `isValid = false`!
4. Если поле заполнено (блок `else`), мы снимаем красный класс (вдруг пользователь исправил ошибку).

## 🛠 Задание
Скопируйте и изучите этот умный цикл.

```js:start
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    
```

```js:solution
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
```
