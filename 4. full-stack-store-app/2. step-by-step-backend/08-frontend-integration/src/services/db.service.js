/**
 * SERVICE: Database Connection
 */
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'storedb'
});

const db = pool.promise();

db.execute('SELECT 1')
    .then(() => console.log('✅ MySQL подключён'))
    .catch((err) => console.warn('⚠️ MySQL недоступен:', err.message));

module.exports = db;
