const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/register', controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/check', controller.check);

module.exports = router;
