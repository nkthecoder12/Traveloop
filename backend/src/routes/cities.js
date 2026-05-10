const express = require('express');
const CityService = require('../services/cityService');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, countryId, search, minBudget, maxBudget } = req.query;
    const result = await CityService.getAllCities({ 
      page: parseInt(page), 
      limit: parseInt(limit), 
      countryId,
      search,
      minBudget: minBudget ? parseFloat(minBudget) : undefined,
      maxBudget: maxBudget ? parseFloat(maxBudget) : undefined
    });
    
    ResponseFormatter.paginated(res, result.cities, result.pagination);
  })
);

router.get('/popular', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { limit = 20 } = req.query;
    const cities = await CityService.getPopularCities(parseInt(limit));
    
    ResponseFormatter.success(res, { cities }, 'Popular cities retrieved successfully');
  })
);

router.get('/search', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { q: query, page = 1, limit = 20, countryId, minBudget, maxBudget } = req.query;
    
    if (!query) {
      return ResponseFormatter.error(res, 'Search query is required', 400);
    }
    
    const result = await CityService.searchCities(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      countryId,
      minBudget: minBudget ? parseFloat(minBudget) : undefined,
      maxBudget: maxBudget ? parseFloat(maxBudget) : undefined
    });
    
    ResponseFormatter.paginated(res, result.cities, result.pagination);
  })
);

router.get('/budget', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { min, max, limit = 20 } = req.query;
    
    if (!min || !max) {
      return ResponseFormatter.error(res, 'Both min and max budget parameters are required', 400);
    }
    
    const cities = await CityService.getCitiesByBudget(
      parseFloat(min), 
      parseFloat(max), 
      { limit: parseInt(limit) }
    );
    
    ResponseFormatter.success(res, { cities }, 'Cities retrieved by budget range successfully');
  })
);

router.get('/continent/:continent', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { continent } = req.params;
    const { page = 1, limit = 20, search } = req.query;
    const result = await CityService.getCitiesByContinent(continent, {
      page: parseInt(page),
      limit: parseInt(limit),
      search
    });
    
    ResponseFormatter.paginated(res, result.cities, result.pagination);
  })
);

router.get('/:id', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const city = await CityService.getCityById(id);
    
    if (!city) {
      return ResponseFormatter.error(res, 'City not found', 404);
    }
    
    ResponseFormatter.success(res, { city }, 'City retrieved successfully');
  })
);

// Protected routes (authenticated users can create/edit their own content)
router.post('/', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const cityData = req.body;
    const city = await CityService.createCity(cityData);
    
    ResponseFormatter.success(res, { city }, 'City created successfully', 201);
  })
);

router.put('/:id', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const city = await CityService.updateCity(id, updateData);
    
    if (!city) {
      return ResponseFormatter.error(res, 'City not found', 404);
    }
    
    ResponseFormatter.success(res, { city }, 'City updated successfully');
  })
);

router.delete('/:id', 
  authenticate, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const city = await CityService.deleteCity(id);
    
    if (!city) {
      return ResponseFormatter.error(res, 'City not found', 404);
    }
    
    ResponseFormatter.success(res, { city }, 'City deleted successfully');
  })
);

module.exports = router;
