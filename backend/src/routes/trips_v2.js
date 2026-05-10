const express = require('express');
const TripService = require('../services/tripService');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Create new trip
router.post('/', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const tripData = req.body;
    const trip = await TripService.createTrip(req.user.id, tripData);
    
    ResponseFormatter.success(res, { trip }, 'Trip created successfully', 201);
  })
);

// Get all trips for user
router.get('/', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status, search } = req.query;
    const result = await TripService.getUserTrips(req.user.id, {
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      search
    });
    
    ResponseFormatter.paginated(res, result.trips, result.pagination);
  })
);

// Get trip by ID
router.get('/:id', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const trip = await TripService.getTripById(id, req.user.id);
    
    ResponseFormatter.success(res, { trip }, 'Trip retrieved successfully');
  })
);

// Update trip
router.put('/:id', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const trip = await TripService.updateTrip(id, req.user.id, updateData);
    
    ResponseFormatter.success(res, { trip }, 'Trip updated successfully');
  })
);

// Delete trip
router.delete('/:id', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedTrip = await TripService.deleteTrip(id, req.user.id);
    
    ResponseFormatter.success(res, { trip: deletedTrip }, 'Trip deleted successfully');
  })
);

// Add trip stop
router.post('/:id/stops', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const stopData = req.body;
    const stop = await TripService.addTripStop(id, req.user.id, stopData);
    
    ResponseFormatter.success(res, { stop }, 'Trip stop added successfully', 201);
  })
);

// Get trip stops
router.get('/:id/stops', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const trip = await TripService.getTripById(id, req.user.id);
    
    if (!trip) {
      return ResponseFormatter.error(res, 'Trip not found', 404);
    }
    
    ResponseFormatter.success(res, { stops: trip.stops }, 'Trip stops retrieved successfully');
  })
);

// Update trip stop
router.put('/:id/stops/:stopId', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id, stopId } = req.params;
    const updateData = req.body;
    const stop = await TripService.updateTripStop(stopId, req.user.id, updateData);
    
    ResponseFormatter.success(res, { stop }, 'Trip stop updated successfully');
  })
);

// Delete trip stop
router.delete('/:id/stops/:stopId', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id, stopId } = req.params;
    const deletedStop = await TripService.deleteTripStop(stopId, req.user.id);
    
    ResponseFormatter.success(res, { stop: deletedStop }, 'Trip stop deleted successfully');
  })
);

// Get trip statistics
router.get('/:id/statistics', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const statistics = await TripService.getTripStatistics(id, req.user.id);
    
    ResponseFormatter.success(res, statistics, 'Trip statistics retrieved successfully');
  })
);

// Duplicate trip
router.post('/:id/duplicate', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const options = req.body;
    const duplicatedTrip = await TripService.duplicateTrip(id, req.user.id, options);
    
    ResponseFormatter.success(res, { trip: duplicatedTrip }, 'Trip duplicated successfully', 201);
  })
);

// Get public trips
router.get('/public', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, search, destination } = req.query;
    const result = await TripService.getPublicTrips({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      destination
    });
    
    ResponseFormatter.paginated(res, result.trips, result.pagination);
  })
);

// Share trip
router.post('/:id/share', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { emails, permissions } = req.body;
    
    // Create sharing tokens for each email
    const shareTokens = [];
    for (const email of emails) {
      const token = this.generateShareToken(id, req.user.id, email, permissions);
      shareTokens.push(token);
    }
    
    ResponseFormatter.success(res, { 
      shareTokens,
      shareUrl: `${process.env.FRONTEND_URL}/shared/${shareTokens[0].token}`
    }, 'Trip shared successfully');
  })
);

// Generate share token (helper method)
router.get('/:id/share/:token', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    
    // Validate token and provide access to shared trip
    const sharedTrip = await this.validateShareToken(token);
    
    if (!sharedTrip) {
      return ResponseFormatter.error(res, 'Invalid or expired share token', 401);
    }
    
    ResponseFormatter.success(res, { trip: sharedTrip }, 'Shared trip accessed successfully');
  })
);

// Helper method to generate share token
router.generateShareToken = async (tripId, userId, email, permissions = 'read') => {
  const token = require('crypto').randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await prisma.sharedUrl.create({
    data: {
      url: token,
      token,
      tripId,
      sharedByUserId: userId,
      sharedWithUserId: null, // Will be populated when recipient accepts
      permissions,
      maxAccess: 1,
      expiresAt
    }
  });
  
  return token;
};

// Helper method to validate share token
router.validateShareToken = async (token) => {
  const sharedUrl = await prisma.sharedUrl.findUnique({
    where: { 
      token,
      expiresAt: { gt: new Date() }
    },
    include: {
      trip: {
        include: {
          user: {
            select: { id: true, name: true, email: true }
          },
          destinationCity: {
            select: { id: true, name: true, country: true }
          },
          stops: {
            include: {
              activities: true
            }
          }
        }
      }
    }
  });
  
  return sharedUrl;
};

module.exports = router;
