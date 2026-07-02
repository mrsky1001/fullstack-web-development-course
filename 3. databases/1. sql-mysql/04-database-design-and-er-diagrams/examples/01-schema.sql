-- ============================================
-- Урок 04: Полная схема базы данных магазина
-- ============================================
-- Этот скрипт создаёт все таблицы для интернет-магазина
-- Запуск: mysql -u root -p < schema.sql
-- ============================================

-- Удаляем БД если существует (для чистого старта)
DROP DATABASE IF EXISTS storedb;

-- Создаём базу данных с UTF-8
CREATE DATABASE storedb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE storedb;

-- ============================================
-- ТАБЛИЦА: Категории товаров
-- ============================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- ТАБЛИЦА: Пользователи
-- ============================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (user_email),
    INDEX idx_role (user_role)
) ENGINE=InnoDB;

-- ============================================
-- ТАБЛИЦА: Товары
-- ============================================
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) 
        REFERENCES categories(category_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE,
    
    INDEX idx_category (category_id),
    INDEX idx_price (product_price),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- ============================================
-- ТАБЛИЦА: Заказы
-- ============================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') 
           DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ============================================
-- ТАБЛИЦА: Элементы заказа (связующая)
-- ============================================
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE RESTRICT,
    
    UNIQUE KEY unique_order_product (order_id, product_id)
) ENGINE=InnoDB;

-- ============================================
-- ТАБЛИЦА: Корзина
-- ============================================
CREATE TABLE shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) 
        REFERENCES products(product_id) 
        ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_product (user_id, product_id)
) ENGINE=InnoDB;

-- ============================================
-- ПРОВЕРКА
-- ============================================
SHOW TABLES;

SELECT 'Схема базы данных успешно создана!' AS message;
