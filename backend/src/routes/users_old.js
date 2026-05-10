const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getUser,
  updateUser,
  getUserStats,
  getUserDestinations,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Public routes
router.get('/:id', getUser);
router.get('/:id/stats', getUserStats);
router.get('/:id/destinations', getUserDestinations);

// Protected routes
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
