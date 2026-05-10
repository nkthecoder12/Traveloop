const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

/**
 * Authentication Service
 * Handles all authentication business logic
 */
class AuthService {
  /**
   * Generate JWT Access Token
   * @param {string} userId - User ID
   * @returns {string} JWT token
   */
  static generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
  }

  /**
   * Generate JWT Refresh Token
   * @param {string} userId - User ID
   * @returns {string} JWT refresh token
   */
  static generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  /**
   * Hash password using bcrypt
   * @param {string} password - Plain text password
   * @returns {string} Hashed password
   */
  static async hashPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  /**
   * Verify password against hash
   * @param {string} password - Plain text password
   * @param {string} hashedPassword - Hashed password
   * @returns {boolean} Password validity
   */
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Check if user exists by email
   * @param {string} email - User email
   * @returns {Object|null} User object or null
   */
  static async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true
      }
    });
  }

  /**
   * Find user by ID
   * @param {string} userId - User ID
   * @returns {Object|null} User object or null
   */
  static async findUserById(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bio: true,
        avatar: true,
        language: true,
        privacy: true,
        notifications: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  /**
   * Store refresh token in database
   * @param {string} token - Refresh token
   * @param {string} userId - User ID
   * @returns {Object} Created refresh token record
   */
  static async storeRefreshToken(token, userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    return await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  /**
   * Find refresh token in database
   * @param {string} token - Refresh token
   * @returns {Object|null} Refresh token record or null
   */
  static async findRefreshToken(token) {
    return await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  /**
   * Delete refresh token
   * @param {string} token - Refresh token
   */
  static async deleteRefreshToken(token) {
    return await prisma.refreshToken.delete({
      where: { token },
    });
  }

  /**
   * Delete expired refresh tokens
   */
  static async cleanupExpiredTokens() {
    return await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
  }

  /**
   * Create new user
   * @param {Object} userData - User registration data
   * @returns {Object} Created user object
   */
  static async createUser(userData) {
    const { name, email, password, role = 'CUSTOMER' } = userData;
    
    // Hash password
    const hashedPassword = await this.hashPassword(password);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Profile update data
   * @returns {Object} Updated user object
   */
  static async updateUserProfile(userId, updateData) {
    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        language: true,
        privacy: true,
        notifications: true,
        updatedAt: true
      }
    });
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @param {string} secret - JWT secret
   * @returns {Object} Decoded token payload
   */
  static verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = AuthService;
