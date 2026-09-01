/**
 * ====================================================================
 * УРОК 8: ИНТЕГРАЦИЯ С ФРОНТЕНДОМ
 * ====================================================================
 */

require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('====================================================');
    console.log('  🎓 УРОК 8: ИНТЕГРАЦИЯ С ФРОНТЕНДОМ');
    console.log('====================================================');
    console.log(`  ✅ Сервер запущен: http://localhost:${PORT}`);
    console.log('');
    console.log('  📦 Новое:');
    console.log('     CORS      — разрешение запросов с фронтенда');
    console.log('     Корзина   — защищённый API для корзины');
    console.log('');
    console.log('  🔐 Auth API:');
    console.log(`     POST /auth/register, /auth/login, /auth/logout`);
    console.log(`     GET  /auth/check`);
    console.log('');
    console.log('  📦 Product API (публичный):');
    console.log(`     GET  /product/all, /product/:id`);
    console.log('');
    console.log('  🛒 Shopping Cart API (только для авторизованных!):');
    console.log(`     GET    /shopping-cart/`);
    console.log(`     POST   /shopping-cart/add`);
    console.log(`     PUT    /shopping-cart/update/:id`);
    console.log(`     DELETE /shopping-cart/remove/:id`);
    console.log('');
    console.log('  Для остановки: Ctrl + C');
    console.log('====================================================');
    console.log('');
});
