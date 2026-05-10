const { prisma } = require('../config/database');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * City Service
 * Handles all city-related business logic
 */
class CityService {
  /**
   * Get all cities
   * @param {Object} options - Query options
   * @returns {Object} Cities with pagination
   */
  static async getAllCities(options = {}) {
    const { page = 1, limit = 20, countryId, search, minBudget, maxBudget } = options;
    const skip = (page - 1) * limit;

    const where = {};
    
    if (countryId) {
      where.countryId = countryId;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (minBudget || maxBudget) {
      where.averageBudget = {};
      if (minBudget) where.averageBudget.gte = minBudget;
      if (maxBudget) where.averageBudget.lte = maxBudget;
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { popularityScore: 'desc' },
        include: {
          country: {
            select: {
              id: true,
              name: true,
              code: true,
              currency: true
            }
          }
        },
        select: {
          id: true,
          name: true,
          description: true,
          averageBudget: true,
          popularityScore: true,
          imageUrl: true,
          coordinates: true,
          bestTimeToVisit: true,
          climate: true,
          timezone: true,
          country: true
        }
      }),
      prisma.city.count({ where })
    ]);

    return {
      cities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get city by ID
   * @param {string} cityId - City ID
   * @returns {Object|null} City object or null
   */
  static async getCityById(cityId) {
    return await prisma.city.findUnique({
      where: { id: cityId },
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
            currency: true,
            continent: true
          }
        }
      }
    });
  }

  /**
   * Search cities
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Object} Search results with pagination
   */
  static async searchCities(query, options = {}) {
    const { page = 1, limit = 20, countryId, minBudget, maxBudget } = options;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        { isActive: true },
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        }
      ]
    };

    if (countryId) {
      where.AND.push({ countryId });
    }

    if (minBudget || maxBudget) {
      where.AND.push({
        averageBudget: {}
      });
      const budgetCondition = where.AND[where.AND.length - 1];
      if (minBudget) budgetCondition.averageBudget.gte = minBudget;
      if (maxBudget) budgetCondition.averageBudget.lte = maxBudget;
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { popularityScore: 'desc' },
        include: {
          country: {
            select: {
              id: true,
              name: true,
              code: true,
              currency: true
            }
          }
        },
        select: {
          id: true,
          name: true,
          description: true,
          averageBudget: true,
          popularityScore: true,
          imageUrl: true,
          coordinates: true,
          bestTimeToVisit: true,
          climate: true,
          timezone: true,
          country: true
        }
      }),
      prisma.city.count({ where })
    ]);

    return {
      cities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get popular cities
   * @param {number} limit - Number of cities to return
   * @returns {Array} Popular cities
   */
  static async getPopularCities(limit = 20) {
    return await prisma.city.findMany({
      where: { isActive: true },
      orderBy: { popularityScore: 'desc' },
      take: limit,
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
            currency: true
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        averageBudget: true,
        popularityScore: true,
        imageUrl: true,
        coordinates: true,
        bestTimeToVisit: true,
        climate: true,
        timezone: true,
        country: true
      }
    });
  }

  /**
   * Get cities by budget range
   * @param {number} minBudget - Minimum budget
   * @param {number} maxBudget - Maximum budget
   * @param {Object} options - Additional options
   * @returns {Array} Cities within budget range
   */
  static async getCitiesByBudget(minBudget, maxBudget, options = {}) {
    const { limit = 20, countryId } = options;

    const where = {
      AND: [
        { isActive: true },
        {
          averageBudget: {
            gte: minBudget,
            lte: maxBudget
          }
        }
      ]
    };

    if (countryId) {
      where.AND.push({ countryId });
    }

    return await prisma.city.findMany({
      where,
      take: limit,
      orderBy: { popularityScore: 'desc' },
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
            currency: true
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        averageBudget: true,
        popularityScore: true,
        imageUrl: true,
        coordinates: true,
        bestTimeToVisit: true,
        climate: true,
        timezone: true,
        country: true
      }
    });
  }

  /**
   * Create new city
   * @param {Object} cityData - City data
   * @returns {Object} Created city
   */
  static async createCity(cityData) {
    const { 
      name, 
      countryId, 
      description, 
      averageBudget, 
      popularityScore = 50,
      imageUrl, 
      coordinates, 
      bestTimeToVisit, 
      climate, 
      timezone 
    } = cityData;

    return await prisma.city.create({
      data: {
        name: name.trim(),
        countryId,
        description,
        averageBudget,
        popularityScore,
        imageUrl,
        coordinates,
        bestTimeToVisit,
        climate,
        timezone
      }
    });
  }

  /**
   * Update city
   * @param {string} cityId - City ID
   * @param {Object} updateData - Update data
   * @returns {Object} Updated city
   */
  static async updateCity(cityId, updateData) {
    const { 
      name, 
      description, 
      averageBudget, 
      popularityScore, 
      imageUrl, 
      coordinates, 
      bestTimeToVisit, 
      climate, 
      timezone, 
      isActive 
    } = updateData;

    const data = {};
    if (name !== undefined) data.name = name.trim();
    if (description !== undefined) data.description = description;
    if (averageBudget !== undefined) data.averageBudget = averageBudget;
    if (popularityScore !== undefined) data.popularityScore = popularityScore;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (coordinates !== undefined) data.coordinates = coordinates;
    if (bestTimeToVisit !== undefined) data.bestTimeToVisit = bestTimeToVisit;
    if (climate !== undefined) data.climate = climate;
    if (timezone !== undefined) data.timezone = timezone;
    if (isActive !== undefined) data.isActive = isActive;

    return await prisma.city.update({
      where: { id: cityId },
      data
    });
  }

  /**
   * Delete city
   * @param {string} cityId - City ID
   * @returns {Object} Deleted city
   */
  static async deleteCity(cityId) {
    return await prisma.city.delete({
      where: { id: cityId }
    });
  }

  /**
   * Get cities by continent
   * @param {string} continent - Continent name
   * @param {Object} options - Query options
   * @returns {Object} Cities by continent
   */
  static async getCitiesByContinent(continent, options = {}) {
    const { page = 1, limit = 20, search } = options;
    const skip = (page - 1) * limit;

    const where = {
      country: {
        continent
      }
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { popularityScore: 'desc' },
        include: {
          country: {
            select: {
              id: true,
              name: true,
              code: true,
              currency: true,
              continent: true
            }
          }
        },
        select: {
          id: true,
          name: true,
          description: true,
          averageBudget: true,
          popularityScore: true,
          imageUrl: true,
          coordinates: true,
          bestTimeToVisit: true,
          climate: true,
          timezone: true,
          country: true
        }
      }),
      prisma.city.count({ where })
    ]);

    return {
      cities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = CityService;
