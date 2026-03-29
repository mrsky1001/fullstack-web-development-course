const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { ensureAuthenticated } = require('../middlewares/auth.middleware');

/**
 * РУТЫ (МАРШРУТЫ) АВТОРИЗАЦИИ
 */

// Регистрация
router.post('/register', authController.register);

// Вход (использует Passport LocalStrategy перед контроллером)
router.post('/login', passport.authenticate('local'), authController.login);

// Профиль (защищен мидлвеаром)
router.get('/profile', ensureAuthenticated, authController.getProfile);

// Выход
router.post('/logout', authController.logout);

module.exports = router;
