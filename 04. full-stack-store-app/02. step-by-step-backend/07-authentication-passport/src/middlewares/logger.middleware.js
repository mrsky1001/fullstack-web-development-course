/**
 * MIDDLEWARE: Request Logger
 */

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    console.log(`[${timestamp}] ➡️  ${req.method} ${req.originalUrl || req.url}`);
    next();
};

module.exports = requestLogger;
