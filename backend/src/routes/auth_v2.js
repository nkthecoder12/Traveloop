const express = require('express');
const { authenticate } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin, validateProfileUpdate } = require('../middleware/validation');
const { register, login, getMe, updateProfile, logout, refreshToken } = require('../controllers/authController');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');

const router = express.Router();

// Public routes
router.post('/signup', 
  validateUserRegistration, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const result = await register(req, res);
    ResponseFormatter.success(res, result.user, 'User registered successfully', 201);
  })
);

router.post('/login', 
  validateUserLogin, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const result = await login(req, res);
    ResponseFormatter.success(res, result.user, 'Login successful');
  })
);

router.post('/refresh', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const result = await refreshToken(req, res);
    ResponseFormatter.success(res, result.user, 'Token refreshed successfully');
  })
);

// Protected routes
router.get('/me', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const result = await getMe(req, res);
    ResponseFormatter.success(res, result.user, 'Profile retrieved successfully');
  })
);

router.put('/profile', 
  authenticate, 
  validateProfileUpdate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const result = await updateProfile(req, res);
    ResponseFormatter.success(res, result.user, 'Profile updated successfully');
  })
);

router.post('/logout', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    await logout(req, res);
    ResponseFormatter.success(res, null, 'Logout successful');
  })
);

module.exports = router;
