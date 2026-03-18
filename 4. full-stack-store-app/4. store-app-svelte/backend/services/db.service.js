const mysql = require("mysql2")

const db = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "admin",
    database: "storedb"
}).promise()

module.exports = db