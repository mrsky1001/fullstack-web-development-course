-- ============================================
-- Урок 06: Примеры SELECT, INSERT, UPDATE, DELETE
-- ============================================

USE storedb;

-- ============================================
-- SELECT - Получение данных
-- ============================================

-- Все столбцы
SELECT * FROM products;

-- Определённые столбцы
SELECT product_name, product_price FROM products;

-- С псевдонимами
SELECT 
    product_name AS 'Название',
    product_price AS 'Цена'
FROM products;

-- DISTINCT - уникальные значения
SELECT DISTINCT category_id FROM products;

-- ============================================
-- WHERE - Фильтрация
-- ============================================

-- Сравнение
SELECT * FROM products WHERE product_price > 50000;
SELECT * FROM products WHERE category_id = 1;
SELECT * FROM products WHERE is_active = TRUE;

-- AND / OR
SELECT * FROM products 
WHERE product_price > 30000 AND category_id = 1;

SELECT * FROM products 
WHERE category_id = 1 OR category_id = 2;

-- BETWEEN
SELECT * FROM products 
WHERE product_price BETWEEN 30000 AND 60000;

-- IN
SELECT * FROM products 
WHERE category_id IN (1, 2, 3);

-- LIKE
SELECT * FROM products WHERE product_name LIKE 'Intel%';
SELECT * FROM products WHERE product_name LIKE '%RTX%';
SELECT * FROM products WHERE product_name LIKE '%DDR5%';

-- IS NULL / IS NOT NULL
SELECT * FROM products WHERE product_description IS NOT NULL;

-- ============================================
-- ORDER BY - Сортировка
-- ============================================

-- По возрастанию (по умолчанию)
SELECT product_name, product_price 
FROM products 
ORDER BY product_price;

-- По убыванию
SELECT product_name, product_price 
FROM products 
ORDER BY product_price DESC;

-- По нескольким полям
SELECT product_name, product_price, category_id 
FROM products 
ORDER BY category_id ASC, product_price DESC;

-- ============================================
-- LIMIT - Ограничение
-- ============================================

-- Первые 5 записей
SELECT * FROM products LIMIT 5;

-- Пропустить 10, взять 5 (пагинация)
SELECT * FROM products LIMIT 5 OFFSET 10;
-- Или: LIMIT 10, 5

-- Топ-3 дорогих товара
SELECT product_name, product_price 
FROM products 
ORDER BY product_price DESC 
LIMIT 3;

-- ============================================
-- INSERT - Добавление
-- ============================================

-- Одна запись
INSERT INTO categories (category_name) 
VALUES ('Мониторы');

-- Несколько записей
INSERT INTO categories (category_name, category_description) VALUES
    ('Клавиатуры', 'Механические и мембранные'),
    ('Мыши', 'Игровые и офисные');

-- Получить ID последней записи
SELECT LAST_INSERT_ID();

-- ============================================
-- UPDATE - Обновление
-- ============================================

-- Одно поле
UPDATE products 
SET product_price = 52990.00 
WHERE product_id = 1;

-- Несколько полей
UPDATE products 
SET product_price = 49990.00,
    product_description = 'Обновлённое описание'
WHERE product_id = 1;

-- Массовое обновление (скидка 10%)
UPDATE products 
SET product_price = product_price * 0.9 
WHERE category_id = 1;

-- ⚠️ Всегда используйте WHERE!
-- UPDATE products SET product_price = 0; -- ОПАСНО!

-- ============================================
-- DELETE - Удаление
-- ============================================

-- Удалить по ID
DELETE FROM shopping_cart WHERE cart_id = 1;

-- Удалить по условию
DELETE FROM products WHERE is_active = FALSE;

-- ⚠️ Всегда используйте WHERE!
-- DELETE FROM products; -- ОПАСНО!

-- ============================================
-- ПРАКТИЧЕСКИЕ ЗАПРОСЫ
-- ============================================

-- 1. Товары определённой категории с сортировкой по цене
SELECT 
    p.product_name,
    p.product_price,
    c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
WHERE c.category_name = 'Процессоры'
ORDER BY p.product_price DESC;

-- 2. Поиск товаров
SELECT product_name, product_price
FROM products
WHERE product_name LIKE '%NVIDIA%' 
   OR product_name LIKE '%AMD%'
ORDER BY product_price DESC;

-- 3. Товары в наличии до 50000
SELECT product_name, product_price, stock
FROM products
WHERE stock > 0 AND product_price < 50000
ORDER BY product_price;

-- 4. Статистика
SELECT 
    COUNT(*) AS total_products,
    MIN(product_price) AS min_price,
    MAX(product_price) AS max_price,
    ROUND(AVG(product_price), 2) AS avg_price
FROM products;
