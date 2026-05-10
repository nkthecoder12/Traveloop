const express = require('express');
const { authMiddleware, authenticate, isAdmin } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin, validateRegistration, validateLogin, validateProfileUpdate } = require('../middleware/validation');
const { register, login, getMe, updateProfile, logout, refreshToken } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);
router.post('/logout', authenticate, logout);

module.exports = router;
