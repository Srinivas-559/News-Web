const express = require('express');
const { signup, login, logout, refreshToken, protectController, verifyOTP } = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/verify-otp', verifyOTP);
// router.get('/protected', protect, protectController);

module.exports = router;
