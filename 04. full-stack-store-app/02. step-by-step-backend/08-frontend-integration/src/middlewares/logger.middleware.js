const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString('ru-RU')}] ➡️  ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = requestLogger;
