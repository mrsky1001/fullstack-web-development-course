const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/register', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/check', authController.check);

module.exports = authRouter;
