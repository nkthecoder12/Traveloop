const { prisma } = require('../config/database');

// Get all trips for a user
const getTrips = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        stops: {
          include: {
            activities: true
          }
        },
        notes: true,
        _count: {
          select: {
            stops: true,
            activities: true,
            notes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ trips });
  } catch (error) {
    next(error);
  }
};

// Get single trip with all details
const getTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        stops: {
          include: {
            activities: true
          },
          orderBy: { order: 'asc' }
        },
        notes: {
          orderBy: { createdAt: 'desc' }
        },
        packingItems: {
          orderBy: { category: 'asc' }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ 
        error: 'Trip not found' 
      });
    }

    res.json({ trip });
  } catch (error) {
    next(error);
  }
};

// Create new trip (with optional nested stops and activities)
const createTrip = async (req, res, next) => {
  try {
    const { name, title, description, startDate, endDate, budget, budgetAmount, coverPhoto, stops, days: aiDays, travelStyle, style } = req.body;
    const userId = req.user.id;

    // Support both 'name' and 'title' (from AI)
    const tripName = name || title || "Untitled Trip";
    
    // Handle budget (itinerary has nested budget object)
    const finalBudget = budget?.total || budgetAmount || (typeof budget === 'number' ? budget : null);

    // Support both 'stops' and 'days' (from AI)
    const tripStops = stops || aiDays;
    
    // Support both 'travelStyle' and 'style'
    const finalStyle = travelStyle || style;

    const trip = await prisma.trip.create({
      data: {
        name: tripName,
        description: description || `Journey to ${req.body.destination || 'a new place'}`,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        budget: finalBudget ? parseFloat(finalBudget) : null,
        userId,
        coverPhoto,
        travelStyle: finalStyle,
        stops: tripStops ? {
          create: tripStops.map((stop, index) => ({
            city: stop.city || stop.name || "Unknown City",
            country: stop.country || "Unknown",
            startDate: stop.startDate ? new Date(stop.startDate) : new Date(),
            endDate: stop.endDate ? new Date(stop.endDate) : new Date(),
            order: stop.order || stop.dayNumber || (index + 1),
            activities: (stop.activities || (stop.morning && [...stop.morning, ...stop.afternoon, ...stop.evening])) ? {
              create: (stop.activities || [...(stop.morning || []), ...(stop.afternoon || []), ...(stop.evening || [])]).map(activity => ({
                name: activity.name || activity.title,
                description: activity.description || "",
                type: activity.type || "activity",
                duration: activity.duration?.toString() || "1 hour",
                cost: activity.cost || activity.estimatedCost ? parseFloat(activity.cost || activity.estimatedCost) : null,
                time: activity.time
              }))
            } : undefined
          }))
        } : undefined
      },
      include: {
        stops: {
          include: {
            activities: true
          }
        },
        notes: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      trip
    });
  } catch (error) {
    console.error('Create trip error:', error);
    next(error);
  }
};

// Update trip
const updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, budget, coverPhoto, isPublic } = req.body;

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        budget: budget !== undefined ? (budget ? parseFloat(budget) : null) : undefined,
        coverPhoto,
        isPublic
      },
      include: {
        stops: true,
        notes: true
      }
    });

    res.json({
      message: 'Trip updated successfully',
      trip
    });
  } catch (error) {
    next(error);
  }
};

// Delete trip
const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.trip.delete({
      where: { id }
    });

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add trip stop
const addTripStop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { city, country, startDate, endDate } = req.body;

    // Get the current highest order for this trip
    const lastStop = await prisma.tripStop.findFirst({
      where: { tripId: id },
      orderBy: { order: 'desc' }
    });

    const stop = await prisma.tripStop.create({
      data: {
        city,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        order: lastStop ? lastStop.order + 1 : 1,
        tripId: id
      }
    });

    res.status(201).json({
      message: 'Stop added successfully',
      stop
    });
  } catch (error) {
    next(error);
  }
};

// Add activity to stop
const addActivity = async (req, res, next) => {
  try {
    const { stopId } = req.params;
    const { name, description, type, duration, cost, time, date } = req.body;

    const activity = await prisma.activity.create({
      data: {
        name,
        description,
        type,
        duration,
        cost: cost ? parseFloat(cost) : null,
        time,
        date: date ? new Date(date) : null,
        stopId
      }
    });

    res.status(201).json({
      message: 'Activity added successfully',
      activity
    });
  } catch (error) {
    next(error);
  }
};

// Get trip budget breakdown
const getTripBudget = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          include: {
            activities: true
          }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ 
        error: 'Trip not found' 
      });
    }

    // Calculate budget breakdown
    const activitiesCost = trip.stops.reduce((sum, stop) => {
      return sum + stop.activities.reduce((stopSum, activity) => {
        return stopSum + (activity.cost || 0);
      }, 0);
    }, 0);

    const budgetBreakdown = {
      total: trip.budget || 0,
      activities: activitiesCost,
      transport: 0,
      accommodation: 0,
      meals: 0,
      remaining: (trip.budget || 0) - activitiesCost
    };

    res.json({ budget: budgetBreakdown });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  addTripStop,
  addActivity,
  getTripBudget
};
