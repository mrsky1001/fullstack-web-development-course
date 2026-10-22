# Шаг 3 — Как прочитать значение поля (.value)

## 🎯 Что изучаем
Свойство `.value` — как JavaScript узнаёт текст, который пользователь ввёл в поле ввода `<input>`.

---

## 💡 Свойство .value

У любого текстового поля (input, textarea) есть свойство `.value`.
Оно хранит текущий текст, находящийся внутри поля.

```javascript
// 1. Находим элемент поля в DOM:
const input = document.getElementById('login');

// 2. Считываем его значение:
const text = input.value;

console.log('Пользователь ввёл:', text);
```

---

## ➡️ Следующий шаг
[Шаг 4 — Очистка пробелов через .trim()](../step-04-ochistka-probelov-trim/README.md)
