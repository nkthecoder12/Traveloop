const express = require('express');
const { authenticate } = require('../middleware/auth');
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

// Protected routes
router.get('/', authenticate, getTrips);
router.get('/:id', authenticate, getTrip);
router.get('/:id/budget', authenticate, getTripBudget);
router.post('/', authenticate, validateTripCreation, createTrip);
router.put('/:id', authenticate, updateTrip);
router.delete('/:id', authenticate, deleteTrip);
router.post('/:id/stops', authenticate, validateTripStop, addTripStop);
router.post('/:tripId/stops/:stopId/activities', authenticate, validateActivity, addActivity);

module.exports = router;
