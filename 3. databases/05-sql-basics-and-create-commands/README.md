# Урок 05: Основы SQL — CREATE, ALTER, DROP

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Создавать **базы данных** и **таблицы**
- Использовать различные **типы данных**
- Добавлять **ограничения** (constraints)
- Изменять структуру таблиц с помощью **ALTER**
- Удалять объекты с помощью **DROP**

---

## 📚 Теоретическая часть

### DDL — Data Definition Language

**DDL** — команды для определения структуры базы данных.

| Команда | Назначение |
|---------|------------|
| `CREATE` | Создание объектов |
| `ALTER` | Изменение структуры |
| `DROP` | Удаление объектов |
| `TRUNCATE` | Очистка таблицы |
| `RENAME` | Переименование |

---

## 🗄️ CREATE DATABASE

### Создание базы данных

```sql
-- Простое создание
CREATE DATABASE storedb;

-- С указанием кодировки (рекомендуется)
CREATE DATABASE storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Если не существует (не вызовет ошибку)
CREATE DATABASE IF NOT EXISTS storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

### Управление базами данных

```sql
-- Показать все БД
SHOW DATABASES;

-- Использовать БД
USE storedb;

-- Показать текущую БД
SELECT DATABASE();

-- Удалить БД (осторожно!)
DROP DATABASE storedb;

-- Удалить если существует
DROP DATABASE IF EXISTS storedb;
```

---

## 📋 CREATE TABLE

### Синтаксис

```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
    table_constraints
);
```

### Простой пример

```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Понимание каждой части

```sql
CREATE TABLE products (
    -- Столбец: имя, тип, ограничения
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    --          ↑          ↑              ↑
    --         тип    автоинкремент   первичный ключ
    
    product_name VARCHAR(255) NOT NULL,
    --                 ↑          ↑
    --           макс. длина   обязательное поле
    
    product_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    --                  ↑    ↑              ↑
    --           всего цифр  после запятой  значение по умолчанию
    
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --                           ↑
    --                    текущее время автоматически
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
               ON UPDATE CURRENT_TIMESTAMP
    --         ↑
    --    обновляется автоматически при изменении записи
);
```

---

## 🔢 Типы данных в MySQL

### Числовые типы

```sql
-- Целые числа
user_id INT                      -- -2 млрд до +2 млрд
user_id INT UNSIGNED             -- 0 до 4 млрд
views BIGINT                     -- Очень большие числа
status TINYINT                   -- -128 до 127 (или 0-255 UNSIGNED)
age SMALLINT                     -- -32768 до 32767

-- Дробные (для денег используйте DECIMAL!)
price DECIMAL(10, 2)             -- 12345678.99 (точное!)
rating FLOAT                     -- Приблизительное
```

### Строковые типы

```sql
-- Фиксированная длина
country_code CHAR(2)             -- Всегда 2 символа: 'RU', 'US'
hash CHAR(64)                    -- Хеш всегда одной длины

-- Переменная длина
user_name VARCHAR(100)           -- До 100 символов
email VARCHAR(255)               -- До 255 символов
url VARCHAR(2000)                -- URL могут быть длинными

-- Длинный текст
description TEXT                 -- До 65 KB
article MEDIUMTEXT               -- До 16 MB
book LONGTEXT                    -- До 4 GB
```

### Дата и время

```sql
birth_date DATE                  -- 2000-05-15
start_time TIME                  -- 14:30:00
created_at DATETIME              -- 2024-01-15 14:30:00
updated_at TIMESTAMP             -- + автообновление
birth_year YEAR                  -- 2000
```

### Другие типы

```sql
-- Перечисление
status ENUM('pending', 'active', 'closed')
role ENUM('user', 'admin', 'moderator')

-- Множество
tags SET('tech', 'science', 'art')

-- Булевы (в MySQL — TINYINT(1))
is_active BOOLEAN DEFAULT TRUE

-- JSON
settings JSON
```

---

## ⚠️ Ограничения (Constraints)

### NOT NULL

```sql
-- Значение обязательно (не может быть NULL)
user_email VARCHAR(255) NOT NULL
```

### UNIQUE

```sql
-- Значение должно быть уникальным
user_email VARCHAR(255) UNIQUE

-- Составной уникальный ключ
CREATE TABLE likes (
    user_id INT,
    post_id INT,
    UNIQUE KEY (user_id, post_id)  -- Один лайк на пост
);
```

### PRIMARY KEY

```sql
-- Первичный ключ = UNIQUE + NOT NULL
user_id INT PRIMARY KEY AUTO_INCREMENT

-- Или отдельно
PRIMARY KEY (user_id)

-- Составной первичный ключ
PRIMARY KEY (order_id, product_id)
```

### FOREIGN KEY

```sql
-- Внешний ключ (ссылка на другую таблицу)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### DEFAULT

```sql
-- Значение по умолчанию
status VARCHAR(20) DEFAULT 'pending'
is_active BOOLEAN DEFAULT TRUE
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
quantity INT DEFAULT 1
```

### CHECK (MySQL 8.0+)

```sql
-- Проверка значения
age INT CHECK (age >= 0 AND age <= 150)
price DECIMAL(10,2) CHECK (price > 0)
```

### AUTO_INCREMENT

```sql
-- Автоматическое увеличение (только для PK)
user_id INT AUTO_INCREMENT PRIMARY KEY
```

---

## 🏗️ Полные примеры CREATE TABLE

### Таблица пользователей

```sql
CREATE TABLE users (
    -- Первичный ключ с автоинкрементом
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Имя (опционально, до 100 символов)
    user_name VARCHAR(100),
    
    -- Email (обязательный и уникальный)
    user_email VARCHAR(255) NOT NULL UNIQUE,
    
    -- Пароль (хеш, обязательный)
    user_password VARCHAR(255) NOT NULL,
    
    -- Роль (enum с дефолтом)
    user_role ENUM('user', 'admin') DEFAULT 'user',
    
    -- Дата регистрации
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Дата обновления (автообновление)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
               ON UPDATE CURRENT_TIMESTAMP
);
```

### Таблица товаров

```sql
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    
    product_name VARCHAR(255) NOT NULL,
    
    -- Цена (DECIMAL для денег!)
    product_price DECIMAL(10, 2) NOT NULL,
    
    -- Описание (длинный текст)
    product_description TEXT,
    
    -- URL изображения
    product_img VARCHAR(500),
    
    -- Внешний ключ на категорию
    category_id INT,
    
    -- Количество на складе
    stock INT DEFAULT 0,
    
    -- Активен ли товар
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Внешний ключ
    FOREIGN KEY (category_id) 
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);
```

### Таблица заказов с элементами

```sql
-- Заказы
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') 
           DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Индекс для быстрого поиска по пользователю
    INDEX idx_user_id (user_id)
);

-- Элементы заказа (связующая таблица N:M)
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    
    -- Уникальность: один товар в заказе один раз
    UNIQUE KEY (order_id, product_id)
);
```

---

## ✏️ ALTER TABLE

### Добавление столбца

```sql
-- Добавить столбец в конец
ALTER TABLE users ADD phone VARCHAR(20);

-- Добавить после определённого столбца
ALTER TABLE users ADD phone VARCHAR(20) AFTER user_email;

-- Добавить первым
ALTER TABLE users ADD is_verified BOOLEAN DEFAULT FALSE FIRST;
```

### Изменение столбца

```sql
-- Изменить тип данных
ALTER TABLE products MODIFY product_price DECIMAL(12, 2);

-- Изменить имя и тип
ALTER TABLE products CHANGE product_img product_image VARCHAR(1000);

-- Изменить значение по умолчанию
ALTER TABLE users ALTER user_role SET DEFAULT 'admin';
```

### Удаление столбца

```sql
ALTER TABLE users DROP COLUMN phone;
```

### Работа с ключами

```sql
-- Добавить первичный ключ
ALTER TABLE table_name ADD PRIMARY KEY (column_name);

-- Удалить первичный ключ
ALTER TABLE table_name DROP PRIMARY KEY;

-- Добавить внешний ключ
ALTER TABLE orders 
    ADD CONSTRAINT fk_user 
    FOREIGN KEY (user_id) REFERENCES users(user_id);

-- Удалить внешний ключ
ALTER TABLE orders DROP FOREIGN KEY fk_user;

-- Добавить уникальный ключ
ALTER TABLE users ADD UNIQUE KEY (user_email);

-- Добавить индекс
ALTER TABLE products ADD INDEX idx_category (category_id);
```

### Переименование таблицы

```sql
ALTER TABLE users RENAME TO customers;

-- Или
RENAME TABLE users TO customers;
```

---

## 🗑️ DROP и TRUNCATE

### DROP TABLE

```sql
-- Удалить таблицу (осторожно!)
DROP TABLE products;

-- Удалить если существует
DROP TABLE IF EXISTS products;

-- Удалить несколько таблиц
DROP TABLE IF EXISTS order_items, orders, products;
```

### TRUNCATE TABLE

```sql
-- Очистить таблицу (быстрее DELETE)
TRUNCATE TABLE logs;
```

| Команда | Что делает | Auto_increment | Можно откатить? |
|---------|-----------|----------------|-----------------|
| `DELETE FROM` | Удаляет записи | Сохраняется | Да |
| `TRUNCATE` | Очищает таблицу | Сбрасывается | Нет |
| `DROP` | Удаляет таблицу | — | Нет |

---

## 📚 Полезные команды

### Информация о таблице

```sql
-- Структура таблицы
DESCRIBE users;
DESC users;

-- Подробная информация
SHOW FULL COLUMNS FROM users;

-- SQL создания таблицы
SHOW CREATE TABLE users;

-- Все таблицы в БД
SHOW TABLES;

-- Информация о таблице
SHOW TABLE STATUS LIKE 'users';
```

### Пример вывода DESCRIBE

```
mysql> DESCRIBE users;
+---------------+--------------+------+-----+-------------------+-------------------+
| Field         | Type         | Null | Key | Default           | Extra             |
+---------------+--------------+------+-----+-------------------+-------------------+
| user_id       | int          | NO   | PRI | NULL              | auto_increment    |
| user_name     | varchar(100) | YES  |     | NULL              |                   |
| user_email    | varchar(255) | NO   | UNI | NULL              |                   |
| user_password | varchar(255) | NO   |     | NULL              |                   |
| user_role     | enum(...)    | YES  |     | user              |                   |
| created_at    | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+--------------+------+-----+-------------------+-------------------+
```

---

## 📋 Практика: Создание схемы магазина

```sql
-- ==========================================
-- СОЗДАНИЕ БАЗЫ ДАННЫХ
-- ==========================================
DROP DATABASE IF EXISTS storedb;

CREATE DATABASE storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE storedb;

-- ==========================================
-- КАТЕГОРИИ
-- ==========================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ПОЛЬЗОВАТЕЛИ
-- ==========================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- ТОВАРЫ
-- ==========================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_description TEXT,
    product_img VARCHAR(500),
    category_id INT,
    stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_price (product_price)
);

-- ==========================================
-- ЗАКАЗЫ
-- ==========================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- ==========================================
-- ЭЛЕМЕНТЫ ЗАКАЗА
-- ==========================================
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    UNIQUE KEY unique_order_product (order_id, product_id)
);

-- ==========================================
-- КОРЗИНА
-- ==========================================
CREATE TABLE shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- ==========================================
-- ПРОВЕРКА
-- ==========================================
SHOW TABLES;
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **DDL** | Data Definition Language |
| **CREATE** | Создание объектов |
| **ALTER** | Изменение структуры |
| **DROP** | Удаление объектов |
| **TRUNCATE** | Очистка таблицы |
| **Constraint** | Ограничение на данные |
| **AUTO_INCREMENT** | Автоматическое увеличение ID |
| **INDEX** | Индекс для ускорения поиска |

---

## ➡️ Что дальше?

В следующем уроке мы изучим DML:
- INSERT — добавление данных
- SELECT — получение данных
- UPDATE — обновление
- DELETE — удаление

---

**Курс:** Databases | **Урок:** 05-sql-basics-and-create-commands
