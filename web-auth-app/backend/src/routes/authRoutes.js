const express = require('express');
const AuthController = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../utils/validators');

const router = express.Router();
const authController = new AuthController();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

module.exports = router;