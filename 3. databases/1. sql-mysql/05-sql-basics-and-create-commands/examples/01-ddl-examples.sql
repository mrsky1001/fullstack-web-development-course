-- ============================================
-- Урок 05: Примеры CREATE, ALTER, DROP
-- ============================================

-- ============================================
-- CREATE DATABASE
-- ============================================

-- Создание с кодировкой
CREATE DATABASE IF NOT EXISTS testdb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE testdb;

-- ============================================
-- CREATE TABLE - Примеры
-- ============================================

-- Простая таблица
CREATE TABLE simple_example (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица с разными типами данных
CREATE TABLE data_types_example (
    -- Числовые
    id INT AUTO_INCREMENT PRIMARY KEY,
    small_number TINYINT,
    big_number BIGINT,
    price DECIMAL(10, 2),
    rating FLOAT,
    
    -- Строковые
    code CHAR(5),
    title VARCHAR(255),
    description TEXT,
    
    -- Дата/время
    birth_date DATE,
    event_time TIME,
    created_at DATETIME,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Булевы и ENUM
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    
    -- JSON
    settings JSON
);

-- Таблица с ограничениями
CREATE TABLE constraints_example (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT CHECK (age >= 0 AND age <= 150),
    role VARCHAR(20) DEFAULT 'user',
    department_id INT,
    
    INDEX idx_role (role),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Таблица со составным первичным ключом
CREATE TABLE composite_key_example (
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, product_id)
);

-- ============================================
-- ALTER TABLE - Примеры
-- ============================================

-- Добавить столбец
ALTER TABLE simple_example 
ADD description TEXT AFTER name;

-- Добавить столбец первым
ALTER TABLE simple_example 
ADD order_num INT FIRST;

-- Изменить тип столбца
ALTER TABLE simple_example 
MODIFY name VARCHAR(200) NOT NULL;

-- Переименовать столбец
ALTER TABLE simple_example 
CHANGE description notes TEXT;

-- Удалить столбец
ALTER TABLE simple_example 
DROP COLUMN order_num;

-- Добавить индекс
ALTER TABLE simple_example 
ADD INDEX idx_name (name);

-- Добавить уникальный ключ
ALTER TABLE simple_example 
ADD UNIQUE KEY unique_name (name);

-- Удалить индекс
ALTER TABLE simple_example 
DROP INDEX idx_name;

-- Переименовать таблицу
ALTER TABLE simple_example 
RENAME TO examples;

-- ============================================
-- DROP - Примеры
-- ============================================

-- Удалить таблицу
DROP TABLE IF EXISTS examples;

-- Удалить несколько таблиц
DROP TABLE IF EXISTS table1, table2, table3;

-- Очистить таблицу (быстрее DELETE)
TRUNCATE TABLE data_types_example;

-- Удалить базу данных
DROP DATABASE IF EXISTS testdb;

-- ============================================
-- Полезные команды
-- ============================================

-- Показать структуру таблицы
DESCRIBE users;

-- Показать SQL создания таблицы
SHOW CREATE TABLE users;

-- Показать все индексы таблицы
SHOW INDEX FROM users;

-- Показать все таблицы
SHOW TABLES;

-- Показать все базы данных
SHOW DATABASES;
