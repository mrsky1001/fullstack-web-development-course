/**
 * Мидлвеар для проверки статуса авторизации
 */
const ensureAuthenticated = (req, res, next) => {
    // req.isAuthenticated() — это метод Passport.js
    if (req.isAuthenticated()) {
        return next();
    }
    
    // Если пользователь не вошел, возвращаем 401
    return res.status(401).json({ 
        status: 'error', 
        message: 'Вы не вошли в систему' 
    });
};

module.exports = {
    ensureAuthenticated
};
