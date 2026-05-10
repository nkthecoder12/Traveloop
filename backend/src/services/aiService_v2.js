const ResponseFormatter = require('../utils/responseFormatter');

/**
 * AI Service v2.0 - Unified Trip Architecture
 * Handles AI-powered travel planning that generates Trip-compatible JSON
 */
class AIService {
  /**
   * Generate travel itinerary using AI - Returns Trip-compatible structure
   * @param {Object} tripData - Trip planning data
   * @returns {Object} Trip-compatible JSON structure
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
      const prompt = this.buildUnifiedTripPrompt({
        destination,
        days,
        budget,
        travelStyle,
        interests,
        travelers,
        startDate,
        endDate
      });

      // Call AI service
      const aiResponse = await this.callAIService(prompt);

      // Parse and structure the AI response into Trip-compatible format
      const tripCompatibleResponse = this.parseToTripStructure(aiResponse);

      return {
        success: true,
        data: tripCompatibleResponse
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
   * Build unified trip prompt that generates Trip-compatible structure
   * @param {Object} params - Trip parameters
   * @returns {string} AI prompt
   */
  static buildUnifiedTripPrompt(params) {
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

Generate a ${days}-day travel itinerary for ${destination} with the following specifications:

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

CRITICAL: Return a Trip-compatible JSON structure that matches the frontend Trip Builder:

{
  "trip": {
    "title": "Catchy trip title",
    "budget": ${budget},
    "travelStyle": "${travelStyle}",
    "startDate": "${startDate || '2024-06-01'}",
    "endDate": "${endDate || '2024-06-05'}",
    "stops": [
      {
        "city": "City Name",
        "country": "Country Name",
        "order": 1,
        "activities": [
          {
            "title": "Activity name",
            "description": "Detailed description",
            "time": "09:00",
            "duration": 120,
            "estimatedCost": 50,
            "category": "sightseeing",
            "location": "Specific location",
            "tips": ["Practical tips"]
          }
        ]
      }
    ]
  },
  "budgetBreakdown": {
    "total": ${budget},
    "accommodation": 0,
    "transportation": 0,
    "food": 0,
    "activities": 0,
    "miscellaneous": 0
  },
  "recommendations": {
    "accommodations": [
      {
        "name": "Hotel/Resort name",
        "type": "hotel",
        "pricePerNight": 0,
        "rating": 4.5,
        "location": "Area/Neighborhood",
        "amenities": ["WiFi", "Breakfast"]
      }
    ],
    "transportation": {
      "flights": [
        {
          "from": "Departure city",
          "to": "Destination",
          "airline": "Airline name",
          "price": 0,
          "duration": "Xh Ym"
        }
      ],
      "local": {
        "recommendations": ["Public transport", "Rental car"],
        "estimatedCosts": {
          "publicTransit": 0,
          "taxi": 0
        }
      }
    },
    "packingChecklist": {
      "essentials": ["Passport", "Visa"],
      "clothing": ["Weather-appropriate clothing"],
      "electronics": ["Chargers", "Camera"],
      "health": ["Medications"],
      "documents": ["Copies of important documents"]
    },
    "tips": [
      "Best time to visit",
      "Cultural considerations",
      "Money-saving tips"
    ]
  }
}

IMPORTANT STRUCTURE REQUIREMENTS:
- "trip" object contains the core trip structure for the Trip Builder
- "stops" array contains destination stops with order
- Each stop has "activities" array with time-based activities
- "budgetBreakdown" provides financial breakdown
- "recommendations" provide additional helpful information

ACTIVITY CATEGORIES:
- sightseeing
- dining
- accommodation
- transportation
- entertainment
- shopping
- outdoor
- cultural
- relaxation

TIME FORMAT: Use 24-hour format (e.g., "09:00", "14:30")
DURATION: Use minutes (e.g., 120 for 2 hours)
COST: Use USD currency

Please respond with valid JSON only, no additional text or explanations.`;
  }

  /**
   * Call AI service
   * @param {string} prompt - AI prompt
   * @returns {Object} AI response
   */
  static async callAIService(prompt) {
    // This is where you would integrate with actual AI service
    // For now, returning a mock response that matches the Trip schema
    return this.generateMockTripResponse(prompt);
  }

  /**
   * Generate mock Trip-compatible response
   * @param {string} prompt - AI prompt
   * @returns {Object} Mock Trip-compatible response
   */
  static generateMockTripResponse(prompt) {
    // Extract key information from prompt for realistic mock response
    const destinationMatch = prompt.match(/Destination: ([^,]+)/);
    const daysMatch = prompt.match(/Duration: (\d+) days/);
    const budgetMatch = prompt.match(/Budget: \$(\d+)/);
    const travelStyleMatch = prompt.match(/Travel Style: ([^,]+)/);
    
    const destination = destinationMatch ? destinationMatch[1].trim() : 'Unknown Destination';
    const days = daysMatch ? parseInt(daysMatch[1]) : 5;
    const budget = budgetMatch ? parseFloat(budgetMatch[1]) : 2000;
    const travelStyle = travelStyleMatch ? travelStyleMatch[1].trim() : 'balanced';

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000);

    // Generate stops based on days
    const stops = Array.from({ length: Math.min(days, 3) }, (_, index) => {
      const dayNumber = index + 1;
      const cities = [
        { name: destination, country: 'Unknown' },
        { name: `${destination} Center`, country: 'Unknown' },
        { name: `${destination} Outskirts`, country: 'Unknown' }
      ];
      const city = cities[index % cities.length];

      return {
        city: city.name,
        country: city.country,
        order: dayNumber,
        activities: [
          {
            title: "Morning Exploration",
            description: `Start your day exploring ${city.name}'s main attractions`,
            time: "09:00",
            duration: 180,
            estimatedCost: Math.round(budget * 0.1),
            category: "sightseeing",
            location: city.name,
            tips: ["Wear comfortable shoes", "Bring camera", "Check opening hours"]
          },
          {
            title: "Local Cuisine Experience",
            description: `Enjoy authentic local dishes and specialties`,
            time: "13:00",
            duration: 120,
            estimatedCost: Math.round(budget * 0.08),
            category: "dining",
            location: `${city.name} Restaurant District`,
            tips: ["Try local specialties", "Make reservations", "Carry cash"]
          },
          {
            title: "Afternoon Activities",
            description: `Engage in cultural activities and local experiences`,
            time: "16:00",
            duration: 240,
            estimatedCost: Math.round(budget * 0.12),
            category: "cultural",
            location: dayNumber % 2 === 0 ? "Museums & Galleries" : "Outdoor Adventures",
            tips: ["Book tickets in advance", "Check group discounts"]
          }
        ]
      };
    });

    return {
      trip: {
        title: `${days}-Day ${destination} Adventure`,
        budget: budget,
        travelStyle: travelStyle,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        stops: stops
      },
      budgetBreakdown: {
        total: budget,
        accommodation: Math.round(budget * 0.35),
        transportation: Math.round(budget * 0.25),
        food: Math.round(budget * 0.25),
        activities: Math.round(budget * 0.10),
        miscellaneous: Math.round(budget * 0.05)
      },
      recommendations: {
        accommodations: [
          {
            name: `${destination} Grand Hotel`,
            type: "hotel",
            pricePerNight: Math.round((budget * 0.35) / days),
            rating: 4.2,
            location: "City Center",
            amenities: ["WiFi", "Breakfast", "Pool", "Gym"]
          }
        ],
        transportation: {
          flights: [
            {
              from: "Your City",
              to: destination,
              airline: "Traveloop Airlines",
              price: Math.round(budget * 0.25),
              duration: `${Math.floor(days / 3)}h ${30 * (days % 3)}m`
            }
          ],
          local: {
            recommendations: ["Public transit pass", "Walking tours", "Bike rentals"],
            estimatedCosts: {
              publicTransit: Math.round(budget * 0.05),
              taxi: Math.round(budget * 0.03)
            }
          }
        },
        packingChecklist: {
          essentials: ["Passport", "Visa (if required)", "Travel insurance", "Copies of documents"],
          clothing: ["Weather-appropriate layers", "Comfortable walking shoes", "Formal outfit"],
          electronics: ["Universal adapter", "Portable charger", "Camera", "Smartphone"],
          health: ["Personal medications", "Basic first-aid kit", "Hand sanitizer"],
          documents: ["Flight tickets", "Hotel confirmations", "Emergency contacts"]
        },
        tips: [
          "Book flights 6-8 weeks in advance for best prices",
          "Check visa requirements for your destination",
          "Learn basic local phrases",
          "Pack layers for changing weather conditions",
          "Keep copies of important documents"
        ]
      }
    };
  }

  /**
   * Parse AI response to Trip-compatible structure
   * @param {Object} aiResponse - Raw AI response
   * @returns {Object} Trip-compatible structure
   */
  static parseToTripStructure(aiResponse) {
    try {
      // If response is already an object, validate and return as-is
      if (typeof aiResponse === 'object') {
        return this.validateTripStructure(aiResponse);
      }

      // If response is a string, try to parse as JSON
      if (typeof aiResponse === 'string') {
        const parsed = JSON.parse(aiResponse);
        return this.validateTripStructure(parsed);
      }

      throw new Error('Invalid AI response format');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Validate Trip structure compatibility
   * @param {Object} tripData - Trip data to validate
   * @returns {Object} Validated trip data
   */
  static validateTripStructure(tripData) {
    const { trip, budgetBreakdown, recommendations } = tripData;

    // Validate required trip structure
    if (!trip || !trip.title || !trip.stops || !Array.isArray(trip.stops)) {
      throw new Error('Invalid trip structure: missing required fields');
    }

    // Validate stops structure
    trip.stops.forEach((stop, index) => {
      if (!stop.city || !stop.activities || !Array.isArray(stop.activities)) {
        throw new Error(`Invalid stop structure at index ${index}`);
      }

      // Validate activities structure
      stop.activities.forEach((activity, actIndex) => {
        if (!activity.title || !activity.time || !activity.duration) {
          throw new Error(`Invalid activity structure at stop ${index}, activity ${actIndex}`);
        }
      });
    });

    return tripData;
  }

  /**
   * Get travel recommendations (unchanged from original)
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
   * Get destination recommendations (unchanged from original)
   * @param {Array} interests - User interests
   * @param {string} budgetLevel - Budget preference
   * @returns {Array} Destination recommendations
   */
  static async getDestinationRecommendations(interests, budgetLevel) {
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

    return destinations.filter(dest => {
      if (budgetLevel === 'budget') return dest.budgetLevel === 'budget' || dest.budgetLevel === 'moderate';
      if (budgetLevel === 'moderate') return dest.budgetLevel === 'moderate' || dest.budgetLevel === 'luxury';
      if (budgetLevel === 'luxury') return dest.budgetLevel === 'luxury';
      return true;
    });
  }

  /**
   * Get activity recommendations (unchanged from original)
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
   * Get budget optimization tips (unchanged from original)
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
   * Get packing advice (unchanged from original)
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

    if (tripDuration === 'week' || tripDuration === 'long') {
      basePacking.clothing.push("Extra underwear and socks", "Laundry detergent");
      basePacking.health.push("Motion sickness medication", "Vitamins");
    }

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
