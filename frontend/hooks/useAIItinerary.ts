import { useState } from "react";
import { ItineraryResponse } from "@/types/itinerary";
import { aiItineraryService } from "@/services/aiItineraryService";

export const useAIItinerary = () => {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (preferences: {
    destination: string;
    budget: string;
    duration: string;
    style: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await aiItineraryService.generateItinerary(preferences);
      setItinerary(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setItinerary(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    itinerary,
    isLoading,
    error,
    generate,
    reset
  };
};
