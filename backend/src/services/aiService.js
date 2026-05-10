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
1. Create a day-by-day itinerary with specific activities for MORNING, AFTERNOON, and EVENING.
2. Include estimated costs for each activity and daily totals.
3. Provide AI insights (tips, weather advice, highlights).
4. Include a packing checklist.
5. Suggest a catchy trip name.

RESPONSE FORMAT:
Return a structured JSON response with the following exact format:

{
  "id": "unique-id",
  "name": "Trip Name",
  "destination": "${destination}",
  "startDate": "ISO-Date",
  "endDate": "ISO-Date",
  "style": "${travelStyle}",
  "budget": {
    "total": ${budget},
    "transport": 0,
    "stay": 0,
    "food": 0,
    "activities": 0,
    "currency": "INR"
  },
  "days": [
    {
      "dayNumber": 1,
      "date": "Weekday, Day Month",
      "city": "${destination}",
      "theme": "Day Theme",
      "estimatedCost": 0,
      "morning": [{ "id": "1", "time": "09:00 AM", "name": "Activity", "type": "activity", "cost": 0, "duration": "2h", "location": "Loc" }],
      "afternoon": [],
      "evening": [],
      "stayInfo": { "name": "Hotel", "location": "Loc", "cost": 0 },
      "transportInfo": { "type": "Car", "cost": 0, "notes": "..." }
    }
  ],
  "insights": [{ "id": "1", "type": "tip", "title": "...", "content": "..." }],
  "packingList": [{ "id": "1", "item": "...", "category": "...", "essential": true, "checked": false }]
}

IMPORTANT: 
- Ensure all costs are realistic and within the $${budget} budget.
- Please respond with valid JSON only, no additional text or explanations.`;
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
    const destinationMatch = prompt.match(/Destination: ([^, \n]+)/);
    const daysMatch = prompt.match(/Duration: (\d+) days/);
    const budgetMatch = prompt.match(/Budget: \$(\d+)/);
    const styleMatch = prompt.match(/Travel Style: ([^, \n]+)/);
    
    const destination = destinationMatch ? destinationMatch[1].trim() : 'Unknown Destination';
    const days = daysMatch ? parseInt(daysMatch[1]) : 5;
    const budget = budgetMatch ? parseFloat(budgetMatch[1]) : 2000;
    const travelStyle = styleMatch ? styleMatch[1].trim() : 'Balanced';

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000);

    return {
      id: `ai-trip-${Date.now()}`,
      name: `${days}-Day ${destination} Escape`,
      destination: destination,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      style: travelStyle,
      budget: {
        total: budget,
        transport: Math.round(budget * 0.25),
        stay: Math.round(budget * 0.35),
        food: Math.round(budget * 0.25),
        activities: Math.round(budget * 0.15),
        currency: "INR"
      },
      days: Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        return {
          dayNumber: i + 1,
          date: date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
          city: destination,
          theme: i === 0 ? "Arrival & Discovery" : i === days - 1 ? "Farewell Highlights" : "Cultural Exploration",
          estimatedCost: Math.round(budget / days),
          morning: [
            {
              id: `act-${i}-1`,
              time: "09:00 AM",
              name: "Morning Exploration",
              type: "activity",
              cost: Math.round(budget / (days * 3)),
              duration: "2 hours",
              location: "City Center"
            }
          ],
          afternoon: [
            {
              id: `act-${i}-2`,
              time: "01:00 PM",
              name: "Authentic Local Lunch",
              type: "food",
              cost: Math.round(budget / (days * 4)),
              duration: "1.5 hours",
              location: "Historic District"
            }
          ],
          evening: [
            {
              id: `act-${i}-3`,
              time: "06:00 PM",
              name: "Cultural Evening Show",
              type: "activity",
              cost: Math.round(budget / (days * 4)),
              duration: "2 hours",
              location: "Cultural Plaza"
            }
          ],
          stayInfo: {
            name: `${destination} Heritage Hotel`,
            location: "Downtown",
            cost: Math.round(budget / (days * 2))
          },
          transportInfo: {
            type: "Private Car",
            cost: 500,
            notes: "Comfortable and convenient"
          }
        };
      }),
      insights: [
        {
          id: "ins-1",
          type: "tip",
          title: "Best Time to Visit",
          content: "Early mornings are best to avoid crowds at main attractions."
        },
        {
          id: "ins-2",
          type: "weather",
          title: "Weather Advice",
          content: "The weather is pleasant this time of year, but carry a light jacket."
        }
      ],
      packingList: [
        { id: "p1", item: "Comfortable Walking Shoes", category: "Clothing", essential: true, checked: false },
        { id: "p2", item: "Universal Travel Adapter", category: "Electronics", essential: true, checked: false },
        { id: "p3", item: "Sunscreen & Sunglasses", category: "Personal Care", essential: true, checked: false }
      ],
      coverPhoto: `https://picsum.photos/1200/600?random=${destination}`
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
