const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;