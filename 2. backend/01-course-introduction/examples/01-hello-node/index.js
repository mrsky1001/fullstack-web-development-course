/**
 * ====================================================================
 * Пример: Первая программа на Node.js
 * ====================================================================
 * 
 * Этот файл демонстрирует базовые возможности Node.js
 * 
 * Запуск: node index.js
 * ====================================================================
 */

// ==========================================
// 1. Вывод в консоль
// ==========================================

console.log('Привет, Node.js!');
console.log('Это ваша первая программа на сервере');

// ==========================================
// 2. Переменные окружения
// ==========================================

// Node.js предоставляет доступ к переменным окружения
console.log('\n--- Информация о системе ---');
console.log('Платформа:', process.platform);      // win32, darwin, linux
console.log('Версия Node:', process.version);     // v18.x.x
console.log('Текущая папка:', process.cwd());     // Рабочая директория

// ==========================================
// 3. Аргументы командной строки
// ==========================================

// node index.js arg1 arg2
console.log('\n--- Аргументы командной строки ---');
console.log('Все аргументы:', process.argv);
console.log('Ваши аргументы:', process.argv.slice(2));

// ==========================================
// 4. Модули Node.js
// ==========================================

// Встроенные модули не требуют установки
const os = require('os');       // Информация об ОС
const path = require('path');   // Работа с путями
const fs = require('fs');       // Файловая система

console.log('\n--- Информация об ОС ---');
console.log('Имя хоста:', os.hostname());
console.log('Память (всего):', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Память (свободно):', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Ядер CPU:', os.cpus().length);

// ==========================================
// 5. Работа с путями
// ==========================================

console.log('\n--- Работа с путями ---');
const filePath = '/users/projects/app/index.js';
console.log('Имя файла:', path.basename(filePath));      // index.js
console.log('Расширение:', path.extname(filePath));      // .js
console.log('Директория:', path.dirname(filePath));      // /users/projects/app
console.log('Текущий файл:', __filename);
console.log('Текущая папка:', __dirname);

// ==========================================
// 6. Асинхронность (основа Node.js)
// ==========================================

console.log('\n--- Асинхронность ---');
console.log('Начало');

// setTimeout — асинхронная функция
setTimeout(() => {
    console.log('Это выполнится через 1 секунду');
}, 1000);

console.log('Конец (но это выведется ДО setTimeout!)');

// ==========================================
// 7. Простой HTTP-запрос (без внешних библиотек)
// ==========================================

const https = require('https');

// Раскомментируйте для теста HTTP-запроса:
/*
console.log('\n--- HTTP запрос ---');
https.get('https://api.github.com/users/github', { 
    headers: { 'User-Agent': 'Node.js' } 
}, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
        const json = JSON.parse(data);
        console.log('GitHub пользователь:', json.login);
    });
});
*/

console.log('\n✅ Программа выполнена!');
console.log('Подождите 1 секунду для setTimeout...\n');
