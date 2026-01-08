/**
 * MIDDLEWARE: Auth
 */
const msgs = require('../lib/messages.lib');
const ResObj = require('../models/resObj.class');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json(new ResObj({
        status: 401,
        text: msgs.USER_NOT_AUTH
    }));
};
