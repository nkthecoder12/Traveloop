/**
 * Centralized Response Formatter
 * Standardizes API responses across the entire application
 */

class ResponseFormatter {
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {*} data - Response data
   * @param {string} message - Success message
   * @param {number} statusCode - HTTP status code
   */
  static success(res, data = null, message = 'Success', statusCode = 200) {
    const response = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };

    res.status(statusCode).json(response);
  }

  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {*} details - Additional error details
   */
  static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
    const response = {
      success: false,
      message,
      error: true,
      details,
      timestamp: new Date().toISOString()
    };

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
      response.message = 'Something went wrong';
      response.details = null;
    }

    res.status(statusCode).json(response);
  }

  /**
   * Validation error response
   * @param {Object} res - Express response object
   * @param {Array} errors - Validation errors array
   */
  static validationError(res, errors) {
    const response = {
      success: false,
      message: 'Validation failed',
      error: true,
      details: errors,
      timestamp: new Date().toISOString()
    };

    res.status(400).json(response);
  }

  /**
   * Paginated response
   * @param {Object} res - Express response object
   * @param {*} data - Response data
   * @param {Object} pagination - Pagination metadata
   * @param {string} message - Success message
   */
  static paginated(res, data, pagination, message = 'Data retrieved successfully') {
    const response = {
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1
      },
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  }
}

module.exports = ResponseFormatter;
