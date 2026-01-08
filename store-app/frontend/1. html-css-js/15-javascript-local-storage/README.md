# Урок 15: Хранение данных

## 🎯 Цели урока

- Использовать **localStorage**
- Понимать разницу с **sessionStorage**
- Сохранять и загружать **объекты**
- Применять в практических задачах

---

## 💾 localStorage

```javascript
// Сохранить
localStorage.setItem('username', 'Иван');

// Получить
const name = localStorage.getItem('username');

// Удалить
localStorage.removeItem('username');

// Очистить всё
localStorage.clear();

// Проверить количество
console.log(localStorage.length);
```

---

## 📦 Сохранение объектов

```javascript
const user = { name: 'Иван', age: 25 };

// Сохранить (JSON)
localStorage.setItem('user', JSON.stringify(user));

// Загрузить
const savedUser = JSON.parse(localStorage.getItem('user'));
```

---

## 🔄 localStorage vs sessionStorage

| localStorage | sessionStorage |
|--------------|----------------|
| Хранится постоянно | Удаляется при закрытии вкладки |
| Доступен во всех вкладках | Только в текущей вкладке |

---

## 💡 Практический пример

```javascript
// Сохранение корзины
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузка корзины
function loadCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
}
```

---

## 📁 Структура урока

```
15-javascript-local-storage/
├── README.md
├── examples/
│   ├── 01-basic-storage/
│   ├── 02-objects-storage/
│   └── 03-practical-example/
└── practice/
```
