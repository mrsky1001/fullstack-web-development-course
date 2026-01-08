-- ============================================
-- Урок 07: Примеры JOIN, GROUP BY, агрегатных функций
-- ============================================

USE storedb;

-- ============================================
-- INNER JOIN - Только совпадающие записи
-- ============================================

-- Товары с названиями категорий
SELECT 
    p.product_name,
    p.product_price,
    c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
ORDER BY c.category_name, p.product_price DESC;

-- Заказы с информацией о пользователях
SELECT 
    o.order_id,
    o.total,
    o.status,
    o.created_at,
    u.user_name,
    u.user_email
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
ORDER BY o.created_at DESC;

-- Полная информация о заказе (3 таблицы)
SELECT 
    o.order_id,
    u.user_name,
    p.product_name,
    oi.quantity,
    oi.price_at_purchase,
    (oi.quantity * oi.price_at_purchase) AS item_total
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id, p.product_name;

-- ============================================
-- LEFT JOIN - Все из левой таблицы
-- ============================================

-- Все категории с количеством товаров (включая пустые)
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
ORDER BY product_count DESC;

-- Пользователи без заказов
SELECT 
    u.user_id,
    u.user_name,
    u.user_email
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;

-- Товары, которые никто не покупал
SELECT 
    p.product_id,
    p.product_name,
    p.product_price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL
ORDER BY p.product_price DESC;

-- ============================================
-- АГРЕГАТНЫЕ ФУНКЦИИ
-- ============================================

-- COUNT - количество
SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(DISTINCT category_id) AS categories_with_products FROM products;

-- SUM - сумма
SELECT SUM(total) AS total_revenue FROM orders WHERE status = 'delivered';

-- AVG - среднее
SELECT ROUND(AVG(product_price), 2) AS avg_price FROM products;

-- MAX / MIN
SELECT 
    MAX(product_price) AS max_price,
    MIN(product_price) AS min_price,
    MAX(product_price) - MIN(product_price) AS price_range
FROM products;

-- Комбинированная статистика
SELECT 
    COUNT(*) AS total_products,
    SUM(stock) AS total_stock,
    ROUND(AVG(product_price), 2) AS avg_price,
    MAX(product_price) AS max_price,
    MIN(product_price) AS min_price
FROM products
WHERE is_active = TRUE;

-- ============================================
-- GROUP BY - Группировка
-- ============================================

-- Количество товаров по категориям
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count,
    ROUND(AVG(p.product_price), 2) AS avg_price,
    MAX(p.product_price) AS max_price,
    MIN(p.product_price) AS min_price
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
ORDER BY product_count DESC;

-- Статистика заказов по пользователям
SELECT 
    u.user_name,
    COUNT(o.order_id) AS orders_count,
    ROUND(SUM(o.total), 2) AS total_spent,
    ROUND(AVG(o.total), 2) AS avg_order
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
ORDER BY total_spent DESC;

-- Заказы по статусам
SELECT 
    status,
    COUNT(*) AS count,
    SUM(total) AS total_amount,
    ROUND(AVG(total), 2) AS avg_amount
FROM orders
GROUP BY status
ORDER BY count DESC;

-- Продажи по месяцам
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(*) AS orders_count,
    SUM(total) AS revenue,
    ROUND(AVG(total), 2) AS avg_order
FROM orders
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- ============================================
-- HAVING - Фильтрация групп
-- ============================================

-- Категории с более чем 3 товарами
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM categories c
INNER JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
HAVING product_count > 3
ORDER BY product_count DESC;

-- VIP-клиенты (потратили > 100000)
SELECT 
    u.user_name,
    u.user_email,
    COUNT(o.order_id) AS orders_count,
    SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
HAVING total_spent > 100000
ORDER BY total_spent DESC;

-- Категории со средней ценой > 50000
SELECT 
    c.category_name,
    ROUND(AVG(p.product_price), 2) AS avg_price
FROM categories c
INNER JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
HAVING avg_price > 50000
ORDER BY avg_price DESC;

-- ============================================
-- ПОДЗАПРОСЫ
-- ============================================

-- Товары дороже среднего
SELECT product_name, product_price
FROM products
WHERE product_price > (
    SELECT AVG(product_price) FROM products
)
ORDER BY product_price;

-- Пользователи, сделавшие хотя бы один заказ
SELECT user_name, user_email
FROM users
WHERE user_id IN (
    SELECT DISTINCT user_id FROM orders
);

-- Самый дорогой товар в каждой категории
SELECT 
    p.product_name,
    p.product_price,
    c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
WHERE p.product_price = (
    SELECT MAX(p2.product_price)
    FROM products p2
    WHERE p2.category_id = p.category_id
)
ORDER BY p.product_price DESC;

-- ============================================
-- АНАЛИТИЧЕСКИЕ ЗАПРОСЫ
-- ============================================

-- Топ-5 продаваемых товаров
SELECT 
    p.product_name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price_at_purchase) AS revenue
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id
ORDER BY total_sold DESC
LIMIT 5;

-- Выручка по категориям
SELECT 
    c.category_name,
    COUNT(DISTINCT o.order_id) AS orders_count,
    SUM(oi.quantity) AS items_sold,
    SUM(oi.quantity * oi.price_at_purchase) AS revenue
FROM categories c
INNER JOIN products p ON c.category_id = p.category_id
INNER JOIN order_items oi ON p.product_id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.order_id
GROUP BY c.category_id
ORDER BY revenue DESC;

-- Товары дороже среднего в своей категории
SELECT 
    p.product_name,
    p.product_price,
    c.category_name,
    cat_avg.avg_price AS category_avg
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
INNER JOIN (
    SELECT category_id, ROUND(AVG(product_price), 2) AS avg_price
    FROM products
    GROUP BY category_id
) cat_avg ON p.category_id = cat_avg.category_id
WHERE p.product_price > cat_avg.avg_price
ORDER BY c.category_name, p.product_price DESC;

-- Полный отчёт о заказах
SELECT 
    o.order_id,
    o.status,
    DATE_FORMAT(o.created_at, '%d.%m.%Y %H:%i') AS order_date,
    u.user_name,
    GROUP_CONCAT(
        CONCAT(p.product_name, ' x', oi.quantity) 
        SEPARATOR ', '
    ) AS products,
    o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
GROUP BY o.order_id
ORDER BY o.created_at DESC;
