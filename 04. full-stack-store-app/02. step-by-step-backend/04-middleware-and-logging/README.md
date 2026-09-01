# Урок 4: Middleware и Логирование

## 🎯 Цель урока

Понять концепцию Middleware в Express и создать собственный middleware для логирования запросов.

## 📚 Изучаемые концепции

1. **Middleware** — функции-прослойки в обработке запроса
2. **Цепочка Middleware** — порядок выполнения
3. **Функция `next()`** — передача управления
4. **Кастомные Middleware** — создание своих middleware
5. **Обработка ошибок** — глобальный error handler

## 📁 Структура проекта

```
04-middleware-and-logging/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── middlewares/
│   │   └── logger.middleware.js   # 🆕 Логирование запросов
│   ├── routes/
│   │   └── product.router.js
│   └── controllers/
│       └── product.controller.js
├── package.json
└── README.md
```

## 🛠️ Что нового добавлено

| Компонент | Описание |
|-----------|----------|
| `middlewares/` | Новая папка для middleware |
| `logger.middleware.js` | Логирование входящих запросов |
| Error handler | Глобальная обработка ошибок |

## 🚀 Запуск сервера

```bash
cd lessons/04-middleware-and-logging
npm install
npm start
```

**Обратите внимание на консоль сервера — там появляются логи запросов!**

## ✅ Ожидаемый результат

При каждом запросе в консоли появляется:

```
[12:34:56] ➡️  GET /product/all
[12:34:56] ✅ GET /product/all → 200 (5ms)
```

## 🔑 Ключевые моменты

### Что такое Middleware?

```
Запрос → [MW1] → [MW2] → [MW3] → Маршрут → Ответ
              ↓       ↓       ↓
           (next)  (next)  (next)
```

### Структура Middleware

```javascript
const myMiddleware = (req, res, next) => {
    // Выполняем что-то с req или res
    console.log('Middleware выполнен!');
    
    // Передаём управление дальше
    next();
};

// Подключаем middleware
app.use(myMiddleware);
```

### Порядок middleware ВАЖЕН!

```javascript
// 1. Логирование (первым делом)
app.use(requestLogger);

// 2. Парсинг JSON
app.use(express.json());

// 3. Маршруты
app.use('/product', productRouter);

// 4. Обработка 404 (после всех маршрутов!)
app.use((req, res) => { ... });

// 5. Обработка ошибок (последним!)
app.use((err, req, res, next) => { ... });
```

### Обработчик ошибок (4 параметра!)

```javascript
// Express распознаёт error handler по 4 параметрам
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так' });
});
```

## 📊 Жизненный цикл запроса

```
Клиент отправляет запрос
         ↓
   ┌─────────────┐
   │  Logger MW  │ → логирует запрос
   └─────────────┘
         ↓
   ┌─────────────┐
   │ JSON Parser │ → парсит body
   └─────────────┘
         ↓
   ┌─────────────┐
   │   Router    │ → находит маршрут
   └─────────────┘
         ↓
   ┌─────────────┐
   │ Controller  │ → обрабатывает
   └─────────────┘
         ↓
   Ответ клиенту
```

## 📝 Задания для практики

1. Добавьте middleware, который проверяет наличие заголовка `Authorization`
2. Создайте middleware, который ограничивает запросы (rate limiting)
3. Модифицируйте логгер, чтобы он записывал логи в файл

## ➡️ Что дальше?

В следующем уроке мы подключим **MySQL базу данных** с помощью библиотеки `mysql2` и научимся использовать переменные окружения.
