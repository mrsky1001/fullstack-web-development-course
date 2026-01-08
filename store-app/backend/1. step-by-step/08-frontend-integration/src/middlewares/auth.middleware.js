/**
 * MIDDLEWARE: Auth check
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ status: 'error', message: 'Требуется авторизация' });
};
