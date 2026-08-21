# Урок 07: Аутентификация с Passport.js

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Понимать разницу между **аутентификацией** и **авторизацией**
- Безопасно хранить пароли с **bcrypt**
- Использовать **сессии** и **cookies**
- Настроить **Passport.js** для входа/регистрации
- Защищать маршруты от неавторизованных пользователей

---

## 📚 Теоретическая часть

### Аутентификация vs Авторизация

| Термин | Вопрос | Пример |
|--------|--------|--------|
| **Аутентификация** | КТО вы? | Проверка логина/пароля |
| **Авторизация** | ЧТО вам разрешено? | Доступ к админ-панели |

```
Пользователь → Аутентификация → Авторизация → Ресурс
              "Кто ты?"         "Что можешь?"
```

### Способы аутентификации

| Способ | Описание | Когда использовать |
|--------|----------|-------------------|
| **Cookies + Sessions** | Сервер хранит состояние | Веб-сайты |
| **JWT (Token)** | Клиент хранит токен | API, мобильные приложения |
| **OAuth** | Вход через Google, GitHub | Социальные сети |
| **Basic Auth** | Логин:пароль в заголовке | Простые API |

В этом уроке мы используем **Sessions** — классический подход для веб-приложений.

---

## 🔒 Хеширование паролей

### Почему нельзя хранить пароли "как есть"?

```
❌ Таблица users (ОПАСНО!):
┌──────────┬───────────────┬──────────────┐
│ user_id  │ user_email    │ user_password│
├──────────┼───────────────┼──────────────┤
│ 1        │ ivan@mail.ru  │ 123456       │  ← Если БД взломают,
│ 2        │ anna@mail.ru  │ qwerty       │     все пароли украдены!
└──────────┴───────────────┴──────────────┘

✅ Таблица users (БЕЗОПАСНО):
┌──────────┬───────────────┬─────────────────────────────────────────────────┐
│ user_id  │ user_email    │ user_password                                   │
├──────────┼───────────────┼─────────────────────────────────────────────────┤
│ 1        │ ivan@mail.ru  │ $2b$10$N9qo8uLOickgx2ZMRZoMy...                 │
│ 2        │ anna@mail.ru  │ $2b$10$KIXAJkk2t5gVP5V5rV2Xy...                 │
└──────────┴───────────────┴─────────────────────────────────────────────────┘
            ↑ Хеши нельзя "расшифровать"
```

### bcrypt — Библиотека для хеширования

**bcrypt** — это алгоритм, который:
- Создаёт **необратимый хеш** (нельзя получить пароль обратно)
- Добавляет случайную **соль** (одинаковые пароли → разные хеши)
- **Медленный** специально (защита от brute-force)

### Установка bcrypt

```bash
npm install bcryptjs
```

> **bcryptjs** — чистая JS реализация (работает везде)
> **bcrypt** — быстрее, но требует компиляции

### Использование bcrypt

```javascript
const bcrypt = require('bcryptjs');

// Хеширование пароля
const password = 'mySecretPassword123';
const saltRounds = 10;  // "Стоимость" хеширования

const hash = await bcrypt.hash(password, saltRounds);
// $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

// Проверка пароля
const isValid = await bcrypt.compare('mySecretPassword123', hash);
// true

const isInvalid = await bcrypt.compare('wrongPassword', hash);
// false
```

---

## 🍪 Сессии и Cookies

### Как работают сессии?

```
1. Пользователь входит (логин/пароль)
         ↓
2. Сервер создаёт СЕССИЮ (объект в памяти/БД)
   {
     sessionId: "abc123",
     userId: 1,
     userName: "Иван"
   }
         ↓
3. Сервер отправляет COOKIE с sessionId
   Set-Cookie: connect.sid=abc123
         ↓
4. Браузер автоматически отправляет Cookie при каждом запросе
   Cookie: connect.sid=abc123
         ↓
5. Сервер находит сессию по sessionId → узнаёт пользователя
```

### Установка express-session

```bash
npm install express-session
```

### Настройка сессий

```javascript
// app.js
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,              // Не сохранять сессию, если не изменилась
    saveUninitialized: false,   // Не создавать пустые сессии
    cookie: {
        secure: false,          // true только для HTTPS
        httpOnly: true,         // Cookie недоступна в JS (XSS защита)
        maxAge: 24 * 60 * 60 * 1000  // 24 часа
    }
}));
```

### Работа с сессией

```javascript
// Сохранение данных в сессию
req.session.userId = user.id;
req.session.userName = user.name;

// Чтение данных из сессии
const userId = req.session.userId;

// Уничтожение сессии (выход)
req.session.destroy();
```

---

## 🔑 Passport.js

**Passport.js** — middleware для аутентификации в Node.js. Поддерживает множество стратегий (local, OAuth, JWT и др.).

### Установка

```bash
npm install passport passport-local
```

### Настройка Passport

```javascript
// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { pool } = require('./database');

/**
 * Local Strategy — вход по email/password
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email',     // Поле в req.body для логина
        passwordField: 'password'    // Поле в req.body для пароля
    },
    async (email, password, done) => {
        try {
            // 1. Ищем пользователя в БД
            const [rows] = await pool.query(
                'SELECT * FROM users WHERE user_email = ?',
                [email]
            );
            
            if (rows.length === 0) {
                return done(null, false, { 
                    message: 'Неверный email или пароль' 
                });
            }
            
            const user = rows[0];
            
            // 2. Проверяем пароль
            const isValid = await bcrypt.compare(password, user.user_password);
            
            if (!isValid) {
                return done(null, false, { 
                    message: 'Неверный email или пароль' 
                });
            }
            
            // 3. Успешная аутентификация
            return done(null, user);
            
        } catch (error) {
            return done(error);
        }
    }
));

/**
 * Сериализация — какие данные сохранять в сессии
 * (сохраняем минимум — только ID)
 */
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

/**
 * Десериализация — как восстановить пользователя из сессии
 */
passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query(
            'SELECT user_id, user_name, user_email, user_role FROM users WHERE user_id = ?',
            [id]
        );
        
        if (rows.length === 0) {
            return done(null, false);
        }
        
        done(null, rows[0]);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
```

### Подключение в app.js

```javascript
// app.js

const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Сессии (ПЕРЕД passport!)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Passport (ПОСЛЕ session!)
app.use(passport.initialize());
app.use(passport.session());

// Маршруты...
```

---

## 📝 Auth Service

```javascript
// services/auth.service.js

const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const User = require('../models/User');

/**
 * Сервис аутентификации
 */

/**
 * Регистрация нового пользователя
 * @param {Object} data - { email, password, name }
 * @returns {Promise<User>}
 */
exports.register = async (data) => {
    const { email, password, name } = data;
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error('Некорректный email');
    }
    
    // Валидация пароля
    if (!password || password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
    }
    
    // Проверка, что email не занят
    const [existing] = await pool.query(
        'SELECT user_id FROM users WHERE user_email = ?',
        [email]
    );
    
    if (existing.length > 0) {
        throw new Error('Пользователь с таким email уже существует');
    }
    
    // Хешируем пароль
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Создаём пользователя
    const [result] = await pool.query(
        'INSERT INTO users (user_email, user_password, user_name) VALUES (?, ?, ?)',
        [email, hashedPassword, name || null]
    );
    
    // Возвращаем созданного пользователя
    const [rows] = await pool.query(
        'SELECT user_id, user_email, user_name, user_role FROM users WHERE user_id = ?',
        [result.insertId]
    );
    
    return User.fromObject(rows[0]);
};

/**
 * Получить пользователя по ID
 * @param {number} id
 * @returns {Promise<User|null>}
 */
exports.getUserById = async (id) => {
    const [rows] = await pool.query(
        'SELECT user_id, user_email, user_name, user_role FROM users WHERE user_id = ?',
        [id]
    );
    
    if (rows.length === 0) {
        return null;
    }
    
    return User.fromObject(rows[0]);
};

/**
 * Получить пользователя по email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
exports.getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE user_email = ?',
        [email]
    );
    
    if (rows.length === 0) {
        return null;
    }
    
    return User.fromObject(rows[0]);
};
```

---

## 🎮 Auth Controller

```javascript
// controllers/auth.controller.js

const passport = require('passport');
const authService = require('../services/auth.service');
const ResponseObject = require('../utils/ResponseObject');

/**
 * Контроллер аутентификации
 */

/**
 * POST /auth/register
 * Регистрация нового пользователя
 */
exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        
        // Автоматически входим после регистрации
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            
            res.status(201).json(
                ResponseObject.success(
                    user.toSafeObject(),
                    'Регистрация успешна'
                )
            );
        });
        
    } catch (error) {
        res.status(400).json(
            ResponseObject.error(error.message)
        );
    }
};

/**
 * POST /auth/login
 * Вход в систему
 */
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.status(401).json(
                ResponseObject.error(info?.message || 'Ошибка аутентификации')
            );
        }
        
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            
            res.json(
                ResponseObject.success({
                    userId: user.user_id,
                    email: user.user_email,
                    name: user.user_name,
                    role: user.user_role
                }, 'Вход выполнен успешно')
            );
        });
        
    })(req, res, next);
};

/**
 * POST /auth/logout
 * Выход из системы
 */
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            
            res.clearCookie('connect.sid');
            res.json(ResponseObject.success(null, 'Выход выполнен'));
        });
    });
};

/**
 * GET /auth/status
 * Проверка статуса аутентификации
 */
exports.status = (req, res) => {
    if (req.isAuthenticated()) {
        res.json(ResponseObject.success({
            isAuthenticated: true,
            user: {
                id: req.user.user_id,
                email: req.user.user_email,
                name: req.user.user_name,
                role: req.user.user_role
            }
        }));
    } else {
        res.json(ResponseObject.success({
            isAuthenticated: false,
            user: null
        }));
    }
};
```

---

## 🛣️ Auth Router

```javascript
// routes/auth.router.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * Маршруты аутентификации
 * Базовый путь: /auth
 */

// POST /auth/register - Регистрация
router.post('/register', authController.register);

// POST /auth/login - Вход
router.post('/login', authController.login);

// POST /auth/logout - Выход
router.post('/logout', authController.logout);

// GET /auth/status - Статус аутентификации
router.get('/status', authController.status);

module.exports = router;
```

---

## 🛡️ Middleware для защиты маршрутов

```javascript
// middleware/auth.middleware.js

/**
 * Middleware для проверки аутентификации
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    res.status(401).json({
        success: false,
        error: 'Требуется авторизация'
    });
};

/**
 * Middleware для проверки роли администратора
 */
exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация'
        });
    }
    
    if (req.user.user_role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Доступ запрещён. Требуются права администратора'
        });
    }
    
    next();
};

/**
 * Middleware для проверки владельца ресурса
 */
exports.isOwner = (paramName = 'userId') => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                success: false,
                error: 'Требуется авторизация'
            });
        }
        
        const resourceOwnerId = parseInt(req.params[paramName]);
        const currentUserId = req.user.user_id;
        
        if (resourceOwnerId !== currentUserId && req.user.user_role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Доступ запрещён'
            });
        }
        
        next();
    };
};
```

### Использование middleware

```javascript
// routes/product.router.js

const { isAuthenticated, isAdmin } = require('../middleware/auth.middleware');

// Публичные маршруты
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Защищённые маршруты (требуется вход)
router.post('/', isAuthenticated, productController.createProduct);
router.put('/:id', isAuthenticated, productController.updateProduct);

// Только для администраторов
router.delete('/:id', isAdmin, productController.deleteProduct);
```

---

## 🛒 Корзина (для авторизованных)

```javascript
// services/cart.service.js

const { pool } = require('../config/database');

/**
 * Получить корзину пользователя
 */
exports.getCart = async (userId) => {
    const [rows] = await pool.query(`
        SELECT 
            sc.item_id,
            sc.item_quantity,
            p.product_id,
            p.product_name,
            p.product_price,
            p.product_img,
            (sc.item_quantity * p.product_price) as total_price
        FROM shopping_cart sc
        JOIN products p ON sc.product_id = p.product_id
        WHERE sc.user_id = ?
    `, [userId]);
    
    return rows;
};

/**
 * Добавить товар в корзину
 */
exports.addToCart = async (userId, productId, quantity = 1) => {
    // Проверяем, есть ли уже этот товар в корзине
    const [existing] = await pool.query(
        'SELECT item_id, item_quantity FROM shopping_cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
    );
    
    if (existing.length > 0) {
        // Увеличиваем количество
        await pool.query(
            'UPDATE shopping_cart SET item_quantity = item_quantity + ? WHERE item_id = ?',
            [quantity, existing[0].item_id]
        );
    } else {
        // Добавляем новый
        await pool.query(
            'INSERT INTO shopping_cart (user_id, product_id, item_quantity) VALUES (?, ?, ?)',
            [userId, productId, quantity]
        );
    }
    
    return this.getCart(userId);
};

/**
 * Удалить товар из корзины
 */
exports.removeFromCart = async (userId, itemId) => {
    await pool.query(
        'DELETE FROM shopping_cart WHERE user_id = ? AND item_id = ?',
        [userId, itemId]
    );
    
    return this.getCart(userId);
};

/**
 * Очистить корзину
 */
exports.clearCart = async (userId) => {
    await pool.query(
        'DELETE FROM shopping_cart WHERE user_id = ?',
        [userId]
    );
};
```

```javascript
// controllers/cart.controller.js

const cartService = require('../services/cart.service');
const ResponseObject = require('../utils/ResponseObject');

exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.user.user_id);
        
        const total = cart.reduce((sum, item) => sum + item.total_price, 0);
        
        res.json(ResponseObject.success({
            items: cart,
            totalItems: cart.length,
            totalPrice: total
        }));
    } catch (error) {
        next(error);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(
            req.user.user_id, 
            productId, 
            quantity || 1
        );
        
        res.json(ResponseObject.success(cart, 'Товар добавлен в корзину'));
    } catch (error) {
        next(error);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await cartService.removeFromCart(
            req.user.user_id, 
            req.params.itemId
        );
        
        res.json(ResponseObject.success(cart, 'Товар удалён из корзины'));
    } catch (error) {
        next(error);
    }
};
```

```javascript
// routes/cart.router.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

// Все маршруты корзины требуют авторизации
router.use(isAuthenticated);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/:itemId', cartController.removeFromCart);

module.exports = router;
```

---

## 📁 Структура проекта

```
src/
├── config/
│   ├── database.js
│   └── passport.js          # ← Новый файл
│
├── controllers/
│   ├── auth.controller.js   # ← Новый файл
│   ├── cart.controller.js   # ← Новый файл
│   └── product.controller.js
│
├── services/
│   ├── auth.service.js      # ← Новый файл
│   ├── cart.service.js      # ← Новый файл
│   └── product.service.js
│
├── routes/
│   ├── auth.router.js       # ← Новый файл
│   ├── cart.router.js       # ← Новый файл
│   └── product.router.js
│
├── middleware/
│   └── auth.middleware.js   # ← Новый файл
│
├── models/
│   ├── User.js
│   └── Product.js
│
├── app.js
└── server.js
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Аутентификация** | Проверка личности (кто вы) |
| **Авторизация** | Проверка прав доступа (что можете) |
| **bcrypt** | Алгоритм хеширования паролей |
| **Hash** | Необратимое преобразование данных |
| **Salt** | Случайная строка для уникальности хеша |
| **Session** | Механизм хранения состояния на сервере |
| **Cookie** | Данные, хранимые в браузере |
| **Passport.js** | Middleware для аутентификации |
| **Strategy** | Способ аутентификации (local, OAuth, JWT) |
| **Serialize** | Сохранение данных в сессию |
| **Deserialize** | Восстановление данных из сессии |

---

## ➡️ Что дальше?

В следующем уроке мы интегрируем **Frontend с Backend**:
- Настройка CORS
- Отправка запросов из браузера
- Работа с cookies в fetch
- Защита от CSRF

---

**Курс:** Backend | **Урок:** 07-authentication-with-passportjs
