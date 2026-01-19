# Урок 10: Корзина покупок (Финальный проект)

## 🎯 Цели урока

После завершения этого урока вы будете:
- Реализовывать CRUD-операции (Create, Read, Update, Delete)
- Управлять состоянием приложения
- Синхронизировать данные с сервером
- Работать со сложными интерфейсами

## 🏁 Финальный проект

Этот урок представляет **завершённый проект**. Полный код находится в родительской папке:

```
frontend/
├── index.html          # Главная страница
├── css/
│   ├── style.css       # Основные стили
│   ├── shop-styles.css # Стили магазина
│   └── toast.css       # Стили уведомлений
├── js/
│   ├── auth.js         # Авторизация
│   ├── cart.js         # Корзина
│   ├── catalog.js      # Каталог
│   ├── config.js       # Конфигурация API
│   ├── login.js        # Страница входа
│   ├── main.js         # Главная логика
│   ├── register.js     # Регистрация
│   ├── security.js     # XSS-защита
│   ├── theme.js        # Темы
│   └── toast.js        # Уведомления
└── pages/
    ├── cart.html       # Корзина
    ├── catalog.html    # Каталог
    ├── login.html      # Вход
    └── register.html   # Регистрация
```

## 📝 Функции корзины

```javascript
// Загрузка корзины
async function loadCart() {
    const response = await API.request(API.endpoints.cart.get);
    cart = response.data;
    renderCart();
}

// Добавление в корзину
async function addToCart(productId) {
    await API.request(API.endpoints.cart.add, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
    });
    await updateCartCount();
}

// Обновление количества
async function updateQuantity(rowId, newQuantity) {
    await API.request(API.endpoints.cart.update(rowId), {
        method: 'PUT',
        body: JSON.stringify({ quantity: newQuantity })
    });
    await loadCart();
}

// Удаление из корзины
async function removeFromCart(rowId) {
    await API.request(API.endpoints.cart.remove(rowId), {
        method: 'DELETE'
    });
    await loadCart();
}
```

### Подсчет суммы

```javascript
function calculateTotal() {
    return cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
}
```

## 💡 Ключевые концепции

### CRUD операции

| Операция | HTTP-метод | Описание |
|----------|------------|----------|
| Create | POST | Добавить товар |
| Read | GET | Получить корзину |
| Update | PUT | Изменить количество |
| Delete | DELETE | Удалить товар |

### Array.reduce()

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, current) => {
    return accumulator + current;
}, 0);  // 0 - начальное значение

// sum = 15
```

### Глобальный счетчик

```javascript
async function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const response = await API.request(API.endpoints.cart.get);
    
    const totalItems = response.data.reduce(
        (sum, item) => sum + item.quantity, 0
    );
    
    cartCount.textContent = totalItems;
}
```

## ✅ Что должен понять студент

- [ ] CRUD — основные операции с данными
- [ ] PUT используется для обновления ресурса
- [ ] DELETE удаляет ресурс с сервера
- [ ] `reduce()` "схлопывает" массив в одно значение
- [ ] Счетчик в шапке обновляется после каждого изменения

## 🔍 Проверьте работу

1. Добавьте товар в корзину из каталога
2. Перейдите на страницу корзины
3. Увеличьте/уменьшите количество
4. Удалите товар
5. Счетчик в шапке должен обновляться

## ⚠️ Важно

Корзина требует авторизации! Если пользователь не вошел,
он будет перенаправлен на страницу входа.

## 📚 Дополнительные материалы

- [MDN: Array.reduce()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [REST API: HTTP методы](https://restfulapi.net/http-methods/)
