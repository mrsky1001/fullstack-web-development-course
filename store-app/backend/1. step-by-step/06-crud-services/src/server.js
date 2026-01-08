/**
 * ====================================================================
 * УРОК 6: CRUD ОПЕРАЦИИ
 * ====================================================================
 */

require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('====================================================');
    console.log('  🎓 УРОК 6: CRUD ОПЕРАЦИИ');
    console.log('====================================================');
    console.log(`  ✅ Сервер запущен: http://localhost:${PORT}`);
    console.log('');
    console.log('  📦 CRUD = Create, Read, Update, Delete');
    console.log('');
    console.log('  🔗 Product API:');
    console.log(`     GET    /product/all    — Все товары`);
    console.log(`     GET    /product/:id    — Один товар`);
    console.log(`     POST   /product/add    — Создать товар`);
    console.log(`     PUT    /product/:id    — Обновить товар`);
    console.log(`     DELETE /product/:id    — Удалить товар`);
    console.log('');
    console.log('  Для остановки: Ctrl + C');
    console.log('====================================================');
    console.log('');
});
