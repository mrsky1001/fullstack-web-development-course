# Урок 6: CRUD Операции и Сервисный слой

## 🎯 Цель урока

Реализовать полный набор CRUD операций (Create, Read, Update, Delete) для товаров.

## 📚 Изучаемые концепции

1. **CRUD** — четыре базовые операции с данными
2. **HTTP методы** — соответствие REST стандарту
3. **SQL операции** — INSERT, SELECT, UPDATE, DELETE
4. **Валидация данных** — проверка входящих данных
5. **HTTP статус коды** — 200, 201, 400, 404, 500

## 📁 Структура проекта

```
06-crud-services/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── services/
│   │   ├── db.service.js
│   │   └── product.service.js    # 🔄 Полный CRUD
│   ├── controllers/
│   │   └── product.controller.js # 🔄 Полный CRUD
│   ├── routes/
│   │   └── product.router.js     # 🔄 Все методы
│   └── middlewares/
│       └── logger.middleware.js
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Соответствие CRUD и HTTP

| CRUD | HTTP | URL | SQL | Описание |
|------|------|-----|-----|----------|
| Create | POST | `/product/add` | INSERT | Создать |
| Read | GET | `/product/all` | SELECT | Читать все |
| Read | GET | `/product/:id` | SELECT WHERE | Читать один |
| Update | PUT | `/product/:id` | UPDATE | Обновить |
| Delete | DELETE | `/product/:id` | DELETE | Удалить |

## 🚀 Запуск и тестирование

```bash
cd lessons/06-crud-services
npm install
copy .env.example .env
npm start
```

### Тестирование с curl

```bash
# GET - Получить все товары
curl http://localhost:3000/product/all

# GET - Получить товар по ID
curl http://localhost:3000/product/1

# POST - Создать товар
curl -X POST http://localhost:3000/product/add \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Test Product\",\"price\":9999}"

# PUT - Обновить товар
curl -X PUT http://localhost:3000/product/1 \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Updated Product\",\"price\":8888}"

# DELETE - Удалить товар
curl -X DELETE http://localhost:3000/product/1
```

## 🔑 Ключевые моменты

### SQL запросы

```javascript
// CREATE (INSERT)
const [result] = await db.execute(
    'INSERT INTO products (product_name, product_price) VALUES (?, ?)',
    [name, price]
);
const newId = result.insertId;

// READ (SELECT)
const [rows] = await db.execute('SELECT * FROM products');

// UPDATE
const [result] = await db.execute(
    'UPDATE products SET product_name = ? WHERE product_id = ?',
    [name, id]
);
const wasUpdated = result.affectedRows > 0;

// DELETE
const [result] = await db.execute(
    'DELETE FROM products WHERE product_id = ?',
    [id]
);
const wasDeleted = result.affectedRows > 0;
```

### HTTP статус коды

| Код | Значение | Когда использовать |
|-----|----------|-------------------|
| 200 | OK | Успешный GET, PUT, DELETE |
| 201 | Created | Успешный POST |
| 400 | Bad Request | Некорректные данные |
| 404 | Not Found | Ресурс не найден |
| 500 | Server Error | Ошибка сервера |

### Валидация данных

```javascript
exports.createProduct = async (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({
            status: 'error',
            message: 'Необходимо указать name и price'
        });
    }
    
    // ... создание товара
};
```

## 📝 Задания для практики

1. Добавьте CRUD для категорий (`/category/...`)
2. Реализуйте фильтрацию `GET /product/all?category=Процессоры`
3. Добавьте пагинацию `GET /product/all?page=1&limit=10`

## ➡️ Что дальше?

В следующем уроке мы добавим **аутентификацию пользователей** с помощью Passport.js — вход, регистрацию и защиту маршрутов.
