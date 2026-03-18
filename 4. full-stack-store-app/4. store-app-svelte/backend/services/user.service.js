const User = require('../models/user.class')
const db = require('./db.service')
const bcrypt = require('bcryptjs')

exports.findUser = async (user) => {
    try {
        // console.log(user)
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ? or user_email = ?', [user.id ?? null, user.email ?? null])

        if (rows.length > 0) {
            return new User().fromDB(rows[0])
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}

exports.insertUser = async (user) => {
    try {
        await db.execute("INSERT INTO users (user_name, user_role, user_email, user_password) VALUES (?,?,?,?)",
            [user.name, user.role, user.email, user.password])
    } catch (err) {
        throw err
    }
}


exports.verifyUser = (email, password, callback) => {
    this.findUser({email}).then((user) => {
        // console.log('isValid', user)

        if (user) {
            const isValid = bcrypt.compareSync(password, user.password)

            // console.log('isValid', isValid)

            if (isValid) {
                return callback(null, user)
            } else {
                return callback(null, false)
            }
        } else {
            return callback(null, false)
        }
    }).catch(callback)
}