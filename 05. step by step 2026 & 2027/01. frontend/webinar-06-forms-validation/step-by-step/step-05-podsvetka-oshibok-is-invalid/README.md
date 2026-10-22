# Шаг 5 — Подсветка ошибок классом .is-invalid

## 🎯 Что изучаем
Как связать проверку JavaScript с CSS-стилями: добавляем класс `.is-invalid`, если поле пустое, и убираем его, если пользователь исправил ошибку.

---

## 💡 Как это работает в CSS и JS?

В файле стилей `style.css` уже есть специальное правило:
```css
.form-control.is-invalid {
    border-color: #dc3545; /* Красная рамка */
}
```

В JavaScript мы просто управляем этим классом с помощью `classList`:

```javascript
if (!input.value.trim()) {
    input.classList.add('is-invalid');    // Добавляем красную рамку!
    isValid = false;
} else {
    input.classList.remove('is-invalid'); // Убираем, если всё введено верно!
}
```

---

## ➡️ Следующий шаг
[Шаг 6 — Проверка совпадения паролей](../step-06-proverka-paroley/README.md)
