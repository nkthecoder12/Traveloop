import { ItineraryResponse } from "@/types/itinerary";
import { apiClient } from './apiClient';

export const aiItineraryService = {
  /**
   * Generates a new AI itinerary based on user preferences.
   */
  async generateItinerary(preferences: {
    destination: string;
    budget: string;
    duration: string;
    style: string;
  }): Promise<ItineraryResponse> {
    // Map frontend fields to backend expected fields
    const payload = {
      destination: preferences.destination,
      days: parseInt(preferences.duration.replace(/[^0-9]/g, '')) || 5,
      budget: parseFloat(preferences.budget.replace(/[^0-9.]/g, '')) || 1000,
      travelStyle: preferences.style.toLowerCase(),
      interests: []
    };

    try {
      const data = await apiClient.post<ItineraryResponse>('/ai/generate-itinerary', payload);
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to generate itinerary");
    }
  },

  /**
   * Fetches an existing itinerary by ID.
   */
  async getItineraryById(id: string): Promise<ItineraryResponse> {
    try {
      const data = await apiClient.getWithAuth<ItineraryResponse>(`/trips/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch itinerary");
    }
  }
};
