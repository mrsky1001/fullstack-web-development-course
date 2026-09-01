const mysql = require('mysql2');


const pool = mysql.createPool({
    // Максимальное количество соединений в пуле
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5,
    // Адрес сервера MySQL (обычно localhost для локальной разработки)
    host: process.env.DB_HOST || 'localhost',
    // Имя пользователя MySQL
    user: process.env.DB_USER || 'root',
    // Пароль MySQL (пустой по умолчанию для локальной разработки)
    password: process.env.DB_PASSWORD || '',
    // Имя базы данных
    database: process.env.DB_NAME || 'storedb',

    // Дополнительные настройки
    waitForConnections: true,    // Ждать свободное соединение
    queueLimit: 0                // Неограниченная очередь ожидания
});

const db = pool.promise();


module.exports = db;