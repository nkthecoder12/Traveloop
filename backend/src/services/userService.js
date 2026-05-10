const { prisma } = require('../config/database');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * User Service
 * Handles all user-related business logic
 */
class UserService {
  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Object|null} User profile or null
   */
  static async getUserProfile(userId) {
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
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            trips: true,
            notes: true,
            favoriteDestinations: true
          }
        }
      }
    });
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} profileData - Profile update data
   * @returns {Object} Updated user profile
   */
  static async updateUserProfile(userId, profileData) {
    const {
      name,
      bio,
      avatar,
      language,
      privacy,
      notifications,
      emailVerified
    } = profileData;

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (bio !== undefined) updateData.bio = bio?.trim();
    if (avatar !== undefined) updateData.avatar = avatar?.trim();
    if (language !== undefined) updateData.language = language?.trim();
    if (privacy !== undefined) updateData.privacy = privacy;
    if (notifications !== undefined) updateData.notifications = notifications;
    if (emailVerified !== undefined) updateData.emailVerified = emailVerified;
    updateData.lastLoginAt = new Date();

    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
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
        emailVerified: true,
        lastLoginAt: true,
        updatedAt: true
      }
    });
  }

  /**
   * Upload profile photo
   * @param {string} userId - User ID
   * @param {Object} fileData - File upload data
   * @returns {Object} Updated user profile with photo URL
   */
  static async uploadProfilePhoto(userId, fileData) {
    const { filename, mimetype, size, buffer } = fileData;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(mimetype)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = mimetype.split('/')[1];
    const uniqueFilename = `profile_${userId}_${timestamp}.${extension}`;

    // In production, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll simulate upload and return a URL
    const photoUrl = `/uploads/profiles/${uniqueFilename}`;

    // Update user profile with photo URL
    return await prisma.user.update({
      where: { id: userId },
      data: { avatar: photoUrl },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        updatedAt: true
      }
    });
  }

  /**
   * Update user preferences
   * @param {string} userId - User ID
   * @param {Object} preferences - User preferences
   * @returns {Object} Updated user preferences
   */
  static async updateUserPreferences(userId, preferences) {
    const {
      travelStyle,
      budgetRange,
      preferredAccommodation,
      transportationPreference,
      dietaryRestrictions,
      interests,
      language,
      timezone
    } = preferences;

    const updateData = {};
    if (travelStyle !== undefined) updateData.travelStyle = travelStyle;
    if (budgetRange !== undefined) updateData.budgetRange = budgetRange;
    if (preferredAccommodation !== undefined) updateData.preferredAccommodation = preferredAccommodation;
    if (transportationPreference !== undefined) updateData.transportationPreference = transportationPreference;
    if (dietaryRestrictions !== undefined) updateData.dietaryRestrictions = dietaryRestrictions;
    if (interests !== undefined) updateData.interests = interests;
    if (language !== undefined) updateData.language = language;
    if (timezone !== undefined) updateData.timezone = timezone;

    // Store preferences in a separate preferences table or JSON field
    return await prisma.user.update({
      where: { id: userId },
      data: {
        preferences: updateData
      },
      select: {
        id: true,
        name: true,
        email: true,
        preferences: true,
        updatedAt: true
      }
    });
  }

  /**
   * Get user statistics
   * @param {string} userId - User ID
   * @returns {Object} User statistics
   */
  static async getUserStatistics(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            trips: true,
            notes: true,
            favoriteDestinations: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      totalTrips: user._count.trips,
      totalNotes: user._count.notes,
      favoriteDestinations: user._count.favoriteDestinations,
      memberSince: user.createdAt,
      lastLogin: user.lastLoginAt,
      profileCompleteness: this.calculateProfileCompleteness(user)
    };
  }

  /**
   * Calculate profile completeness percentage
   * @param {Object} user - User object
   * @returns {number} Profile completeness percentage
   */
  static calculateProfileCompleteness(user) {
    const fields = [
      { field: 'name', weight: 20 },
      { field: 'bio', weight: 15 },
      { field: 'avatar', weight: 15 },
      { field: 'language', weight: 10 },
      { field: 'preferences', weight: 20 },
      { field: 'emailVerified', weight: 20 }
    ];

    let completedFields = 0;
    let totalWeight = 0;

    fields.forEach(({ field, weight }) => {
      totalWeight += weight;
      
      if (field === 'name' && user.name) completedFields += weight;
      if (field === 'bio' && user.bio) completedFields += weight;
      if (field === 'avatar' && user.avatar) completedFields += weight;
      if (field === 'language' && user.language) completedFields += weight;
      if (field === 'preferences' && user.preferences) completedFields += weight;
      if (field === 'emailVerified' && user.emailVerified) completedFields += weight;
    });

    return Math.round((completedFields / totalWeight) * 100);
  }

  /**
   * Search users (admin function)
   * @param {Object} options - Search options
   * @returns {Object} Search results with pagination
   */
  static async searchUsers(options = {}) {
    const { page = 1, limit = 20, search, role } = options;
    const skip = (page - 1) * limit;

    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (role) {
      where.role = role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          createdAt: true,
          lastLoginAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Delete user account (admin function)
   * @param {string} userId - User ID
   * @returns {Object} Deletion result
   */
  static async deleteUser(userId) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete user and all related data
    return await prisma.user.delete({
      where: { id: userId },
      include: {
        trips: true,
        notes: true,
        refreshTokens: true,
        favoriteDestinations: true
      }
    });
  }

  /**
   * Update user last login
   * @param {string} userId - User ID
   * @returns {Object} Updated user
   */
  static async updateLastLogin(userId) {
    return await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
      select: {
        id: true,
        lastLoginAt: true
      }
    });
  }

  /**
   * Verify user email
   * @param {string} userId - User ID
   * @returns {Object} Updated user
   */
  static async verifyEmail(userId) {
    return await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
      select: {
        id: true,
        email: true,
        emailVerified: true
      }
    });
  }
}

module.exports = UserService;
