export type UserRole = 'USER' | 'COLLECTOR' | 'RECYCLER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  points: number;
  totalRecycledKg: number;
  totalItemsRecycled: number;
  co2SavedKg: number;
  createdAt: string;
}

export type EwasteCategory = 
  | 'Computer Equipment'
  | 'Mobile Devices'
  | 'Home Appliances'
  | 'Audio & Video'
  | 'Batteries & Power'
  | 'Office Electronics'
  | 'Other';

export type EwasteCondition = 'Working' | 'Minor Damage' | 'Severely Damaged' | 'Scrap / Parts Only';
export type EwasteHazard = 'Low' | 'Medium' | 'High' | 'Severe';

export interface EwasteItem {
  id: string;
  trackingId: string; // EW-2026-XXXXXX
  userId: string;
  userName?: string;
  category: EwasteCategory;
  brand: string;
  model: string;
  serialNumber?: string;
  condition: EwasteCondition;
  workingStatus: boolean;
  purchaseYear?: number;
  weightKg: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  hazardLevel: EwasteHazard;
  recyclability: 'High' | 'Medium' | 'Low';
  estimatedValueINR: number;
  rewardPoints: number;
  status: 'SUBMITTED' | 'COLLECTED' | 'SORTED' | 'DISMANTLED' | 'RECYCLED';
  lifecycle: {
    status: string;
    timestamp: string;
    location: string;
    note: string;
  }[];
  createdAt: string;
}

export type PickupStatus = 
  | 'REQUEST_CREATED'
  | 'COLLECTOR_ASSIGNED'
  | 'PICKUP_SCHEDULED'
  | 'COLLECTED'
  | 'SORTING_CENTER'
  | 'PROCESSING'
  | 'RECYCLED';

export interface PickupRequest {
  id: string;
  pickupId: string; // PU-2026-XXXXXX
  userId: string;
  userName: string;
  userPhone: string;
  address: string;
  city: string;
  pinCode: string;
  landmark?: string;
  scheduledDate: string;
  timeSlot: string;
  items: EwasteItem[];
  status: PickupStatus;
  collectorId?: string;
  collectorName?: string;
  collectorPhone?: string;
  estimatedPickupTime?: string;
  proofImageUrl?: string;
  actualCollectedWeightKg?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  pinCode: string;
  distanceKm: number;
  openingHours: string;
  acceptedCategories: EwasteCategory[];
  contactPerson: string;
  phone: string;
  rating: number;
  isOpen: boolean;
  latitude: number;
  longitude: number;
}

export type RewardType = 'COUPON' | 'TREE' | 'ECO_PRODUCT' | 'CERTIFICATE';

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: RewardType;
  imageUrl: string;
  sponsor?: string;
  voucherCode?: string;
  availableStock: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'PICKUP' | 'REWARD' | 'SYSTEM' | 'SECURITY';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface EnvironmentalStats {
  totalKgRecycled: number;
  co2AvoidedKg: number;
  materialsRecoveredKg: {
    copper: number;
    gold: number;
    aluminum: number;
    plastics: number;
    rareEarths: number;
  };
  devicesDiverted: number;
  activeUsers: number;
  collectionPointsCount: number;
}

export interface AIScanResult {
  detectedDevice: string;
  confidence: number;
  category: EwasteCategory;
  condition: EwasteCondition;
  hazardLevel: EwasteHazard;
  estimatedWeightRange: string;
  recyclability: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  suggestedValueINR: number;
  suggestedPoints: number;
}
