const express = require('express');
const UserService = require('../services/userService');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');
const { authenticate, isAdmin } = require('../middleware/auth');
const { prisma } = require('../config/database');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
    }
  }
});

const router = express.Router();

// Get current user profile
router.get('/profile', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const userProfile = await UserService.getUserProfile(req.user.id);
    
    if (!userProfile) {
      return ResponseFormatter.error(res, 'User profile not found', 404);
    }
    
    ResponseFormatter.success(res, { user: userProfile }, 'Profile retrieved successfully');
  })
);

// Update user profile
router.put('/profile', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const profileData = req.body;
    const updatedProfile = await UserService.updateUserProfile(req.user.id, profileData);
    
    ResponseFormatter.success(res, { user: updatedProfile }, 'Profile updated successfully');
  })
);

// Upload profile photo
router.post('/profile-photo', 
  authenticate, 
  upload.single('photo'), 
  ErrorHandler.asyncHandler(async (req, res) => {
    if (!req.file) {
      return ResponseFormatter.error(res, 'No photo file provided', 400);
    }

    const fileData = {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer
    };

    const updatedProfile = await UserService.uploadProfilePhoto(req.user.id, fileData);
    
    ResponseFormatter.success(res, { 
      user: updatedProfile,
      photoUrl: updatedProfile.avatar 
    }, 'Profile photo uploaded successfully');
  })
);

// Get user statistics
router.get('/statistics', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const statistics = await UserService.getUserStatistics(req.user.id);
    
    ResponseFormatter.success(res, statistics, 'User statistics retrieved successfully');
  })
);

// Update user preferences
router.put('/preferences', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const preferences = req.body;
    const updatedUser = await UserService.updateUserPreferences(req.user.id, preferences);
    
    ResponseFormatter.success(res, { user: updatedUser }, 'User preferences updated successfully');
  })
);

// Get user preferences
router.get('/preferences', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const user = await UserService.getUserProfile(req.user.id);
    
    if (!user) {
      return ResponseFormatter.error(res, 'User not found', 404);
    }
    
    ResponseFormatter.success(res, { preferences: user.preferences }, 'User preferences retrieved successfully');
  })
);

// Search users (admin only)
router.get('/search', 
  authenticate, 
  isAdmin, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, search, role } = req.query;
    const result = await UserService.searchUsers({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      role
    });
    
    ResponseFormatter.paginated(res, result.users, result.pagination);
  })
);

// Delete user account
router.delete('/account', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const deletedUser = await UserService.deleteUser(req.user.id);
    
    ResponseFormatter.success(res, { user: deletedUser }, 'Account deleted successfully');
  })
);

// Verify email
router.post('/verify-email', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const updatedUser = await UserService.verifyEmail(req.user.id);
    
    ResponseFormatter.success(res, { user: updatedUser }, 'Email verified successfully');
  })
);

// Get user's trips
router.get('/trips', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    
    const trips = await prisma.trip.findMany({
      where: { 
        userId: req.user.id,
        ...(status && { status })
      },
      include: {
        destinationCity: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true
          }
        },
        stops: {
          select: {
            id: true,
            city: true,
            country: true,
            startDate: true,
            endDate: true,
            order: true
          },
          orderBy: { order: 'asc' }
        },
        budget: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    ResponseFormatter.success(res, { trips }, 'User trips retrieved successfully');
  })
);

// Get user's favorite destinations
router.get('/favorites', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const favorites = await prisma.favoriteDestination.findMany({
      where: { userId: req.user.id },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true,
            averageBudget: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    ResponseFormatter.success(res, { favorites }, 'Favorite destinations retrieved successfully');
  })
);

// Add favorite destination
router.post('/favorites', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { cityId, notes } = req.body;
    
    const favorite = await prisma.favoriteDestination.create({
      data: {
        userId: req.user.id,
        cityId,
        notes
      }
    });

    ResponseFormatter.success(res, { favorite }, 'Favorite destination added successfully', 201);
  })
);

// Remove favorite destination
router.delete('/favorites/:cityId', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { cityId } = req.params;
    
    const deleted = await prisma.favoriteDestination.deleteMany({
      where: { 
        userId: req.user.id,
        cityId
      }
    });

    ResponseFormatter.success(res, { deleted }, 'Favorite destination removed successfully');
  })
);

module.exports = router;
