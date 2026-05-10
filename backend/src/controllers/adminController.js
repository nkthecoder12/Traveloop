const { prisma } = require('../config/database');

// Get admin dashboard stats
const getDashboardStats = async (req, res, next) => {
  try {
    // Get basic counts
    const totalUsers = await prisma.user.count();
    const totalTrips = await prisma.trip.count();
    const totalActivities = await prisma.activity.count();
    const totalCities = await prisma.city.count();

    // Get recent trips
    const recentTrips = await prisma.trip.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            stops: true,
            activities: true
          }
        }
      }
    });

    // Get top destinations
    const topCities = await prisma.tripStop.groupBy({
      by: ['city', 'country'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    });

    // Get user activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await prisma.user.count({
      where: {
        trips: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo
            }
          }
        }
      }
    });

    const stats = {
      totalUsers,
      totalTrips,
      totalActivities,
      totalCities,
      activeUsers,
      recentTrips: recentTrips.map(trip => ({
        id: trip.id,
        name: trip.name,
        user: trip.user.name,
        date: trip.createdAt,
        stops: trip._count.stops,
        activities: trip._count.activities,
        status: new Date(trip.startDate) > new Date() ? 'upcoming' : 'completed'
      })),
      topCities: topCities.map(city => ({
        name: city.city,
        country: city.country,
        trips: city._count.id
      }))
    };

    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = {};
    if (search) {
      whereClause = {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            trips: true,
            notes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip
    });

    const total = await prisma.user.count({ where: whereClause });

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all trips
const getAllTrips = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, userId } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = {};
    if (status) {
      const now = new Date();
      if (status === 'upcoming') {
        whereClause.startDate = {
          gt: now
        };
      } else if (status === 'completed') {
        whereClause.startDate = {
          lt: now
        };
      }
    }

    if (userId) {
      whereClause.userId = userId;
    }

    const trips = await prisma.trip.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            stops: true,
            activities: true,
            notes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip
    });

    const total = await prisma.trip.count({ where: whereClause });

    res.json({
      trips,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get system health
const getSystemHealth = async (req, res, next) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      memory: process.memoryUsage(),
      uptime: process.uptime()
    };

    res.json(health);
  } catch (error) {
    next(error);
  }
};

// Delete user (admin action)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete trip (admin action)
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

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllTrips,
  getSystemHealth,
  deleteUser,
  deleteTrip
};
