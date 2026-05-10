const { prisma } = require('../config/database');

// Get user profile
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        language: true,
        privacy: true,
        notifications: true,
        createdAt: true,
        _count: {
          select: {
            trips: true,
            notes: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio, avatar, language, privacy, notifications } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        avatar,
        language,
        privacy,
        notifications
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        language: true,
        privacy: true,
        notifications: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// Get user statistics
const getUserStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        trips: {
          include: {
            stops: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Calculate statistics
    const totalTrips = user.trips.length;
    const totalCities = user.trips.reduce((sum, trip) => sum + trip.stops.length, 0);
    const totalDays = user.trips.reduce((sum, trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }, 0);

    // Get unique cities visited
    const uniqueCities = new Set();
    user.trips.forEach(trip => {
      trip.stops.forEach(stop => {
        uniqueCities.add(`${stop.city}, ${stop.country}`);
      });
    });

    const stats = {
      totalTrips,
      totalCities: uniqueCities.size,
      totalDays,
      totalBudget: user.trips.reduce((sum, trip) => sum + (trip.budget || 0), 0)
    };

    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

// Get user's saved destinations
const getUserDestinations = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        trips: {
          include: {
            stops: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Aggregate destinations from all trips
    const destinations = {};
    user.trips.forEach(trip => {
      trip.stops.forEach(stop => {
        const key = `${stop.city}, ${stop.country}`;
        if (!destinations[key]) {
          destinations[key] = {
            city: stop.city,
            country: stop.country,
            visits: 0
          };
        }
        destinations[key].visits++;
      });
    });

    const destinationList = Object.values(destinations).sort((a, b) => b.visits - a.visits);

    res.json({ destinations: destinationList });
  } catch (error) {
    next(error);
  }
};

// Delete user account
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  getUserStats,
  getUserDestinations,
  deleteUser
};
