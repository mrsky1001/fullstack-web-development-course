# Урок 04: Проектирование БД и ER-диаграммы

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Проектировать структуру базы данных
- Создавать **ER-диаграммы**
- Понимать типы связей (1:1, 1:N, N:M)
- Применять **нормализацию**
- Избегать типичных ошибок проектирования

---

## 📚 Теоретическая часть

### Процесс проектирования БД

```
1. Анализ требований
        ↓
2. Концептуальное проектирование (ER-диаграмма)
        ↓
3. Логическое проектирование (Таблицы)
        ↓
4. Физическое проектирование (SQL, индексы)
        ↓
5. Реализация и тестирование
```

### Пример: Интернет-магазин

**Требования:**
- Пользователи могут регистрироваться и заказывать товары
- Товары относятся к категориям
- Пользователь может добавлять товары в корзину
- Пользователь может оформлять заказы
- Заказ содержит несколько товаров

---

## 📐 ER-диаграммы

### Что такое ER-диаграмма?

**ER** (Entity-Relationship) — диаграмма сущностей и связей.

- **Entity (Сущность)** — объект предметной области (User, Product, Order)
- **Attribute (Атрибут)** — свойство сущности (name, price, email)
- **Relationship (Связь)** — отношение между сущностями

### Нотация

```
┌───────────────┐
│   ENTITY      │  ← Сущность (таблица)
├───────────────┤
│ • attribute1  │  ← Атрибуты (столбцы)
│ • attribute2  │
│ • attribute3  │
└───────────────┘
        │
        │ связь
        ↓
┌───────────────┐
│   ENTITY2     │
└───────────────┘
```

### Обозначения связей

```
1:1  (один к одному)     ──────────────
1:N  (один ко многим)    ─────────────<
N:M  (многие ко многим)  >────────────<
```

---

## 🔗 Типы связей

### 1:1 — Один к одному

Одна запись связана ровно с одной записью другой таблицы.

```
┌─────────────┐         ┌─────────────────┐
│   users     │         │  user_profiles  │
├─────────────┤    1:1  ├─────────────────┤
│ user_id  PK │─────────│ profile_id   PK │
│ email       │         │ user_id      FK │
│ password    │         │ avatar          │
└─────────────┘         │ bio             │
                        └─────────────────┘

Один пользователь — один профиль.
```

**Когда использовать:**
- Разделение редко используемых данных
- Данные с разным уровнем доступа

### 1:N — Один ко многим (самая частая!)

Одна запись связана с множеством записей другой таблицы.

```
┌─────────────┐         ┌─────────────┐
│   users     │         │   orders    │
├─────────────┤   1:N   ├─────────────┤
│ user_id  PK │────────<│ order_id PK │
│ user_name   │         │ user_id  FK │
│ user_email  │         │ total       │
└─────────────┘         │ status      │
                        └─────────────┘

Один пользователь — много заказов.
Один заказ — только один пользователь.
```

**Примеры:**
- Пользователь → Заказы
- Категория → Товары
- Пост → Комментарии
- Отдел → Сотрудники

### N:M — Многие ко многим

Множество записей связано с множеством записей.

```
┌─────────────┐         ┌───────────────┐         ┌─────────────┐
│  products   │         │ order_items   │         │   orders    │
├─────────────┤   N:M   ├───────────────┤   N:M   ├─────────────┤
│ product_id  │────────<│ item_id    PK │>────────│ order_id    │
│ name        │         │ order_id   FK │         │ user_id     │
│ price       │         │ product_id FK │         │ total       │
└─────────────┘         │ quantity      │         └─────────────┘
                        │ price         │
                        └───────────────┘
                        ↑
                   Связующая таблица

Один заказ содержит много товаров.
Один товар может быть в разных заказах.
```

**Правило:** N:M реализуется через **связующую таблицу** (junction table).

**Примеры:**
- Студенты ↔ Курсы
- Товары ↔ Заказы
- Авторы ↔ Книги
- Актёры ↔ Фильмы

---

## 🗂️ ER-диаграмма интернет-магазина

```
                                ┌───────────────────┐
                                │    categories     │
                                ├───────────────────┤
                                │ category_id    PK │
                                │ category_name     │
                                └───────────────────┘
                                         │
                                         │ 1:N
                                         ↓
┌───────────────┐              ┌───────────────────┐
│    users      │              │     products      │
├───────────────┤              ├───────────────────┤
│ user_id    PK │              │ product_id     PK │
│ user_name     │              │ product_name      │
│ user_email    │              │ product_price     │
│ user_password │              │ product_img       │
│ user_role     │              │ category_id    FK │
│ created_at    │              │ created_at        │
└───────────────┘              └───────────────────┘
        │                               │
        │ 1:N                           │
        ↓                               │
┌───────────────┐                       │
│    orders     │                       │
├───────────────┤                       │
│ order_id   PK │                       │
│ user_id    FK │                       │
│ total         │                       │
│ status        │                       │
│ created_at    │                       │
└───────────────┘                       │
        │                               │
        │ 1:N                           │ N:M
        ↓                               ↓
┌─────────────────────────────────────────────┐
│               order_items                   │
├─────────────────────────────────────────────┤
│ item_id          PK                         │
│ order_id         FK  ───────────────────────│
│ product_id       FK  ───────────────────────┤
│ quantity                                    │
│ price_at_purchase                           │
└─────────────────────────────────────────────┘

┌───────────────┐              ┌───────────────────┐
│    users      │──────────────│  shopping_cart    │
└───────────────┘    1:N       ├───────────────────┤
                               │ cart_id        PK │
                               │ user_id        FK │
                               │ product_id     FK │
                               │ quantity          │
                               │ added_at          │
                               └───────────────────┘
```

---

## 🔑 Первичные и внешние ключи

### Primary Key (PK)

```sql
-- Способ 1: при объявлении поля
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100)
);

-- Способ 2: отдельным ограничением
CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(100),
    PRIMARY KEY (user_id)
);

-- Составной первичный ключ
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)  -- Комбинация уникальна
);
```

### Foreign Key (FK)

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10, 2),
    
    -- Внешний ключ
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE      -- При удалении user удалить заказы
        ON UPDATE CASCADE      -- При изменении user_id обновить
);
```

### Действия при удалении/обновлении

| Действие | Описание |
|----------|----------|
| `CASCADE` | Удалить/обновить связанные записи |
| `SET NULL` | Установить NULL |
| `RESTRICT` | Запретить операцию |
| `NO ACTION` | Аналог RESTRICT |
| `SET DEFAULT` | Установить значение по умолчанию |

---

## 📏 Нормализация

**Нормализация** — процесс организации данных для минимизации избыточности.

### 1NF — Первая нормальная форма

**Правило:** Каждая ячейка содержит только одно атомарное значение.

```
❌ Плохо (не 1NF):
┌─────────┬─────────────────────────┐
│ user_id │ phones                  │
├─────────┼─────────────────────────┤
│    1    │ 123-456, 789-012        │  ← Несколько значений!
└─────────┴─────────────────────────┘

✅ Хорошо (1NF):
┌─────────┬─────────────┐
│ user_id │ phone       │
├─────────┼─────────────┤
│    1    │ 123-456     │
│    1    │ 789-012     │
└─────────┴─────────────┘

Или отдельная таблица:
┌──────────┬─────────┬─────────────┐
│ phone_id │ user_id │ phone       │
├──────────┼─────────┼─────────────┤
│    1     │    1    │ 123-456     │
│    2     │    1    │ 789-012     │
└──────────┴─────────┴─────────────┘
```

### 2NF — Вторая нормальная форма

**Правило:** 1NF + все неключевые атрибуты зависят от всего первичного ключа.

```
❌ Плохо (не 2NF):
order_items (order_id, product_id, quantity, product_name)
                                              ↑
                         product_name зависит только от product_id,
                         а не от комбинации (order_id, product_id)

✅ Хорошо (2NF):
order_items: (order_id, product_id, quantity)
products:    (product_id, product_name)
```

### 3NF — Третья нормальная форма

**Правило:** 2NF + нет транзитивных зависимостей.

```
❌ Плохо (не 3NF):
orders (order_id, user_id, user_name, user_email)
                           ↑           ↑
          user_name и user_email зависят от user_id,
          а не напрямую от order_id

✅ Хорошо (3NF):
orders: (order_id, user_id, total)
users:  (user_id, user_name, user_email)
```

### Когда денормализовать?

Иногда **дублирование** данных оправдано:
- Для ускорения запросов (меньше JOIN)
- Для хранения исторических данных

```sql
-- Сохраняем цену на момент покупки
order_items (
    product_id,
    quantity,
    price_at_purchase  -- ← Цена могла измениться!
)
```

---

## 📊 Типы данных MySQL

### Числовые

| Тип | Размер | Диапазон |
|-----|--------|----------|
| `TINYINT` | 1 байт | -128 до 127 |
| `SMALLINT` | 2 байта | -32768 до 32767 |
| `INT` | 4 байта | ±2 млрд |
| `BIGINT` | 8 байт | Очень большой |
| `DECIMAL(M,D)` | Переменный | Точные числа (деньги!) |
| `FLOAT` | 4 байта | Приблизительные |
| `DOUBLE` | 8 байт | Приблизительные |

### Строковые

| Тип | Размер | Использование |
|-----|--------|---------------|
| `CHAR(N)` | Фиксированный N | Код страны, хеш |
| `VARCHAR(N)` | До N символов | Имена, email |
| `TEXT` | До 65 KB | Длинный текст |
| `MEDIUMTEXT` | До 16 MB | Статьи |
| `LONGTEXT` | До 4 GB | Большие документы |

### Дата и время

| Тип | Формат | Пример |
|-----|--------|--------|
| `DATE` | YYYY-MM-DD | 2024-01-15 |
| `TIME` | HH:MM:SS | 14:30:00 |
| `DATETIME` | YYYY-MM-DD HH:MM:SS | 2024-01-15 14:30:00 |
| `TIMESTAMP` | То же + авто-обновление | Для created_at |
| `YEAR` | YYYY | 2024 |

### Выбор типов для нашего магазина

```sql
CREATE TABLE products (
    product_id INT AUTO_INCREMENT,           -- ID
    product_name VARCHAR(255) NOT NULL,      -- Название (до 255 символов)
    product_price DECIMAL(10, 2) NOT NULL,   -- Цена (до 99999999.99)
    product_description TEXT,                 -- Описание (длинный текст)
    product_img VARCHAR(500),                -- URL изображения
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📋 SQL-схема интернет-магазина

```sql
-- Создание базы данных
CREATE DATABASE IF NOT EXISTS storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE storedb;

-- ==========================================
-- Таблица категорий
-- ==========================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- ==========================================
-- Таблица пользователей
-- ==========================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Таблица товаров
-- ==========================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_description TEXT,
    product_img VARCHAR(500),
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
);

-- ==========================================
-- Таблица заказов
-- ==========================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') 
        DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- ==========================================
-- Таблица позиций заказа (связующая)
-- ==========================================
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
        ON DELETE RESTRICT
);

-- ==========================================
-- Таблица корзины
-- ==========================================
CREATE TABLE shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
        ON DELETE CASCADE,
    
    UNIQUE KEY (user_id, product_id)  -- Один товар на пользователя
);
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **ER-диаграмма** | Диаграмма сущностей и связей |
| **Сущность** | Объект предметной области |
| **Атрибут** | Свойство сущности |
| **Связь 1:1** | Один к одному |
| **Связь 1:N** | Один ко многим |
| **Связь N:M** | Многие ко многим |
| **Нормализация** | Устранение избыточности данных |
| **1NF** | Атомарные значения |
| **2NF** | Зависимость от всего ключа |
| **3NF** | Нет транзитивных зависимостей |

---

## ➡️ Что дальше?

В следующем уроке мы изучим:
- Команды DDL: CREATE, ALTER, DROP
- Создание и изменение таблиц
- Ограничения (constraints)
- Индексы

---

**Курс:** Databases | **Урок:** 04-database-design-and-er-diagrams
