/**
 * MIDDLEWARE: Request Logger
 */

const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const timestamp = new Date().toLocaleTimeString('ru-RU');

    console.log(`[${timestamp}] ➡️  ${req.method} ${req.originalUrl || req.url}`);

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;
        const statusIcon = statusCode < 400 ? '✅' : '❌';
        console.log(`[${timestamp}] ${statusIcon} ${req.method} ${req.originalUrl} → ${statusCode} (${duration}ms)`);
    });

    next();
};

module.exports = requestLogger;
