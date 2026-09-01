# 🎓 Курс: Разработка Backend на Node.js

## Описание

Этот курс охватывает пошаговую разработку серверной части веб-приложения на Node.js с использованием Express.js, MySQL и Passport.js.

Каждый урок представляет собой самостоятельный проект, который можно запустить независимо. Уроки выстроены в логической последовательности, от простого к сложному.

## 📚 Содержание курса

| № | Урок | Описание | Ключевые концепции |
|---|------|----------|-------------------|
| 01 | [Basic Node.js Server](./01-basic-node-server/) | Создание HTTP сервера без фреймворков | `http.createServer()`, Node.js runtime |
| 02 | [Express App Structure](./02-express-app-structure/) | Установка Express и базовая структура | Express, `app.get()`, `res.json()` |
| 03 | [Routing and Controllers](./03-routing-and-controllers/) | Организация кода: Router + Controller | `express.Router()`, MVC pattern |
| 04 | [Middleware and Logging](./04-middleware-and-logging/) | Middleware и логирование запросов | Custom middleware, `next()` |
| 05 | [MySQL Connection](./05-mysql-connection/) | Подключение к базе данных | `mysql2`, dotenv, connection pool |
| 06 | [CRUD Services](./06-crud-services/) | CRUD операции и сервисный слой | INSERT, SELECT, UPDATE, DELETE |
| 07 | [Authentication with Passport.js](./07-authentication-passport/) | Аутентификация пользователей | Passport.js, bcrypt, sessions |
| 08 | [Frontend Integration](./08-frontend-integration/) | CORS и защита маршрутов | CORS, protected routes, shopping cart |
| 09 | [Testing and Validation](./09-testing-and-validation/) | Валидация и финальная версия | Validation, Models, ResObj |

## 🚀 Быстрый старт

### Запуск любого урока

```bash
# 1. Перейдите в папку нужного урока
cd lessons/01-basic-node-server

# 2. Установите зависимости (если есть)
npm install

# 3. Создайте файл .env (если требуется)
copy .env.example .env

# 4. Запустите сервер
npm start
```

### Требования

- **Node.js** 18.0.0 или выше
- **MySQL** (для уроков 05-09)
- Рекомендуется: Postman, VS Code

## 📊 Прогрессия обучения

```
Урок 1: Базовый Node.js
    ↓
Урок 2: Добавляем Express
    ↓
Урок 3: Организуем код (Router + Controller)
    ↓
Урок 4: Middleware и логирование
    ↓
Урок 5: Подключаем MySQL
    ↓
Урок 6: CRUD операции
    ↓
Урок 7: Аутентификация (Passport.js)
    ↓
Урок 8: Интеграция с фронтендом (CORS)
    ↓
Урок 9: Валидация и финальная версия
```

## 🗄️ База данных

### Создание базы данных

```sql
CREATE DATABASE IF NOT EXISTS storedb;
USE storedb;

-- Таблица пользователей
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) DEFAULT 'клиент'
);

-- Таблица товаров
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_category VARCHAR(100),
    product_img VARCHAR(500)
);

-- Таблица корзины
CREATE TABLE shopping_cart (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    item_quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Тестовые данные
INSERT INTO products (product_name, product_price, product_category) VALUES
    ('Intel Core i9-13900K', 55990, 'Процессоры'),
    ('AMD Ryzen 9 7950X', 62990, 'Процессоры'),
    ('NVIDIA GeForce RTX 4090', 159990, 'Видеокарты'),
    ('AMD Radeon RX 7900 XTX', 89990, 'Видеокарты'),
    ('ASUS ROG STRIX Z790-E', 42990, 'Материнские платы');
```

## 📦 Используемые библиотеки

| Библиотека | Назначение | Урок |
|------------|------------|------|
| `express` | Веб-фреймворк | 02+ |
| `dotenv` | Переменные окружения | 05+ |
| `mysql2` | Драйвер MySQL | 05+ |
| `bcryptjs` | Хеширование паролей | 07+ |
| `passport` | Аутентификация | 07+ |
| `passport-local` | Стратегия логин/пароль | 07+ |
| `express-session` | Сессии | 07+ |
| `cors` | Cross-Origin запросы | 08+ |
