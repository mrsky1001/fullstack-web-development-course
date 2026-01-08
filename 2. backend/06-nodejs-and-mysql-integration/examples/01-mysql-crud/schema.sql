-- =============================================
-- СХЕМА БАЗЫ ДАННЫХ ДЛЯ УРОКА 06
-- =============================================
-- Запуск: mysql -u root -p < schema.sql
-- =============================================

-- Создаём базу данных
CREATE DATABASE IF NOT EXISTS storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE storedb;

-- =============================================
-- Таблица товаров
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_category VARCHAR(100),
    product_img VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- Тестовые данные
-- =============================================
INSERT INTO products (product_name, product_price, product_category) VALUES
    ('Intel Core i9-13900K', 55990.00, 'Процессоры'),
    ('AMD Ryzen 9 7950X', 62990.00, 'Процессоры'),
    ('Intel Core i5-13600K', 32990.00, 'Процессоры'),
    ('NVIDIA GeForce RTX 4090', 159990.00, 'Видеокарты'),
    ('NVIDIA GeForce RTX 4080', 109990.00, 'Видеокарты'),
    ('AMD Radeon RX 7900 XTX', 89990.00, 'Видеокарты'),
    ('ASUS ROG STRIX Z790-E', 42990.00, 'Материнские платы'),
    ('MSI MEG Z790 ACE', 52990.00, 'Материнские платы'),
    ('Corsair Vengeance DDR5 32GB', 12990.00, 'Оперативная память'),
    ('Kingston Fury DDR5 64GB', 24990.00, 'Оперативная память'),
    ('Samsung 990 PRO 2TB', 18990.00, 'SSD'),
    ('WD Black SN850X 1TB', 12490.00, 'SSD');

-- Проверка
SELECT COUNT(*) as total_products FROM products;
SELECT * FROM products LIMIT 5;
