# Урок 07: JOIN, GROUP BY и агрегатные функции

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Объединять данные из нескольких таблиц с помощью **JOIN**
- Группировать данные с помощью **GROUP BY**
- Использовать **агрегатные функции** (COUNT, SUM, AVG, MAX, MIN)
- Фильтровать группы с помощью **HAVING**
- Писать **подзапросы**

---

## 📚 Теоретическая часть

### Зачем нужен JOIN?

В нормализованной базе данные разделены по таблицам. Чтобы получить связанные данные, нужно их объединить.

```
Таблица orders:           Таблица users:
┌──────────┬─────────┐    ┌─────────┬────────────┐
│ order_id │ user_id │    │ user_id │ user_name  │
├──────────┼─────────┤    ├─────────┼────────────┤
│    1     │    2    │    │    1    │ Админ      │
│    2     │    3    │    │    2    │ Иван       │
│    3     │    2    │    │    3    │ Мария      │
└──────────┴─────────┘    └─────────┴────────────┘

Как узнать имена пользователей в заказах?
→ Объединить таблицы по user_id!
```

---

## 🔗 Типы JOIN

```
┌───────────────────────────────────────────────────────────────────┐
│                         ТИПЫ JOIN                                 │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   INNER JOIN          LEFT JOIN           RIGHT JOIN              │
│    ┌───┬───┐           ┌───┬───┐           ┌───┬───┐             │
│    │   │███│           │███│███│           │███│   │             │
│    │ A │███│ B         │███│███│ B       A │███│███│             │
│    │   │███│           │███│███│           │███│   │             │
│    └───┴───┘           └───┴───┘           └───┴───┘             │
│   Только общее        A + общее          Общее + B              │
│                                                                   │
│                       FULL OUTER JOIN                             │
│                        ┌───┬───┐                                  │
│                        │███│███│                                  │
│                      A │███│███│ B                                │
│                        │███│███│                                  │
│                        └───┴───┘                                  │
│                       Всё из обеих                                │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔵 INNER JOIN

**INNER JOIN** — возвращает только строки с совпадениями в обеих таблицах.

```sql
-- Синтаксис
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;

-- Заказы с именами пользователей
SELECT 
    orders.order_id,
    orders.total,
    users.user_name,
    users.user_email
FROM orders
INNER JOIN users ON orders.user_id = users.user_id;

-- Результат:
-- +----------+----------+------------+-------------------+
-- | order_id | total    | user_name  | user_email        |
-- +----------+----------+------------+-------------------+
-- |    1     | 155980.00| Иван Петров| ivan@example.com  |
-- |    2     | 89990.00 | Мария      | maria@example.com |
-- |    3     | 45979.00 | Пётр       | petr@example.com  |
-- +----------+----------+------------+-------------------+
```

### С псевдонимами таблиц

```sql
-- Короче и читаемее
SELECT 
    o.order_id,
    o.total,
    o.status,
    u.user_name,
    u.user_email
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
ORDER BY o.created_at DESC;
```

### Множественные JOIN

```sql
-- Товары с категориями
SELECT 
    p.product_name,
    p.product_price,
    c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
ORDER BY c.category_name, p.product_name;

-- Заказы → элементы → товары
SELECT 
    o.order_id,
    o.status,
    p.product_name,
    oi.quantity,
    oi.price_at_purchase
FROM orders o
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id;
```

---

## ⬅️ LEFT JOIN

**LEFT JOIN** — все строки из левой таблицы + совпадения из правой.

```sql
-- Все товары, даже без категории
SELECT 
    p.product_name,
    p.product_price,
    c.category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.category_id;

-- Результат (если есть товар без категории):
-- +-----------------------+---------+---------------+
-- | product_name          | price   | category_name |
-- +-----------------------+---------+---------------+
-- | Intel Core i9         | 55990.00| Процессоры    |
-- | Товар без категории   | 1000.00 | NULL          | ← NULL!
-- +-----------------------+---------+---------------+
```

### Найти записи без связей

```sql
-- Пользователи БЕЗ заказов
SELECT 
    u.user_id,
    u.user_name,
    u.user_email
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;  -- ← Важно!

-- Товары, которые никто не заказывал
SELECT 
    p.product_id,
    p.product_name
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL;

-- Категории без товаров
SELECT 
    c.category_id,
    c.category_name
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
WHERE p.product_id IS NULL;
```

---

## ➡️ RIGHT JOIN

**RIGHT JOIN** — все строки из правой таблицы + совпадения из левой.

```sql
-- Все категории, даже без товаров
SELECT 
    c.category_name,
    p.product_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.category_id;

-- Результат:
-- +------------------+-----------------------+
-- | category_name    | product_name          |
-- +------------------+-----------------------+
-- | Процессоры       | Intel Core i9         |
-- | Блоки питания    | NULL                  | ← Нет товаров
-- +------------------+-----------------------+
```

**Совет:** LEFT JOIN используется чаще. RIGHT JOIN можно переписать как LEFT JOIN, поменяв таблицы местами.

---

## 🔄 CROSS JOIN

**CROSS JOIN** — декартово произведение (каждая строка с каждой).

```sql
-- Все комбинации размеров и цветов
SELECT 
    s.size_name,
    c.color_name
FROM sizes s
CROSS JOIN colors c;

-- Если sizes: S, M, L и colors: Red, Blue
-- Результат: 3 × 2 = 6 строк
```

---

## 🔁 Self JOIN

**Self JOIN** — объединение таблицы с самой собой.

```sql
-- Сотрудники и их менеджеры
SELECT 
    e.employee_name AS employee,
    m.employee_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- Товары дороже, чем другой товар
SELECT 
    p1.product_name AS expensive,
    p2.product_name AS cheaper,
    p1.product_price - p2.product_price AS difference
FROM products p1
CROSS JOIN products p2
WHERE p1.product_price > p2.product_price
ORDER BY difference DESC
LIMIT 5;
```

---

## 📊 Агрегатные функции

### Основные функции

| Функция | Описание | Пример |
|---------|----------|--------|
| `COUNT()` | Количество | Сколько заказов? |
| `SUM()` | Сумма | Общая сумма продаж |
| `AVG()` | Среднее | Средняя цена товара |
| `MAX()` | Максимум | Самый дорогой товар |
| `MIN()` | Минимум | Самый дешёвый товар |

### Примеры

```sql
-- COUNT — количество записей
SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(category_id) AS with_category FROM products;  -- Без NULL
SELECT COUNT(DISTINCT category_id) AS categories_used FROM products;

-- SUM — сумма
SELECT SUM(total) AS revenue FROM orders;
SELECT SUM(quantity) AS items_sold FROM order_items;

-- AVG — среднее
SELECT AVG(product_price) AS avg_price FROM products;
SELECT ROUND(AVG(product_price), 2) AS avg_price FROM products;

-- MAX / MIN
SELECT 
    MAX(product_price) AS max_price,
    MIN(product_price) AS min_price,
    MAX(product_price) - MIN(product_price) AS price_range
FROM products;
```

### Комбинация с JOIN

```sql
-- Общая сумма заказов каждого пользователя
SELECT 
    u.user_name,
    SUM(o.total) AS total_spent,
    COUNT(o.order_id) AS orders_count,
    AVG(o.total) AS avg_order
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id;
```

---

## 📦 GROUP BY — Группировка

**GROUP BY** — группирует строки для применения агрегатных функций.

### Базовый синтаксис

```sql
SELECT column, AGG_FUNCTION(column)
FROM table
GROUP BY column;
```

### Примеры

```sql
-- Количество товаров по категориям
SELECT 
    category_id,
    COUNT(*) AS product_count
FROM products
GROUP BY category_id;

-- С названием категории
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count,
    AVG(p.product_price) AS avg_price
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
ORDER BY product_count DESC;

-- Результат:
-- +------------------+---------------+-----------+
-- | category_name    | product_count | avg_price |
-- +------------------+---------------+-----------+
-- | Процессоры       | 3             | 50656.67  |
-- | Видеокарты       | 3             | 119990.00 |
-- | Материнские платы| 2             | 47990.00  |
-- +------------------+---------------+-----------+
```

### Группировка по нескольким полям

```sql
-- Продажи по годам и месяцам
SELECT 
    YEAR(created_at) AS year,
    MONTH(created_at) AS month,
    COUNT(*) AS orders_count,
    SUM(total) AS revenue
FROM orders
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY year DESC, month DESC;

-- Заказы по статусу и пользователю
SELECT 
    u.user_name,
    o.status,
    COUNT(*) AS count
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
GROUP BY u.user_id, o.status;
```

---

## 🎯 HAVING — Фильтрация групп

**HAVING** — фильтрует результаты после GROUP BY (WHERE — до).

```sql
-- Категории с более чем 2 товарами
SELECT 
    c.category_name,
    COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id
HAVING product_count > 2;  -- ← HAVING, не WHERE!

-- Пользователи с общей суммой заказов > 100000
SELECT 
    u.user_name,
    SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
HAVING total_spent > 100000
ORDER BY total_spent DESC;
```

### WHERE vs HAVING

```sql
-- WHERE — фильтрует СТРОКИ перед группировкой
-- HAVING — фильтрует ГРУППЫ после группировки

SELECT 
    c.category_name,
    COUNT(*) AS count,
    AVG(p.product_price) AS avg_price
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.product_price > 10000      -- Фильтр СТРОК
GROUP BY c.category_id
HAVING count > 1                    -- Фильтр ГРУПП
ORDER BY avg_price DESC;
```

---

## 🎭 Подзапросы (Subqueries)

### Подзапрос в WHERE

```sql
-- Товары дороже среднего
SELECT product_name, product_price
FROM products
WHERE product_price > (
    SELECT AVG(product_price) FROM products
);

-- Пользователи, сделавшие заказ
SELECT user_name, user_email
FROM users
WHERE user_id IN (
    SELECT DISTINCT user_id FROM orders
);

-- Заказы с максимальной суммой
SELECT *
FROM orders
WHERE total = (
    SELECT MAX(total) FROM orders
);
```

### Подзапрос в FROM

```sql
-- Статистика по категориям (как подтаблица)
SELECT 
    stats.category_name,
    stats.product_count,
    stats.avg_price
FROM (
    SELECT 
        c.category_name,
        COUNT(p.product_id) AS product_count,
        AVG(p.product_price) AS avg_price
    FROM categories c
    LEFT JOIN products p ON c.category_id = p.category_id
    GROUP BY c.category_id
) AS stats
WHERE stats.product_count > 0;
```

### Подзапрос в SELECT

```sql
-- Заказ с количеством позиций
SELECT 
    o.order_id,
    o.total,
    (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.order_id) AS items_count
FROM orders o;
```

### EXISTS

```sql
-- Пользователи с заказами
SELECT user_name
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.user_id
);

-- Пользователи БЕЗ заказов
SELECT user_name
FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.user_id
);
```

---

## 📋 Практические примеры

### Аналитические запросы для магазина

```sql
-- 1. Топ-5 самых продаваемых товаров
SELECT 
    p.product_name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price_at_purchase) AS revenue
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id
ORDER BY total_sold DESC
LIMIT 5;

-- 2. Продажи по категориям
SELECT 
    c.category_name,
    COUNT(DISTINCT o.order_id) AS orders_count,
    SUM(oi.quantity) AS items_sold,
    SUM(oi.quantity * oi.price_at_purchase) AS revenue
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.order_id
GROUP BY c.category_id
ORDER BY revenue DESC;

-- 3. Средний чек по месяцам
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(*) AS orders_count,
    ROUND(AVG(total), 2) AS avg_order,
    SUM(total) AS revenue
FROM orders
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- 4. VIP-клиенты (потратили больше 100000)
SELECT 
    u.user_id,
    u.user_name,
    u.user_email,
    COUNT(o.order_id) AS orders_count,
    SUM(o.total) AS total_spent,
    ROUND(AVG(o.total), 2) AS avg_order
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id
HAVING total_spent > 100000
ORDER BY total_spent DESC;

-- 5. Товары, которые ни разу не покупали
SELECT 
    p.product_id,
    p.product_name,
    p.product_price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL
ORDER BY p.product_price DESC;

-- 6. Полная информация о заказе
SELECT 
    o.order_id,
    o.status,
    o.created_at AS order_date,
    u.user_name,
    u.user_email,
    p.product_name,
    oi.quantity,
    oi.price_at_purchase,
    (oi.quantity * oi.price_at_purchase) AS item_total
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id, p.product_name;

-- 7. Статистика по статусам заказов
SELECT 
    status,
    COUNT(*) AS count,
    SUM(total) AS total_amount,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 1) AS percentage
FROM orders
GROUP BY status
ORDER BY count DESC;

-- 8. Товары дороже среднего в своей категории
SELECT 
    p.product_name,
    p.product_price,
    c.category_name,
    cat_avg.avg_price AS category_avg
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
INNER JOIN (
    SELECT category_id, AVG(product_price) AS avg_price
    FROM products
    GROUP BY category_id
) cat_avg ON p.category_id = cat_avg.category_id
WHERE p.product_price > cat_avg.avg_price
ORDER BY c.category_name, p.product_price DESC;
```

---

## 📊 Порядок выполнения SQL

```sql
-- Порядок написания:
SELECT ...
FROM ...
JOIN ...
WHERE ...
GROUP BY ...
HAVING ...
ORDER BY ...
LIMIT ...

-- Порядок выполнения:
1. FROM / JOIN    -- Откуда берём данные
2. WHERE          -- Фильтруем строки
3. GROUP BY       -- Группируем
4. HAVING         -- Фильтруем группы
5. SELECT         -- Выбираем столбцы
6. DISTINCT       -- Убираем дубли
7. ORDER BY       -- Сортируем
8. LIMIT          -- Ограничиваем
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **JOIN** | Объединение таблиц |
| **INNER JOIN** | Только совпадающие записи |
| **LEFT JOIN** | Все из левой + совпадения |
| **RIGHT JOIN** | Все из правой + совпадения |
| **GROUP BY** | Группировка строк |
| **HAVING** | Фильтрация групп |
| **Агрегатная функция** | COUNT, SUM, AVG, MAX, MIN |
| **Подзапрос** | Вложенный SELECT |

---

## 🎓 Заключение курса

Поздравляем! Вы прошли курс **Базы данных и SQL**!

### Чему вы научились:

✅ Понимать архитектуру реляционных БД  
✅ Проектировать базы данных  
✅ Устанавливать и настраивать MySQL  
✅ Создавать таблицы с правильными типами данных  
✅ Выполнять CRUD-операции  
✅ Объединять таблицы с помощью JOIN  
✅ Группировать и агрегировать данные  

### Следующие шаги:

1. **Практика** — создайте свою БД для проекта
2. **Индексы** — оптимизация производительности
3. **Транзакции** — ACID и управление
4. **ORM** — Sequelize, Prisma для Node.js
5. **NoSQL** — MongoDB, Redis

---

**Курс:** Databases | **Урок:** 07-sql-joins-grouping-and-aggregation
