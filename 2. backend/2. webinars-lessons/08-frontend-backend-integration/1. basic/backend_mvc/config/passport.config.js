const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');

/**
 * НАСТРОЙКА PASSPORT.JS
 */
function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        // ШАГ 1: Поиск пользователя через сервис
        const user = userService.findUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Пользователь не найден' });
        }

        try {
            // ШАГ 2: Проверка пароля (сравнение с хешем)
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Неверный пароль' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    // Сериализация: ЧТО сохранить в cookie
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    // Десериализация: КАК получить пользователя по данным из cookie
    passport.deserializeUser((email, done) => {
        const user = userService.findUserByEmail(email);
        done(null, user);
    });
}

module.exports = initialize;
