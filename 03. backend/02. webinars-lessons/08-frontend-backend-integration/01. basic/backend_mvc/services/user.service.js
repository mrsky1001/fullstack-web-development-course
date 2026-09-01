const bcrypt = require('bcryptjs');

/**
 * ФЕЙКОВАЯ БАЗА ДАННЫХ (в памяти)
 * Вынесена в сервис для инкапсуляции данных.
 */
const usersDb = [];

/**
 * Поиск пользователя по email
 * @param {string} email 
 * @returns {object|undefined}
 */
const findUserByEmail = (email) => {
    return usersDb.find(u => u.email === email);
};

/**
 * Поиск пользователя по ID
 * @param {number} id 
 * @returns {object|undefined}
 */
const findUserById = (id) => {
    return usersDb.find(u => u.id === id);
};

/**
 * Создание нового пользователя
 * @param {object} userData - { name, email, password } 
 * @returns {object} - созданный пользователь
 */
const createUser = (userData) => {
    const { name, email, password } = userData;
    
    // Хешируем пароль перед сохранением
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };
    
    usersDb.push(newUser);
    return newUser;
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
};
