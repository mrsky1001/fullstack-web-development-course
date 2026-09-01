/**
 * ====================================================================
 * УРОК 7: АУТЕНТИФИКАЦИЯ С PASSPORT.JS
 * ====================================================================
 * 
 * ВАЖНО: dotenv должен загружаться ПЕРВЫМ!
 * 
 * ====================================================================
 */

require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('====================================================');
    console.log('  🎓 УРОК 7: АУТЕНТИФИКАЦИЯ С PASSPORT.JS');
    console.log('====================================================');
    console.log(`  ✅ Сервер запущен: http://localhost:${PORT}`);
    console.log('');
    console.log('  📦 Новые библиотеки:');
    console.log('     passport       — аутентификация');
    console.log('     passport-local — стратегия логин/пароль');
    console.log('     bcryptjs       — хеширование паролей');
    console.log('     express-session — сессии пользователей');
    console.log('');
    console.log('  🔐 Auth API:');
    console.log(`     POST /auth/register  — Регистрация`);
    console.log(`     POST /auth/login     — Вход`);
    console.log(`     POST /auth/logout    — Выход`);
    console.log(`     GET  /auth/check     — Проверка статуса`);
    console.log('');
    console.log('  🛒 Product API (без изменений)');
    console.log('');
    console.log('  Для остановки: Ctrl + C');
    console.log('====================================================');
    console.log('');
});
