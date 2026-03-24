const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
 
const app = express();

app.use(express.json()); // Для парсинга JSON в теле запроса
app.use(express.urlencoded({ extended: true }));

// ФЕЙКОВАЯ БАЗА ДАННЫХ (в памяти)
const usersDb = [];

// ==========================================
// 1. НАСТРОЙКА СЕССИЙ
// ==========================================
// Сессия — это память сервера о пользователе. 
// При первом визите сервер выдаст браузеру печеньку (cookie) с ID.
app.use(session({
    secret: 'super-secret-key',     // Ключ для подписи cookie
    resave: false,                  // Не пересохранять сессию без изменений
    saveUninitialized: false,       // Не создавать сессию "пустым" посетителям
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // Сессия живет 24 часа
}));

// ==========================================
// 2. ИНИЦИАЛИЗАЦИЯ PASSPORT.JS
// ==========================================
app.use(passport.initialize());     // Подключаем Passport
app.use(passport.session());        // Связываем Passport с сессиями Express

// ==========================================
// 3. СТРАТЕГИЯ АВТОРИЗАЦИИ (КАК МЫ ВХОДИМ)
// ==========================================
passport.use(new LocalStrategy(
    {
        usernameField: 'email',     // Ищем логин в поле req.body.email
        passwordField: 'password'   // Ищем пароль в req.body.password
    },
    async (email, password, done) => {
        // ШАГ 1: Поиск пользователя в базе
        const user = usersDb.find(u => u.email === email);
        if (!user) {
            return done(null, false, { message: 'Пользователь не найден' });
        }

        // ШАГ 2: Проверяем пароль (сравниваем то, что ввели, с захешированным паролем)
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return done(null, false, { message: 'Неверный пароль' });
        }

        // ШАГ 3: Успешный вход! Отдаем пользователя системе
        return done(null, user);
    }
));

// ==========================================
// 4. СЕРИАЛИЗАЦИЯ И ДЕСЕРИАЛИЗАЦИЯ
// ==========================================
// Сериализация: ЧТО сохранить в cookie после входа? (обычно только email или ID)
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Десериализация: КАК получить пользователя при КАЖДОМ следующем клике?
passport.deserializeUser((email, done) => {
    const user = usersDb.find(u => u.email === email);
    done(null, user); // Теперь пользователь будет доступен в req.user
});

// ==========================================
// 5. РОУТЫ (ПРИМЕР РАБОТЫ)
// ==========================================

// Главная (информация)
app.get('/', (req, res) => {
    res.send(`
        <h2>Простой пример Авторизации</h2>
        <p>1. <code>POST /register</code> — Регистрация (JSON: email, password, name)</p>
        <p>2. <code>POST /login</code> — Вход (JSON: email, password)</p>
        <p>3. <code>GET /profile</code> — Закрытая страница, доступна только после логина</p>
        <p>4. <code>POST /logout</code> — Выйти из аккаунта</p>
    `);
});

// Регистрация
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Проверка занятости email
    if (usersDb.find(u => u.email === email)) {
        return res.status(400).json({ status: 'error', message: 'Email уже занят' });
    }

    // Хешируем пароль перед сохранением! (никогда не храните пароли текстом)
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    usersDb.push(newUser); // Сохраняем "в базу"

    res.status(201).json({ status: 'success', message: 'Пользователь зарегистрирован!' });
});

// Вход (использует Passport LocalStrategy)
// Post принимает 3 аргрумента: email, password, done
app.post('/login', passport.authenticate('local'), (req, res) => {
    // Сюда попадем ТОЛЬКО если LocalStrategy отдала done(null, user)
    res.json({ 
        status: 'success', 
        message: 'Успешный вход!', 
        user: { name: req.user.name, email: req.user.email } 
    });
});

// Защищенный маршрут профиля
app.get('/profile', (req, res) => {
    // Метод req.isAuthenticated() добавляется Passport-ом
    if (req.isAuthenticated()) {
        res.json({ 
            status: 'success', 
            message: 'Добро пожаловать в профиль!', 
            user: { name: req.user.name, email: req.user.email } 
        });
    } else {
        res.status(401).json({ status: 'error', message: 'Вы не вошли в систему (ошибка 401)' });
    }
});

// Выход
app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ status: 'error', message: 'Ошибка при выходе' });
        res.json({ status: 'success', message: 'Вы вышли из системы' });
    });
});

// ==========================================
// 6. ЗАПУСК
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен! Откройте http://localhost:${PORT}`)
});
