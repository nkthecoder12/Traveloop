const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  getAllTrips,
  getSystemHealth,
  deleteUser,
  deleteTrip
} = require('../controllers/adminController');

const router = express.Router();

// Protected admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/trips', getAllTrips);
router.get('/health', getSystemHealth);
router.delete('/users/:id', deleteUser);
router.delete('/trips/:id', deleteTrip);

module.exports = router;
