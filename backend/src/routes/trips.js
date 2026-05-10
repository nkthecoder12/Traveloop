const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { validateTripCreation, validateTripStop, validateActivity } = require('../middleware/validation');
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  addTripStop,
  addActivity,
  getTripBudget
} = require('../controllers/tripController');

const router = express.Router();

// Public routes (for shared trips)
router.get('/', getTrips);
router.get('/:id', getTrip);
router.get('/:id/budget', getTripBudget);

// Protected routes
router.post('/', authMiddleware, validateTripCreation, createTrip);
router.put('/:id', authMiddleware, updateTrip);
router.delete('/:id', authMiddleware, deleteTrip);
router.post('/:id/stops', authMiddleware, validateTripStop, addTripStop);
router.post('/:tripId/stops/:stopId/activities', authMiddleware, validateActivity, addActivity);

module.exports = router;
