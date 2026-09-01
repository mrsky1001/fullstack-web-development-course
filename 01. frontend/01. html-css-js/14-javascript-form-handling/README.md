# Урок 14: Работа с формами

## 🎯 Цели урока

- Получать **данные из форм**
- **Валидировать** ввод пользователя
- Отправлять формы через **JavaScript**
- Работать с **FormData**

---

## 📝 Получение данных

```javascript
const form = document.querySelector('#myForm');
const input = document.querySelector('#username');

// Значение поля
console.log(input.value);

// Обработка отправки
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Отменить перезагрузку
    
    const formData = new FormData(form);
    console.log(formData.get('username'));
});
```

---

## ✅ Валидация

```javascript
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

input.addEventListener('input', (e) => {
    if (e.target.value.length < 3) {
        e.target.classList.add('invalid');
    } else {
        e.target.classList.remove('invalid');
    }
});
```

---

## 📦 FormData

```javascript
const form = document.querySelector('form');
const formData = new FormData(form);

// Получить значение
formData.get('username');

// Добавить значение
formData.append('timestamp', Date.now());

// Перебрать все поля
for (let [name, value] of formData) {
    console.log(name, value);
}
```

---

## 📁 Структура урока

```
14-javascript-form-handling/
├── README.md
├── examples/
│   ├── 01-form-values/
│   ├── 02-validation/
│   └── 03-formdata/
└── practice/
```
