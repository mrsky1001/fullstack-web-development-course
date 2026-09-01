# Урок 8: Интеграция с Фронтендом

## 🎯 Цель урока

Настроить CORS для работы с фронтендом и реализовать API корзины покупок с защитой авторизацией.

## 📚 Изучаемые концепции

1. **CORS** — Cross-Origin Resource Sharing
2. **Защищённые маршруты** — с проверкой авторизации
3. **Корзина покупок** — полный CRUD с привязкой к пользователю
4. **Безопасность** — проверка владельца при операциях

## 📁 Структура проекта

```
08-frontend-integration/
├── src/
│   ├── app.js                      # 🔄 + CORS
│   ├── server.js
│   ├── services/
│   │   ├── db.service.js
│   │   ├── user.service.js
│   │   ├── product.service.js
│   │   └── shopping-cart.service.js # 🆕
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── shopping-cart.controller.js # 🆕
│   ├── routes/
│   │   ├── auth.router.js
│   │   ├── product.router.js
│   │   └── shopping-cart.router.js # 🆕
│   └── middlewares/
│       ├── logger.middleware.js
│       └── auth.middleware.js
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Новое

| Компонент | Описание |
|-----------|----------|
| `cors` | Библиотека для настройки CORS |
| `shopping-cart.*` | Полный API корзины |
| `isAuthenticated` | Middleware для защиты маршрутов |

## 🚀 Запуск

```bash
cd lessons/08-frontend-integration
npm install
copy .env.example .env
npm start
```

## 📊 База данных

```sql
-- Таблица корзины
CREATE TABLE shopping_cart (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    item_quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

## 🔑 API Endpoints

### Публичные (без авторизации)

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/auth/register` | Регистрация |
| POST | `/auth/login` | Вход |
| GET | `/auth/check` | Проверка статуса |
| GET | `/product/all` | Все товары |
| GET | `/product/:id` | Товар по ID |

### Защищённые (только для авторизованных!)

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/shopping-cart/` | Корзина |
| POST | `/shopping-cart/add` | Добавить |
| PUT | `/shopping-cart/update/:id` | Изменить кол-во |
| DELETE | `/shopping-cart/remove/:id` | Удалить |

## 🔐 Ключевые моменты

### Настройка CORS

```javascript
const cors = require('cors');

app.use(cors({
    origin: true,           // Разрешить все (для dev)
    credentials: true       // ВАЖНО для cookies/сессий!
}));
```

### Защита маршрутов

```javascript
// middleware проверки авторизации
const { isAuthenticated } = require('./middlewares/auth.middleware');

// Применяем ко всем маршрутам корзины
app.use('/shopping-cart', isAuthenticated, shoppingCartRouter);
```

### Безопасность: проверка владельца

```javascript
// При удалении проверяем user_id!
exports.deleteRow = async (rowId, userId) => {
    await db.execute(
        'DELETE FROM shopping_cart WHERE item_id = ? AND user_id = ?',
        [rowId, userId]  // ← userId предотвращает удаление чужих товаров
    );
};
```

## 🌐 Интеграция с фронтендом

```javascript
// Фронтенд (JavaScript)
fetch('http://localhost:3000/shopping-cart/', {
    method: 'GET',
    credentials: 'include'  // ВАЖНО! Отправлять cookies
})
.then(res => res.json())
.then(data => console.log(data));
```

## ➡️ Что дальше?

В финальном уроке мы добавим **валидацию данных**, **обработку ошибок** и базовое тестирование API.
