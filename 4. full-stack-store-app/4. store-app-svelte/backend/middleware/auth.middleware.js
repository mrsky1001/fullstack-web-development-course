const msgs = require("../lib/messages.lib")

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    res.send({
        text: msgs.USER_NOT_AUTH,
        status: 401,
    })
}

