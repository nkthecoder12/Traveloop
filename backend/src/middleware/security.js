const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Security Middleware
 * Enhanced security features for production-ready application
 */
class SecurityMiddleware {
  /**
   * Advanced rate limiting with different limits for different routes
   * @param {Object} options - Rate limit options
   * @returns {Function} Express middleware
   */
  static createRateLimiter(options = {}) {
    const {
      windowMs = 15 * 60 * 1000, // 15 minutes
      max = 100, // General limit
      message = 'Too many requests, please try again later.',
      standardHeaders = true,
      legacyHeaders = false,
      keyGenerator = (req) => req.ip,
      skip = (req) => req.url.includes('/health') || req.url.includes('/api/docs')
    } = options;

    return rateLimit({
      windowMs,
      max,
      message,
      standardHeaders,
      legacyHeaders,
      keyGenerator,
      skip
    });
  }

  /**
   * Strict rate limiting for authentication routes
   * @returns {Function} Express middleware
   */
  static authRateLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Stricter limit for auth
      message: 'Too many authentication attempts, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => req.ip,
      skipSuccessfulRequests: true
    });
  }

  /**
   * Rate limiting for file uploads
   * @returns {Function} Express middleware
   */
  static uploadRateLimiter() {
    return rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 10, // 10 uploads per hour
      message: 'Too many file uploads, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => req.ip
    });
  }

  /**
   * Enhanced helmet configuration
   * @returns {Function} Express middleware
   */
  static helmetConfig() {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
          upgradeInsecureRequests: false
        }
      },
      crossOriginEmbedderPolicy: { policy: 'require-corp' },
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: 'deny' },
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
      },
      ieNoOpen: true,
      noSniff: true,
      originAgentCluster: true,
      permittedCrossDomainPolicies: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      xssFilter: true
    });
  }

  /**
   * Request validation middleware
   * @param {Object} options - Validation options
   * @returns {Function} Express middleware
   */
  static requestValidator(options = {}) {
    const {
      maxBodySize = '10mb',
      allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedContentTypes = ['application/json', 'multipart/form-data'],
      sanitizeInput = true
    } = options;

    return (req, res, next) => {
      // Validate request method
      if (!allowedMethods.includes(req.method)) {
        return ResponseFormatter.error(res, 'Method not allowed', 405);
      }

      // Validate content type
      const contentType = req.get('Content-Type');
      if (allowedContentTypes.length > 0 && !allowedContentTypes.some(type => contentType?.includes(type))) {
        return ResponseFormatter.error(res, 'Content type not allowed', 415);
      }

      // Validate body size
      const contentLength = req.get('Content-Length');
      if (contentLength && parseInt(contentLength) > this.parseSize(maxBodySize)) {
        return ResponseFormatter.error(res, 'Request body too large', 413);
      }

      // Sanitize input if enabled
      if (sanitizeInput && req.body) {
        req.body = this.sanitizeObject(req.body);
      }

      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');

      next();
    };
  }

  /**
   * CORS configuration
   * @param {Object} options - CORS options
   * @returns {Function} Express middleware
   */
  static corsConfig(options = {}) {
    const {
      allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"],
      allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials = true,
      maxAge = 86400 // 24 hours
    } = options;

    return (req, res, next) => {
      const origin = req.headers.origin;
      
      // Check if origin is allowed
      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else if (allowedOrigins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', allowedOrigins.join(', '));
        res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
        res.setHeader('Access-Control-Allow-Credentials', credentials.toString());
        res.setHeader('Access-Control-Max-Age', maxAge.toString());
        return res.status(200).end();
      }

      // Set CORS headers for actual requests
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
      res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
      res.setHeader('Access-Control-Allow-Credentials', credentials.toString());
      res.setHeader('Access-Control-Max-Age', maxAge.toString());

      next();
    };
  }

  /**
   * IP whitelist middleware
   * @param {Array} whitelist - Array of allowed IPs
   * @returns {Function} Express middleware
   */
  static ipWhitelist(whitelist = []) {
    return (req, res, next) => {
      const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
      
      if (whitelist.length > 0 && !whitelist.includes(clientIP)) {
        return ResponseFormatter.error(res, 'Access denied from this IP', 403);
      }

      next();
    };
  }

  /**
   * API key validation middleware
   * @param {Object} options - API key options
   * @returns {Function} Express middleware
   */
  static apiKeyValidator(options = {}) {
    const {
      headerName = 'X-API-Key',
      validKeys = [],
      skipPaths = ['/health', '/api/docs']
    } = options;

    return (req, res, next) => {
      // Skip validation for certain paths
      if (skipPaths.some(path => req.path.includes(path))) {
        return next();
      }

      const apiKey = req.headers[headerName.toLowerCase()];
      
      if (!apiKey) {
        return ResponseFormatter.error(res, 'API key required', 401);
      }

      if (validKeys.length > 0 && !validKeys.includes(apiKey)) {
        return ResponseFormatter.error(res, 'Invalid API key', 401);
      }

      // Add API key info to request for downstream use
      req.apiKey = apiKey;
      next();
    };
  }

  /**
   * Request timeout middleware
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Function} Express middleware
   */
  static requestTimeout(timeout = 30000) { // 30 seconds default
    return (req, res, next) => {
      const timer = setTimeout(() => {
        if (!res.headersSent) {
          return ResponseFormatter.error(res, 'Request timeout', 408);
        }
      }, timeout);

      // Clear timeout when response is sent
      res.on('finish', () => {
        clearTimeout(timer);
      });

      next();
    };
  }

  /**
   * Parse size string to bytes
   * @param {string} sizeStr - Size string (e.g., '10mb')
   * @returns {number} Size in bytes
   */
  static parseSize(sizeStr) {
    const units = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
    const match = sizeStr.toLowerCase().match(/^(\d+)(b|kb|mb|gb)$/);
    
    if (!match) {
      return 0;
    }
    
    const [, size, unit] = match;
    return parseInt(size) * units[unit];
  }

  /**
   * Sanitize object recursively
   * @param {*} obj - Object to sanitize
   * @returns {*} Sanitized object
   */
  static sanitizeObject(obj) {
    if (typeof obj !== 'object' && obj !== null) {
      return obj;
    }

    const sanitized = Array.isArray(obj) ? [] : {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        
        if (typeof value === 'string') {
          sanitized[key] = this.sanitizeString(value);
        } else if (typeof value === 'object' && value !== null) {
          sanitized[key] = this.sanitizeObject(value);
        } else if (Array.isArray(value)) {
          sanitized[key] = value.map(item => 
            typeof item === 'string' ? this.sanitizeString(item) : item
          );
        } else {
          sanitized[key] = value;
        }
      }
    }
    
    return sanitized;
  }

  /**
   * Sanitize string for XSS protection
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  static sanitizeString(str) {
    if (typeof str !== 'string') {
      return str;
    }
    
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }
}

module.exports = SecurityMiddleware;
