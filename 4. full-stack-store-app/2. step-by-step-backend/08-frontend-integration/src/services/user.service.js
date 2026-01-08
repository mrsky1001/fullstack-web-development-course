/**
 * SERVICE: User
 */
const db = require('./db.service');
const bcrypt = require('bcryptjs');

const mockUsers = [];

exports.findUser = async (searchParams) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE user_id = ? OR user_email = ?',
            [searchParams.id ?? null, searchParams.email ?? null]
        );
        if (rows.length > 0) {
            const row = rows[0];
            return {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
                role: row.user_role || 'клиент',
                password: row.user_password
            };
        }
        return null;
    } catch (error) {
        return mockUsers.find(u =>
            u.id === searchParams.id || u.email === searchParams.email
        ) || null;
    }
};

exports.insertUser = async (userData) => {
    try {
        await db.execute(
            'INSERT INTO users (user_name, user_role, user_email, user_password) VALUES (?, ?, ?, ?)',
            [userData.name, userData.role || 'клиент', userData.email, userData.password]
        );
    } catch (error) {
        mockUsers.push({
            id: mockUsers.length + 1,
            ...userData
        });
    }
};

exports.verifyUser = async (email, password, done) => {
    try {
        const user = await exports.findUser({ email });
        if (!user) return done(null, false);
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) return done(null, user);
        return done(null, false);
    } catch (error) {
        return done(error);
    }
};
