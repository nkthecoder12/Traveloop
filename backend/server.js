const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables immediately
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const tripRoutes = require('./src/routes/trips');
const searchRoutes = require('./src/routes/search');
const adminRoutes = require('./src/routes/admin');
const aiRoutes = require('./src/routes/ai');

// Import database and error handler
const { connectDB, disconnectDB } = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (if you have file uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: process.env.DATABASE_URL ? 'configured' : 'not configured'
  });
});

// Debug endpoint to check database connection
app.get('/api/debug/db', async (req, res) => {
  try {
    // Use existing Prisma client from config
    const { prisma } = require('./src/config/database');
    
    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    res.json({
      status: 'connected',
      database_url: process.env.DATABASE_URL ? 'set' : 'not set',
      test_result: result
    });
  } catch (error) {
    console.error('Database debug error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      database_url: process.env.DATABASE_URL ? 'set' : 'not set'
    });
  }
});

// Main API routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Traveloop API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use(errorHandler);

// Custom error handling for database issues
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Handle database connection errors
  if (err.message && err.message.includes('Can\'t reach database server')) {
    return res.status(503).json({ 
      message: 'Database unavailable. Please try again in a few seconds.' 
    });
  }
  
  // Handle file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      message: 'File too large. Maximum size is 10MB.' 
    });
  }
  
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

module.exports = app;
