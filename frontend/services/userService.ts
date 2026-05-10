import { apiClient } from './apiClient';
import type { 
  User, 
  UserPreferences, 
  UserStats,
  ApiError 
} from '@/types/api';

class UserService {
  // Get user profile
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.getWithAuth<User>('/users/profile');
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>('/users/profile', profileData);
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Upload profile photo
  async uploadProfilePhoto(file: File): Promise<User> {
    try {
      const response = await apiClient.upload<User>('/users/profile-photo', file);
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Get user statistics
  async getStatistics(): Promise<UserStats> {
    try {
      const response = await apiClient.getWithAuth<UserStats>('/users/statistics');
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Get user preferences
  async getPreferences(): Promise<UserPreferences> {
    try {
      const response = await apiClient.getWithAuth<UserPreferences>('/users/preferences');
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Update user preferences
  async updatePreferences(preferences: UserPreferences): Promise<User> {
    try {
      const response = await apiClient.put<User>('/users/preferences', preferences);
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Get user's trips
  async getUserTrips(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{ trips: any[]; pagination: any }> {
    try {
      const response = await apiClient.getWithAuth('/users/trips', params);
      return response as { trips: any[]; pagination: any };
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Get user's favorite destinations
  async getFavoriteDestinations(): Promise<any[]> {
    try {
      const response = await apiClient.getWithAuth('/users/favorites');
      return response as any[];
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Add favorite destination
  async addFavoriteDestination(cityId: string, notes?: string): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/users/favorites', {
        cityId,
        notes
      });
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Remove favorite destination
  async removeFavoriteDestination(cityId: string): Promise<any> {
    try {
      const response = await apiClient.delete(`/users/favorites/${cityId}`);
      return response;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    try {
      await apiClient.delete('/users/account');
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Verify email
  async verifyEmail(): Promise<User> {
    try {
      const response = await apiClient.postWithAuth('/users/verify-email');
      return response as User;
    } catch (error) {
      throw this.handleUserError(error as ApiError);
    }
  }

  // Handle user-related errors
  private handleUserError(error: ApiError): ApiError {
    // Add specific error handling for user operations
    if (error.status === 404) {
      error.message = 'User profile not found';
    } else if (error.status === 403) {
      error.message = 'Access denied to user profile';
    } else if (error.status === 409) {
      error.message = 'Profile update conflict';
    }
    
    return error;
  }

  // Helper method to validate profile photo
  validateProfilePhoto(file: File): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Only JPEG, PNG, and WebP images are allowed'
      };
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 5MB'
      };
    }

    return { valid: true };
  }

  // Helper method to create preview URL for profile photo
  createPhotoPreview(file: File): string {
    return URL.createObjectURL(file);
  }

  // Helper method to revoke photo preview URL
  revokePhotoPreview(url: string): void {
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
export const userService = new UserService();

// Export for convenience
export { UserService };
