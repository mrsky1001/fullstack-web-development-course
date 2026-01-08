# Практическое задание: SQL запросы

## 📋 Описание

В этом задании вы напишете SQL-запросы для базы данных магазина.

## 🎯 Подготовка

1. Убедитесь, что база данных `storedb` создана
2. Выполните скрипты из папки `examples/` для создания структуры и данных

## 📝 Задания

### Уровень 1: Базовые запросы

**1.1.** Получите список всех товаров с ценой больше 50000 ₽

```sql
-- Ваш запрос:

```

**1.2.** Найдите все товары категории "Видеокарты" (category_id = 2)

```sql
-- Ваш запрос:

```

**1.3.** Выведите 5 самых дорогих товаров

```sql
-- Ваш запрос:

```

**1.4.** Найдите товары, в названии которых есть "Intel" или "AMD"

```sql
-- Ваш запрос:

```

**1.5.** Получите товары с ценой от 20000 до 50000 ₽, отсортированные по цене

```sql
-- Ваш запрос:

```

### Уровень 2: JOIN

**2.1.** Выведите все товары с названиями их категорий

```sql
-- Ваш запрос:

```

**2.2.** Получите все заказы с именами и email пользователей

```sql
-- Ваш запрос:

```

**2.3.** Выведите детали заказа #1 (товары, количество, цены)

```sql
-- Ваш запрос:

```

**2.4.** Найдите пользователей, которые НЕ делали заказов

```sql
-- Ваш запрос:

```

**2.5.** Найдите товары, которые никто не заказывал

```sql
-- Ваш запрос:

```

### Уровень 3: GROUP BY и агрегатные функции

**3.1.** Подсчитайте количество товаров в каждой категории

```sql
-- Ваш запрос:

```

**3.2.** Найдите среднюю цену товаров по категориям

```sql
-- Ваш запрос:

```

**3.3.** Подсчитайте общую сумму всех заказов

```sql
-- Ваш запрос:

```

**3.4.** Найдите пользователя, потратившего больше всего денег

```sql
-- Ваш запрос:

```

**3.5.** Выведите количество заказов по каждому статусу

```sql
-- Ваш запрос:

```

### Уровень 4: Сложные запросы

**4.1.** Найдите топ-3 самых продаваемых товара (по количеству)

```sql
-- Ваш запрос:

```

**4.2.** Найдите категории, где средняя цена выше 40000 ₽

```sql
-- Ваш запрос:

```

**4.3.** Получите товары дороже средней цены по всем товарам

```sql
-- Ваш запрос:

```

**4.4.** Найдите пользователей с более чем 1 заказом

```sql
-- Ваш запрос:

```

**4.5.** Выведите полную информацию о корзине пользователя с ID = 2

```sql
-- Ваш запрос:

```

## ⏱ Время выполнения

~45-60 минут

## ✅ Ответы

<details>
<summary>Показать ответы (после выполнения!)</summary>

**1.1:**
```sql
SELECT * FROM products WHERE product_price > 50000;
```

**1.2:**
```sql
SELECT * FROM products WHERE category_id = 2;
```

**1.3:**
```sql
SELECT product_name, product_price 
FROM products 
ORDER BY product_price DESC 
LIMIT 5;
```

**1.4:**
```sql
SELECT * FROM products 
WHERE product_name LIKE '%Intel%' 
   OR product_name LIKE '%AMD%';
```

**1.5:**
```sql
SELECT * FROM products 
WHERE product_price BETWEEN 20000 AND 50000
ORDER BY product_price;
```

**2.1:**
```sql
SELECT p.product_name, p.product_price, c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id;
```

**2.2:**
```sql
SELECT o.order_id, o.total, o.status, u.user_name, u.user_email
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id;
```

**2.3:**
```sql
SELECT o.order_id, p.product_name, oi.quantity, oi.price_at_purchase
FROM orders o
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_id = 1;
```

**2.4:**
```sql
SELECT u.user_name, u.user_email
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;
```

**2.5:**
```sql
SELECT p.product_name, p.product_price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL;
```

**3.1:**
```sql
SELECT c.category_name, COUNT(p.product_id) AS count
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id;
```

**3.2:**
```sql
SELECT c.category_name, ROUND(AVG(p.product_price), 2) AS avg_price
FROM categories c
INNER JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
ORDER BY avg_price DESC;
```

**3.3:**
```sql
SELECT SUM(total) AS total_revenue FROM orders;
```

**3.4:**
```sql
SELECT u.user_name, SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
ORDER BY total_spent DESC
LIMIT 1;
```

**3.5:**
```sql
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;
```

**4.1:**
```sql
SELECT p.product_name, SUM(oi.quantity) AS sold
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id
ORDER BY sold DESC
LIMIT 3;
```

**4.2:**
```sql
SELECT c.category_name, AVG(p.product_price) AS avg_price
FROM categories c
INNER JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
HAVING avg_price > 40000;
```

**4.3:**
```sql
SELECT product_name, product_price
FROM products
WHERE product_price > (SELECT AVG(product_price) FROM products);
```

**4.4:**
```sql
SELECT u.user_name, COUNT(o.order_id) AS orders_count
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
HAVING orders_count > 1;
```

**4.5:**
```sql
SELECT 
    u.user_name,
    p.product_name,
    p.product_price,
    sc.quantity,
    (p.product_price * sc.quantity) AS subtotal
FROM shopping_cart sc
INNER JOIN users u ON sc.user_id = u.user_id
INNER JOIN products p ON sc.product_id = p.product_id
WHERE sc.user_id = 2;
```

</details>
