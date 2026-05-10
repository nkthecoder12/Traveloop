import { ItineraryResponse } from "@/types/itinerary";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
    const response = await fetch(`${API_BASE_URL}/ai/generate-itinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate itinerary");
    }

    return response.json();
  },

  /**
   * Fetches an existing itinerary by ID.
   */
  async getItineraryById(id: string): Promise<ItineraryResponse> {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      headers: {
        // Add Authorization header if needed
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch itinerary");
    }

    return response.json();
  }
};
