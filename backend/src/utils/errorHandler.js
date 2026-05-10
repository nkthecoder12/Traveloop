const ResponseFormatter = require('./responseFormatter');

/**
 * Centralized Error Handler
 * Handles all types of errors consistently across the application
 */

class ErrorHandler {
  /**
   * Handle validation errors
   * @param {Error} err - Error object
   * @param {Object} res - Express response object
   */
  static handleValidationError(err, res) {
    if (err.errors && Array.isArray(err.errors)) {
      return ResponseFormatter.validationError(res, err.errors);
    }
    return ResponseFormatter.error(res, 'Validation failed', 400, err.message);
  }

  /**
   * Handle JWT errors
   * @param {Error} err - Error object
   * @param {Object} res - Express response object
   */
  static handleJWTError(err, res) {
    if (err.name === 'JsonWebTokenError') {
      return ResponseFormatter.error(res, 'Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
      return ResponseFormatter.error(res, 'Token expired', 401);
    }
    return ResponseFormatter.error(res, 'Authentication error', 401);
  }

  /**
   * Handle database errors
   * @param {Error} err - Error object
   * @param {Object} res - Express response object
   */
  static handleDatabaseError(err, res) {
    console.error('Database error:', err);
    
    // Prisma unique constraint error
    if (err.code === 'P2002') {
      const target = err.meta?.target || [];
      if (target.includes('email')) {
        return ResponseFormatter.error(res, 'Email already exists', 409);
      }
      return ResponseFormatter.error(res, 'Resource already exists', 409);
    }

    // Prisma record not found error
    if (err.code === 'P2025') {
      return ResponseFormatter.error(res, 'Resource not found', 404);
    }

    // Prisma foreign key constraint error
    if (err.code === 'P2003') {
      return ResponseFormatter.error(res, 'Invalid reference', 400);
    }

    return ResponseFormatter.error(res, 'Database operation failed', 500);
  }

  /**
   * Handle async error wrapper
   * @param {Function} fn - Async function to wrap
   * @returns {Function} - Express middleware function
   */
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  /**
   * Main error handler middleware
   * @param {Error} err - Error object
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function
   */
  static handle(err, req, res, next) {
    console.error('Error occurred:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    // Handle specific error types
    if (err.name === 'ValidationError') {
      return this.handleValidationError(err, res);
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return this.handleJWTError(err, res);
    }

    if (err.code && err.code.startsWith('P')) {
      return this.handleDatabaseError(err, res);
    }

    // Handle file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return ResponseFormatter.error(res, 'File too large. Maximum size is 10MB', 413);
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
      return ResponseFormatter.error(res, 'Too many files uploaded', 413);
    }

    // Default error handler
    return ResponseFormatter.error(
      res,
      process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
      err.statusCode || 500,
      process.env.NODE_ENV === 'development' ? err.stack : null
    );
  }
}

module.exports = ErrorHandler;
