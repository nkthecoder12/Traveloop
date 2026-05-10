const express = require('express');
const CountryService = require('../services/countryService');
const ResponseFormatter = require('../utils/responseFormatter');
const ErrorHandler = require('../utils/errorHandler');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, continent, search } = req.query;
    const result = await CountryService.getAllCountries({ 
      page: parseInt(page), 
      limit: parseInt(limit), 
      continent, 
      search 
    });
    
    ResponseFormatter.paginated(res, result.countries, result.pagination);
  })
);

router.get('/popular', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { limit = 10 } = req.query;
    const countries = await CountryService.getPopularCountries(parseInt(limit));
    
    ResponseFormatter.success(res, { countries }, 'Popular countries retrieved successfully');
  })
);

router.get('/search', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { q: query, page = 1, limit = 20, continent } = req.query;
    
    if (!query) {
      return ResponseFormatter.error(res, 'Search query is required', 400);
    }
    
    const result = await CountryService.searchCountries(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      continent
    });
    
    ResponseFormatter.paginated(res, result.countries, result.pagination);
  })
);

router.get('/:id', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const country = await CountryService.getCountryById(id);
    
    if (!country) {
      return ResponseFormatter.error(res, 'Country not found', 404);
    }
    
    ResponseFormatter.success(res, { country }, 'Country retrieved successfully');
  })
);

router.get('/code/:code', 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { code } = req.params;
    const country = await CountryService.getCountryByCode(code);
    
    if (!country) {
      return ResponseFormatter.error(res, 'Country not found', 404);
    }
    
    ResponseFormatter.success(res, { country }, 'Country retrieved successfully');
  })
);

// Protected routes (admin only)
router.post('/', 
  authenticate, 
  isAdmin, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const countryData = req.body;
    const country = await CountryService.createCountry(countryData);
    
    ResponseFormatter.success(res, { country }, 'Country created successfully', 201);
  })
);

router.put('/:id', 
  authenticate, 
  isAdmin, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const country = await CountryService.updateCountry(id, updateData);
    
    if (!country) {
      return ResponseFormatter.error(res, 'Country not found', 404);
    }
    
    ResponseFormatter.success(res, { country }, 'Country updated successfully');
  })
);

router.delete('/:id', 
  authenticate, 
  isAdmin, 
  ErrorHandler.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const country = await CountryService.deleteCountry(id);
    
    if (!country) {
      return ResponseFormatter.error(res, 'Country not found', 404);
    }
    
    ResponseFormatter.success(res, { country }, 'Country deleted successfully');
  })
);

module.exports = router;
