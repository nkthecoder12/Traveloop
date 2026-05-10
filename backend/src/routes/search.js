const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  searchCities,
  searchActivities,
  getPopularDestinations,
  getActivityTypes,
  addCity
} = require('../controllers/searchController');

const router = express.Router();

// Public routes
router.get('/cities', searchCities);
router.get('/activities', searchActivities);
router.get('/popular', getPopularDestinations);
router.get('/activity-types', getActivityTypes);

// Protected routes (admin only)
router.post('/cities', authMiddleware, addCity);

module.exports = router;
