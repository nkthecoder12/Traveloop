const express = require('express');
const AIService = require('../services/aiService_v2');
const TripIntegrationService = require('../services/tripIntegrationService');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Generate travel itinerary - Returns Trip-compatible structure
router.post('/generate-itinerary', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const {
      destination,
      days,
      budget,
      travelStyle = 'balanced',
      interests = [],
      travelers = 1,
      startDate,
      endDate
    } = req.body;

    // Validate required fields
    if (!destination || !days || !budget) {
      return ResponseFormatter.error(res, 'Destination, days, and budget are required', 400);
    }

    // Validate numeric fields
    if (isNaN(parseInt(days)) || isNaN(parseFloat(budget))) {
      return ResponseFormatter.error(res, 'Days and budget must be valid numbers', 400);
    }

    // Validate ranges
    if (parseInt(days) < 1 || parseInt(days) > 30) {
      return ResponseFormatter.error(res, 'Days must be between 1 and 30', 400);
    }

    if (parseFloat(budget) < 100 || parseFloat(budget) > 100000) {
      return ResponseFormatter.error(res, 'Budget must be between $100 and $100,000', 400);
    }

    const result = await AIService.generateItinerary({
      destination: destination.trim(),
      days: parseInt(days),
      budget: parseFloat(budget),
      travelStyle: travelStyle.trim(),
      interests: Array.isArray(interests) ? interests : interests.split(',').map(i => i.trim()),
      travelers: parseInt(travelers),
      startDate,
      endDate
    });

    if (result.success) {
      // Convert to frontend-compatible format
      const frontendCompatible = TripIntegrationService.convertToFrontendFormat(result.data);
      
      ResponseFormatter.success(res, frontendCompatible, 'Travel itinerary generated successfully');
    } else {
      ResponseFormatter.error(res, result.error || 'Failed to generate itinerary', 500);
    }
  })
);

// Create trip from AI-generated draft - Uses SAME TripService flow
router.post('/create-trip-from-draft', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { aiResponse } = req.body;

    if (!aiResponse) {
      return ResponseFormatter.error(res, 'AI response is required', 400);
    }

    // Validate AI trip structure
    const validation = TripIntegrationService.validateAITripStructure(aiResponse);
    if (!validation.valid) {
      return ResponseFormatter.error(res, 'Invalid AI trip structure', 400, validation.errors);
    }

    // Create trip using the SAME TripService flow
    const trip = await TripIntegrationService.createTripFromAIDraft(req.user.id, aiResponse);
    
    ResponseFormatter.success(res, { trip }, 'Trip created from AI draft successfully', 201);
  })
);

// Get AI trip preview without saving
router.post('/preview-trip', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { aiResponse } = req.body;

    if (!aiResponse) {
      return ResponseFormatter.error(res, 'AI response is required', 400);
    }

    // Validate AI trip structure
    const validation = TripIntegrationService.validateAITripStructure(aiResponse);
    if (!validation.valid) {
      return ResponseFormatter.error(res, 'Invalid AI trip structure', 400, validation.errors);
    }

    // Get preview without saving
    const preview = TripIntegrationService.getAITripPreview(aiResponse);
    
    ResponseFormatter.success(res, preview, 'AI trip preview generated successfully');
  })
);

// Update existing trip with AI modifications
router.put('/update-trip/:tripId', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const { aiResponse } = req.body;

    if (!aiResponse) {
      return ResponseFormatter.error(res, 'AI response is required', 400);
    }

    // Validate AI trip structure
    const validation = TripIntegrationService.validateAITripStructure(aiResponse);
    if (!validation.valid) {
      return ResponseFormatter.error(res, 'Invalid AI trip structure', 400, validation.errors);
    }

    // Update trip using the SAME TripService flow
    const trip = await TripIntegrationService.updateTripWithAI(tripId, req.user.id, aiResponse);
    
    ResponseFormatter.success(res, { trip }, 'Trip updated with AI modifications successfully');
  })
);

// Get travel recommendations (unchanged)
router.post('/recommendations', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const {
      interests = [],
      budgetLevel = 'moderate',
      tripDuration = 'week'
    } = req.body;

    const result = await AIService.getTravelRecommendations({
      interests: Array.isArray(interests) ? interests : interests.split(',').map(i => i.trim()),
      budgetLevel: budgetLevel.trim(),
      tripDuration: tripDuration.trim()
    });

    if (result.success) {
      ResponseFormatter.success(res, result.data, 'Travel recommendations generated successfully');
    } else {
      ResponseFormatter.error(res, result.error || 'Failed to generate recommendations', 500);
    }
  })
);

// Get destination recommendations only
router.get('/destinations', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { interests = '', budgetLevel = 'moderate' } = req.query;
    
    const result = await AIService.getDestinationRecommendations(
      interests ? interests.split(',') : [],
      budgetLevel
    );

    if (result.success) {
      ResponseFormatter.success(res, result.data, 'Destination recommendations retrieved successfully');
    } else {
      ResponseFormatter.error(res, result.error || 'Failed to get destination recommendations', 500);
    }
  })
);

// Get activity recommendations only
router.get('/activities', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { interests = '', travelStyle = 'balanced' } = req.query;
    
    const result = await AIService.getActivityRecommendations(
      interests ? interests.split(',') : [],
      travelStyle
    );

    if (result.success) {
      ResponseFormatter.success(res, result.data, 'Activity recommendations retrieved successfully');
    } else {
      ResponseFormatter.error(res, result.error || 'Failed to get activity recommendations', 500);
    }
  })
);

// Get budget tips
router.get('/budget-tips', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { budgetLevel = 'moderate' } = req.query;
    
    const tips = AIService.getBudgetTips(budgetLevel);

    ResponseFormatter.success(res, { tips }, 'Budget tips retrieved successfully');
  })
);

// Get packing advice
router.get('/packing-advice', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { tripDuration = 'week', interests = '' } = req.query;
    
    const advice = AIService.getPackingAdvice(
      tripDuration,
      interests ? interests.split(',') : []
    );

    ResponseFormatter.success(res, { advice }, 'Packing advice retrieved successfully');
  })
);

// AI-powered trip optimization
router.post('/optimize-trip', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { currentItinerary, budget, preferences = {} } = req.body;

    if (!currentItinerary || !budget) {
      return ResponseFormatter.error(res, 'Current itinerary and budget are required', 400);
    }

    // This would integrate with AI to optimize existing trip
    const optimization = {
      suggestions: [
        "Consider visiting attractions during off-peak hours",
        "Book accommodations with free cancellation for flexibility",
        "Mix free and paid activities for balance",
        "Use public transportation for cost savings"
      ],
      estimatedSavings: Math.round(budget * 0.15),
      optimizedBudget: Math.round(budget * 0.85),
      timeSaved: "2-3 hours of planning time"
    };

    ResponseFormatter.success(res, optimization, 'Trip optimized successfully');
  })
);

// AI chat for travel assistance
router.post('/chat', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { message, tripContext } = req.body;

    if (!message) {
      return ResponseFormatter.error(res, 'Message is required', 400);
    }

    // This would integrate with AI chat service
    const chatResponse = {
      reply: `I understand you're asking about: "${message}". Based on your travel context, I recommend checking out our destination guides and itinerary planning tools for more personalized assistance.`,
      suggestions: [
        "Browse our destination database",
        "Use the itinerary generator for detailed planning",
        "Check out travel tips for your destination"
      ],
      needsHumanAgent: false
    };

    ResponseFormatter.success(res, chatResponse, 'Chat response generated successfully');
  })
);

module.exports = router;
