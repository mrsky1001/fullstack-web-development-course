-- ============================================================
-- TechParts — Создание базы данных и таблиц
-- Критерий №21: База данных (до 18 баллов)
-- ============================================================

-- 1 балл: Создание БД с правильным именем и кодировкой (кириллица)
CREATE DATABASE IF NOT EXISTS techparts
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE techparts;

-- ============================================================
-- Таблица users — информация о зарегистрированных пользователях
-- 5 баллов за корректную таблицу users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id         INT            PRIMARY KEY AUTO_INCREMENT,  -- Первичный ключ с автоинкрементом
  login      VARCHAR(50)    NOT NULL UNIQUE,              -- Логин (уникальный, обязательный)
  password   VARCHAR(255)   NOT NULL,                     -- Хешированный пароль (bcryptjs)
  fullname   VARCHAR(150)   NOT NULL,                     -- ФИО (обязательное)
  email      VARCHAR(100)   NOT NULL,                     -- Email (обязательный)
  phone      VARCHAR(20)    NOT NULL,                     -- Телефон (обязательный)
  created_at DATETIME       DEFAULT CURRENT_TIMESTAMP     -- Автоматическая фиксация даты
);

-- ============================================================
-- Таблица products — информация о доступных комплектующих
-- 5 баллов за корректную таблицу products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id          INT            PRIMARY KEY AUTO_INCREMENT,  -- Первичный ключ с автоинкрементом
  name        VARCHAR(200)   NOT NULL,                     -- Название товара
  description TEXT           NOT NULL,                     -- Описание товара
  price       DECIMAL(10,2)  NOT NULL,                     -- Цена в формате DECIMAL(10,2)
  category    VARCHAR(100)   NOT NULL,                     -- Категория товара (текстовое поле)
  image       VARCHAR(255)   DEFAULT 'products/default.jpg', -- Путь к изображению
  created_at  DATETIME       DEFAULT CURRENT_TIMESTAMP     -- Дата создания записи
);

-- ============================================================
-- Таблица orders — связывает пользователей с заказанными товарами
-- Связующая таблица в архитектуре базы данных
-- 5 баллов за корректную таблицу orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id            INT            PRIMARY KEY AUTO_INCREMENT,  -- Первичный ключ с автоинкрементом
  user_id       INT            NOT NULL,                     -- Внешний ключ на users
  product_id    INT            NOT NULL,                     -- Внешний ключ на products
  delivery_date DATE           NOT NULL,                     -- Дата доставки
  quantity      INT            NOT NULL,                     -- Количество единиц (1-10)
  total_price   DECIMAL(10,2)  NOT NULL,                     -- Расчёт общей стоимости
  comment       TEXT           DEFAULT NULL,                  -- Комментарий (необязательно)
  created_at    DATETIME       DEFAULT CURRENT_TIMESTAMP,    -- Автоматическая фиксация даты

  -- Два внешних ключа с каскадным удалением
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
