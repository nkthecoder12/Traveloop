const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token. User not found.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token.' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired.' 
      });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error in authentication.' 
    });
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

const authenticate = authMiddleware;
const isAdmin = adminMiddleware;

module.exports = {
  authMiddleware,
  authenticate,
  adminMiddleware,
  isAdmin
};
