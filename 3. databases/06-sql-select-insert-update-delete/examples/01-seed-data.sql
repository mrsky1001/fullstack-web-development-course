-- ============================================
-- Урок 06: Тестовые данные для магазина
-- ============================================
-- Запускать ПОСЛЕ создания схемы (schema.sql)
-- ============================================

USE storedb;

-- ============================================
-- КАТЕГОРИИ
-- ============================================
INSERT INTO categories (category_name, category_description) VALUES
    ('Процессоры', 'Центральные процессоры для компьютеров'),
    ('Видеокарты', 'Графические ускорители'),
    ('Материнские платы', 'Основа для сборки ПК'),
    ('Оперативная память', 'Модули RAM DDR4/DDR5'),
    ('SSD', 'Твердотельные накопители'),
    ('Блоки питания', 'Источники питания для ПК'),
    ('Корпуса', 'Корпуса для сборки ПК'),
    ('Охлаждение', 'Системы охлаждения');

-- ============================================
-- ПОЛЬЗОВАТЕЛИ
-- ============================================
-- Пароли хешированы bcrypt (demo123 для всех)
INSERT INTO users (user_name, user_email, user_password, user_role) VALUES
    ('Администратор', 'admin@techparts.store', '$2a$10$xJwL5v2Km4Vz6O8wQq0E1OvQhHFy8E3o1ZPnX2Vq1xY1A1B1C1D1E', 'admin'),
    ('Иван Петров', 'ivan.petrov@example.com', '$2a$10$xJwL5v2Km4Vz6O8wQq0E1OvQhHFy8E3o1ZPnX2Vq1xY1A1B1C1D1E', 'user'),
    ('Мария Иванова', 'maria.ivanova@example.com', '$2a$10$xJwL5v2Km4Vz6O8wQq0E1OvQhHFy8E3o1ZPnX2Vq1xY1A1B1C1D1E', 'user'),
    ('Пётр Сидоров', 'petr.sidorov@example.com', '$2a$10$xJwL5v2Km4Vz6O8wQq0E1OvQhHFy8E3o1ZPnX2Vq1xY1A1B1C1D1E', 'user'),
    ('Анна Козлова', 'anna.kozlova@example.com', '$2a$10$xJwL5v2Km4Vz6O8wQq0E1OvQhHFy8E3o1ZPnX2Vq1xY1A1B1C1D1E', 'user');

-- ============================================
-- ТОВАРЫ
-- ============================================
INSERT INTO products (product_name, product_price, product_description, category_id, stock) VALUES
    -- Процессоры (category_id = 1)
    ('Intel Core i9-13900K', 55990.00, '24 ядра (8P+16E), 32 потока, до 5.8 GHz, 125W TDP', 1, 15),
    ('AMD Ryzen 9 7950X', 62990.00, '16 ядер, 32 потока, до 5.7 GHz, 170W TDP', 1, 10),
    ('Intel Core i7-13700K', 42990.00, '16 ядер (8P+8E), 24 потока, до 5.4 GHz', 1, 20),
    ('AMD Ryzen 7 7800X3D', 44990.00, '8 ядер, 16 потоков, 3D V-Cache, игровой', 1, 8),
    ('Intel Core i5-13600K', 32990.00, '14 ядер (6P+8E), 20 потоков, до 5.1 GHz', 1, 25),
    ('AMD Ryzen 5 7600X', 26990.00, '6 ядер, 12 потоков, до 5.3 GHz', 1, 30),
    
    -- Видеокарты (category_id = 2)
    ('NVIDIA GeForce RTX 4090', 159990.00, '24 GB GDDR6X, Ada Lovelace, 16384 CUDA', 2, 5),
    ('NVIDIA GeForce RTX 4080 SUPER', 119990.00, '16 GB GDDR6X, Ada Lovelace', 2, 8),
    ('NVIDIA GeForce RTX 4070 Ti SUPER', 89990.00, '16 GB GDDR6X, Ada Lovelace', 2, 12),
    ('AMD Radeon RX 7900 XTX', 99990.00, '24 GB GDDR6, RDNA 3', 2, 7),
    ('AMD Radeon RX 7900 XT', 79990.00, '20 GB GDDR6, RDNA 3', 2, 10),
    ('NVIDIA GeForce RTX 4060 Ti', 44990.00, '8 GB GDDR6, Ada Lovelace', 2, 20),
    
    -- Материнские платы (category_id = 3)
    ('ASUS ROG STRIX Z790-E GAMING', 52990.00, 'LGA 1700, DDR5, WiFi 6E, PCIe 5.0', 3, 7),
    ('MSI MEG Z790 ACE', 62990.00, 'LGA 1700, DDR5, Thunderbolt 4', 3, 4),
    ('Gigabyte X670E AORUS MASTER', 54990.00, 'AM5, DDR5, WiFi 6E', 3, 6),
    ('ASUS ROG STRIX B650E-F', 32990.00, 'AM5, DDR5, WiFi 6', 3, 12),
    
    -- Оперативная память (category_id = 4)
    ('Corsair Vengeance DDR5 32GB', 12990.00, '2x16GB, 5600MHz, CL36, XMP 3.0', 4, 30),
    ('Kingston Fury Beast DDR5 64GB', 24990.00, '2x32GB, 5200MHz, CL40', 4, 15),
    ('G.Skill Trident Z5 RGB 32GB', 15990.00, '2x16GB, 6000MHz, CL30', 4, 20),
    ('Corsair Dominator Platinum DDR5 32GB', 18990.00, '2x16GB, 6200MHz, RGB', 4, 10),
    
    -- SSD (category_id = 5)
    ('Samsung 990 PRO 2TB', 18990.00, 'NVMe M.2, до 7450 MB/s, TLC', 5, 25),
    ('WD Black SN850X 1TB', 12490.00, 'NVMe M.2, до 7300 MB/s', 5, 30),
    ('Kingston KC3000 2TB', 16990.00, 'NVMe M.2, до 7000 MB/s', 5, 18),
    ('Crucial T700 2TB', 29990.00, 'NVMe M.2 PCIe 5.0, до 12400 MB/s', 5, 8),
    
    -- Блоки питания (category_id = 6)
    ('Seasonic PRIME TX-1000', 24990.00, '1000W, 80+ Titanium, полностью модульный', 6, 10),
    ('Corsair RM1000x', 16990.00, '1000W, 80+ Gold, полностью модульный', 6, 15),
    ('be quiet! Dark Power 13 850W', 19990.00, '850W, 80+ Titanium', 6, 12),
    ('ASUS ROG THOR 1200W', 32990.00, '1200W, 80+ Platinum, OLED дисплей', 6, 5);

-- ============================================
-- ЗАКАЗЫ
-- ============================================
INSERT INTO orders (user_id, total, status, shipping_address) VALUES
    (2, 155980.00, 'delivered', 'г. Москва, ул. Пушкина, д. 10, кв. 5'),
    (3, 89990.00, 'shipped', 'г. Санкт-Петербург, пр. Невский, д. 100'),
    (4, 77980.00, 'processing', 'г. Казань, ул. Баумана, д. 25'),
    (2, 44990.00, 'pending', 'г. Москва, ул. Пушкина, д. 10, кв. 5'),
    (5, 162980.00, 'delivered', 'г. Новосибирск, ул. Ленина, д. 50');

-- ============================================
-- ЭЛЕМЕНТЫ ЗАКАЗОВ
-- ============================================
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
    -- Заказ 1: Intel i9 + ASUS ROG Z790 + RAM
    (1, 1, 1, 55990.00),
    (1, 13, 1, 52990.00),
    (1, 17, 2, 12990.00),
    
    -- Заказ 2: AMD RX 7900 XTX
    (2, 10, 1, 99990.00),
    
    -- Заказ 3: Intel i5 + RAM + SSD
    (3, 5, 1, 32990.00),
    (3, 17, 1, 12990.00),
    (3, 22, 1, 12490.00),
    
    -- Заказ 4: RTX 4060 Ti
    (4, 12, 1, 44990.00),
    
    -- Заказ 5: RTX 4090 + PSU
    (5, 7, 1, 159990.00),
    (5, 28, 1, 32990.00);

-- ============================================
-- КОРЗИНА (тестовые данные)
-- ============================================
INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES
    (2, 8, 1),   -- Иван: RTX 4080
    (2, 21, 1),  -- Иван: Samsung 990 PRO
    (3, 2, 1),   -- Мария: Ryzen 9
    (4, 19, 2);  -- Пётр: 2x RAM G.Skill

-- ============================================
-- ПРОВЕРКА
-- ============================================
SELECT 'Категории:' AS info, COUNT(*) AS count FROM categories
UNION ALL
SELECT 'Пользователи:', COUNT(*) FROM users
UNION ALL
SELECT 'Товары:', COUNT(*) FROM products
UNION ALL
SELECT 'Заказы:', COUNT(*) FROM orders
UNION ALL
SELECT 'Элементов заказов:', COUNT(*) FROM order_items
UNION ALL
SELECT 'В корзине:', COUNT(*) FROM shopping_cart;

SELECT 'Тестовые данные успешно добавлены!' AS message;
