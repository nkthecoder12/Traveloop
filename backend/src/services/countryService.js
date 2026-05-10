const { prisma } = require('../config/database');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Country Service
 * Handles all country-related business logic
 */
class CountryService {
  /**
   * Get all countries
   * @param {Object} options - Query options
   * @returns {Array} List of countries
   */
  static async getAllCountries(options = {}) {
    const { page = 1, limit = 20, continent, search } = options;
    const skip = (page - 1) * limit;

    const where = {};
    
    if (continent) {
      where.continent = continent;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [countries, total] = await Promise.all([
      prisma.country.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          code: true,
          currency: true,
          continent: true,
          description: true,
          imageUrl: true,
          isActive: true
        }
      }),
      prisma.country.count({ where })
    ]);

    return {
      countries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get country by ID
   * @param {string} countryId - Country ID
   * @returns {Object|null} Country object or null
   */
  static async getCountryById(countryId) {
    return await prisma.country.findUnique({
      where: { id: countryId },
      include: {
        cities: {
          select: {
            id: true,
            name: true,
            averageBudget: true,
            popularityScore: true,
            imageUrl: true
          },
          orderBy: { popularityScore: 'desc' },
          take: 10
        }
      }
    });
  }

  /**
   * Get country by code
   * @param {string} code - Country code (e.g., 'US', 'FR')
   * @returns {Object|null} Country object or null
   */
  static async getCountryByCode(code) {
    return await prisma.country.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        cities: {
          select: {
            id: true,
            name: true,
            averageBudget: true,
            popularityScore: true,
            imageUrl: true
          },
          orderBy: { popularityScore: 'desc' },
          take: 10
        }
      }
    });
  }

  /**
   * Get cities by country
   * @param {string} countryId - Country ID
   * @param {Object} options - Query options
   * @returns {Object} Cities with pagination
   */
  static async getCitiesByCountry(countryId, options = {}) {
    const { page = 1, limit = 20, search } = options;
    const skip = (page - 1) * limit;

    const where = { countryId };
    
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { popularityScore: 'desc' },
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
          timezone: true
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
   * Create new country
   * @param {Object} countryData - Country data
   * @returns {Object} Created country
   */
  static async createCountry(countryData) {
    const { name, code, currency, continent, description, imageUrl } = countryData;

    return await prisma.country.create({
      data: {
        name: name.trim(),
        code: code.toUpperCase(),
        currency: currency.toUpperCase(),
        continent,
        description,
        imageUrl
      }
    });
  }

  /**
   * Update country
   * @param {string} countryId - Country ID
   * @param {Object} updateData - Update data
   * @returns {Object} Updated country
   */
  static async updateCountry(countryId, updateData) {
    const { name, code, currency, continent, description, imageUrl, isActive } = updateData;

    const data = {};
    if (name !== undefined) data.name = name.trim();
    if (code !== undefined) data.code = code.toUpperCase();
    if (currency !== undefined) data.currency = currency.toUpperCase();
    if (continent !== undefined) data.continent = continent;
    if (description !== undefined) data.description = description;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (isActive !== undefined) data.isActive = isActive;

    return await prisma.country.update({
      where: { id: countryId },
      data
    });
  }

  /**
   * Delete country
   * @param {string} countryId - Country ID
   * @returns {Object} Deleted country
   */
  static async deleteCountry(countryId) {
    return await prisma.country.delete({
      where: { id: countryId }
    });
  }

  /**
   * Get popular countries
   * @param {number} limit - Number of countries to return
   * @returns {Array} Popular countries
   */
  static async getPopularCountries(limit = 10) {
    return await prisma.country.findMany({
      where: { isActive: true },
      orderBy: { cities: { _count: 'desc' } },
      take: limit,
      select: {
        id: true,
        name: true,
        code: true,
        currency: true,
        continent: true,
        description: true,
        imageUrl: true,
        _count: {
          select: { cities: true }
        }
      }
    });
  }

  /**
   * Search countries
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Object} Search results with pagination
   */
  static async searchCountries(query, options = {}) {
    const { page = 1, limit = 20, continent } = options;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        { isActive: true },
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { code: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        }
      ]
    };

    if (continent) {
      where.AND.push({ continent });
    }

    const [countries, total] = await Promise.all([
      prisma.country.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          code: true,
          currency: true,
          continent: true,
          description: true,
          imageUrl: true
        }
      }),
      prisma.country.count({ where })
    ]);

    return {
      countries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = CountryService;
