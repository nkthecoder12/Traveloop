const { prisma } = require('../config/database');

// Search cities
const searchCities = async (req, res, next) => {
  try {
    const { query, country, costIndex, limit = 20, offset = 0 } = req.query;

    let whereClause = {};

    if (query) {
      whereClause.name = {
        contains: query,
        mode: 'insensitive'
      };
    }

    if (country) {
      whereClause.country = {
        contains: country,
        mode: 'insensitive'
      };
    }

    if (costIndex) {
      whereClause.costIndex = costIndex;
    }

    const cities = await prisma.city.findMany({
      where: whereClause,
      orderBy: [
        { popularity: 'desc' },
        { name: 'asc' }
      ],
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json({ cities });
  } catch (error) {
    next(error);
  }
};

// Search activities
const searchActivities = async (req, res, next) => {
  try {
    const { query, city, type, maxCost, limit = 20, offset = 0 } = req.query;

    let whereClause = {};

    if (query) {
      whereClause.name = {
        contains: query,
        mode: 'insensitive'
      };
    }

    if (type) {
      whereClause.type = type;
    }

    if (maxCost) {
      whereClause.cost = {
        lte: parseFloat(maxCost)
      };
    }

    // If city is specified, join with trip stops
    let activities;
    if (city) {
      activities = await prisma.activity.findMany({
        where: {
          ...whereClause,
          stop: {
            city: {
              contains: city,
              mode: 'insensitive'
            }
          }
        },
        include: {
          stop: {
            select: {
              city: true,
              country: true
            }
          }
        },
        orderBy: { name: 'asc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      });
    } else {
      activities = await prisma.activity.findMany({
        where: whereClause,
        include: {
          stop: {
            select: {
              city: true,
              country: true
            }
          }
        },
        orderBy: { name: 'asc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      });
    }

    res.json({ activities });
  } catch (error) {
    next(error);
  }
};

// Get popular destinations
const getPopularDestinations = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    // Get cities from database
    const cities = await prisma.city.findMany({
      orderBy: { popularity: 'desc' },
      take: parseInt(limit)
    });

    // Also get most visited cities from trip data
    const visitedCities = await prisma.tripStop.groupBy({
      by: ['city', 'country'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: parseInt(limit)
    });

    res.json({
      popularCities: cities,
      mostVisited: visitedCities.map(city => ({
        city: city.city,
        country: city.country,
        visits: city._count.id
      }))
    });
  } catch (error) {
    next(error);
  }
};

// Get activity types
const getActivityTypes = async (req, res, next) => {
  try {
    const activityTypes = await prisma.activity.findMany({
      select: {
        type: true
      },
      distinct: ['type']
    });

    const types = activityTypes.map(activity => activity.type);

    res.json({ types });
  } catch (error) {
    next(error);
  }
};

// Add new city
const addCity = async (req, res, next) => {
  try {
    const { name, country, costIndex, popularity, description, imageUrl } = req.body;

    if (!name || !country || !costIndex || !popularity) {
      return res.status(400).json({ 
        error: 'Required fields are missing' 
      });
    }

    const city = await prisma.city.create({
      data: {
        name,
        country,
        costIndex,
        popularity: parseInt(popularity),
        description,
        imageUrl
      }
    });

    res.status(201).json({
      message: 'City added successfully',
      city
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchCities,
  searchActivities,
  getPopularDestinations,
  getActivityTypes,
  addCity
};
