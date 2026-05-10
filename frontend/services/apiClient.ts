// Base API Client with authentication and error handling
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    // Get auth token from cookies or localStorage
    const token = this.getAuthToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        ...this.defaultHeaders,
      };
    }
    return this.defaultHeaders;
  }

  private getAuthToken(): string | null {
    // Try to get token from multiple sources
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const token = localStorage.getItem('accessToken');
      if (token) return token;
      
      // Check cookies
      const cookies = document.cookie.split(';');
      const accessTokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('accessToken=')
      );
      if (accessTokenCookie) {
        return accessTokenCookie.split('=')[1];
      }
    }
    return null;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || data.error || 'Request failed',
        status: response.status,
        code: data.code,
      };
      throw error;
    }

    if (!data.success) {
      const error: ApiError = {
        message: data.message || data.error || 'API request failed',
        status: response.status,
      };
      throw error;
    }

    return data.data || data;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    // Handle file uploads
    if (config.body instanceof FormData) {
      // Remove Content-Type header for FormData (browser sets it automatically)
      delete (config.headers as Record<string, string>)['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw {
          message: 'Network error. Please check your connection.',
          status: 0,
        };
      }
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return this.request<T>(url.pathname, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append('photo', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
    });
  }

  // Helper methods for common patterns
  async postWithAuth<T>(endpoint: string, data?: any): Promise<T> {
    return this.post<T>(endpoint, data);
  }

  async getWithAuth<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.get<T>(endpoint, params);
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, ApiError };
export { ApiClient };
