// API Response Types matching backend structure

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'TRAVEL_AGENT';
  bio?: string;
  avatar?: string;
  language: string;
  privacy: 'PUBLIC' | 'FRIENDS_ONLY' | 'PRIVATE';
  notifications: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  travelStyle?: string;
  budgetRange?: string;
  preferredAccommodation?: string;
  transportationPreference?: string;
  dietaryRestrictions?: string[];
  interests?: string[];
  language?: string;
  timezone?: string;
}

export interface UserStats {
  totalTrips: number;
  totalNotes: number;
  favoriteDestinations: number;
  memberSince: string;
  lastLogin?: string;
  profileCompleteness: number;
}

// Trip Types
export interface Trip {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  budgetAmount?: number;
  budgetLevel?: 'BUDGET' | 'MODERATE' | 'LUXURY';
  coverPhoto?: string;
  isPublic: boolean;
  status: 'PLANNING' | 'BOOKED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  travelStyle?: string;
  travelersCount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  destinationCity?: City;
  stops?: TripStop[];
  budget?: Budget;
}

export interface TripStop {
  id: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  order: number;
  description?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  type: ActivityType;
  duration?: string;
  cost?: number;
  time?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType = 
  | 'SIGHTSEEING'
  | 'DINING'
  | 'ACCOMMODATION'
  | 'TRANSPORTATION'
  | 'ENTERTAINMENT'
  | 'SHOPPING'
  | 'OUTDOOR'
  | 'CULTURAL'
  | 'RELAXATION';

export interface Budget {
  id: string;
  totalAmount: number;
  currency: string;
  accommodation?: number;
  transportation?: number;
  food?: number;
  activities?: number;
  miscellaneous?: number;
  emergencyFund?: number;
  createdAt: string;
  updatedAt: string;
}

// City & Country Types
export interface City {
  id: string;
  name: string;
  countryId: string;
  description?: string;
  averageBudget?: number;
  popularityScore: number;
  imageUrl?: string;
  coordinates?: { lat: number; lng: number };
  bestTimeToVisit?: string;
  climate?: string;
  timezone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  country?: Country;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  currency: string;
  continent: Continent;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cities?: City[];
}

export type Continent = 
  | 'AFRICA'
  | 'ASIA'
  | 'EUROPE'
  | 'NORTH_AMERICA'
  | 'SOUTH_AMERICA'
  | 'OCEANIA'
  | 'ANTARCTICA';

// AI Types - Unified Trip Structure
export interface AITripResponse {
  trip: {
    title: string;
    budget: number;
    travelStyle: string;
    startDate: string;
    endDate: string;
    stops: AITripStop[];
  };
  budgetBreakdown: {
    total: number;
    accommodation: number;
    transportation: number;
    food: number;
    activities: number;
    miscellaneous: number;
  };
  recommendations: {
    accommodations?: AIRecommendation[];
    transportation?: {
      flights?: AIRecommendation[];
      local?: {
        recommendations: string[];
        estimatedCosts: {
          publicTransit: number;
          taxi: number;
          rental: number;
        };
      };
    };
    packingChecklist: {
      essentials: string[];
      clothing: string[];
      electronics: string[];
      health: string[];
      documents: string[];
    };
    tips: string[];
  };
}

export interface AITripStop {
  city: string;
  country: string;
  order: number;
  activities: AIActivity[];
}

export interface AIActivity {
  title: string;
  description: string;
  time: string;
  duration: number;
  estimatedCost: number;
  category: string;
  location: string;
  tips?: string[];
}

export interface AIRecommendation {
  name: string;
  type: string;
  pricePerNight?: number;
  rating?: number;
  location?: string;
  amenities?: string[];
  from?: string;
  to?: string;
  airline?: string;
  price?: number;
  duration?: string;
  bookingTips?: string;
  reservationRequired?: boolean;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'CUSTOMER' | 'ADMIN' | 'TRAVEL_AGENT';
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  user: User;
  tokens: {
    accessToken: string;
  };
}

// API Request Types
export interface CreateTripRequest {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  budget?: number;
  coverPhoto?: string;
  isPublic?: boolean;
  travelStyle?: string;
  travelersCount?: number;
  destinationCityId?: string;
}

export interface UpdateTripRequest extends Partial<CreateTripRequest> {
  status?: Trip['status'];
}

export interface CreateTripStopRequest {
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description?: string;
  notes?: string;
}

export interface UpdateTripStopRequest extends Partial<CreateTripStopRequest> {
  order?: number;
}

export interface CreateActivityRequest {
  name: string;
  description?: string;
  type: ActivityType;
  duration?: string;
  cost?: number;
  time?: string;
  location?: string;
  notes?: string;
}

export interface UpdateActivityRequest extends Partial<CreateActivityRequest> {}

// AI Request Types
export interface GenerateItineraryRequest {
  destination: string;
  days: number;
  budget: number;
  travelStyle?: string;
  interests?: string[];
  travelers?: number;
  startDate?: string;
  endDate?: string;
}

export interface CreateTripFromAIDraftRequest {
  aiResponse: AITripResponse;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

// Common Response Types
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: any;
}
