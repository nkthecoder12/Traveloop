export interface Activity {
  id: string;
  time: string;
  name: string;
  type: 'transport' | 'food' | 'activity' | 'stay' | 'other';
  cost: number;
  duration: string;
  location?: string;
  notes?: string;
  icon?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  city: string;
  theme: string;
  estimatedCost: number;
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  stayInfo?: {
    name: string;
    location: string;
    cost: number;
  };
  transportInfo?: {
    type: string;
    cost: number;
    notes?: string;
  };
}

export interface Budget {
  total: number;
  transport: number;
  stay: number;
  food: number;
  activities: number;
  currency: string;
}

export interface AIInsight {
  id: string;
  type: 'tip' | 'warning' | 'highlight' | 'weather';
  title: string;
  content: string;
}

export interface PackingItem {
  id: string;
  item: string;
  category: string;
  essential: boolean;
  checked: boolean;
}

export interface ItineraryResponse {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  style: string;
  budget: Budget;
  days: DayPlan[];
  insights: AIInsight[];
  packingList: PackingItem[];
  coverPhoto?: string;
}
