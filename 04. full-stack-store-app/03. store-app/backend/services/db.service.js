/**
 * SERVICE: Database (База Данных)
 * 
 * Отвечает за подключение к MySQL.
 * Использует 'mysql2/promise' для работы с async/await (современный подход).
 * 
 * Вместо того, чтобы открывать и закрывать соединение для каждого запроса,
 * мы используем Pool (Пул соединений). Это намного эфективнее, так как сервер
 * держит несколько открытых соединений готовыми к работе.
 * 
 * ВАЖНО: Настройки подключения берутся из переменных окружения (.env файл).
 * Это безопасно, так как .env не попадает в Git.
 */

const mysql = require("mysql2");

// Создаем пул соединений
// Значения берутся из process.env (переменные окружения)
// Если переменная не задана, используется значение по умолчанию (после ||)
const db = mysql.createPool({
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",  // Пустой пароль по умолчанию для локальной разработки
    database: process.env.DB_NAME || "storedb"
}).promise(); // ВАЖНО: .promise() позволяет использовать await db.execute(...)

module.exports = db;