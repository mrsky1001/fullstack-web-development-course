# Урок 06: SQL — SELECT, INSERT, UPDATE, DELETE

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Добавлять данные с помощью **INSERT**
- Получать данные с помощью **SELECT**
- Обновлять данные с помощью **UPDATE**
- Удалять данные с помощью **DELETE**
- Использовать **WHERE**, **ORDER BY**, **LIMIT**

---

## 📚 Теоретическая часть

### DML — Data Manipulation Language

**DML** — команды для работы с данными.

| Команда | Операция CRUD | Назначение |
|---------|---------------|------------|
| `INSERT` | Create | Добавление записей |
| `SELECT` | Read | Чтение данных |
| `UPDATE` | Update | Обновление записей |
| `DELETE` | Delete | Удаление записей |

---

## ➕ INSERT — Добавление данных

### Синтаксис

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

### Добавление одной записи

```sql
-- Указываем все столбцы
INSERT INTO users (user_name, user_email, user_password)
VALUES ('Иван Петров', 'ivan@example.com', 'hashed_password');

-- Только обязательные поля
INSERT INTO categories (category_name)
VALUES ('Процессоры');
```

### Добавление нескольких записей

```sql
-- Несколько записей за один запрос (эффективнее!)
INSERT INTO categories (category_name) VALUES
    ('Процессоры'),
    ('Видеокарты'),
    ('Материнские платы'),
    ('Оперативная память'),
    ('SSD'),
    ('Блоки питания');

-- Пользователи
INSERT INTO users (user_name, user_email, user_password, user_role) VALUES
    ('Иван Петров', 'ivan@example.com', 'hash1', 'admin'),
    ('Мария Иванова', 'maria@example.com', 'hash2', 'user'),
    ('Пётр Сидоров', 'petr@example.com', 'hash3', 'user');
```

### Добавление товаров

```sql
INSERT INTO products (product_name, product_price, product_description, category_id) VALUES
    ('Intel Core i9-13900K', 55990.00, '24 ядра, 5.8 GHz', 1),
    ('AMD Ryzen 9 7950X', 62990.00, '16 ядер, 5.7 GHz', 1),
    ('Intel Core i5-13600K', 32990.00, '14 ядер, 5.1 GHz', 1),
    ('NVIDIA GeForce RTX 4090', 159990.00, '24 GB GDDR6X', 2),
    ('NVIDIA GeForce RTX 4080', 109990.00, '16 GB GDDR6X', 2),
    ('AMD Radeon RX 7900 XTX', 89990.00, '24 GB GDDR6', 2);
```

### INSERT с SELECT

```sql
-- Копирование данных из другой таблицы
INSERT INTO products_archive (product_name, product_price)
SELECT product_name, product_price
FROM products
WHERE is_active = FALSE;
```

### Получение ID добавленной записи

```sql
-- После INSERT
INSERT INTO users (user_name, user_email, user_password)
VALUES ('Новый пользователь', 'new@example.com', 'hash');

-- Получить ID
SELECT LAST_INSERT_ID();
```

---

## 🔍 SELECT — Получение данных

### Базовый синтаксис

```sql
SELECT columns
FROM table_name
WHERE conditions
ORDER BY column
LIMIT count;
```

### Получение всех данных

```sql
-- Все столбцы из таблицы
SELECT * FROM users;

-- Все столбцы из products
SELECT * FROM products;
```

### Выбор определённых столбцов

```sql
-- Только нужные столбцы
SELECT user_name, user_email FROM users;

-- С псевдонимами (AS)
SELECT 
    user_name AS name,
    user_email AS email
FROM users;

-- Псевдонимы для таблиц
SELECT u.user_name, u.user_email
FROM users u;
```

### Уникальные значения

```sql
-- DISTINCT — только уникальные
SELECT DISTINCT category_id FROM products;

SELECT DISTINCT user_role FROM users;
```

---

## 🎯 WHERE — Фильтрация

### Операторы сравнения

```sql
-- Равно
SELECT * FROM users WHERE user_role = 'admin';

-- Не равно
SELECT * FROM products WHERE category_id != 1;
SELECT * FROM products WHERE category_id <> 1;

-- Больше / Меньше
SELECT * FROM products WHERE product_price > 50000;
SELECT * FROM products WHERE product_price < 100000;
SELECT * FROM products WHERE product_price >= 50000;
SELECT * FROM products WHERE product_price <= 100000;
```

### Логические операторы

```sql
-- AND — оба условия
SELECT * FROM products 
WHERE product_price > 50000 AND category_id = 1;

-- OR — любое из условий
SELECT * FROM products 
WHERE category_id = 1 OR category_id = 2;

-- NOT — отрицание
SELECT * FROM products 
WHERE NOT category_id = 1;

-- Комбинация (используйте скобки!)
SELECT * FROM products 
WHERE (category_id = 1 OR category_id = 2) 
  AND product_price > 50000;
```

### BETWEEN — Диапазон

```sql
-- Цена от 30000 до 70000 (включительно)
SELECT * FROM products 
WHERE product_price BETWEEN 30000 AND 70000;

-- То же самое:
SELECT * FROM products 
WHERE product_price >= 30000 AND product_price <= 70000;

-- Дата
SELECT * FROM orders 
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
```

### IN — Список значений

```sql
-- Категории 1, 2 или 3
SELECT * FROM products 
WHERE category_id IN (1, 2, 3);

-- То же самое:
SELECT * FROM products 
WHERE category_id = 1 OR category_id = 2 OR category_id = 3;

-- NOT IN
SELECT * FROM products 
WHERE category_id NOT IN (1, 2);
```

### LIKE — Поиск по шаблону

```sql
-- % — любое количество символов
-- _ — один символ

-- Начинается с "Intel"
SELECT * FROM products 
WHERE product_name LIKE 'Intel%';

-- Содержит "RTX"
SELECT * FROM products 
WHERE product_name LIKE '%RTX%';

-- Заканчивается на "@gmail.com"
SELECT * FROM users 
WHERE user_email LIKE '%@gmail.com';

-- Второй символ — 'i'
SELECT * FROM products 
WHERE product_name LIKE '_i%';

-- Без учёта регистра (COLLATE)
SELECT * FROM products 
WHERE product_name LIKE '%intel%' COLLATE utf8mb4_general_ci;
```

### IS NULL / IS NOT NULL

```sql
-- Поиск NULL значений
SELECT * FROM products 
WHERE category_id IS NULL;

-- Не NULL
SELECT * FROM products 
WHERE category_id IS NOT NULL;

-- ⚠️ Неправильно:
-- SELECT * FROM products WHERE category_id = NULL;
```

---

## 📊 ORDER BY — Сортировка

```sql
-- По возрастанию (по умолчанию)
SELECT * FROM products 
ORDER BY product_price;

SELECT * FROM products 
ORDER BY product_price ASC;

-- По убыванию
SELECT * FROM products 
ORDER BY product_price DESC;

-- По нескольким полям
SELECT * FROM products 
ORDER BY category_id ASC, product_price DESC;

-- По индексу столбца (не рекомендуется)
SELECT product_name, product_price FROM products 
ORDER BY 2 DESC;  -- 2 = product_price

-- Сначала NULL или в конце
SELECT * FROM products 
ORDER BY category_id IS NULL, category_id;
```

---

## 📄 LIMIT — Ограничение результатов

```sql
-- Первые 10 записей
SELECT * FROM products 
LIMIT 10;

-- Пропустить 20, взять следующие 10 (пагинация)
SELECT * FROM products 
LIMIT 10 OFFSET 20;

-- Или краткая запись
SELECT * FROM products 
LIMIT 20, 10;  -- LIMIT offset, count

-- Страница 3 по 10 записей
-- Страница 1: LIMIT 0, 10
-- Страница 2: LIMIT 10, 10
-- Страница 3: LIMIT 20, 10
```

---

## 🔄 UPDATE — Обновление данных

### Синтаксис

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

### Обновление одной записи

```sql
-- По ID
UPDATE users 
SET user_name = 'Иван Иванов' 
WHERE user_id = 1;

-- Несколько полей
UPDATE products 
SET product_price = 49990.00, 
    product_description = 'Обновлённое описание'
WHERE product_id = 1;
```

### Обновление нескольких записей

```sql
-- Поднять цены на 10% для категории
UPDATE products 
SET product_price = product_price * 1.10 
WHERE category_id = 1;

-- Деактивировать товары с нулевым остатком
UPDATE products 
SET is_active = FALSE 
WHERE stock = 0;

-- Сбросить роль для всех пользователей
UPDATE users 
SET user_role = 'user' 
WHERE user_role != 'admin';
```

### ⚠️ ВАЖНО: Всегда используйте WHERE!

```sql
-- ⛔ ОПАСНО! Обновит ВСЕ записи!
UPDATE products SET product_price = 0;

-- ✅ Правильно
UPDATE products SET product_price = 0 WHERE product_id = 1;
```

### Безопасный режим

```sql
-- Включить безопасные обновления
SET SQL_SAFE_UPDATES = 1;

-- Теперь UPDATE/DELETE без WHERE или без использования ключа
-- вызовет ошибку
```

---

## ❌ DELETE — Удаление данных

### Синтаксис

```sql
DELETE FROM table_name
WHERE condition;
```

### Удаление записей

```sql
-- Удалить по ID
DELETE FROM users WHERE user_id = 3;

-- Удалить несколько
DELETE FROM products WHERE category_id = 5;

-- Удалить неактивные
DELETE FROM products WHERE is_active = FALSE;

-- Удалить старые заказы
DELETE FROM orders 
WHERE created_at < '2023-01-01';
```

### ⚠️ ВАЖНО: Всегда используйте WHERE!

```sql
-- ⛔ ОЧЕНЬ ОПАСНО! Удалит ВСЕ записи!
DELETE FROM users;

-- ✅ Правильно
DELETE FROM users WHERE user_id = 1;
```

### DELETE vs TRUNCATE

```sql
-- DELETE — медленнее, можно откатить, сохраняет AUTO_INCREMENT
DELETE FROM logs;

-- TRUNCATE — быстрее, нельзя откатить, сбрасывает AUTO_INCREMENT
TRUNCATE TABLE logs;
```

---

## 🧮 Выражения и функции

### Арифметические операции

```sql
-- Вычисления в SELECT
SELECT 
    product_name,
    product_price,
    product_price * 0.9 AS discounted_price,
    product_price * 1.2 AS with_markup
FROM products;

-- Вычисления в UPDATE
UPDATE products 
SET product_price = product_price * 0.95  -- Скидка 5%
WHERE category_id = 1;
```

### Строковые функции

```sql
SELECT 
    CONCAT(user_name, ' (', user_email, ')') AS user_info,
    UPPER(user_name) AS name_upper,
    LOWER(user_email) AS email_lower,
    LENGTH(user_name) AS name_length,
    SUBSTRING(user_email, 1, 5) AS email_start
FROM users;
```

### Функции даты

```sql
SELECT 
    order_id,
    created_at,
    DATE(created_at) AS order_date,
    TIME(created_at) AS order_time,
    YEAR(created_at) AS order_year,
    MONTH(created_at) AS order_month,
    DAY(created_at) AS order_day,
    DAYNAME(created_at) AS weekday,
    DATE_FORMAT(created_at, '%d.%m.%Y') AS formatted
FROM orders;

-- Текущая дата/время
SELECT NOW(), CURDATE(), CURTIME();

-- Разница дат
SELECT DATEDIFF(NOW(), created_at) AS days_ago
FROM orders;
```

### CASE — Условные выражения

```sql
SELECT 
    product_name,
    product_price,
    CASE 
        WHEN product_price > 100000 THEN 'Премиум'
        WHEN product_price > 50000 THEN 'Средний'
        ELSE 'Бюджетный'
    END AS price_category
FROM products;

-- В UPDATE
UPDATE orders
SET status = CASE 
    WHEN total > 100000 THEN 'vip'
    ELSE status 
END;
```

---

## 📋 Практические примеры

### Заполнение тестовыми данными

```sql
-- Используем созданную БД
USE storedb;

-- Добавляем категории
INSERT INTO categories (category_name) VALUES
    ('Процессоры'),
    ('Видеокарты'),
    ('Материнские платы'),
    ('Оперативная память'),
    ('SSD'),
    ('Блоки питания');

-- Добавляем пользователей
INSERT INTO users (user_name, user_email, user_password, user_role) VALUES
    ('Администратор', 'admin@store.com', '$2a$10$hash1', 'admin'),
    ('Иван Петров', 'ivan@example.com', '$2a$10$hash2', 'user'),
    ('Мария Иванова', 'maria@example.com', '$2a$10$hash3', 'user'),
    ('Пётр Сидоров', 'petr@example.com', '$2a$10$hash4', 'user');

-- Добавляем товары
INSERT INTO products (product_name, product_price, product_description, category_id, stock) VALUES
    ('Intel Core i9-13900K', 55990.00, '24 ядра, 32 потока, 5.8 GHz', 1, 15),
    ('AMD Ryzen 9 7950X', 62990.00, '16 ядер, 32 потока, 5.7 GHz', 1, 10),
    ('Intel Core i5-13600K', 32990.00, '14 ядер, 20 потоков, 5.1 GHz', 1, 25),
    ('NVIDIA GeForce RTX 4090', 159990.00, '24 GB GDDR6X, Ada Lovelace', 2, 5),
    ('NVIDIA GeForce RTX 4080', 109990.00, '16 GB GDDR6X, Ada Lovelace', 2, 8),
    ('AMD Radeon RX 7900 XTX', 89990.00, '24 GB GDDR6, RDNA 3', 2, 12),
    ('ASUS ROG STRIX Z790-E', 42990.00, 'LGA 1700, DDR5, WiFi 6E', 3, 7),
    ('MSI MEG Z790 ACE', 52990.00, 'LGA 1700, DDR5, Thunderbolt 4', 3, 4),
    ('Corsair Vengeance DDR5 32GB', 12990.00, '2x16GB, 5600MHz, CL36', 4, 30),
    ('Kingston Fury DDR5 64GB', 24990.00, '2x32GB, 5200MHz, CL40', 4, 15),
    ('Samsung 990 PRO 2TB', 18990.00, 'NVMe M.2, 7450 MB/s', 5, 20),
    ('WD Black SN850X 1TB', 12490.00, 'NVMe M.2, 7300 MB/s', 5, 25);

-- Добавляем заказы
INSERT INTO orders (user_id, total, status) VALUES
    (2, 155980.00, 'delivered'),
    (3, 89990.00, 'shipped'),
    (4, 45979.00, 'processing'),
    (2, 32990.00, 'pending');

-- Добавляем элементы заказов
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
    (1, 1, 1, 55990.00),
    (1, 7, 1, 42990.00),
    (1, 9, 2, 12990.00),
    (2, 6, 1, 89990.00),
    (3, 3, 1, 32990.00),
    (3, 9, 1, 12990.00),
    (4, 3, 1, 32990.00);
```

### Примеры запросов

```sql
-- 1. Все товары дороже 50000
SELECT product_name, product_price 
FROM products 
WHERE product_price > 50000
ORDER BY product_price DESC;

-- 2. Товары с поиском
SELECT * FROM products 
WHERE product_name LIKE '%Intel%' OR product_name LIKE '%NVIDIA%';

-- 3. Топ-5 дорогих товаров
SELECT product_name, product_price 
FROM products 
ORDER BY product_price DESC 
LIMIT 5;

-- 4. Пользователи без заказов (подзапрос)
SELECT user_name, user_email 
FROM users 
WHERE user_id NOT IN (SELECT DISTINCT user_id FROM orders);

-- 5. Изменить статус заказа
UPDATE orders 
SET status = 'shipped' 
WHERE order_id = 3;

-- 6. Применить скидку 10% на процессоры
UPDATE products 
SET product_price = product_price * 0.9 
WHERE category_id = 1;

-- 7. Удалить товары без категории
DELETE FROM products 
WHERE category_id IS NULL;
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **DML** | Data Manipulation Language |
| **CRUD** | Create, Read, Update, Delete |
| **INSERT** | Добавление данных |
| **SELECT** | Получение данных |
| **UPDATE** | Обновление данных |
| **DELETE** | Удаление данных |
| **WHERE** | Условие фильтрации |
| **ORDER BY** | Сортировка |
| **LIMIT** | Ограничение количества |
| **OFFSET** | Пропуск записей |

---

## ➡️ Что дальше?

В следующем уроке мы изучим:
- **JOIN** — объединение таблиц
- **GROUP BY** — группировка данных
- Агрегатные функции (COUNT, SUM, AVG, MAX, MIN)
- Подзапросы

---

**Курс:** Databases | **Урок:** 06-sql-select-insert-update-delete
