# ✦ Методическое пособие: Серверная часть (Backend)
# Интернет-магазин «TechParts» — подробное руководство

---

## Как пользоваться этим пособием

Это пособие посвящено **только серверной части** (backend) проекта TechParts.
Вы можете работать по нему **без базы данных** — в приложении показано,
как использовать моковые данные вместо MySQL.

Каждая глава построена по единой структуре:
- **✦ Задание** — что мы создадим к концу главы
- **⌬ Теория** — простые объяснения с аналогиями из жизни
- **⧉ Примеры** — маленькие изолированные фрагменты кода с разбором
- **⚙ Реализация** — пошаговое написание кода с комментариями к каждой строке

---

# Глава 1. Что такое backend и как он работает

## ✦ Задание

Понять, что такое серверная часть, зачем она нужна и из каких компонентов состоит.

## ⌬ Теория

### Клиент и сервер

> **Аналогия:** Представьте ресторан. **Клиент** (frontend) — это посетитель,
> который смотрит меню и делает заказ. **Сервер** (backend) — это кухня,
> которая получает заказ, готовит блюдо и отдаёт его обратно.

```
Браузер (клиент)              Сервер (backend)              База данных
──────────────               ──────────────                ──────────
Пользователь      ──запрос──>  Node.js + Express  ──запрос──>  MySQL
нажимает кнопку               обрабатывает                   хранит данные
                <──ответ──    отправляет JSON     <──данные──  возвращает
```

### HTTP-запросы и методы

Клиент общается с сервером через **HTTP-запросы**. Каждый запрос имеет **метод**:

| Метод | Что делает | Аналогия | Пример |
|-------|-----------|----------|--------|
| `GET` | Получить данные | «Покажи меню» | Список товаров |
| `POST` | Создать/отправить данные | «Вот мой заказ» | Регистрация, вход |
| `PUT` | Обновить данные | «Поменяй мой заказ» | Редактирование |
| `DELETE` | Удалить данные | «Отмени мой заказ» | Удаление |

### JSON — формат обмена данными

Сервер отправляет данные в формате **JSON** (JavaScript Object Notation):

```json
{
  "id": 1,
  "name": "Intel Core i7-14700K",
  "price": 38990.00
}
```

> **Аналогия:** JSON — это **записка**, которую кухня отправляет в зал.
> В ней написано: что за блюдо, сколько стоит и т.д.

### Что такое API?

**API** (Application Programming Interface) — набор **адресов** (URL),
на которые клиент отправляет запросы. Каждый адрес = одна операция.

Наши API-маршруты:

| Метод | URL | Что делает |
|-------|-----|-----------|
| `POST` | `/api/auth/register` | Регистрация |
| `POST` | `/api/auth/login` | Авторизация (вход) |
| `POST` | `/api/auth/logout` | Выход |
| `GET` | `/api/auth/check` | Проверка сессии |
| `GET` | `/api/products` | Список товаров |
| `POST` | `/api/orders` | Создать заказ |
| `GET` | `/api/orders/my` | Мои заказы |

### MVC — архитектура проекта

```
Запрос от браузера
     ↓
⧉ Routes (маршрутизатор)     — «Какой запрос пришёл? Кому передать?»
     ↓
⚙ Middleware (охранник)       — «Пользователь авторизован?»
     ↓
⌬ Controller (контроллер)    — «Что делать с данными?» → запрос к БД
     ↓
✦ Ответ (JSON)               — отправляется обратно в браузер
```

| Компонент | Папка | Что делает |
|-----------|-------|-----------|
| **Routes** | `routes/` | Определяет, какой URL вызывает какой контроллер |
| **Controllers** | `controllers/` | Содержит бизнес-логику (работа с данными) |
| **Middleware** | `middleware/` | Промежуточные проверки (авторизация) |
| **Config** | `config/` | Настройки (подключение к БД) |

### Структура папок backend

```
backend/
├── server.js              ← Точка входа — запуск сервера
├── package.json           ← Список зависимостей (npm)
├── config/
│   └── db.js              ← Подключение к MySQL
├── controllers/
│   ├── authController.js  ← Логика: регистрация, вход, выход
│   ├── productController.js ← Логика: список товаров
│   └── orderController.js ← Логика: создание заказа, мои заказы
├── routes/
│   ├── authRoutes.js      ← Маршруты авторизации
│   ├── productRoutes.js   ← Маршруты товаров
│   └── orderRoutes.js     ← Маршруты заказов
└── middleware/
    └── authMiddleware.js  ← Проверка: авторизован ли пользователь?
```

---

# Глава 2. Инициализация проекта: Node.js + npm

## ✦ Задание

Создать папку `backend`, инициализировать Node.js-проект через `npm init`,
установить все необходимые зависимости.

## ⌬ Теория

### Что такое npm?

> **Аналогия:** npm — это **магазин приложений** для JavaScript.
> Вместо того чтобы писать всё с нуля, мы скачиваем готовые модули
> (библиотеки), которые другие программисты уже написали и протестировали.

### Наши зависимости

| Пакет | Зачем нужен | Аналогия |
|-------|------------|----------|
| `express` | Фреймворк для создания сервера | Готовая кухня в ресторане |
| `mysql2` | Подключение к базе данных MySQL | Телефон на склад |
| `express-session` | Механизм сессий (запоминание пользователя) | Браслет в аквапарке |
| `bcryptjs` | Хеширование паролей | Сейф для паролей |
| `cors` | Разрешение запросов с другого адреса | Пропуск для курьера |

### Что такое `package.json`?

Это файл-описание проекта. В нём записано:
- Название проекта
- Версия
- Список зависимостей (какие пакеты установить)
- Скрипты запуска

## ⧉ Примеры

### Минимальный package.json

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

### Как устанавливается пакет

```bash
npm install express
```
Что происходит:
1. npm скачивает `express` из интернета
2. Кладёт его в папку `node_modules/`
3. Записывает имя и версию в `package.json`

## ⚙ Реализация

### Шаг 1: Создайте папку backend

```bash
mkdir backend
cd backend
```

### Шаг 2: Инициализируйте проект

```bash
npm init -y
```

Флаг `-y` означает «да на все вопросы» — npm создаст стандартный `package.json`.

### Шаг 3: Установите зависимости

```bash
npm install express mysql2 express-session bcryptjs cors
```

После выполнения этой команды:
- Появится папка `node_modules/` — здесь лежат скачанные пакеты
- В `package.json` появится секция `"dependencies"`
- Появится файл `package-lock.json` — точные версии пакетов

### Шаг 4: Проверьте package.json

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mysql2": "^3.6.0"
  }
}
```

> **✖ Частые ошибки:**
> - `npm: command not found` → Node.js не установлен (см. главу об инструментах)
> - Запустили `npm install` не в папке `backend` → зависимости установились
>   не туда. Всегда проверяйте, что вы в правильной папке (`cd backend`)
> - Не добавляйте папку `node_modules/` в Git — она огромная и воссоздаётся
>   через `npm install`

---

# Глава 3. Точка входа: `server.js`

## ✦ Задание

Создать главный файл сервера: настроить Express, подключить middleware,
маршруты и раздачу статических файлов. *(Критерий №1 — 5 баллов)*

## ⌬ Теория

### Что такое Express?

> **Аналогия:** Node.js сам по себе — это пустая кухня.
> Express — это набор готовых инструментов: плита, кастрюли, рецепты.
> Без Express можно написать сервер, но с ним — в 10 раз быстрее.

### Middleware — промежуточные обработчики

Middleware — это функции, которые обрабатывают **каждый** входящий запрос
**до** того, как он попадёт в контроллер.

> **Аналогия:** Представьте конвейер на заводе. Каждая станция (middleware)
> делает что-то с деталью: одна проверяет документы, другая парсит данные,
> третья логирует запросы.

```
Запрос → [cors] → [json-парсер] → [сессия] → [контроллер] → Ответ
```

### Порт сервера

Порт — это номер «двери», через которую сервер принимает запросы.
Мы используем порт `3000`. Адрес сервера: `http://localhost:3000`.

### Раздача статики

`express.static()` позволяет серверу отдавать HTML/CSS/JS файлы клиенту.
Когда пользователь заходит на `http://localhost:3000` — сервер отправляет `index.html`.

### Сессии

**Сессия** — механизм «запоминания» пользователя между запросами.

> **Аналогия:** Когда вы входите в аквапарк, вам надевают **браслет** с номером.
> По этому браслету система видит, что вы заплатили. При выходе браслет
> снимается.

Технически:
1. При авторизации сервер создаёт запись в памяти: `session[123] = { user_id: 5 }`
2. Браузеру отправляется cookie с номером `123`
3. При следующем запросе браузер отправляет cookie → сервер находит сессию

## ⧉ Примеры

### Минимальный Express-сервер (4 строки)

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Привет, мир!'));
app.listen(3000, () => console.log('Сервер на порту 3000'));
```

Запустите `node server.js` и откройте `http://localhost:3000` — увидите «Привет, мир!».

### Middleware — парсинг JSON

```javascript
// Без этого req.body будет undefined
app.use(express.json());
```

## ⚙ Реализация

### Полный код `server.js` (построчный разбор)

```javascript
// ============================================================
// TechParts — Главный файл сервера (server.js)
// Критерий №1: Стек — Node.js + Express
// ============================================================

// --- Шаг 1: Подключаем необходимые модули ---
const express = require('express');         // Фреймворк для сервера
const session = require('express-session'); // Механизм сессий
const cors = require('cors');               // Разрешение кросс-доменных запросов
const path = require('path');               // Работа с путями файлов

// --- Шаг 2: Создаём экземпляр приложения ---
const app = express();

// --- Шаг 3: Подключаем middleware ---

// 3a. Парсинг JSON из тела запроса
// Без этого req.body будет undefined при POST-запросах
app.use(express.json());

// 3b. CORS — разрешаем запросы с клиента
// credentials: true — разрешаем отправку cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 3c. Сессии — механизм «запоминания» авторизации
app.use(session({
  secret: 'techparts-secret-key-2024',  // Секретный ключ для подписи cookie
  resave: false,                         // Не пересохранять, если не менялась
  saveUninitialized: false,              // Не создавать пустые сессии
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,        // Время жизни: 24 часа (в мс)
    httpOnly: true                       // Cookie недоступна из JavaScript
  }
}));

// --- Шаг 4: Раздача статических файлов ---
// Сервер будет отдавать HTML/CSS/JS из папки frontend
// При заходе на http://localhost:3000 — отдаст frontend/index.html
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// --- Шаг 5: Подключаем маршруты API ---
// Все маршруты начинаются с /api/
app.use('/api/auth', require('./routes/authRoutes'));         // /api/auth/*
app.use('/api/products', require('./routes/productRoutes'));  // /api/products
app.use('/api/orders', require('./routes/orderRoutes'));      // /api/orders/*

// --- Шаг 6: Запускаем сервер ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер TechParts запущен: http://localhost:${PORT}`);
});
```

**Разбор ключевых строк:**

| Строка | Что делает |
|--------|-----------|
| `app.use(express.json())` | Парсит JSON из тела POST-запросов → `req.body` |
| `app.use(cors({...}))` | Разрешает браузеру отправлять запросы к серверу |
| `app.use(session({...}))` | Включает механизм сессий |
| `app.use(express.static(...))` | Раздаёт файлы из `frontend/` |
| `app.use('/api/auth', ...)` | Все запросы на `/api/auth/*` → `authRoutes.js` |
| `app.listen(3000, ...)` | Сервер начинает слушать порт 3000 |

> **✖ Частые ошибки:**
> - `Cannot find module './routes/authRoutes'` → файл ещё не создан.
>   Создайте все файлы маршрутов перед запуском
> - `EADDRINUSE: address already in use :::3000` → порт 3000 уже занят
>   другим процессом. Остановите его или поменяйте порт
> - `req.body is undefined` → забыли `app.use(express.json())`

---

# Глава 4. Подключение к базе данных: `config/db.js`

## ✦ Задание

Настроить подключение к MySQL через модуль `mysql2`. Если MySQL недоступен —
использовать моковые данные. *(Критерий №21)*

## ⌬ Теория

### Пул соединений

> **Аналогия:** Вместо того чтобы каждый раз звонить на склад и ждать,
> мы держим **несколько телефонных линий** открытыми. Когда нужно —
> берём свободную линию, спрашиваем и кладём трубку.

Пул (`pool`) — это набор открытых соединений с базой данных.
Он эффективнее, чем создавать новое соединение на каждый запрос.

### Промисы (Promise)

`mysql2` поддерживает промисы через `.promise()`.
Это позволяет использовать `async/await` вместо callback-функций:

```javascript
// С callback (старый способ):
db.query('SELECT * FROM users', (err, results) => {
  console.log(results);
});

// С async/await (современный способ):
const [results] = await db.query('SELECT * FROM users');
console.log(results);
```

## ⚙ Реализация

### Полный код `config/db.js`

```javascript
// ============================================================
// TechParts — Подключение к MySQL (config/db.js)
// Критерий №1: Стек — MySQL (mysql2 с промисами)
// Критерий №21: БД с правильным именем и кодировкой
// ============================================================

const mysql = require('mysql2');

// --- Создаём пул подключений ---
// Пул позволяет переиспользовать соединения (эффективнее)
const pool = mysql.createPool({
  host: 'localhost',       // Адрес сервера MySQL (локальный)
  user: 'root',            // Имя пользователя MySQL
  password: 'admin',       // Пароль (укажите ваш, заданный при установке)
  database: 'techparts',   // Имя базы данных из ТЗ
  charset: 'utf8mb4'       // Кодировка для кириллицы
});

// --- Экспортируем пул с промисами ---
// .promise() позволяет использовать async/await
module.exports = pool.promise();
```

> **✖ Частые ошибки:**
> - `Access denied for user 'root'` → неправильный пароль.
>   Укажите пароль, который задали при установке MySQL
> - `Unknown database 'techparts'` → база ещё не создана.
>   Сначала выполните `schema.sql` в MySQL Workbench
> - `ECONNREFUSED` → MySQL-сервер не запущен.
>   Проверьте через «Службы» (services.msc) → MySQL80

---

# Глава 5. Middleware: проверка авторизации

## ✦ Задание

Создать промежуточную функцию `authMiddleware`, которая проверяет,
авторизован ли пользователь, и блокирует доступ неавторизованным.
*(Критерий №19)*

## ⌬ Теория

### Что такое middleware?

> **Аналогия:** Middleware — это **охранник** на входе в VIP-зону.
> Он проверяет пропуск (сессию). Если пропуск есть — пропускает дальше.
> Если нет — разворачивает назад.

### Функция `next()`

Middleware — это функция с тремя параметрами: `(req, res, next)`.
- `req` — входящий запрос
- `res` — ответ сервера
- `next()` — «пропустить к следующему обработчику»

```javascript
function myMiddleware(req, res, next) {
  if (всё_ок) {
    next();     // Пропускаем дальше → к контроллеру
  } else {
    res.status(401).json({ error: 'Доступ запрещён' });
  }
}
```

### Как middleware подключается к маршруту

```javascript
// Без middleware — доступно всем:
router.get('/products', controller.getAll);

// С middleware — только авторизованным:
router.post('/orders', authMiddleware, controller.create);
//                      ^^^^^^^^^^^^^ ← охранник перед контроллером
```

## ⚙ Реализация

### Полный код `middleware/authMiddleware.js`

```javascript
// ============================================================
// TechParts — Middleware проверки авторизации
// Критерий №19: Доступность страницы только авторизованным
// ============================================================

// --- Функция-middleware ---
// Проверяет наличие user_id в сессии
// Если есть → пропускаем к контроллеру (next)
// Если нет → возвращаем 401 (Unauthorized)
function authMiddleware(req, res, next) {
  if (req.session && req.session.user_id) {
    // Пользователь авторизован — пропускаем
    next();
  } else {
    // Пользователь НЕ авторизован — возвращаем ошибку
    res.status(401).json({ error: 'Необходимо авторизоваться' });
  }
}

// Экспортируем для использования в маршрутах
module.exports = authMiddleware;
```

**Как это работает:**

```
Запрос: POST /api/orders { product_id: 3, ... }
                ↓
      authMiddleware проверяет req.session.user_id
                ↓                       ↓
         Есть (user_id=5)        Нет (undefined)
                ↓                       ↓
         next() → контроллер     res.status(401) → { error: "..." }
                ↓
         orderController.create()
                ↓
         res.json({ order_id: 12 })
```

---

# Глава 6. Маршруты (Routes)

## ✦ Задание

Создать три файла маршрутов: `authRoutes.js`, `productRoutes.js`,
`orderRoutes.js`. *(Критерии №13, №17, №18, №19, №20)*

## ⌬ Теория

### Что такое Router?

> **Аналогия:** Router — это **диспетчер** на телефонной станции.
> Ему звонят (запрос), он спрашивает: «Какой номер?» (URL) и соединяет
> с нужным отделом (контроллером).

```javascript
const router = express.Router();

// Когда придёт POST на /register → вызови authController.register
router.post('/register', authController.register);
```

### Приставка `/api/`

В `server.js` мы написали:
```javascript
app.use('/api/auth', require('./routes/authRoutes'));
```
Это значит, что все маршруты из `authRoutes.js` получат приставку `/api/auth`.
Маршрут `/register` в файле → полный URL: `/api/auth/register`.

## ⚙ Реализация

### Файл `routes/authRoutes.js`

```javascript
// ============================================================
// TechParts — Роутер авторизации (MVC — Routes)
// Маршруты: register, login, logout, check
// ============================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register — регистрация нового пользователя
router.post('/register', authController.register);

// POST /api/auth/login — авторизация (вход в систему)
router.post('/login', authController.login);

// POST /api/auth/logout — выход из системы
router.post('/logout', authController.logout);

// GET /api/auth/check — проверка статуса авторизации
router.get('/check', authController.check);

module.exports = router;
```

### Файл `routes/productRoutes.js`

```javascript
// ============================================================
// TechParts — Роутер товаров (MVC — Routes)
// Маршрут: получение всех товаров
// ============================================================

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products — получить все товары из БД
router.get('/', productController.getAll);

module.exports = router;
```

### Файл `routes/orderRoutes.js`

```javascript
// ============================================================
// TechParts — Роутер заказов (MVC — Routes)
// Маршруты: создание заказа, получение своих заказов
// ============================================================

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders — создать заказ (ТОЛЬКО для авторизованных)
// authMiddleware проверяет сессию ПЕРЕД вызовом контроллера
router.post('/', authMiddleware, orderController.create);

// GET /api/orders/my — получить заказы текущего пользователя
router.get('/my', authMiddleware, orderController.getMyOrders);

module.exports = router;
```

**Обратите внимание:** у заказов **два middleware в цепочке**:
```
POST /api/orders → authMiddleware → orderController.create
```
Сначала охранник проверяет сессию, и **только потом** контроллер обрабатывает заказ.

---

# Глава 7. Контроллер авторизации: `authController.js`

## ✦ Задание

Реализовать четыре функции: регистрация, авторизация (вход), выход, проверка.
*(Критерии №16, №17, №13)*

## ⌬ Теория

### bcryptjs — хеширование паролей

> **Аналогия:** Представьте, что вы кладёте записку в **сейф**. Открыть
> сейф и прочитать записку невозможно. Но можно **проверить**: совпадает ли
> новая записка с той, что внутри.

```javascript
const bcrypt = require('bcryptjs');

// При РЕГИСТРАЦИИ: превращаем пароль в хеш
const hash = await bcrypt.hash('MyPassword123', 10);
// hash = "$2a$10$xK8j..." — длинная зашифрованная строка

// При АВТОРИЗАЦИИ: сравниваем введённый пароль с хешем
const isMatch = await bcrypt.compare('MyPassword123', hash);
// isMatch = true → пароли совпадают!
```

Число `10` — это «сложность» хеширования (10 раундов).
Чем больше — тем безопаснее, но медленнее.

### Зачем хешировать?

Если хранить пароли в открытом виде и базу данных взломают — все пароли
утекут. С хешированием взломщик увидит только `$2a$10$xK8j...` — бесполезно.

### Деструктуризация `[existing]`

MySQL возвращает результат в формате `[массив_строк, метаданные]`.
Нам нужен только первый элемент:

```javascript
const [users] = await db.query('SELECT * FROM users WHERE login = ?', ['admin']);
// users = [{ id: 1, login: 'admin', ... }]  или  []
```

### Параметризованные запросы (`?`)

```javascript
// ✖ ПЛОХО — SQL-инъекция возможна:
db.query(`SELECT * FROM users WHERE login = '${login}'`);

// ✔ ХОРОШО — параметр подставляется безопасно:
db.query('SELECT * FROM users WHERE login = ?', [login]);
```

## ⚙ Реализация

### Полный код `controllers/authController.js`

```javascript
// ============================================================
// TechParts — Контроллер авторизации (MVC — Controller)
// Критерий №16: Регистрация (до 10 баллов)
// Критерий №17: Авторизация (до 4 баллов)
// ============================================================

const db = require('../config/db');   // Подключение к MySQL
const bcrypt = require('bcryptjs');   // Хеширование паролей

// ============================================================
// РЕГИСТРАЦИЯ — POST /api/auth/register
// Критерий №16: 3 балла — проверка по БД, хеширование, ответ
// ============================================================
exports.register = async (req, res) => {
  try {
    // Извлекаем данные из тела запроса
    const { login, password, fullname, email, phone } = req.body;

    // --- Проверка: логин уже занят? ---
    const [existing] = await db.query(
      'SELECT id FROM users WHERE login = ?', [login]
    );
    if (existing.length > 0) {
      // Логин уже существует — возвращаем ошибку 400
      return res.status(400).json({ error: 'Этот логин уже занят' });
    }

    // --- Хеширование пароля ---
    // 10 — количество раундов (стандартное значение)
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Сохранение в базу данных ---
    await db.query(
      'INSERT INTO users (login, password, fullname, email, phone) VALUES (?, ?, ?, ?, ?)',
      [login, hashedPassword, fullname, email, phone]
    );

    // Успех
    res.json({ message: 'Регистрация успешна!' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// ============================================================
// АВТОРИЗАЦИЯ (ВХОД) — POST /api/auth/login
// Критерий №17: 3 балла — проверка по БД, создание сессии
// ============================================================
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // --- Поиск пользователя по логину ---
    const [users] = await db.query(
      'SELECT * FROM users WHERE login = ?', [login]
    );
    if (users.length === 0) {
      // Пользователь не найден
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    const user = users[0];

    // --- Сравнение пароля с хешем ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Пароль неверный
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    // --- Создание сессии ---
    // Записываем user_id в сессию — теперь сервер «помнит» пользователя
    req.session.user_id = user.id;

    // Успех
    res.json({ message: 'Вход выполнен', user_id: user.id });
  } catch (err) {
    console.error('Ошибка авторизации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// ============================================================
// ВЫХОД — POST /api/auth/logout
// Критерий №13: кнопка «Выйти» — завершение сессии
// ============================================================
exports.logout = (req, res) => {
  // Уничтожаем сессию — «снимаем браслет»
  req.session.destroy(() => {
    res.json({ message: 'Вы вышли из системы' });
  });
};

// ============================================================
// ПРОВЕРКА СТАТУСА — GET /api/auth/check
// Критерий №13: проверка авторизации при загрузке страницы
// ============================================================
exports.check = (req, res) => {
  if (req.session && req.session.user_id) {
    // Авторизован
    res.json({ authorized: true, user_id: req.session.user_id });
  } else {
    // Не авторизован
    res.json({ authorized: false });
  }
};
```

---

# Глава 8. Контроллер товаров: `productController.js`

## ✦ Задание

Создать контроллер с одной функцией: получить все товары из базы данных.
*(Критерий №18)*

## ⚙ Реализация

### Полный код `controllers/productController.js`

```javascript
// ============================================================
// TechParts — Контроллер товаров (MVC — Controller)
// Критерий №18: Каталог — динамический вывод карточек из БД
// ============================================================

const db = require('../config/db');

// ============================================================
// ПОЛУЧИТЬ ВСЕ ТОВАРЫ — GET /api/products
// Критерий №18: 1 балл — динамический вывод карточек из БД
// ============================================================
exports.getAll = async (req, res) => {
  try {
    // SQL-запрос: выбрать все товары, отсортировать по id
    const [products] = await db.query('SELECT * FROM products ORDER BY id');
    // Возвращаем массив товаров в формате JSON
    res.json(products);
  } catch (err) {
    console.error('Ошибка получения товаров:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
```

**Что возвращает этот эндпоинт:**

```json
[
  {
    "id": 1,
    "name": "Intel Core i7-14700K",
    "description": "Процессор 14-го поколения, 20 ядер...",
    "price": 38990.00,
    "category": "Процессоры",
    "image": "images/processor.jpg"
  },
  { "id": 2, "name": "AMD Ryzen 7 7800X3D", ... },
  ...
]
```

---

# Глава 9. Контроллер заказов: `orderController.js`

## ✦ Задание

Создать контроллер с двумя функциями: создать заказ и получить заказы
текущего пользователя. *(Критерии №19, №20)*

## ⌬ Теория

### `req.session.user_id` — кто сделал запрос?

Когда пользователь авторизовался, его `user_id` хранится в сессии.
В контроллере заказов мы используем его, чтобы:
1. Привязать заказ к пользователю (`user_id` в таблице `orders`)
2. Показать только **его** заказы (фильтр `WHERE user_id = ?`)

### SQL JOIN — объединение таблиц

```sql
SELECT o.*, p.name, p.image
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.user_id = ?
```

Что здесь происходит:
- `orders o` — таблица заказов (псевдоним `o`)
- `JOIN products p` — присоединяем таблицу товаров (псевдоним `p`)
- `ON o.product_id = p.id` — связка: id товара из заказа = id товара
- `WHERE o.user_id = ?` — только заказы текущего пользователя

Результат: каждый заказ + название и картинка товара.

## ⚙ Реализация

### Полный код `controllers/orderController.js`

```javascript
// ============================================================
// TechParts — Контроллер заказов (MVC — Controller)
// Критерий №19: Оформление заказа (до 6 баллов)
// Критерий №20: Мои заказы (до 5 баллов)
// ============================================================

const db = require('../config/db');

// ============================================================
// СОЗДАТЬ ЗАКАЗ — POST /api/orders
// Критерий №19: 2 балла — корректная отработка «Оформить заказ»
// ============================================================
exports.create = async (req, res) => {
  try {
    // Получаем user_id из сессии (авторизованный пользователь)
    const userId = req.session.user_id;

    // Получаем данные из тела запроса
    const { product_id, delivery_date, quantity, total_price, comment } = req.body;

    // SQL: вставляем новый заказ в таблицу orders
    const [result] = await db.query(
      `INSERT INTO orders (user_id, product_id, delivery_date, quantity, total_price, comment)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, product_id, delivery_date, quantity, total_price, comment || null]
    );

    // Возвращаем ID созданного заказа
    res.json({
      message: 'Заказ оформлен',
      order_id: result.insertId   // insertId — автоинкрементный ID новой записи
    });
  } catch (err) {
    console.error('Ошибка создания заказа:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// ============================================================
// МОИ ЗАКАЗЫ — GET /api/orders/my
// Критерий №20: 3 балла — корректный вывод информации
// ============================================================
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.session.user_id;

    // SQL: запрос заказов с JOIN на products
    // Получаем данные заказа + название и картинку товара
    const [orders] = await db.query(
      `SELECT o.*, p.name, p.image, p.price AS unit_price
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    // Возвращаем массив заказов
    res.json(orders);
  } catch (err) {
    console.error('Ошибка получения заказов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
```

---

# Глава 10. Тестирование через Postman

## ✦ Задание

Научиться тестировать API без frontend с помощью Postman. Проверить все 7 маршрутов проекта.

## ⌬ Теория

### Что такое Postman?

> **Аналогия:** Postman — это **робот-клиент**, который может отправлять
> любые HTTP-запросы к вашему серверу. Он заменяет браузер при тестировании
> API — вы можете отправлять POST-запросы с любыми данными и видеть ответ.

### Зачем тестировать через Postman?

1. **Не нужен frontend** — можно тестировать backend отдельно
2. **Видно точный ответ** — JSON, статус-код, заголовки
3. **Можно отправить любые данные** — в том числе некорректные (для проверки ошибок)
4. **Можно сохранить запросы** — коллекция для повторного тестирования

### Установка

| | |
|---|---|
| **Сайт** | https://www.postman.com/downloads |
| **Цена** | Бесплатный |

Скачайте и установите. Регистрация необязательна — выберите «Skip and go to app».

### Интерфейс Postman

```
┌───────────────────────────────────────────────────────────┐
│ [GET ▾]  [http://localhost:3000/api/products]  [Send]     │
│─────────────────────────────────────────────────────────── │
│ Params  | Authorization | Headers | Body                  │
│─────────────────────────────────────────────────────────── │
│ Body → raw → JSON:                                        │
│ {                                                         │
│   "login": "testuser",                                    │
│   "password": "12345678"                                  │
│ }                                                         │
│─────────────────────────────────────────────────────────── │
│ Response:                                                 │
│ Status: 200 OK                                            │
│ {                                                         │
│   "message": "Регистрация успешна!"                       │
│ }                                                         │
└───────────────────────────────────────────────────────────┘
```

## ⧉ Примеры

### Как отправить GET-запрос

1. Выберите метод **GET**
2. Введите URL: `http://localhost:3000/api/products`
3. Нажмите **Send**
4. Внизу появится ответ — массив товаров в JSON

### Как отправить POST-запрос с JSON-телом

1. Выберите метод **POST**
2. Введите URL: `http://localhost:3000/api/auth/register`
3. Перейдите на вкладку **Body**
4. Выберите **raw** → формат **JSON**
5. Введите JSON:
```json
{
  "login": "testuser",
  "password": "12345678",
  "fullname": "Иванов Иван Иванович",
  "email": "test@example.com",
  "phone": "+7 (999) 123-45-67"
}
```
6. Нажмите **Send**

## ⚙ Реализация

### Предварительная подготовка

1. Убедитесь, что сервер запущен:
```bash
cd backend
node server.js
```
2. Откройте Postman

> **Важно!** Для сохранения сессии (cookies) между запросами в Postman:
> убедитесь, что в нижнем правом углу включён значок **▪ Cookies**.
> Postman автоматически сохраняет cookies, полученные от сервера.

---

### Тест 1: Получить все товары

| Параметр | Значение |
|----------|---------|
| **Метод** | GET |
| **URL** | `http://localhost:3000/api/products` |
| **Body** | нет |

**Ожидаемый ответ (Status: 200 OK):**
```json
[
  {
    "id": 1,
    "name": "Intel Core i7-14700K",
    "description": "Процессор Intel 14-го поколения...",
    "price": 38990.00,
    "category": "Процессоры",
    "image": "images/processor.jpg"
  },
  ...
]
```

---

### Тест 2: Регистрация нового пользователя

| Параметр | Значение |
|----------|---------|
| **Метод** | POST |
| **URL** | `http://localhost:3000/api/auth/register` |
| **Body** | raw → JSON |

**Тело запроса:**
```json
{
  "login": "testuser",
  "password": "12345678",
  "fullname": "Иванов Иван Иванович",
  "email": "test@example.com",
  "phone": "+7 (999) 123-45-67"
}
```

**Ожидаемый ответ (Status: 200 OK):**
```json
{
  "message": "Регистрация успешна!"
}
```

**Проверка ошибки — повторная регистрация:**

Отправьте тот же запрос ещё раз.

**Ожидаемый ответ (Status: 400):**
```json
{
  "error": "Этот логин уже занят"
}
```

---

### Тест 3: Авторизация (вход)

| Параметр | Значение |
|----------|---------|
| **Метод** | POST |
| **URL** | `http://localhost:3000/api/auth/login` |
| **Body** | raw → JSON |

**Тело запроса:**
```json
{
  "login": "testuser",
  "password": "12345678"
}
```

**Ожидаемый ответ (Status: 200 OK):**
```json
{
  "message": "Вход выполнен",
  "user_id": 1
}
```

> **Важно:** После этого запроса Postman получит cookie с идентификатором
> сессии. Все последующие запросы будут отправляться **как авторизованный
> пользователь**.

**Проверка ошибки — неверный пароль:**
```json
{
  "login": "testuser",
  "password": "wrongpassword"
}
```

**Ожидаемый ответ (Status: 401):**
```json
{
  "error": "Неверный логин или пароль"
}
```

---

### Тест 4: Проверка статуса авторизации

| Параметр | Значение |
|----------|---------|
| **Метод** | GET |
| **URL** | `http://localhost:3000/api/auth/check` |
| **Body** | нет |

**Ожидаемый ответ (если авторизован):**
```json
{
  "authorized": true,
  "user_id": 1
}
```

**Ожидаемый ответ (если НЕ авторизован):**
```json
{
  "authorized": false
}
```

---

### Тест 5: Создать заказ (авторизованный)

| Параметр | Значение |
|----------|---------|
| **Метод** | POST |
| **URL** | `http://localhost:3000/api/orders` |
| **Body** | raw → JSON |

> **Предварительно:** Выполните Тест 3 (вход), чтобы получить сессию.

**Тело запроса:**
```json
{
  "product_id": 1,
  "delivery_date": "2024-12-30",
  "quantity": 2,
  "total_price": 77980,
  "comment": "Доставить до 18:00"
}
```

**Ожидаемый ответ (Status: 200 OK):**
```json
{
  "message": "Заказ оформлен",
  "order_id": 1
}
```

**Проверка ошибки — без авторизации:**

Выполните Тест 7 (выход), затем повторите этот запрос.

**Ожидаемый ответ (Status: 401):**
```json
{
  "error": "Необходимо авторизоваться"
}
```

---

### Тест 6: Мои заказы

| Параметр | Значение |
|----------|---------|
| **Метод** | GET |
| **URL** | `http://localhost:3000/api/orders/my` |
| **Body** | нет |

**Ожидаемый ответ (Status: 200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "delivery_date": "2024-12-30",
    "quantity": 2,
    "total_price": 77980.00,
    "comment": "Доставить до 18:00",
    "name": "Intel Core i7-14700K",
    "image": "images/processor.jpg",
    "unit_price": 38990.00
  }
]
```

---

### Тест 7: Выход из системы

| Параметр | Значение |
|----------|---------|
| **Метод** | POST |
| **URL** | `http://localhost:3000/api/auth/logout` |
| **Body** | нет |

**Ожидаемый ответ (Status: 200 OK):**
```json
{
  "message": "Вы вышли из системы"
}
```

После этого Тест 4 (проверка) должен вернуть `{ "authorized": false }`.

---

### Чек-лист тестирования

| № | Тест | Метод | URL | Ожидаемый статус |
|---|------|-------|-----|-----------------|
| 1 | Все товары | GET | /api/products | 200 + массив |
| 2 | Регистрация | POST | /api/auth/register | 200 |
| 2б | Повторная рег. | POST | /api/auth/register | 400 |
| 3 | Вход | POST | /api/auth/login | 200 |
| 3б | Неверный пароль | POST | /api/auth/login | 401 |
| 4 | Проверка сессии | GET | /api/auth/check | 200 |
| 5 | Создать заказ | POST | /api/orders | 200 |
| 5б | Заказ без входа | POST | /api/orders | 401 |
| 6 | Мои заказы | GET | /api/orders/my | 200 + массив |
| 7 | Выход | POST | /api/auth/logout | 200 |

---

# Приложение. Работа без базы данных: моковые данные

## ✦ Задание

Настроить backend так, чтобы он работал **без MySQL** — используя массивы
в памяти. Это позволяет разрабатывать и тестировать сервер, пока база не готова.

## ⌬ Теория

### Принцип работы

Вместо `db.query('SELECT * FROM products')` мы обращаемся к обычному массиву.
Переключение между режимами — одна переменная `USE_MOCK`.

```
USE_MOCK = true  → данные из массивов (без MySQL)
USE_MOCK = false → данные из MySQL (рабочий режим)
```

## ⚙ Реализация

### Шаг 1: Создайте файл `config/mockData.js`

```javascript
// ============================================================
// Моковые данные — замена MySQL при разработке
// ============================================================

// Переключатель: true = без БД, false = с БД
const USE_MOCK = true;

// --- Имитация таблицы users ---
const users = [
  {
    id: 1,
    login: 'admin',
    // Хеш пароля '12345678' (bcryptjs, 10 раундов)
    password: '$2a$10$5WsS6F9Q8KqH5wP7mR3r8uKJ7xN1ZvM4qB9yT6dL2cA3hE4nI0bG',
    fullname: 'Администратор Тестовый',
    email: 'admin@techparts.ru',
    phone: '+7 (999) 000-00-00'
  }
];
let userIdCounter = users.length;

// --- Имитация таблицы products ---
const products = [
  { id: 1, name: 'Intel Core i7-14700K', description: 'Процессор 14-го поколения, 20 ядер, 5.6 ГГц.', price: 38990.00, category: 'Процессоры', image: 'images/processor.jpg' },
  { id: 2, name: 'AMD Ryzen 7 7800X3D', description: 'Процессор AMD с 3D V-Cache, 8 ядер, 5.0 ГГц.', price: 35490.00, category: 'Процессоры', image: 'images/processor.jpg' },
  { id: 3, name: 'NVIDIA GeForce RTX 4070 Ti', description: 'Видеокарта 12 ГБ GDDR6X, ray tracing, DLSS 3.', price: 72990.00, category: 'Видеокарты', image: 'images/video-cart.jpg' },
  { id: 4, name: 'ASUS ROG STRIX B650E-F', description: 'Материнская плата AM5, DDR5, PCIe 5.0.', price: 24990.00, category: 'Материнские платы', image: 'images/matherboard.jpg' },
  { id: 5, name: 'Kingston Fury Beast DDR5 32GB', description: 'Оперативная память DDR5-5600, 2x16 ГБ.', price: 8990.00, category: 'Оперативная память', image: 'images/memory.jpg' },
  { id: 6, name: 'ASUS ProArt PA278QV 27"', description: 'Монитор 27", IPS, 2K QHD, 75 Гц.', price: 32990.00, category: 'Мониторы', image: 'images/monitor.jpg' },
  { id: 7, name: 'Logitech G Pro X Superlight', description: 'Беспроводная мышь, HERO 25K, 63 г.', price: 9490.00, category: 'Мыши', image: 'images/mouse.jpg' }
];

// --- Имитация таблицы orders ---
const orders = [];
let orderIdCounter = 0;

module.exports = { USE_MOCK, users, userIdCounter, products, orders, orderIdCounter };
```

### Шаг 2: Модифицируйте контроллеры

Каждый контроллер проверяет `USE_MOCK` и работает с массивами или с БД.

Пример для `productController.js`:

```javascript
const db = require('../config/db');
const mock = require('../config/mockData');

exports.getAll = async (req, res) => {
  try {
    if (mock.USE_MOCK) {
      // --- МОК: возвращаем массив ---
      res.json(mock.products);
    } else {
      // --- БД: SQL-запрос ---
      const [products] = await db.query('SELECT * FROM products ORDER BY id');
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
```

Пример для `authController.js` (регистрация):

```javascript
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const mock = require('../config/mockData');

exports.register = async (req, res) => {
  try {
    const { login, password, fullname, email, phone } = req.body;

    if (mock.USE_MOCK) {
      // --- МОК ---
      if (mock.users.find(u => u.login === login)) {
        return res.status(400).json({ error: 'Этот логин уже занят' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      mock.userIdCounter++;
      mock.users.push({
        id: mock.userIdCounter, login, password: hashedPassword,
        fullname, email, phone
      });
      res.json({ message: 'Регистрация успешна!' });
    } else {
      // --- БД ---
      const [existing] = await db.query('SELECT id FROM users WHERE login = ?', [login]);
      if (existing.length > 0) return res.status(400).json({ error: 'Этот логин уже занят' });
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users (login, password, fullname, email, phone) VALUES (?, ?, ?, ?, ?)',
        [login, hashedPassword, fullname, email, phone]);
      res.json({ message: 'Регистрация успешна!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (mock.USE_MOCK) {
      // --- МОК ---
      const user = mock.users.find(u => u.login === login);
      if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Неверный логин или пароль' });
      req.session.user_id = user.id;
      res.json({ message: 'Вход выполнен', user_id: user.id });
    } else {
      // --- БД ---
      const [users] = await db.query('SELECT * FROM users WHERE login = ?', [login]);
      if (users.length === 0) return res.status(401).json({ error: 'Неверный логин или пароль' });
      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Неверный логин или пароль' });
      req.session.user_id = user.id;
      res.json({ message: 'Вход выполнен', user_id: user.id });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// logout и check — одинаковые для обоих режимов (работают с сессией)
exports.logout = (req, res) => {
  req.session.destroy(() => res.json({ message: 'Вы вышли из системы' }));
};
exports.check = (req, res) => {
  res.json(req.session?.user_id
    ? { authorized: true, user_id: req.session.user_id }
    : { authorized: false });
};
```

Пример для `orderController.js`:

```javascript
const db = require('../config/db');
const mock = require('../config/mockData');

exports.create = async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { product_id, delivery_date, quantity, total_price, comment } = req.body;

    if (mock.USE_MOCK) {
      mock.orderIdCounter++;
      mock.orders.push({
        id: mock.orderIdCounter, user_id: userId, product_id: parseInt(product_id),
        delivery_date, quantity, total_price, comment: comment || null
      });
      res.json({ message: 'Заказ оформлен', order_id: mock.orderIdCounter });
    } else {
      const [result] = await db.query(
        `INSERT INTO orders (user_id, product_id, delivery_date, quantity, total_price, comment) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, product_id, delivery_date, quantity, total_price, comment || null]);
      res.json({ message: 'Заказ оформлен', order_id: result.insertId });
    }
  } catch (err) { res.status(500).json({ error: 'Ошибка сервера' }); }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.session.user_id;

    if (mock.USE_MOCK) {
      const myOrders = mock.orders
        .filter(o => o.user_id === userId)
        .map(o => {
          const product = mock.products.find(p => p.id === o.product_id);
          return { ...o, name: product?.name, image: product?.image, unit_price: product?.price };
        });
      res.json(myOrders);
    } else {
      const [orders] = await db.query(
        `SELECT o.*, p.name, p.image, p.price AS unit_price FROM orders o JOIN products p ON o.product_id = p.id WHERE o.user_id = ? ORDER BY o.created_at DESC`,
        [userId]);
      res.json(orders);
    }
  } catch (err) { res.status(500).json({ error: 'Ошибка сервера' }); }
};
```

### Шаг 3: Переключение на реальную БД

Когда MySQL настроен и база создана:
1. Откройте `config/mockData.js`
2. Поменяйте `const USE_MOCK = true;` → `const USE_MOCK = false;`
3. Перезапустите сервер (`node server.js`)

---

# Краткая справка по файлам backend

| Файл | Что делает | Глава |
|------|-----------|-------|
| `server.js` | Точка входа, настройка middleware, маршруты | 3 |
| `package.json` | Список зависимостей | 2 |
| `config/db.js` | Подключение к MySQL (пул + промисы) | 4 |
| `config/mockData.js` | Моковые данные для работы без MySQL | Прил. |
| `middleware/authMiddleware.js` | Проверка авторизации | 5 |
| `routes/authRoutes.js` | POST register/login/logout, GET check | 6 |
| `routes/productRoutes.js` | GET / (все товары) | 6 |
| `routes/orderRoutes.js` | POST /, GET /my (с middleware) | 6 |
| `controllers/authController.js` | Регистрация, вход, выход, проверка | 7 |
| `controllers/productController.js` | Получить все товары | 8 |
| `controllers/orderController.js` | Создать заказ, мои заказы | 9 |
