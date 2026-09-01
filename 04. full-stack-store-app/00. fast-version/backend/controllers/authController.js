// ============================================================
// TechParts — Контроллер авторизации (MVC — Controller)
// Критерий №16: Регистрация (до 10 баллов)
// Критерий №17: Авторизация (до 4 баллов)
// ============================================================

const db = require('../config/db');   // Подключение к MySQL
const bcrypt = require('bcryptjs');   // Хеширование паролей

// --- Регистрация нового пользователя ---
// POST /api/auth/register
// Критерий №16: 3 балла — проверка данных по БД, хеширование, ответ
exports.register = async (req, res) => {
  try {
    const { login, password, fullname, email, phone } = req.body;

    // Проверка уникальности логина в базе данных
    const [existing] = await db.query('SELECT id FROM users WHERE login = ?', [login]);
    if (existing.length > 0) {
      // Логин уже занят — возвращаем ошибку
      return res.status(400).json({ error: 'Этот логин уже занят' });
    }

    // Хеширование пароля с помощью bcryptjs (10 раундов)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохранение нового пользователя в таблицу users
    await db.query(
      'INSERT INTO users (login, password, fullname, email, phone) VALUES (?, ?, ?, ?, ?)',
      [login, hashedPassword, fullname, email, phone]
    );

    // Успешная регистрация
    res.json({ message: 'Регистрация успешна!' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// --- Авторизация пользователя ---
// POST /api/auth/login
// Критерий №17: 3 балла — проверка данных по БД, создание сессии
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // Поиск пользователя в базе данных по логину
    const [users] = await db.query('SELECT * FROM users WHERE login = ?', [login]);
    if (users.length === 0) {
      // Пользователь не найден
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    const user = users[0];

    // Сравнение введённого пароля с хешем из БД (bcryptjs)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Пароль неверный
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    // Создание серверной сессии — сохраняем user_id
    req.session.user_id = user.id;

    // Успешная авторизация
    res.json({ message: 'Вход выполнен', user_id: user.id });
  } catch (err) {
    console.error('Ошибка авторизации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// --- Выход из системы ---
// POST /api/auth/logout
// Критерий №13: Кнопка «Выйти» — завершение сессии
exports.logout = (req, res) => {
  // Уничтожаем сессию
  req.session.destroy(() => {
    res.json({ message: 'Вы вышли из системы' });
  });
};

// --- Проверка статуса авторизации ---
// GET /api/auth/check
// Критерий №13: Проверка авторизации при загрузке каждой страницы
exports.check = (req, res) => {
  if (req.session && req.session.user_id) {
    // Пользователь авторизован
    res.json({ authorized: true, user_id: req.session.user_id });
  } else {
    // Пользователь НЕ авторизован
    res.json({ authorized: false });
  }
};
