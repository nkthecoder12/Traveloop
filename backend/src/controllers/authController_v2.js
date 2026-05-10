const AuthService = require('../services/authService');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Authentication Controller
 * Handles HTTP requests and responses for authentication
 */
class AuthController {
  /**
   * Register new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await AuthService.findUserByEmail(email);
      if (existingUser) {
        return ResponseFormatter.error(res, 'User already exists with this email', 409);
      }

      // Create new user
      const user = await AuthService.createUser({ name, email, password, role });

      // Generate tokens
      const accessToken = AuthService.generateAccessToken(user.id);
      const refreshToken = AuthService.generateRefreshToken(user.id);

      // Store refresh token
      await AuthService.storeRefreshToken(refreshToken, user.id);

      // Set HTTP-only cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return ResponseFormatter.success(res, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }, 'User registered successfully', 201);

    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await AuthService.findUserByEmail(email);
      if (!user) {
        return ResponseFormatter.error(res, 'Invalid email or password', 401);
      }

      // Verify password
      const isPasswordValid = await AuthService.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return ResponseFormatter.error(res, 'Invalid email or password', 401);
      }

      // Generate tokens
      const accessToken = AuthService.generateAccessToken(user.id);
      const refreshToken = AuthService.generateRefreshToken(user.id);

      // Store refresh token
      await AuthService.storeRefreshToken(refreshToken, user.id);

      // Set HTTP-only cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return ResponseFormatter.success(res, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }, 'Login successful');

    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getMe(req, res) {
    try {
      const user = await AuthService.findUserById(req.user.id);
      if (!user) {
        return ResponseFormatter.error(res, 'User not found', 404);
      }

      return ResponseFormatter.success(res, { user }, 'Profile retrieved successfully');

    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateProfile(req, res) {
    try {
      const { name, bio, avatar, language, privacy, notifications } = req.body;

      const user = await AuthService.updateUserProfile(req.user.id, {
        name,
        bio,
        avatar,
        language,
        privacy,
        notifications
      });

      return ResponseFormatter.success(res, { user }, 'Profile updated successfully');

    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async logout(req, res) {
    try {
      // Clear cookies
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      // Delete refresh token from database
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
        await AuthService.deleteRefreshToken(refreshToken);
      }

      return ResponseFormatter.success(res, null, 'Logout successful');

    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh access token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return ResponseFormatter.error(res, 'No refresh token provided', 401);
      }

      // Verify refresh token
      const decoded = AuthService.verifyToken(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
      );

      // Check if refresh token exists and is valid
      const storedToken = await AuthService.findRefreshToken(refreshToken);
      if (!storedToken || storedToken.expiresAt < new Date()) {
        // Delete expired token
        if (storedToken) {
          await AuthService.deleteRefreshToken(refreshToken);
        }
        return ResponseFormatter.error(res, 'Invalid or expired refresh token', 401);
      }

      // Generate new access token
      const accessToken = AuthService.generateAccessToken(storedToken.userId);

      // Set new access token cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      return ResponseFormatter.success(res, {
        user: {
          id: storedToken.user.id,
          name: storedToken.user.name,
          email: storedToken.user.email,
          role: storedToken.user.role,
        },
        tokens: {
          accessToken
        }
      }, 'Token refreshed successfully');

    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return ResponseFormatter.error(res, 'Invalid refresh token', 401);
      }
      throw error;
    }
  }
}

module.exports = {
  register: AuthController.register,
  login: AuthController.login,
  getMe: AuthController.getMe,
  updateProfile: AuthController.updateProfile,
  logout: AuthController.logout,
  refreshToken: AuthController.refreshToken
};
