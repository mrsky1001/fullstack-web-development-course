/**
 * ====================================================================
 * ПРИМЕР: Аутентификация с Passport.js
 * ====================================================================
 * 
 * Демонстрирует:
 * - Регистрация и вход
 * - Хеширование паролей (bcrypt)
 * - Сессии (express-session)
 * - Passport.js Local Strategy
 * - Защита маршрутов
 * 
 * Запуск: npm start
 * ====================================================================
 */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();

// ==========================================
// "БАЗА ДАННЫХ" (в памяти для примера)
// ==========================================

const users = [];
let nextUserId = 1;

// ==========================================
// PASSPORT CONFIGURATION
// ==========================================

/**
 * Local Strategy — вход по email/password
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email',     // Какое поле использовать как логин
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // 1. Ищем пользователя
            const user = users.find(u => u.email === email);

            if (!user) {
                return done(null, false, { message: 'Неверный email или пароль' });
            }

            // 2. Проверяем пароль
            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return done(null, false, { message: 'Неверный email или пароль' });
            }

            // 3. Успех!
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }
));

/**
 * Сериализация — что сохранить в сессии
 * Сохраняем только ID (минимум данных)
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Десериализация — как восстановить пользователя
 * При каждом запросе ищем пользователя по ID из сессии
 */
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user || null);
});

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Сессии (ПЕРЕД passport!)
app.use(session({
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,          // true для HTTPS
        httpOnly: true,         // Защита от XSS
        maxAge: 24 * 60 * 60 * 1000  // 24 часа
    }
}));

// Passport (ПОСЛЕ session!)
app.use(passport.initialize());
app.use(passport.session());

// ==========================================
// AUTH MIDDLEWARE
// ==========================================

/**
 * Проверка авторизации
 */
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        success: false,
        error: 'Требуется авторизация'
    });
};

/**
 * Проверка роли администратора
 */
const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Требуются права администратора'
        });
    }

    next();
};

// ==========================================
// AUTH ROUTES
// ==========================================

/**
 * POST /auth/register
 * Регистрация нового пользователя
 */
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Валидация
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email и пароль обязательны'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Пароль должен быть минимум 6 символов'
            });
        }

        // Проверка, что email не занят
        if (users.find(u => u.email === email)) {
            return res.status(409).json({
                success: false,
                error: 'Пользователь с таким email уже существует'
            });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя
        const user = {
            id: nextUserId++,
            email,
            password: hashedPassword,
            name: name || null,
            role: 'user',
            createdAt: new Date()
        };

        users.push(user);

        console.log(`✅ Зарегистрирован: ${email}`);

        // Автоматически входим после регистрации
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Ошибка входа'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Регистрация успешна',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка регистрации'
        });
    }
});

/**
 * POST /auth/login
 * Вход в систему
 */
app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Ошибка аутентификации'
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                error: info?.message || 'Неверные учётные данные'
            });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Ошибка входа'
                });
            }

            console.log(`✅ Вход: ${user.email}`);

            res.json({
                success: true,
                message: 'Вход выполнен',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        });

    })(req, res, next);
});

/**
 * POST /auth/logout
 * Выход из системы
 */
app.post('/auth/logout', (req, res) => {
    const email = req.user?.email;

    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Ошибка выхода'
            });
        }

        req.session.destroy();
        res.clearCookie('connect.sid');

        console.log(`👋 Выход: ${email || 'unknown'}`);

        res.json({
            success: true,
            message: 'Выход выполнен'
        });
    });
});

/**
 * GET /auth/status
 * Проверка статуса авторизации
 */
app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            success: true,
            isAuthenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role
            }
        });
    } else {
        res.json({
            success: true,
            isAuthenticated: false,
            user: null
        });
    }
});

// ==========================================
// PROTECTED ROUTES
// ==========================================

/**
 * GET /profile
 * Профиль пользователя (требуется авторизация)
 */
app.get('/profile', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: `Привет, ${req.user.name || req.user.email}!`,
        user: {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            createdAt: req.user.createdAt
        }
    });
});

/**
 * GET /admin
 * Админ-панель (только для админов)
 */
app.get('/admin', isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Добро пожаловать в админ-панель!',
        totalUsers: users.length,
        users: users.map(u => ({
            id: u.id,
            email: u.email,
            role: u.role
        }))
    });
});

// ==========================================
// PUBLIC ROUTES
// ==========================================

app.get('/', (req, res) => {
    res.json({
        message: 'API урока 07: Authentication',
        endpoints: {
            'POST /auth/register': 'Регистрация { email, password, name }',
            'POST /auth/login': 'Вход { email, password }',
            'POST /auth/logout': 'Выход',
            'GET /auth/status': 'Статус авторизации',
            'GET /profile': 'Профиль (protected)',
            'GET /admin': 'Админ-панель (admin only)'
        }
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  🎓 Урок 07: Authentication with Passport.js');
    console.log('='.repeat(55));
    console.log(`  🚀 Сервер: http://localhost:${PORT}`);
    console.log('');
    console.log('  Тестирование:');
    console.log('  1. POST /auth/register — создайте пользователя');
    console.log('  2. POST /auth/login — войдите');
    console.log('  3. GET /profile — проверьте защищённый маршрут');
    console.log('  4. POST /auth/logout — выйдите');
    console.log('='.repeat(55));
});
