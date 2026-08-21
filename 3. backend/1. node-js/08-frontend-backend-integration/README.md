# Урок 08: Интеграция Frontend и Backend

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Настроить **CORS** для кросс-доменных запросов
- Отправлять **аутентифицированные запросы** с frontend
- Работать с **cookies** в fetch API
- Понимать и защищаться от **CSRF-атак**
- Структурировать **API-клиент** на frontend

---

## 📚 Теоретическая часть

### Проблема: Same-Origin Policy

Браузеры запрещают JavaScript делать запросы на другие домены (порты).

```
Frontend:  http://localhost:8000  ┐
                                  ├── Разные порты = разные "origins"
Backend:   http://localhost:3000  ┘

❌ Запрос заблокирован браузером!
```

### Решение: CORS

**CORS** (Cross-Origin Resource Sharing) — механизм, позволяющий серверу сказать браузеру: "Я разрешаю запросы с этого origin".

```
Frontend                          Backend
   │                                 │
   │  1. Preflight запрос (OPTIONS)  │
   │ ───────────────────────────────▶│
   │                                 │
   │  2. CORS заголовки              │
   │     Access-Control-Allow-Origin │
   │ ◀─────────────────────────────  │
   │                                 │
   │  3. Основной запрос (GET/POST)  │
   │ ───────────────────────────────▶│
   │                                 │
   │  4. Данные                      │
   │ ◀───────────────────────────────│
```

---

## 🔧 Настройка CORS на Backend

### Установка библиотеки cors

```bash
npm install cors
```

### Базовая настройка (разрешить всё)

```javascript
// app.js
const cors = require('cors');

// Разрешить ВСЕ запросы с любых доменов
app.use(cors());
```

### Настройка для production

```javascript
// app.js
const cors = require('cors');

// Более безопасная настройка
const corsOptions = {
    // Разрешённые origins
    origin: [
        'http://localhost:8000',
        'http://localhost:5500',  // Live Server
        'https://myapp.com'       // Production
    ],
    
    // Разрешённые методы
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    
    // Разрешённые заголовки
    allowedHeaders: ['Content-Type', 'Authorization'],
    
    // ВАЖНО для cookies/сессий!
    credentials: true
};

app.use(cors(corsOptions));
```

### Динамический origin

```javascript
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:8000',
            'http://localhost:5500'
        ];
        
        // Разрешаем запросы без origin (например, от Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Заблокировано CORS'));
        }
    },
    credentials: true
};
```

---

## 🍪 Cookies и Credentials

### Проблема с cookies

По умолчанию fetch **не отправляет cookies** на другой origin.

```javascript
// ❌ Cookies НЕ отправятся
fetch('http://localhost:3000/auth/status');

// ✅ Cookies отправятся
fetch('http://localhost:3000/auth/status', {
    credentials: 'include'
});
```

### Настройка Backend для cookies

```javascript
// app.js

// 1. CORS с credentials
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true  // ← Обязательно!
}));

// 2. Session cookie настройки
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',  // Защита от CSRF
        maxAge: 24 * 60 * 60 * 1000
    }
}));
```

---

## 💻 API-клиент на Frontend

### Структура frontend

```
frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── api/
│   │   ├── apiClient.js     # Базовый клиент
│   │   ├── authApi.js       # API аутентификации
│   │   ├── productApi.js    # API товаров
│   │   └── cartApi.js       # API корзины
│   ├── components/
│   │   ├── productCard.js
│   │   └── cart.js
│   └── app.js               # Главный файл
└── pages/
    ├── login.html
    └── registration.html
```

### Базовый API-клиент

```javascript
// js/api/apiClient.js

/**
 * Базовый API-клиент
 * Централизованная обработка запросов
 */

const API_BASE_URL = 'http://localhost:3000';

/**
 * Обёртка над fetch с обработкой ошибок
 * @param {string} endpoint - Путь API (например, '/product/all')
 * @param {Object} options - Опции fetch
 * @returns {Promise<Object>} - Распарсенный JSON ответ
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Настройки по умолчанию
    const defaultOptions = {
        credentials: 'include',  // ВАЖНО для cookies!
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Объединяем опции
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(url, finalOptions);
        
        // Парсим JSON
        const data = await response.json();
        
        // Проверяем успешность
        if (!response.ok) {
            throw new Error(data.error || `HTTP Error: ${response.status}`);
        }
        
        return data;
        
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * GET запрос
 */
function get(endpoint) {
    return apiRequest(endpoint, { method: 'GET' });
}

/**
 * POST запрос
 */
function post(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

/**
 * PUT запрос
 */
function put(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

/**
 * DELETE запрос
 */
function del(endpoint) {
    return apiRequest(endpoint, { method: 'DELETE' });
}

// Экспорт для ES модулей
export { get, post, put, del, API_BASE_URL };
```

### API аутентификации

```javascript
// js/api/authApi.js

import { get, post } from './apiClient.js';

/**
 * API для аутентификации
 */

/**
 * Регистрация
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export async function register(email, password, name) {
    return post('/auth/register', { email, password, name });
}

/**
 * Вход
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
    return post('/auth/login', { email, password });
}

/**
 * Выход
 */
export async function logout() {
    return post('/auth/logout');
}

/**
 * Проверка статуса аутентификации
 */
export async function checkAuthStatus() {
    return get('/auth/status');
}
```

### API товаров

```javascript
// js/api/productApi.js

import { get, post, put, del } from './apiClient.js';

/**
 * API для работы с товарами
 */

/**
 * Получить все товары
 * @param {string} category - Фильтр по категории
 */
export async function getAllProducts(category = null) {
    const endpoint = category 
        ? `/product/all?category=${encodeURIComponent(category)}`
        : '/product/all';
    
    return get(endpoint);
}

/**
 * Получить товар по ID
 * @param {number} id
 */
export async function getProductById(id) {
    return get(`/product/${id}`);
}

/**
 * Создать товар (требуется авторизация)
 * @param {Object} productData
 */
export async function createProduct(productData) {
    return post('/product', productData);
}

/**
 * Обновить товар
 * @param {number} id
 * @param {Object} productData
 */
export async function updateProduct(id, productData) {
    return put(`/product/${id}`, productData);
}

/**
 * Удалить товар
 * @param {number} id
 */
export async function deleteProduct(id) {
    return del(`/product/${id}`);
}
```

### API корзины

```javascript
// js/api/cartApi.js

import { get, post, del } from './apiClient.js';

/**
 * API для работы с корзиной
 */

/**
 * Получить корзину текущего пользователя
 */
export async function getCart() {
    return get('/shopping-cart');
}

/**
 * Добавить товар в корзину
 * @param {number} productId
 * @param {number} quantity
 */
export async function addToCart(productId, quantity = 1) {
    return post('/shopping-cart/add', { productId, quantity });
}

/**
 * Удалить товар из корзины
 * @param {number} itemId
 */
export async function removeFromCart(itemId) {
    return del(`/shopping-cart/${itemId}`);
}
```

---

## 📱 Пример: Главная страница

### HTML структура

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechParts — Интернет-магазин</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="header">
    <div class="container">
        <a href="/" class="logo">TechParts</a>

        <nav class="nav">
            <a href="/">Каталог</a>
        </nav>

        <div class="header-actions">
            <!-- Меняется в зависимости от авторизации -->
            <div id="auth-section">
                <a href="pages/login.html" class="btn btn-outline">Войти</a>
            </div>

            <button id="cart-btn" class="btn btn-icon">
                🛒 <span id="cart-count">0</span>
            </button>
        </div>
    </div>
</header>

<main class="main">
    <div class="container">
        <h1>Каталог товаров</h1>

        <div class="filters">
            <select id="category-filter">
                <option value="">Все категории</option>
                <option value="Процессоры">Процессоры</option>
                <option value="Видеокарты">Видеокарты</option>
                <option value="Материнские платы">Материнские платы</option>
            </select>
        </div>

        <div id="products-container" class="products-grid">
            <!-- Товары загружаются через JS -->
            <p class="loading">Загрузка...</p>
        </div>
    </div>
</main>

<!-- Модальное окно корзины -->
<div id="cart-modal" class="modal hidden">
    <div class="modal-content">
        <h2>Корзина</h2>
        <div id="cart-items"></div>
        <div id="cart-total"></div>
        <button id="close-cart" class="btn">Закрыть</button>
    </div>
</div>

<script type="module" src="js/app.js"></script>
</body>
</html>
```

### Главный JavaScript файл

```javascript
// js/app.js

import { getAllProducts } from './api/productApi.js';
import { checkAuthStatus } from './api/authApi.js';
import { getCart, addToCart } from './api/cartApi.js';

/**
 * Главное приложение
 */

// DOM элементы
const productsContainer = document.getElementById('products-container');
const authSection = document.getElementById('auth-section');
const cartCount = document.getElementById('cart-count');
const categoryFilter = document.getElementById('category-filter');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');

// Состояние приложения
let isAuthenticated = false;
let currentUser = null;
let cart = [];

/**
 * Инициализация приложения
 */
async function init() {
    // Проверяем авторизацию
    await checkAuth();
    
    // Загружаем товары
    await loadProducts();
    
    // Настраиваем обработчики
    setupEventListeners();
}

/**
 * Проверка авторизации
 */
async function checkAuth() {
    try {
        const response = await checkAuthStatus();
        isAuthenticated = response.data.isAuthenticated;
        currentUser = response.data.user;
        
        updateAuthUI();
        
        if (isAuthenticated) {
            await loadCart();
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
    }
}

/**
 * Обновление UI в зависимости от авторизации
 */
function updateAuthUI() {
    if (isAuthenticated && currentUser) {
        authSection.innerHTML = `
            <span>Привет, ${currentUser.name || currentUser.email}!</span>
            <button id="logout-btn" class="btn btn-outline">Выйти</button>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    } else {
        authSection.innerHTML = `
            <a href="pages/login.html" class="btn btn-outline">Войти</a>
            <a href="pages/registration.html" class="btn">Регистрация</a>
        `;
    }
}

/**
 * Загрузка товаров
 */
async function loadProducts(category = '') {
    try {
        productsContainer.innerHTML = '<p class="loading">Загрузка...</p>';
        
        const response = await getAllProducts(category || null);
        const products = response.data;
        
        renderProducts(products);
    } catch (error) {
        productsContainer.innerHTML = `
            <p class="error">Ошибка загрузки: ${error.message}</p>
        `;
    }
}

/**
 * Отрисовка товаров
 */
function renderProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>Товары не найдены</p>';
        return;
    }
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image || 'images/placeholder.jpg'}" 
                 alt="${product.name}"
                 class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category || ''}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">
                    В корзину
                </button>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики для кнопок
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
}

/**
 * Добавление в корзину
 */
async function handleAddToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    
    if (!isAuthenticated) {
        alert('Для добавления в корзину необходимо войти');
        window.location.href = 'pages/login.html';
        return;
    }
    
    try {
        const response = await addToCart(productId, 1);
        cart = response.data;
        updateCartCount();
        alert('Товар добавлен в корзину!');
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

/**
 * Загрузка корзины
 */
async function loadCart() {
    try {
        const response = await getCart();
        cart = response.data.items || [];
        updateCartCount();
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
    }
}

/**
 * Обновление счётчика корзины
 */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.item_quantity, 0);
    cartCount.textContent = count;
}

/**
 * Настройка обработчиков событий
 */
function setupEventListeners() {
    // Фильтр по категории
    categoryFilter.addEventListener('change', (e) => {
        loadProducts(e.target.value);
    });
    
    // Открытие корзины
    cartBtn.addEventListener('click', () => {
        if (!isAuthenticated) {
            alert('Войдите, чтобы увидеть корзину');
            return;
        }
        renderCart();
        cartModal.classList.remove('hidden');
    });
    
    // Закрытие корзины
    document.getElementById('close-cart').addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });
}

/**
 * Форматирование цены
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Выход из системы
 */
async function handleLogout() {
    try {
        await import('./api/authApi.js').then(m => m.logout());
        isAuthenticated = false;
        currentUser = null;
        cart = [];
        updateAuthUI();
        updateCartCount();
        alert('Вы вышли из системы');
    } catch (error) {
        console.error('Ошибка выхода:', error);
    }
}

// Запуск приложения
init();
```

---

## 🔐 Страница входа

```html
<!-- pages/login.html -->
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход — TechParts</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="auth-container">
        <h1>Вход</h1>
        
        <form id="login-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <div id="error-message" class="error hidden"></div>
            
            <button type="submit" class="btn btn-primary">Войти</button>
        </form>
        
        <p>
            Нет аккаунта? 
            <a href="registration.html">Зарегистрироваться</a>
        </p>
        <p>
            <a href="../index.html">← На главную</a>
        </p>
    </div>
    
    <script type="module">
        import { login } from '../js/api/authApi.js';
        
        const form = document.getElementById('login-form');
        const errorDiv = document.getElementById('error-message');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                errorDiv.classList.add('hidden');
                
                await login(email, password);
                
                // Перенаправляем на главную
                window.location.href = '../index.html';
                
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.classList.remove('hidden');
            }
        });
    </script>
</body>
</html>
```

---

## 🛡️ Защита от CSRF

### Что такое CSRF?

**CSRF** (Cross-Site Request Forgery) — атака, при которой злоумышленник заставляет пользователя выполнить нежелательное действие.

### Защита с SameSite Cookie

```javascript
// Backend: app.js
app.use(session({
    // ...
    cookie: {
        sameSite: 'lax',  // Защита от CSRF
        // 'strict' — более безопасно, но менее удобно
        // 'lax' — баланс безопасности и удобства
        // 'none' — нет защиты (требует secure: true)
    }
}));
```

### CSRF-токены (альтернатива)

```javascript
// Backend
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

// Добавляем токен в ответ
app.get('/auth/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Frontend
const { csrfToken } = await fetch('/auth/csrf-token').then(r => r.json());

// Используем в запросах
fetch('/auth/login', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken
    },
    // ...
});
```

---

## 📋 Полная настройка app.js

```javascript
// app.js — Финальная версия

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

// Роутеры
const productRouter = require('./routes/product.router');
const authRouter = require('./routes/auth.router');
const cartRouter = require('./routes/cart.router');

// Middleware
const logger = require('./middleware/logger.middleware');
const errorHandler = require('./middleware/error.middleware');
const notFound = require('./middleware/notFound.middleware');

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

// 1. CORS (ПЕРЕД остальными!)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true
}));

// 2. Парсеры
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Логирование
app.use(logger);

// 4. Сессии
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 5. Passport
app.use(passport.initialize());
app.use(passport.session());

// ==========================================
// МАРШРУТЫ
// ==========================================

// API информация
app.get('/', (req, res) => {
    res.json({
        name: 'TechParts API',
        version: '1.0.0'
    });
});

// API маршруты
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/shopping-cart', cartRouter);

// ==========================================
// ОБРАБОТКА ОШИБОК
// ==========================================

app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **CORS** | Cross-Origin Resource Sharing |
| **Origin** | Комбинация протокола, домена и порта |
| **Preflight** | Проверочный OPTIONS-запрос перед основным |
| **credentials** | Включение cookies в кросс-доменные запросы |
| **CSRF** | Cross-Site Request Forgery — атака |
| **SameSite** | Атрибут cookie для защиты от CSRF |
| **fetch** | Современный API для HTTP-запросов |

---

## ➡️ Что дальше?

В следующем (финальном) уроке мы рассмотрим **тестирование и валидацию**:
- Валидация входных данных
- Обработка ошибок
- Тестирование API
- Отладка

---

**Курс:** Backend | **Урок:** 08-frontend-backend-integration
