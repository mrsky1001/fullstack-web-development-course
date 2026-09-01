const passport = require("passport")
const bcrypt = require("bcryptjs")
const User = require("../models/user.class")
const userService = require("../services/user.service")
const msgs = require("../lib/messages.lib")
const ResObj = require("../models/resObj.class")

//
//
// exports.login = (req, res, next) => {
//     passport.authenticate('local',
//         (err, user, info) => {
//             if (err) {
//                 res.send(new ResObj({
//                     text: msgs.ERROR_OPERATION + err,
//                     status: 500
//                 }))
//             }
//             res.send(new ResObj({
//                 text: msgs.SUCCESS_OPERATION
//             }))
//         }
//     )(req, res, next)
// }

exports.login = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(401).json(new ResObj({
                text: msgs.USER_NOT_AUTH,
            }))

            req.login(user, (err) => {
                if (err) return next(err)

                return res.json(new ResObj({
                    text: msgs.SUCCESS_OPERATION,
                }))
            })
        }
    )(req, res, next)
}


exports.registration = async (req, res) => {
    const rawUser = req.body

    if (rawUser) {
        try {
            const hashedPassword = bcrypt.hashSync(rawUser.password, 10)
            const newUser = new User({
                ...rawUser,
                password: hashedPassword
            })

            userService.insertUser(newUser).then(() => {
                req.login(newUser, (err) => {
                    if (err) {
                        throw err
                    }

                    res.send(new ResObj({
                        text: msgs.USER_REGISTERED_SUCCESS,
                    }))
                })
            })


        } catch (err) {
            console.error(msgs.USER_NOT_REGISTERED, err)

            res.send(new ResObj({
                text: msgs.USER_NOT_REGISTERED,
                status: 500
            }))
        }
    } else {
        console.error(msgs.INCORRECT_DATA_FORM)

        res.send(new ResObj({
            text: msgs.INCORRECT_DATA_FORM,
            status: 500
        }))
    }
}