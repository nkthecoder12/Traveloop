const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Import utilities and middleware
const ResponseFormatter = require('./utils/responseFormatter');
const ErrorHandler = require('./utils/errorHandler');
const SecurityMiddleware = require('./middleware/security');
const logger = require('./middleware/logger');

// Import routes - UNIFIED ARCHITECTURE
const authRoutes = require('./routes/auth_v2');
const userRoutes = require('./routes/users_new');
const tripRoutes = require('./routes/trips_v2');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');
const countryRoutes = require('./routes/countries');
const cityRoutes = require('./routes/cities');
const aiRoutes = require('./routes/ai_v2'); // NEW: Unified AI routes

// Import database
const { connectDB, disconnectDB } = require('./config/database');

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'FRONTEND_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(SecurityMiddleware.helmetConfig());
app.use(SecurityMiddleware.corsConfig());
app.use(SecurityMiddleware.requestValidator({
  maxBodySize: '10mb',
  sanitizeInput: true
}));

// Rate limiting with different limits
app.use('/api/auth', SecurityMiddleware.authRateLimiter());
app.use('/api/upload', SecurityMiddleware.uploadRateLimiter());
app.use('/api/', SecurityMiddleware.createRateLimiter({
  max: 200, // Higher limit for general API
  message: 'Too many requests, please try again later.'
}));

// Body parsing middleware
app.use(express.json({ 
  limit: '10mb',
  strict: true 
}));
app.use(cookieParser());
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Request logging
app.use(logger);

// Serve uploaded files securely
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// API documentation endpoint - UNIFIED ARCHITECTURE
app.get('/api', (req, res) => {
  ResponseFormatter.success(res, {
    name: 'Traveloop API',
    version: '2.1.0 - UNIFIED',
    description: 'Unified AI-assisted travel planning platform',
    status: 'production',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    architecture: {
      type: 'Unified Trip System',
      aiIntegration: 'Trip-compatible JSON generation',
      manualFlow: 'Standard TripService',
      aiFlow: 'AI → TripIntegrationService → TripService',
      database: 'Single Trip schema for both flows'
    },
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      trips: '/api/trips',
      search: '/api/search',
      admin: '/api/admin',
      countries: '/api/countries',
      cities: '/api/cities',
      ai: '/api/ai'
    },
    documentation: '/api/docs',
    health: '/api/health',
    support: 'support@traveloop.com',
    unifiedFlow: {
      manual: 'User creates → POST /trips → TripService → Database',
      ai: 'User preferences → POST /ai/generate-itinerary → AI generates Trip JSON → Frontend edits → POST /trips → TripService → Database'
    }
  });
});

// Health check endpoint with detailed status
app.get('/api/health', ErrorHandler.asyncHandler(async (req, res) => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_URL ? 'connected' : 'disconnected',
    memory: process.memoryUsage(),
    version: '2.1.0 - UNIFIED',
    architecture: 'Unified Trip System',
    aiIntegration: 'Trip-compatible',
    unifiedDatabase: true
  };

  // Test database connection
  try {
    const { prisma } = require('./config/database');
    await prisma.$queryRaw`SELECT 1 as test`;
    healthStatus.database = 'connected';
  } catch (error) {
    healthStatus.database = 'error';
    healthStatus.database_error = error.message;
  }

  ResponseFormatter.success(res, healthStatus);
}));

// API documentation endpoint - UNIFIED ARCHITECTURE
app.get('/api/docs', (req, res) => {
  ResponseFormatter.success(res, {
    title: 'Traveloop API Documentation - Unified Architecture',
    version: '2.1.0',
    description: 'Complete API documentation for the unified AI-assisted travel planning platform',
    baseUrl: `${process.env.FRONTEND_URL}/api`,
    architecture: {
      type: 'Unified Trip System',
      principle: 'Single Trip schema for both manual and AI-generated trips',
      aiRole: 'Trip generation accelerator, not separate system'
    },
    unifiedFlow: {
      manual: {
        step1: 'User manually creates trip structure',
        step2: 'Frontend builds trip data',
        step3: 'POST /trips',
        step4: 'TripService.createTrip()',
        step5: 'Save to Trip schema'
      },
      ai: {
        step1: 'User enters trip preferences',
        step2: 'POST /ai/generate-itinerary',
        step3: 'AI generates Trip-compatible JSON',
        step4: 'Frontend loads SAME Trip Builder',
        step5: 'User edits generated trip',
        step6: 'POST /trips',
        step7: 'TripService.createTrip()',
        step8: 'Save to SAME Trip schema'
      }
    },
    baseUrl: `${process.env.FRONTEND_URL}/api`,
    endpoints: {
      authentication: {
        'POST /auth/signup': 'Register new user',
        'POST /auth/login': 'User login',
        'POST /auth/refresh': 'Refresh access token',
        'POST /auth/logout': 'User logout',
        'GET /auth/me': 'Get current user profile'
      },
      users: {
        'GET /users/profile': 'Get user profile',
        'PUT /users/profile': 'Update user profile',
        'POST /users/profile-photo': 'Upload profile photo',
        'GET /users/statistics': 'Get user statistics',
        'GET /users/preferences': 'Get user preferences',
        'PUT /users/preferences': 'Update user preferences',
        'GET /users/trips': 'Get user trips',
        'DELETE /users/account': 'Delete user account'
      },
      trips: {
        'POST /trips': 'Create new trip (BOTH manual and AI)',
        'GET /trips': 'Get user trips',
        'GET /trips/:id': 'Get trip by ID',
        'PUT /trips/:id': 'Update trip',
        'DELETE /trips/:id': 'Delete trip',
        'POST /trips/:id/stops': 'Add trip stop',
        'GET /trips/:id/stops': 'Get trip stops',
        'PUT /trips/:id/stops/:stopId': 'Update trip stop',
        'DELETE /trips/:id/stops/:stopId': 'Delete trip stop',
        'GET /trips/:id/statistics': 'Get trip statistics',
        'POST /trips/:id/duplicate': 'Duplicate trip',
        'POST /trips/:id/share': 'Share trip',
        'GET /trips/:id/share/:token': 'Access shared trip'
      },
      ai: {
        'POST /ai/generate-itinerary': 'Generate Trip-compatible JSON (NEW)',
        'POST /ai/create-trip-from-draft': 'Create trip from AI draft (NEW)',
        'POST /ai/preview-trip': 'Preview AI trip without saving (NEW)',
        'PUT /ai/update-trip/:tripId': 'Update trip with AI modifications (NEW)',
        'POST /ai/recommendations': 'Get AI travel recommendations',
        'GET /ai/destinations': 'Get destination recommendations',
        'GET /ai/activities': 'Get activity recommendations',
        'GET /ai/budget-tips': 'Get budget optimization tips',
        'GET /ai/packing-advice': 'Get packing advice',
        'POST /ai/optimize-trip': 'AI trip optimization',
        'POST /ai/chat': 'AI travel chat assistant'
      },
      countries: {
        'GET /countries': 'Get all countries',
        'GET /countries/popular': 'Get popular countries',
        'GET /countries/search': 'Search countries',
        'GET /countries/:id': 'Get country by ID',
        'GET /countries/code/:code': 'Get country by code',
        'POST /countries': 'Create country (admin)',
        'PUT /countries/:id': 'Update country (admin)',
        'DELETE /countries/:id': 'Delete country (admin)'
      },
      cities: {
        'GET /cities': 'Get all cities',
        'GET /cities/popular': 'Get popular cities',
        'GET /cities/search': 'Search cities',
        'GET /cities/:id': 'Get city by ID',
        'GET /cities/budget': 'Get cities by budget range',
        'GET /cities/continent/:continent': 'Get cities by continent',
        'POST /cities': 'Create city (authenticated)',
        'PUT /cities/:id': 'Update city (authenticated)',
        'DELETE /cities/:id': 'Delete city (authenticated)'
      }
    },
    authentication: {
      type: 'JWT with refresh tokens',
      description: 'Uses HTTP-only cookies for security',
      tokenExpiry: {
        accessToken: '15 minutes',
        refreshToken: '7 days'
      }
    },
    security: {
      features: [
        'Helmet.js for security headers',
        'Rate limiting with different limits per route',
        'CORS configuration',
        'Request validation and sanitization',
        'IP whitelisting support'
      ]
    },
    unifiedArchitecture: {
      database: 'Single Trip schema for both flows',
      aiIntegration: 'Trip-compatible JSON generation',
      frontendCompatibility: 'Same Trip Builder for both flows',
      persistence: 'Same TripService for both flows'
    },
    examples: {
      manualTrip: {
        description: 'Manual trip creation flow',
        steps: [
          'User builds trip structure in frontend',
          'POST /trips with trip data',
          'TripService.createTrip() processes data',
          'Save to Trip schema'
        ]
      },
      aiTrip: {
        description: 'AI-assisted trip creation flow',
        steps: [
          'User enters preferences',
          'POST /ai/generate-itinerary',
          'AI returns Trip-compatible JSON',
          'Frontend loads SAME Trip Builder',
          'User edits generated trip',
          'POST /trips with edited data',
          'TripService.createTrip() processes data',
          'Save to SAME Trip schema'
        ]
      },
      aiResponse: {
        url: '/ai/generate-itinerary',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer <access_token>',
          'Content-Type': 'application/json'
        },
        body: {
          destination: 'Paris',
          days: 5,
          budget: 3000,
          travelStyle: 'cultural',
          interests: ['museums', 'food', 'history'],
          travelers: 2
        },
        response: {
          success: true,
          data: {
            trip: {
              title: '5-Day Paris Cultural Adventure',
              budget: 3000,
              travelStyle: 'cultural',
              startDate: '2024-06-01',
              endDate: '2024-06-05',
              stops: [
                {
                  city: 'Paris',
                  country: 'France',
                  order: 1,
                  activities: [
                    {
                      title: 'Eiffel Tower Visit',
                      description: 'Visit the iconic Eiffel Tower',
                      time: '09:00',
                      duration: 120,
                      estimatedCost: 25,
                      category: 'sightseeing',
                      location: 'Eiffel Tower',
                      tips: ['Book tickets online', 'Go early to avoid crowds']
                    }
                  ]
                }
              ]
            },
            budgetBreakdown: {
              total: 3000,
              accommodation: 1050,
              transportation: 750,
              food: 750,
              activities: 300,
              miscellaneous: 150
            },
            recommendations: {
              accommodations: [],
              transportation: [],
              packingChecklist: [],
              tips: []
            }
          }
        }
      }
    }
  });
});

// Mount API routes with versioning - UNIFIED ARCHITECTURE
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/countries', countryRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/ai', aiRoutes); // NEW: Unified AI routes

// Legacy routes for backward compatibility
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/ai', aiRoutes); // NEW: Unified AI routes

// Global error handler
app.use(ErrorHandler.handle);

// 404 handler
app.use('*', (req, res) => {
  ResponseFormatter.error(res, 'Endpoint not found', 404, {
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: '/api',
    documentation: '/api/docs',
    unifiedArchitecture: true
  });
});

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  gracefulShutdown('unhandledRejection');
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown('uncaughtException');
});

process.on("SIGTERM", () => gracefulShutdown('SIGTERM'));
process.on("SIGINT", () => gracefulShutdown('SIGINT'));

// Start server with environment-specific configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Traveloop API Server v2.1.0 (UNIFIED) started on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Architecture: Unified Trip System`);
  console.log(`🤖 AI Integration: Trip-compatible JSON generation`);
  console.log(`📝 Status: Production Ready - Unified Architecture`);
});

module.exports = app;
