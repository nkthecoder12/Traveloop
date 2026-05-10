const { prisma } = require('../config/database');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Trip Service
 * Handles all trip-related business logic
 */
class TripService {
  /**
   * Create new trip
   * @param {string} userId - User ID
   * @param {Object} tripData - Trip data
   * @returns {Object} Created trip
   */
  static async createTrip(userId, tripData) {
    const {
      name,
      description,
      startDate,
      endDate,
      budget,
      coverPhoto,
      isPublic = false,
      travelStyle,
      travelersCount = 1,
      destinationCityId
    } = tripData;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      throw new Error('End date must be after start date');
    }

    return await prisma.trip.create({
      data: {
        userId,
        name: name.trim(),
        description,
        startDate: start,
        endDate: end,
        budget: budget ? parseFloat(budget) : null,
        coverPhoto,
        isPublic,
        travelStyle,
        travelersCount: parseInt(travelersCount),
        destinationCityId,
        status: 'PLANNING'
      },
      include: {
        destinationCity: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true
          }
        }
      }
    });
  }

  /**
   * Get all trips for a user
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @returns {Object} Trips with pagination
   */
  static async getUserTrips(userId, options = {}) {
    const { page = 1, limit = 10, status, search } = options;
    const skip = (page - 1) * limit;

    const where = { userId };
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
          budget: true,
          _count: {
            select: {
              stops: true,
              notes: true,
              packingItems: true
            }
          }
        }
      }),
      prisma.trip.count({ where })
    ]);

    return {
      trips,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get trip by ID
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @returns {Object|null} Trip object or null
   */
  static async getTripById(tripId, userId) {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        destinationCity: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true,
            coordinates: true
          }
        },
        stops: {
          include: {
            activities: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                duration: true,
                cost: true,
                time: true,
                location: true
              }
            }
          },
          orderBy: { order: 'asc' }
        },
        budget: true,
        notes: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        },
        packingItems: {
          select: {
            id: true,
            name: true,
            quantity: true,
            packed: true,
            category: true,
            priority: true
          }
        }
      }
    });

    // Check if user has access to this trip
    if (trip.userId !== userId) {
      throw new Error('Access denied to this trip');
    }

    return trip;
  }

  /**
   * Update trip
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @param {Object} updateData - Trip update data
   * @returns {Object} Updated trip
   */
  static async updateTrip(tripId, userId, updateData) {
    // First check if user has access to update this trip
    const existingTrip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { userId, status }
    });

    if (!existingTrip) {
      throw new Error('Trip not found');
    }

    if (existingTrip.userId !== userId) {
      throw new Error('Access denied to this trip');
    }

    const {
      name,
      description,
      startDate,
      endDate,
      budget,
      coverPhoto,
      isPublic,
      travelStyle,
      travelersCount,
      destinationCityId,
      status
    } = updateData;

    const data = {};
    if (name !== undefined) data.name = name.trim();
    if (description !== undefined) data.description = description;
    if (startDate !== undefined) data.startDate = new Date(startDate);
    if (endDate !== undefined) data.endDate = new Date(endDate);
    if (budget !== undefined) data.budget = parseFloat(budget);
    if (coverPhoto !== undefined) data.coverPhoto = coverPhoto;
    if (isPublic !== undefined) data.isPublic = isPublic;
    if (travelStyle !== undefined) data.travelStyle = travelStyle;
    if (travelersCount !== undefined) data.travelersCount = parseInt(travelersCount);
    if (destinationCityId !== undefined) data.destinationCityId = destinationCityId;
    if (status !== undefined) data.status = status;

    return await prisma.trip.update({
      where: { id: tripId },
      data,
      include: {
        destinationCity: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true
          }
        }
      }
    });
  }

  /**
   * Delete trip
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @returns {Object} Deleted trip
   */
  static async deleteTrip(tripId, userId) {
    // First check if user has access to delete this Trip
    const existingTrip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { userId }
    });

    if (!existingTrip) {
      throw new Error('Trip not found');
    }

    if (existingTrip.userId !== userId) {
      throw new Error('Access denied to this trip');
    }

    return await prisma.trip.delete({
      where: { id: tripId }
    });
  }

  /**
   * Add trip stop
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @param {Object} stopData - Trip stop data
   * @returns {Object} Created trip stop
   */
  static async addTripStop(tripId, userId, stopData) {
    // Check if user has access to this trip
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { userId }
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    if (trip.userId !== userId) {
      throw new Error('Access denied to this trip');
    }

    const {
      city,
      country,
      startDate,
      endDate,
      order,
      description,
      notes
    } = stopData;

    // Get current max order for this trip
    const lastStop = await prisma.tripStop.findFirst({
      where: { tripId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const nextOrder = lastStop ? lastStop.order + 1 : 1;

    return await prisma.tripStop.create({
      data: {
        tripId,
        city: city.trim(),
        country: country.trim(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        order: nextOrder,
        description,
        notes
      }
    });
  }

  /**
   * Update trip stop
   * @param {string} stopId - Trip stop ID
   * @param {string} userId - User ID (for authorization)
   * @param {Object} updateData - Stop update data
   * @returns {Object} Updated trip stop
   */
  static async updateTripStop(stopId, userId, updateData) {
    // Check if user has access to this stop
    const existingStop = await prisma.tripStop.findUnique({
      where: { id: stopId },
      include: {
        trip: {
          select: { userId }
        }
      }
    });

    if (!existingStop) {
      throw new Error('Trip stop not found');
    }

    if (existingStop.trip.userId !== userId) {
      throw new Error('Access denied to this trip stop');
    }

    const {
      city,
      country,
      startDate,
      endDate,
      order,
      description,
      notes
    } = updateData;

    const data = {};
    if (city !== undefined) data.city = city.trim();
    if (country !== undefined) data.country = country.trim();
    if (startDate !== undefined) data.startDate = new Date(startDate);
    if (endDate !== undefined) data.endDate = new Date(endDate);
    if (order !== undefined) data.order = parseInt(order);
    if (description !== undefined) data.description = description;
    if (notes !== undefined) data.notes = notes;

    return await prisma.tripStop.update({
      where: { id: stopId },
      data
    });
  }

  /**
   * Delete trip stop
   * @param {string} stopId - Trip stop ID
   * @param {string} userId - User ID (for authorization)
   * @returns {Object} Deleted trip stop
   */
  static async deleteTripStop(stopId, userId) {
    // Check if user has access to this stop
    const existingStop = await prisma.tripStop.findUnique({
      where: { id: stopId },
      include: {
        trip: {
          select: { userId }
        }
      }
    });

    if (!existingStop) {
      throw new Error('Trip stop not found');
    }

    if (existingStop.trip.userId !== userId) {
      throw new Error('Access denied to this Trip stop');
    }

    return await prisma.tripStop.delete({
      where: { id: stopId }
    });
  }

  /**
   * Get public trips
   * @param {Object} options - Query options
   * @returns {Object} Public trips with pagination
   */
  static async getPublicTrips(options = {}) {
    const { page = 1, limit = 20, search, destination } = options;
    const skip = (page - 1) * limit;

    const where = { 
      isPublic: true,
      status: 'ACTIVE'
    };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (destination) {
      where.destinationCity = {
        country: { contains: destination, mode: 'insensitive' }
      };
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
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
          }
        }
      }),
      prisma.trip.count({ where })
    ]);

    return {
      trips,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Duplicate trip
   * @param {string} tripId - Trip ID to duplicate
   * @param {string} userId - User ID (for authorization)
   * @param {Object} options - Duplication options
   * @returns {Object} Duplicated trip
   */
  static async duplicateTrip(tripId, userId, options = {}) {
    const { newName, newStartDate, newEndDate } = options;

    // Get original trip
    const originalTrip = await this.getTripById(tripId, userId);
    if (!originalTrip) {
      throw new Error('Original trip not found');
    }

    const tripData = {
      userId,
      name: newName || `${originalTrip.name} (Copy)`,
      description: originalTrip.description,
      budget: originalTrip.budget,
      coverPhoto: originalTrip.coverPhoto,
      isPublic: false, // Duplicated trips are private by default
      travelStyle: originalTrip.travelStyle,
      travelersCount: originalTrip.travelersCount,
      destinationCityId: originalTrip.destinationCityId,
      status: 'PLANNING'
    };

    // Override dates if provided
    if (newStartDate) tripData.startDate = new Date(newStartDate);
    if (newEndDate) tripData.endDate = new Date(newEndDate);

    const newTrip = await prisma.trip.create({
      data: tripData,
      include: {
        destinationCity: {
          select: {
            id: true,
            name: true,
            country: true,
            imageUrl: true
          }
        }
      }
    });

    // Copy stops if requested
    if (options.copyStops && originalTrip.stops) {
      for (const stop of originalTrip.stops) {
        await prisma.tripStop.create({
          data: {
            tripId: newTrip.id,
            city: stop.city,
            country: stop.country,
            startDate: stop.startDate,
            endDate: stop.endDate,
            order: stop.order,
            description: stop.description,
            notes: stop.notes
          }
        });
      }
    }

    return newTrip;
  }

  /**
   * Get trip statistics
   * @param {string} tripId - Trip ID
   * @param {string} userId - User ID (for authorization)
   * @returns {Object} Trip statistics
   */
  static async getTripStatistics(tripId, userId) {
    const trip = await this.getTripById(tripId, userId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    const [stopCount, activityCount, packingItemCount] = await Promise.all([
      prisma.tripStop.count({ where: { tripId } }),
      prisma.activity.count({ where: { stop: { tripId } } }),
      prisma.packingItem.count({ where: { tripId } })
    ]);

    return {
      trip: {
        id: trip.id,
        name: trip.name,
        duration: Math.ceil((trip.endDate - trip.startDate) / (1000 * 60 * 60 * 24)),
        budget: trip.budget,
        status: trip.status
      },
      statistics: {
        stopCount,
        activityCount,
        packingItemCount,
        totalCost: trip.budget || 0
      }
    };
  }
}

module.exports = TripService;
