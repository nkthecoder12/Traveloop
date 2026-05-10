const ResponseFormatter = require('../utils/responseFormatter');

/**
 * AI Service
 * Handles AI-powered travel planning and itinerary generation
 */
class AIService {
  /**
   * Generate travel itinerary using AI
   * @param {Object} tripData - Trip planning data
   * @returns {Object} Generated itinerary
   */
  static async generateItinerary(tripData) {
    try {
      const {
        destination,
        days,
        budget,
        travelStyle = 'balanced',
        interests = [],
        travelers = 1,
        startDate,
        endDate
      } = tripData;

      // Validate required fields
      if (!destination || !days || !budget) {
        throw new Error('Destination, days, and budget are required');
      }

      // Build comprehensive prompt for AI
      const prompt = this.buildItineraryPrompt({
        destination,
        days,
        budget,
        travelStyle,
        interests,
        travelers,
        startDate,
        endDate
      });

      // Call AI service (this would integrate with OpenAI, Claude, or other AI providers)
      const aiResponse = await this.callAIService(prompt);

      // Parse and structure the AI response
      const structuredResponse = this.parseAIResponse(aiResponse);

      return {
        success: true,
        data: structuredResponse
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Build comprehensive prompt for AI itinerary generation
   * @param {Object} params - Trip parameters
   * @returns {string} AI prompt
   */
  static buildItineraryPrompt(params) {
    const {
      destination,
      days,
      budget,
      travelStyle,
      interests,
      travelers,
      startDate,
      endDate
    } = params;

    return `You are an expert travel planner for Traveloop, an AI-powered travel planning platform.

Create a detailed ${days}-day travel itinerary for ${destination} with the following specifications:

TRIP DETAILS:
- Destination: ${destination}
- Duration: ${days} days
- Budget: $${budget} USD
- Travel Style: ${travelStyle}
- Number of Travelers: ${travelers}
- Travel Dates: ${startDate || 'Flexible'} to ${endDate || 'Flexible'}
- Interests: ${interests.length > 0 ? interests.join(', ') : 'General sightseeing and local experiences'}

REQUIREMENTS:
1. Create a day-by-day itinerary with specific activities, timing, and locations
2. Include accommodation recommendations within budget
3. Suggest transportation options between destinations
4. Recommend authentic local dining experiences
5. Include must-visit attractions and hidden gems
6. Provide budget breakdown by category
7. Include practical travel tips and cultural insights
8. Suggest packing checklist based on destination and activities
9. Consider seasonal weather and local events

RESPONSE FORMAT:
Return a structured JSON response with the following exact format:

{
  "tripName": "Catchy trip title",
  "destinations": [
    {
      "name": "City/Country name",
      "description": "Brief description",
      "imageUrl": "suggested-image-url",
      "coordinates": {"lat": 0.0, "lng": 0.0}
    }
  ],
  "budget": {
    "total": ${budget},
    "currency": "USD",
    "breakdown": {
      "accommodation": 0,
      "transportation": 0,
      "food": 0,
      "activities": 0,
      "miscellaneous": 0
    }
  },
  "itinerary": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "Day theme",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Detailed description",
          "location": "Specific location",
          "duration": "2 hours",
          "cost": 0,
          "type": "sightseeing|dining|transportation|accommodation",
          "tips": ["Practical tips"]
        }
      ]
    }
  ],
  "accommodations": [
    {
      "name": "Hotel/Resort name",
      "type": "hotel|resort|hostel|airbnb",
      "pricePerNight": 0,
      "rating": 4.5,
      "location": "Area/Neighborhood",
      "amenities": ["WiFi", "Breakfast", "Pool"],
      "bookingUrl": "suggested-booking-url"
    }
  ],
  "transportation": {
    "flights": [
      {
        "from": "Departure city",
        "to": "Destination",
        "airline": "Airline name",
        "price": 0,
        "duration": "Xh Ym",
        "bookingTips": "Best time to book, airline preferences"
      }
    ],
    "local": {
      "recommendations": ["Public transport", "Rental car", "Walking tours"],
      "estimatedCosts": {
        "publicTransit": 0,
        "taxi": 0,
        "rental": 0
      }
    }
  },
  "dining": [
    {
      "name": "Restaurant/Experience name",
      "cuisine": "Local/international",
      "priceRange": "$-$$",
      "mustTry": ["Signature dishes"],
      "location": "Area/Address",
      "reservationRequired": true
    }
  ],
  "aiInsights": {
    "bestTimeToVisit": "Optimal travel months",
    "weatherConsiderations": "Seasonal weather advice",
    "culturalTips": ["Important cultural norms"],
    "budgetOptimization": ["Money-saving tips"],
    "hiddenGems": ["Lesser-known attractions"]
  },
  "packingChecklist": {
    "essentials": ["Passport", "Visa", "Insurance"],
    "clothing": ["Weather-appropriate clothing"],
    "electronics": ["Chargers", "Adapters", "Camera"],
    "health": ["Medications", "First-aid"],
    "documents": ["Copies of important documents"]
  },
  "recommendations": {
    "activities": ["Must-do experiences"],
    "booking": ["When to book flights/hotels"],
    "safety": ["Important safety information"],
    "money": ["Currency exchange, tipping culture"]
  }
}

IMPORTANT: 
- Ensure all costs are realistic and within the $${budget} budget
- Provide specific, actionable recommendations
- Include both popular and unique experiences
- Consider the ${travelStyle} travel style throughout
- Make the itinerary practical and achievable

Please respond with valid JSON only, no additional text or explanations.`;
  }

  /**
   * Call AI service (placeholder for actual AI integration)
   * @param {string} prompt - AI prompt
   * @returns {Object} AI response
   */
  static async callAIService(prompt) {
    // This is where you would integrate with actual AI service
    // For now, returning a mock response that matches the expected format
    
    return this.generateMockResponse(prompt);
  }

  /**
   * Generate mock AI response (for development/testing)
   * @param {string} prompt - AI prompt
   * @returns {Object} Mock AI response
   */
  static generateMockResponse(prompt) {
    // Extract key information from prompt for realistic mock response
    const destinationMatch = prompt.match(/Destination: ([^,]+)/);
    const daysMatch = prompt.match(/Duration: (\d+) days/);
    const budgetMatch = prompt.match(/Budget: \$(\d+)/);
    
    const destination = destinationMatch ? destinationMatch[1].trim() : 'Unknown Destination';
    const days = daysMatch ? parseInt(daysMatch[1]) : 5;
    const budget = budgetMatch ? parseFloat(budgetMatch[1]) : 2000;

    return {
      tripName: `${days}-Day ${destination} Adventure`,
      destinations: [
        {
          name: destination,
          description: `Amazing ${days}-day journey through ${destination}'s highlights`,
          imageUrl: `https://picsum.photos/800/600?random=${Math.random()}`,
          coordinates: { lat: 40.7128 + Math.random() * 0.1, lng: -74.0060 + Math.random() * 0.1 }
        }
      ],
      budget: {
        total: budget,
        currency: "USD",
        breakdown: {
          accommodation: Math.round(budget * 0.35),
          transportation: Math.round(budget * 0.25),
          food: Math.round(budget * 0.25),
          activities: Math.round(budget * 0.10),
          miscellaneous: Math.round(budget * 0.05)
        }
      },
      itinerary: Array.from({ length: days }, (_, dayIndex) => ({
        day: dayIndex + 1,
        date: new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        theme: dayIndex === 0 ? 'Arrival & Exploration' : dayIndex === days - 1 ? 'Departure & Reflection' : `Day ${dayIndex + 1} Adventures`,
        activities: [
          {
            time: "09:00",
            title: "Morning Exploration",
            description: `Start your day with breakfast and explore ${destination}'s main attractions`,
            location: dayIndex === 0 ? "City Center" : `${destination} Old Town`,
            duration: "3 hours",
            cost: Math.round(budget * 0.1),
            type: "sightseeing",
            tips: ["Wear comfortable shoes", "Bring camera", "Check opening hours"]
          },
          {
            time: "13:00",
            title: "Lunch & Local Cuisine",
            description: `Experience authentic local dishes and specialties`,
            location: "Recommended Restaurant District",
            duration: "2 hours",
            cost: Math.round(budget * 0.08),
            type: "dining",
            tips: ["Try local specialties", "Make reservations", "Carry cash"]
          },
          {
            time: "16:00",
            title: "Afternoon Activities",
            description: `Engage in cultural activities and shopping`,
            location: dayIndex % 2 === 0 ? "Museums & Galleries" : "Outdoor Adventures",
            duration: "4 hours",
            cost: Math.round(budget * 0.12),
            type: "activities",
            tips: ["Book tickets in advance", "Check group discounts"]
          }
        ]
      })),
      accommodations: [
        {
          name: `${destination} Grand Hotel`,
          type: "hotel",
          pricePerNight: Math.round((budget * 0.35) / days),
          rating: 4.2,
          location: "City Center",
          amenities: ["WiFi", "Breakfast", "Pool", "Gym", "Concierge"],
          bookingUrl: "https://booking.example.com"
        }
      ],
      transportation: {
        flights: [
          {
            from: "Your City",
            to: destination,
            airline: "Traveloop Airlines",
            price: Math.round(budget * 0.25),
            duration: `${Math.floor(days / 3)}h ${30 * (days % 3)}m`,
            bookingTips: "Book 6-8 weeks in advance for best prices"
          }
        ],
        local: {
          recommendations: ["Public transit pass", "Walking tours", "Bike rentals"],
          estimatedCosts: {
            publicTransit: Math.round(budget * 0.05),
            taxi: Math.round(budget * 0.03),
            rental: Math.round(budget * 0.07)
          }
        }
      },
      dining: [
        {
          name: "Local Flavors Restaurant",
          cuisine: "Local & International",
          priceRange: "$$",
          mustTry: ["Signature local dishes", "Daily specials", "Local beverages"],
          location: "Historic District",
          reservationRequired: true
        }
      ],
      aiInsights: {
        bestTimeToVisit: "Spring and Fall for pleasant weather",
        weatherConsiderations: "Pack layers - temperatures can vary",
        culturalTips: ["Dress modestly when visiting religious sites", "Tipping is customary", "Learn basic local phrases"],
        budgetOptimization: ["Eat at local restaurants", "Use public transportation", "Book accommodations with breakfast"],
        hiddenGems: ["Lesser-known viewpoints", "Local markets", "Neighborhood cafes"]
      },
      packingChecklist: {
        essentials: ["Passport", "Visa (if required)", "Travel insurance", "Copies of documents"],
        clothing: ["Weather-appropriate layers", "Comfortable walking shoes", "Formal outfit for nice restaurants"],
        electronics: ["Universal adapter", "Portable charger", "Camera", "Smartphone"],
        health: ["Personal medications", "Basic first-aid kit", "Hand sanitizer"],
        documents: ["Flight tickets", "Hotel confirmations", "Emergency contacts"]
      },
      recommendations: {
        activities: ["Sunrise viewpoint visit", "Cooking class", "Local market tour", "Cultural show"],
        booking: ["Book flights 6-8 weeks ahead", "Reserve popular restaurants", "Get city tourism card"],
        safety: ["Keep copies of documents", "Research local emergency numbers", "Share itinerary with family"],
        money: ["Notify bank of travel dates", "Exchange some currency before arrival", "Check credit card foreign fees"]
      }
    };
  }

  /**
   * Parse AI response to ensure valid JSON
   * @param {Object} aiResponse - Raw AI response
   * @returns {Object} Parsed response
   */
  static parseAIResponse(aiResponse) {
    try {
      // If response is already an object, return as-is
      if (typeof aiResponse === 'object') {
        return aiResponse;
      }

      // If response is a string, try to parse as JSON
      if (typeof aiResponse === 'string') {
        return JSON.parse(aiResponse);
      }

      throw new Error('Invalid AI response format');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Get travel recommendations based on preferences
   * @param {Object} preferences - User travel preferences
   * @returns {Object} Travel recommendations
   */
  static async getTravelRecommendations(preferences) {
    try {
      const {
        interests = [],
        budgetLevel = 'moderate',
        travelStyle = 'balanced',
        tripDuration = 'week'
      } = preferences;

      // Generate recommendations based on preferences
      const recommendations = {
        destinations: await this.getDestinationRecommendations(interests, budgetLevel),
        activities: await this.getActivityRecommendations(interests, travelStyle),
        budgetTips: this.getBudgetTips(budgetLevel),
        packingAdvice: this.getPackingAdvice(tripDuration, interests)
      };

      return {
        success: true,
        data: recommendations
      };

    } catch (error) {
      console.error('AI Recommendations Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get destination recommendations
   * @param {Array} interests - User interests
   * @param {string} budgetLevel - Budget preference
   * @returns {Array} Destination recommendations
   */
  static async getDestinationRecommendations(interests, budgetLevel) {
    // Mock destination recommendations based on interests and budget
    const destinations = [
      {
        name: "Bali, Indonesia",
        description: "Tropical paradise with beaches, temples, and rice terraces",
        budgetLevel: "budget",
        bestFor: ["beaches", "culture", "nature"],
        averageCost: 1500,
        imageUrl: "https://picsum.photos/400/300?random=bali"
      },
      {
        name: "Prague, Czech Republic",
        description: "Historic European city with stunning architecture and affordable prices",
        budgetLevel: "moderate",
        bestFor: ["history", "architecture", "nightlife"],
        averageCost: 2000,
        imageUrl: "https://picsum.photos/400/300?random=prague"
      },
      {
        name: "Tokyo, Japan",
        description: "Modern metropolis blending tradition with cutting-edge technology",
        budgetLevel: "luxury",
        bestFor: ["technology", "food", "culture", "shopping"],
        averageCost: 3500,
        imageUrl: "https://picsum.photos/400/300?random=tokyo"
      }
    ];

    // Filter by budget level
    return destinations.filter(dest => {
      if (budgetLevel === 'budget') return dest.budgetLevel === 'budget' || dest.budgetLevel === 'moderate';
      if (budgetLevel === 'moderate') return dest.budgetLevel === 'moderate' || dest.budgetLevel === 'luxury';
      if (budgetLevel === 'luxury') return dest.budgetLevel === 'luxury';
      return true;
    });
  }

  /**
   * Get activity recommendations
   * @param {Array} interests - User interests
   * @param {string} travelStyle - Travel style preference
   * @returns {Array} Activity recommendations
   */
  static async getActivityRecommendations(interests, travelStyle) {
    const activities = [
      {
        name: "Food Tours",
        description: "Guided culinary experiences through local markets and restaurants",
        category: "dining",
        travelStyles: ["balanced", "cultural"],
        duration: "3-4 hours",
        averageCost: 75
      },
      {
        name: "Historical Walking Tours",
        description: "Expert guides through historic neighborhoods and landmarks",
        category: "cultural",
        travelStyles: ["balanced", "educational"],
        duration: "2-3 hours",
        averageCost: 50
      },
      {
        name: "Adventure Sports",
        description: "Outdoor activities like hiking, water sports, and zip-lining",
        category: "adventure",
        travelStyles: ["adventure", "active"],
        duration: "4-6 hours",
        averageCost: 120
      }
    ];

    // Filter by interests and travel style
    return activities.filter(activity => {
      const hasMatchingInterest = interests.length === 0 || 
        interests.some(interest => 
          activity.category.toLowerCase().includes(interest.toLowerCase())
        );
      
      const matchesTravelStyle = travelStyle === 'balanced' || 
        activity.travelStyles.includes(travelStyle);

      return hasMatchingInterest && matchesTravelStyle;
    });
  }

  /**
   * Get budget optimization tips
   * @param {string} budgetLevel - Budget preference
   * @returns {Array} Budget tips
   */
  static getBudgetTips(budgetLevel) {
    const tips = {
      budget: [
        "Travel during shoulder seasons for lower prices",
        "Book flights 6-8 weeks in advance",
        "Consider budget airlines for long-haul flights",
        "Use price comparison websites for accommodations"
      ],
      moderate: [
        "Mix budget and mid-range accommodations",
        "Eat at local restaurants for authentic, affordable meals",
        "Use public transportation where possible",
        "Look for combo deals on attractions and activities"
      ],
      luxury: [
        "Book premium accommodations early for best rates",
        "Consider all-inclusive resorts for value",
        "Use travel rewards points for upgrades",
        "Book business class for long-haul flights if budget allows"
      ]
    };

    return tips[budgetLevel] || tips.moderate;
  }

  /**
   * Get packing advice
   * @param {string} tripDuration - Trip duration
   * @param {Array} interests - User interests
   * @returns {Object} Packing advice
   */
  static getPackingAdvice(tripDuration, interests) {
    const basePacking = {
      essentials: ["Passport", "Visa", "Travel insurance", "Copies of documents"],
      clothing: ["Weather-appropriate layers", "Comfortable walking shoes", "Formal outfit"],
      electronics: ["Universal adapter", "Portable charger", "Camera", "Smartphone"],
      health: ["Personal medications", "Basic first-aid kit"]
    };

    // Add duration-specific items
    if (tripDuration === 'week' || tripDuration === 'long') {
      basePacking.clothing.push("Extra underwear and socks", "Laundry detergent");
      basePacking.health.push("Motion sickness medication", "Vitamins");
    }

    // Add interest-specific items
    if (interests.includes('beach') || interests.includes('swimming')) {
      basePacking.clothing.push("Swimsuit", "Beach towel", "Sunscreen", "Sunglasses");
      basePacking.electronics.push("Waterproof phone case");
    }

    if (interests.includes('hiking') || interests.includes('adventure')) {
      basePacking.clothing.push("Hiking boots", "Rain jacket", "Quick-dry clothes");
      basePacking.electronics.push("Portable power bank");
      basePacking.health.push("Blister treatment", "Insect repellent");
    }

    if (interests.includes('photography')) {
      basePacking.electronics.push("Extra camera batteries", "Tripod", "Lens cleaning kit");
    }

    return basePacking;
  }
}

module.exports = AIService;
