const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();

// 인증 관련 라우트를 설정합니다.
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;