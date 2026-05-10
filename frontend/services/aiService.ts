import { apiClient } from './apiClient';
import type { 
  AITripResponse, 
  GenerateItineraryRequest,
  CreateTripFromAIDraftRequest,
  ApiError 
} from '@/types/api';

class AIService {
  // Generate travel itinerary - Returns Trip-compatible structure
  async generateItinerary(preferences: GenerateItineraryRequest): Promise<AITripResponse> {
    try {
      const response = await apiClient.postWithAuth<AITripResponse>('/ai/generate-itinerary', preferences);
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Create trip from AI-generated draft - Uses SAME TripService flow
  async createTripFromAIDraft(aiResponse: AITripResponse): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/ai/create-trip-from-draft', {
        aiResponse
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get AI trip preview without saving
  async previewTrip(aiResponse: AITripResponse): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/ai/preview-trip', {
        aiResponse
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Update existing trip with AI modifications
  async updateTripWithAI(tripId: string, aiResponse: AITripResponse): Promise<any> {
    try {
      const response = await apiClient.put(`/ai/update-trip/${tripId}`, {
        aiResponse
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get travel recommendations
  async getTravelRecommendations(preferences: {
    interests?: string[];
    budgetLevel?: string;
    tripDuration?: string;
  }): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/ai/recommendations', preferences);
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get destination recommendations only
  async getDestinationRecommendations(params?: {
    interests?: string;
    budgetLevel?: string;
  }): Promise<any> {
    try {
      const response = await apiClient.get('/ai/destinations', params);
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get activity recommendations only
  async getActivityRecommendations(params?: {
    interests?: string;
    travelStyle?: string;
  }): Promise<any> {
    try {
      const response = await apiClient.get('/ai/activities', params);
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get budget optimization tips
  async getBudgetTips(budgetLevel?: string): Promise<any> {
    try {
      const response = await apiClient.get('/ai/budget-tips', {
        budgetLevel: budgetLevel || 'moderate'
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Get packing advice
  async getPackingAdvice(params?: {
    tripDuration?: string;
    interests?: string;
  }): Promise<any> {
    try {
      const response = await apiClient.get('/ai/packing-advice', params);
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // AI-powered trip optimization
  async optimizeTrip(currentItinerary: any, budget: number, preferences?: any): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/ai/optimize-trip', {
        currentItinerary,
        budget,
        preferences
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // AI chat for travel assistance
  async chatWithAI(message: string, tripContext?: any): Promise<any> {
    try {
      const response = await apiClient.postWithAuth('/ai/chat', {
        message,
        tripContext
      });
      return response;
    } catch (error) {
      throw this.handleAIError(error as ApiError);
    }
  }

  // Handle AI-related errors
  private handleAIError(error: ApiError): ApiError {
    // Add specific error handling for AI operations
    if (error.status === 400) {
      error.message = 'Invalid AI request parameters';
    } else if (error.status === 429) {
      error.message = 'Too many AI requests. Please try again later.';
    } else if (error.status === 500) {
      error.message = 'AI service is temporarily unavailable';
    } else if (error.status === 503) {
      error.message = 'AI service is currently overloaded';
    }
    
    return error;
  }

  // Validate AI request parameters
  validateGenerateItineraryRequest(preferences: GenerateItineraryRequest): { valid: boolean; error?: string } {
    const { destination, days, budget } = preferences;

    if (!destination || destination.trim().length === 0) {
      return {
        valid: false,
        error: 'Destination is required'
      };
    }

    if (!days || days < 1 || days > 30) {
      return {
        valid: false,
        error: 'Days must be between 1 and 30'
      };
    }

    if (!budget || budget < 100 || budget > 100000) {
      return {
        valid: false,
        error: 'Budget must be between $100 and $100,000'
      };
    }

    return { valid: true };
  }

  // Helper method to format AI response for frontend
  formatAIResponseForFrontend(aiResponse: AITripResponse): any {
    return {
      trip: {
        id: null, // Will be set when saved
        name: aiResponse.trip.title,
        budgetAmount: aiResponse.trip.budget,
        travelStyle: aiResponse.trip.travelStyle,
        startDate: aiResponse.trip.startDate,
        endDate: aiResponse.trip.endDate,
        description: `AI-generated ${aiResponse.trip.travelStyle} trip`,
        isPublic: false,
        travelersCount: 1,
        status: 'PLANNING',
        stops: aiResponse.trip.stops.map(stop => ({
          id: null, // Will be set when saved
          city: stop.city,
          country: stop.country,
          order: stop.order,
          description: `AI-generated stop in ${stop.city}`,
          activities: stop.activities.map(activity => ({
            id: null, // Will be set when saved
            name: activity.title,
            description: activity.description,
            type: this.mapActivityCategory(activity.category),
            duration: `${activity.duration} minutes`,
            cost: activity.estimatedCost,
            time: activity.time,
            location: activity.location,
            notes: activity.tips ? activity.tips.join(', ') : ''
          }))
        }))
      },
      budgetBreakdown: aiResponse.budgetBreakdown,
      recommendations: aiResponse.recommendations,
      isAIGenerated: true
    };
  }

  // Helper method to map AI activity categories to backend types
  private mapActivityCategory(category: string): string {
    const categoryMap: Record<string, string> = {
      'sightseeing': 'SIGHTSEEING',
      'dining': 'DINING',
      'accommodation': 'ACCOMMODATION',
      'transportation': 'TRANSPORTATION',
      'entertainment': 'ENTERTAINMENT',
      'shopping': 'SHOPPING',
      'outdoor': 'OUTDOOR',
      'cultural': 'CULTURAL',
      'relaxation': 'RELAXATION'
    };

    return categoryMap[category.toLowerCase()] || 'SIGHTSEEING';
  }

  // Helper method to estimate AI request cost (for usage tracking)
  estimateRequestCost(preferences: GenerateItineraryRequest): number {
    // Base cost in tokens/credits
    let cost = 100; // Base cost
    
    // Add cost based on complexity
    if (preferences.days > 7) cost += 50;
    if (preferences.interests && preferences.interests.length > 3) cost += 25;
    if (preferences.travelStyle && preferences.travelStyle !== 'balanced') cost += 25;
    
    return cost;
  }

  // Helper method to check AI service availability
  async checkAIServiceAvailability(): Promise<{ available: boolean; message?: string }> {
    try {
      // Simple health check for AI service
      const response = await apiClient.get('/ai/health');
      return {
        available: true,
        message: 'AI service is available'
      };
    } catch (error) {
      return {
        available: false,
        message: 'AI service is currently unavailable'
      };
    }
  }
}

// Create singleton instance
export const aiService = new AIService();

// Export for convenience
export { AIService };
