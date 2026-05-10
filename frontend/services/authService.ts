import { apiClient } from './apiClient';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  RefreshTokenResponse,
  User,
  ApiError 
} from '@/types/api';

class AuthService {
  // Store auth tokens in localStorage for client-side access
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private static readonly USER_KEY = 'user';

  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Store tokens and user data
      this.setAuthData(response);
      
      return response;
    } catch (error) {
      this.handleAuthError(error as ApiError);
      throw error;
    }
  }

  // Register new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
      
      // Store tokens and user data
      this.setAuthData(response);
      
      return response;
    } catch (error) {
      this.handleAuthError(error as ApiError);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Even if backend logout fails, clear local data
      console.warn('Backend logout failed:', error);
    } finally {
      // Always clear local auth data
      this.clearAuthData();
    }
  }

  // Refresh access token
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh');
      
      // Update access token and user data
      if (response.tokens?.accessToken) {
        localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, response.tokens.accessToken);
      }
      
      if (response.user) {
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      // If refresh fails, clear auth data and redirect to login
      this.clearAuthData();
      throw error;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.getWithAuth<User>('/auth/me');
      
      // Update stored user data
      localStorage.setItem(AuthService.USER_KEY, JSON.stringify(response));
      
      return response;
    } catch (error) {
      // If getting current user fails, clear auth data
      this.clearAuthData();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(AuthService.ACCESS_TOKEN_KEY);
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(AuthService.REFRESH_TOKEN_KEY);
  }

  // Get stored user data
  getStoredUser(): User | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Set auth data from response
  private setAuthData(response: AuthResponse): void {
    if (response.tokens?.accessToken) {
      localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, response.tokens.accessToken);
    }
    
    if (response.tokens?.refreshToken) {
      localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, response.tokens.refreshToken);
    }
    
    if (response.user) {
      localStorage.setItem(AuthService.USER_KEY, JSON.stringify(response.user));
    }
  }

  // Clear all auth data
  private clearAuthData(): void {
    localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
  }

  // Check if token is expired (basic JWT check)
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch {
      return true; // If we can't parse the token, consider it expired
    }
  }

  // Handle authentication errors
  private handleAuthError(error: ApiError): void {
    // Clear auth data on authentication errors
    if (error.status === 401 || error.status === 403) {
      this.clearAuthData();
    }
  }

  // Auto refresh token if needed
  async ensureValidToken(): Promise<void> {
    const token = this.getAccessToken();
    if (!token) return;

    // Check if token is expired or will expire soon (within 5 minutes)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      const timeUntilExpiry = payload.exp - now;
      
      // If token expires within 5 minutes, refresh it
      if (timeUntilExpiry < 300) {
        await this.refreshToken();
      }
    } catch {
      // If we can't parse the token, try to refresh
      await this.refreshToken();
    }
  }

  // Initialize auth state on app load
  initializeAuth(): User | null {
    const user = this.getStoredUser();
    const token = this.getAccessToken();
    
    if (user && token && !this.isTokenExpired(token)) {
      return user;
    }
    
    // Clear invalid data
    this.clearAuthData();
    return null;
  }
}

// Create singleton instance
export const authService = new AuthService();

// Export for convenience
export { AuthService };
