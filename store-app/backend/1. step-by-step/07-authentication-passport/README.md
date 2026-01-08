# Урок 7: Аутентификация с Passport.js

## 🎯 Цель урока

Реализовать полноценную систему аутентификации: регистрацию, вход, выход и защиту маршрутов.

## 📚 Изучаемые концепции

1. **Passport.js** — модульная библиотека аутентификации
2. **Стратегия Local** — вход по email/password
3. **bcrypt** — безопасное хеширование паролей
4. **express-session** — сессии пользователей
5. **Сериализация/десериализация** — сохранение и восстановление сессии
6. **Middleware защиты** — ограничение доступа

## 📁 Структура проекта

```
07-authentication-passport/
├── src/
│   ├── app.js                     # 🔄 + сессии и Passport
│   ├── server.js
│   ├── services/
│   │   ├── db.service.js
│   │   ├── product.service.js
│   │   └── user.service.js        # 🆕 Пользователи
│   ├── controllers/
│   │   ├── product.controller.js
│   │   └── auth.controller.js     # 🆕 Аутентификация
│   ├── routes/
│   │   ├── product.router.js
│   │   └── auth.router.js         # 🆕 Auth маршруты
│   └── middlewares/
│       ├── logger.middleware.js
│       └── auth.middleware.js     # 🆕 Проверка доступа
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Новые зависимости

| Пакет | Назначение |
|-------|------------|
| `passport` | Фреймворк аутентификации |
| `passport-local` | Стратегия email/password |
| `bcryptjs` | Хеширование паролей |
| `express-session` | Управление сессиями |

## 🚀 Запуск сервера

```bash
cd lessons/07-authentication-passport
npm install
copy .env.example .env
npm start
```

## 📊 Создание таблицы users

```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) DEFAULT 'клиент'
);
```

## 🔑 API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/auth/register` | Регистрация |
| POST | `/auth/login` | Вход |
| POST | `/auth/logout` | Выход |
| GET | `/auth/check` | Проверка статуса |

## 📝 Тестирование

```bash
# Регистрация
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"123456\"}"

# Вход
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -c cookies.txt \
     -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"

# Проверка (с cookie)
curl http://localhost:3000/auth/check -b cookies.txt

# Выход
curl -X POST http://localhost:3000/auth/logout -b cookies.txt
```

## 🔐 Ключевые моменты

### Хеширование пароля

```javascript
const bcrypt = require('bcryptjs');

// При регистрации — хешируем
const hashedPassword = bcrypt.hashSync(password, 10);

// При входе — сравниваем
const isValid = bcrypt.compareSync(inputPassword, hashedPassword);
```

### Настройка Passport

```javascript
// Стратегия Local
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    verifyUserFunction
));

// Сериализация (что сохранить в сессию)
passport.serializeUser((user, done) => done(null, user.email));

// Десериализация (как восстановить пользователя)
passport.deserializeUser(async (email, done) => {
    const user = await findUser({ email });
    done(null, user);
});
```

### Защита маршрутов

```javascript
// Middleware для проверки авторизации
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Требуется авторизация' });
};

// Использование
app.use('/shopping-cart', isAuthenticated, cartRouter);
```

## 📊 Поток аутентификации

```
Регистрация:
  Client → POST /auth/register → Hash password → Save to DB → Create session

Вход:
  Client → POST /auth/login → Find user → Compare hash → Create session

Защищённый маршрут:
  Client (with cookie) → Middleware (isAuthenticated) → Controller
```

## ➡️ Что дальше?

В следующем уроке мы настроим **интеграцию с фронтендом**: CORS, JSON API и защиту корзины покупок.
