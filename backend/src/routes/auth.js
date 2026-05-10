const express = require('express');
const { authenticate, isAdmin } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin, validateProfileUpdate } = require('../middleware/validation');
const { register, login, getMe, updateProfile, logout, refreshToken } = require('../controllers/authController_v2');

const router = express.Router();

// Public routes
router.post('/signup', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);
router.post('/logout', authenticate, logout);

module.exports = router;
