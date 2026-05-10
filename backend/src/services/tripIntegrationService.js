const TripService = require('./tripService');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Trip Integration Service
 * Bridges AI-generated trip drafts with the standard TripService flow
 * Ensures AI and manual trips use the SAME persistence logic
 */
class TripIntegrationService {
  /**
   * Create trip from AI-generated draft
   * @param {string} userId - User ID
   * @param {Object} aiResponse - AI-generated trip response
   * @returns {Object} Created trip using standard TripService
   */
  static async createTripFromAIDraft(userId, aiResponse) {
    try {
      const { trip } = aiResponse;
      
      if (!trip) {
        throw new Error('AI response must contain trip object');
      }

      // Convert AI trip structure to TripService format
      const tripData = this.convertAIToTripFormat(trip);

      // Use the SAME TripService.createTrip method
      const createdTrip = await TripService.createTrip(userId, tripData);

      // Create stops and activities from AI data
      if (trip.stops && trip.stops.length > 0) {
        await this.createStopsAndActivities(createdTrip.id, trip.stops);
      }

      // Return the complete trip with stops and activities
      return await TripService.getTripById(createdTrip.id, userId);

    } catch (error) {
      console.error('Trip Integration Error:', error);
      throw error;
    }
  }

  /**
   * Convert AI trip structure to TripService format
   * @param {Object} aiTrip - AI-generated trip structure
   * @returns {Object} TripService-compatible data
   */
  static convertAIToTripFormat(aiTrip) {
    const {
      title,
      budget,
      travelStyle,
      startDate,
      endDate,
      stops
    } = aiTrip;

    return {
      name: title,
      budget: budget,
      travelStyle: travelStyle,
      startDate: startDate,
      endDate: endDate,
      description: `AI-generated ${travelStyle} trip with ${stops?.length || 0} stops`,
      isPublic: false,
      travelersCount: 1
    };
  }

  /**
   * Create stops and activities from AI data
   * @param {string} tripId - Trip ID
   * @param {Array} aiStops - AI-generated stops
   * @returns {Promise<void>}
   */
  static async createStopsAndActivities(tripId, aiStops) {
    const { prisma } = require('../config/database');

    for (const aiStop of aiStops) {
      // Create stop
      const stop = await prisma.tripStop.create({
        data: {
          tripId,
          city: aiStop.city,
          country: aiStop.country,
          startDate: new Date(), // Will be updated by user
          endDate: new Date(), // Will be updated by user
          order: aiStop.order,
          description: `AI-generated stop in ${aiStop.city}`,
          notes: `Created by AI assistant`
        }
      });

      // Create activities for this stop
      if (aiStop.activities && aiStop.activities.length > 0) {
        await this.createActivities(stop.id, aiStop.activities);
      }
    }
  }

  /**
   * Create activities from AI data
   * @param {string} stopId - Stop ID
   * @param {Array} aiActivities - AI-generated activities
   * @returns {Promise<void>}
   */
  static async createActivities(stopId, aiActivities) {
    const { prisma } = require('../config/database');

    for (const aiActivity of aiActivities) {
      await prisma.activity.create({
        data: {
          stopId,
          name: aiActivity.title,
          description: aiActivity.description,
          type: aiActivity.category || 'sightseeing',
          duration: `${aiActivity.duration} minutes`,
          cost: aiActivity.estimatedCost,
          time: aiActivity.time,
          location: aiActivity.location,
          notes: aiActivity.tips ? aiActivity.tips.join(', ') : ''
        }
      });
    }
  }

  /**
   * Update trip with AI-generated modifications
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @param {Object} aiResponse - AI-generated modifications
   * @returns {Object} Updated trip
   */
  static async updateTripWithAI(tripId, userId, aiResponse) {
    try {
      const { trip } = aiResponse;
      
      if (!trip) {
        throw new Error('AI response must contain trip object');
      }

      // Convert AI trip structure to TripService format
      const tripData = this.convertAIToTripFormat(trip);

      // Use the SAME TripService.updateTrip method
      const updatedTrip = await TripService.updateTrip(tripId, userId, tripData);

      // Handle stops and activities updates
      if (trip.stops && trip.stops.length > 0) {
        await this.updateStopsAndActivities(tripId, userId, trip.stops);
      }

      // Return the complete updated trip
      return await TripService.getTripById(tripId, userId);

    } catch (error) {
      console.error('Trip Update Integration Error:', error);
      throw error;
    }
  }

  /**
   * Update stops and activities from AI data
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @param {Array} aiStops - AI-generated stops
   * @returns {Promise<void>}
   */
  static async updateStopsAndActivities(tripId, userId, aiStops) {
    const { prisma } = require('../config/database');

    // Get existing stops
    const existingStops = await prisma.tripStop.findMany({
      where: { tripId },
      include: { activities: true }
    });

    // Create a map of existing stops by order
    const existingStopsMap = new Map(existingStops.map(stop => [stop.order, stop]));

    for (const aiStop of aiStops) {
      const existingStop = existingStopsMap.get(aiStop.order);

      if (existingStop) {
        // Update existing stop
        await prisma.tripStop.update({
          where: { id: existingStop.id },
          data: {
            city: aiStop.city,
            country: aiStop.country,
            description: `AI-generated stop in ${aiStop.city}`,
            notes: `Updated by AI assistant`
          }
        });

        // Update activities for this stop
        if (aiStop.activities && aiStop.activities.length > 0) {
          await this.updateActivities(existingStop.id, aiStop.activities);
        }
      } else {
        // Create new stop
        const stop = await prisma.tripStop.create({
          data: {
            tripId,
            city: aiStop.city,
            country: aiStop.country,
            startDate: new Date(),
            endDate: new Date(),
            order: aiStop.order,
            description: `AI-generated stop in ${aiStop.city}`,
            notes: `Created by AI assistant`
          }
        });

        // Create activities for new stop
        if (aiStop.activities && aiStop.activities.length > 0) {
          await this.createActivities(stop.id, aiStop.activities);
        }
      }
    }
  }

  /**
   * Update activities from AI data
   * @param {string} stopId - Stop ID
   * @param {Array} aiActivities - AI-generated activities
   * @returns {Promise<void>}
   */
  static async updateActivities(stopId, aiActivities) {
    const { prisma } = require('../config/database');

    // Delete existing activities for this stop
    await prisma.activity.deleteMany({
      where: { stopId }
    });

    // Create new activities
    for (const aiActivity of aiActivities) {
      await prisma.activity.create({
        data: {
          stopId,
          name: aiActivity.title,
          description: aiActivity.description,
          type: aiActivity.category || 'sightseeing',
          duration: `${aiActivity.duration} minutes`,
          cost: aiActivity.estimatedCost,
          time: aiActivity.time,
          location: aiActivity.location,
          notes: aiActivity.tips ? aiActivity.tips.join(', ') : ''
        }
      });
    }
  }

  /**
   * Validate AI trip structure before integration
   * @param {Object} aiResponse - AI response to validate
   * @returns {Object} Validation result
   */
  static validateAITripStructure(aiResponse) {
    const { trip } = aiResponse;

    if (!trip) {
      return {
        valid: false,
        errors: ['AI response must contain trip object']
      };
    }

    const errors = [];

    // Validate required trip fields
    if (!trip.title) errors.push('Trip title is required');
    if (!trip.budget) errors.push('Trip budget is required');
    if (!trip.stops || !Array.isArray(trip.stops)) errors.push('Trip stops array is required');

    // Validate stops
    if (trip.stops) {
      trip.stops.forEach((stop, index) => {
        if (!stop.city) errors.push(`Stop ${index + 1}: city is required`);
        if (!stop.order) errors.push(`Stop ${index + 1}: order is required`);
        
        if (stop.activities) {
          stop.activities.forEach((activity, actIndex) => {
            if (!activity.title) errors.push(`Stop ${index + 1}, Activity ${actIndex + 1}: title is required`);
            if (!activity.time) errors.push(`Stop ${index + 1}, Activity ${actIndex + 1}: time is required`);
            if (!activity.duration) errors.push(`Stop ${index + 1}, Activity ${actIndex + 1}: duration is required`);
          });
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get AI trip preview without saving
   * @param {Object} aiResponse - AI response
   * @returns {Object} Trip preview data
   */
  static getAITripPreview(aiResponse) {
    const { trip, budgetBreakdown, recommendations } = aiResponse;

    return {
      trip: {
        title: trip.title,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        startDate: trip.startDate,
        endDate: trip.endDate,
        stopsCount: trip.stops?.length || 0,
        activitiesCount: trip.stops?.reduce((total, stop) => total + (stop.activities?.length || 0), 0) || 0
      },
      budgetBreakdown,
      recommendations,
      isPreview: true
    };
  }

  /**
   * Convert AI trip to frontend-compatible format
   * @param {Object} aiResponse - AI response
   * @returns {Object} Frontend-compatible trip structure
   */
  static convertToFrontendFormat(aiResponse) {
    const { trip, budgetBreakdown, recommendations } = aiResponse;

    return {
      trip: {
        id: null, // Will be set when saved
        name: trip.title,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        startDate: trip.startDate,
        endDate: trip.endDate,
        description: `AI-generated ${trip.travelStyle} trip`,
        isPublic: false,
        travelersCount: 1,
        status: 'PLANNING',
        stops: trip.stops.map(stop => ({
          id: null, // Will be set when saved
          city: stop.city,
          country: stop.country,
          order: stop.order,
          description: `AI-generated stop in ${stop.city}`,
          activities: stop.activities.map(activity => ({
            id: null, // Will be set when saved
            name: activity.title,
            description: activity.description,
            type: activity.category || 'sightseeing',
            duration: `${activity.duration} minutes`,
            cost: activity.estimatedCost,
            time: activity.time,
            location: activity.location,
            notes: activity.tips ? activity.tips.join(', ') : ''
          }))
        }))
      },
      budgetBreakdown,
      recommendations,
      isAIGenerated: true
    };
  }
}

module.exports = TripIntegrationService;
