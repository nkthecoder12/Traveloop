import { apiClient } from './apiClient';
import type { 
  Trip, 
  TripStop, 
  Activity, 
  Budget,
  CreateTripRequest,
  UpdateTripRequest,
  CreateTripStopRequest,
  UpdateTripStopRequest,
  CreateActivityRequest,
  UpdateActivityRequest,
  PaginatedResponse,
  ApiError 
} from '@/types/api';

class TripService {
  // Create new trip
  async createTrip(tripData: CreateTripRequest): Promise<Trip> {
    try {
      const response = await apiClient.postWithAuth<Trip>('/trips', tripData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get all trips for user
  async getUserTrips(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Trip>> {
    try {
      const response = await apiClient.getWithAuth<PaginatedResponse<Trip>>('/trips', params);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get trip by ID
  async getTripById(tripId: string): Promise<Trip> {
    try {
      const response = await apiClient.getWithAuth<Trip>(`/trips/${tripId}`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Update trip
  async updateTrip(tripId: string, tripData: UpdateTripRequest): Promise<Trip> {
    try {
      const response = await apiClient.put<Trip>(`/trips/${tripId}`, tripData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Delete trip
  async deleteTrip(tripId: string): Promise<Trip> {
    try {
      const response = await apiClient.delete<Trip>(`/trips/${tripId}`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Add trip stop
  async addTripStop(tripId: string, stopData: CreateTripStopRequest): Promise<TripStop> {
    try {
      const response = await apiClient.postWithAuth<TripStop>(`/trips/${tripId}/stops`, stopData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get trip stops
  async getTripStops(tripId: string): Promise<TripStop[]> {
    try {
      const response = await apiClient.getWithAuth<TripStop[]>(`/trips/${tripId}/stops`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Update trip stop
  async updateTripStop(stopId: string, stopData: UpdateTripStopRequest): Promise<TripStop> {
    try {
      const response = await apiClient.put<TripStop>(`/trips/stops/${stopId}`, stopData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Delete trip stop
  async deleteTripStop(stopId: string): Promise<TripStop> {
    try {
      const response = await apiClient.delete<TripStop>(`/trips/stops/${stopId}`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Reorder trip stops
  async reorderTripStops(tripId: string, stopOrders: { id: string; order: number }[]): Promise<TripStop[]> {
    try {
      const response = await apiClient.put<TripStop[]>(`/trips/${tripId}/stops/reorder`, {
        stops: stopOrders
      });
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Create activity
  async createActivity(stopId: string, activityData: CreateActivityRequest): Promise<Activity> {
    try {
      const response = await apiClient.postWithAuth<Activity>(`/activities`, {
        stopId,
        ...activityData
      });
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Update activity
  async updateActivity(activityId: string, activityData: UpdateActivityRequest): Promise<Activity> {
    try {
      const response = await apiClient.put<Activity>(`/activities/${activityId}`, activityData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Delete activity
  async deleteActivity(activityId: string): Promise<Activity> {
    try {
      const response = await apiClient.delete<Activity>(`/activities/${activityId}`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Reorder activities
  async reorderActivities(stopId: string, activityOrders: { id: string; order: number }[]): Promise<Activity[]> {
    try {
      const response = await apiClient.put<Activity[]>(`/activities/reorder`, {
        stopId,
        activities: activityOrders
      });
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get trip statistics
  async getTripStatistics(tripId: string): Promise<any> {
    try {
      const response = await apiClient.getWithAuth(`/trips/${tripId}/statistics`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Duplicate trip
  async duplicateTrip(tripId: string, options?: {
    newName?: string;
    newStartDate?: string;
    newEndDate?: string;
    copyStops?: boolean;
  }): Promise<Trip> {
    try {
      const response = await apiClient.postWithAuth<Trip>(`/trips/${tripId}/duplicate`, options);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Share trip
  async shareTrip(tripId: string, shareData: {
    emails: string[];
    permissions: string;
  }): Promise<any> {
    try {
      const response = await apiClient.postWithAuth(`/trips/${tripId}/share`, shareData);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get shared trip
  async getSharedTrip(token: string): Promise<Trip> {
    try {
      const response = await apiClient.get<Trip>(`/trips/shared/${token}`);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Get public trips
  async getPublicTrips(params?: {
    page?: number;
    limit?: number;
    search?: string;
    destination?: string;
  }): Promise<PaginatedResponse<Trip>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Trip>>('/trips/public', params);
      return response;
    } catch (error) {
      throw this.handleTripError(error as ApiError);
    }
  }

  // Handle trip-related errors
  private handleTripError(error: ApiError): ApiError {
    // Add specific error handling for trip operations
    if (error.status === 404) {
      error.message = 'Trip not found';
    } else if (error.status === 403) {
      error.message = 'Access denied to this trip';
    } else if (error.status === 409) {
      error.message = 'Trip update conflict';
    } else if (error.status === 400) {
      error.message = 'Invalid trip data provided';
    }
    
    return error;
  }

  // Helper methods for trip validation
  validateTripDates(startDate: string, endDate: string): { valid: boolean; error?: string } {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start >= end) {
      return {
        valid: false,
        error: 'End date must be after start date'
      };
    }

    if (start < now) {
      return {
        valid: false,
        error: 'Start date cannot be in the past'
      };
    }

    return { valid: true };
  }

  validateTripBudget(budget?: number): { valid: boolean; error?: string } {
    if (budget !== undefined && (budget < 0 || budget > 1000000)) {
      return {
        valid: false,
        error: 'Budget must be between $0 and $1,000,000'
      };
    }

    return { valid: true };
  }

  validateTripStopOrder(stops: TripStop[]): { valid: boolean; error?: string } {
    const orders = stops.map(stop => stop.order);
    const uniqueOrders = new Set(orders);

    if (orders.length !== uniqueOrders.size) {
      return {
        valid: false,
        error: 'Trip stops must have unique order values'
      };
    }

    return { valid: true };
  }

  // Helper method to calculate trip duration
  calculateTripDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Helper method to format trip duration
  formatTripDuration(days: number): string {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} week${days > 7 ? 's' : ''}`;
    return `${Math.floor(days / 30)} month${days > 30 ? 's' : ''}`;
  }

  // Helper method to calculate total trip cost
  calculateTotalCost(trip: Trip): number {
    let total = trip.budgetAmount || 0;
    
    // Add costs from stops and activities
    if (trip.stops) {
      trip.stops.forEach(stop => {
        if (stop.activities) {
          stop.activities.forEach(activity => {
            total += activity.cost || 0;
          });
        }
      });
    }

    return total;
  }
}

// Create singleton instance
export const tripService = new TripService();

// Export for convenience
export { TripService };
