// ============================================================
// TechParts — Точка входа сервера (server.js)
// Критерий №1: Стек технологий — Node.js + Express (до 5 баллов)
// ============================================================

// --- Подключение зависимостей ---
const express = require('express');           // Фреймворк для сервера
const session = require('express-session');   // Сессии (express-session)
const cors = require('cors');                 // Разрешение кросс-доменных запросов
const path = require('path');                 // Работа с путями файлов

// --- Подключение роутов (MVC — Routes) ---
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// --- Создание приложения Express ---
const app = express();
const PORT = 3000;

// --- Middleware ---
// Парсинг JSON из тела запроса
app.use(express.json());

// CORS — разрешаем запросы с фронтенда
app.use(cors({
  origin: 'http://localhost:3000', // Адрес фронтенда
  credentials: true                // Разрешаем отправку cookies (сессии)
}));

// Настройка сессий (express-session)
// Сессия хранит user_id авторизованного пользователя
app.use(session({
  secret: 'techparts-secret-key-2024', // Секретный ключ для подписи cookie
  resave: false,                        // Не сохранять сессию без изменений
  saveUninitialized: false,             // Не создавать пустые сессии
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,        // Время жизни cookie — 24 часа
    httpOnly: true                       // Cookie недоступна из JavaScript
  }
}));

// --- Раздача статических файлов фронтенда ---
// Все HTML, CSS, JS и изображения из папки frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// --- Подключение роутов API ---
app.use('/api/auth', authRoutes);       // Роутер авторизации: /api/auth/*
app.use('/api/products', productRoutes); // Роутер товаров: /api/products/*
app.use('/api/orders', orderRoutes);     // Роутер заказов: /api/orders/*

// --- Запуск сервера ---
app.listen(PORT, () => {
  console.log(`Сервер TechParts запущен: http://localhost:${PORT}`);
});
