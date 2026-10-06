import { User, EwasteItem, PickupRequest, CollectionCenter, RewardItem, NotificationItem, EnvironmentalStats, AIScanResult, UserRole, PickupStatus } from '../types';
import { INITIAL_USERS, INITIAL_EWASTE, INITIAL_PICKUPS, INITIAL_CENTERS, INITIAL_REWARDS, INITIAL_NOTIFICATIONS, ENVIRONMENTAL_METRICS } from './mockData';

const KEYS = {
  USERS: 'ewastex_users',
  CURRENT_USER: 'ewastex_current_user',
  EWASTE: 'ewastex_ewaste',
  PICKUPS: 'ewastex_pickups',
  CENTERS: 'ewastex_centers',
  REWARDS: 'ewastex_rewards',
  NOTIFICATIONS: 'ewastex_notifications',
  METRICS: 'ewastex_metrics'
};

// Helper for local storage initialization
const initStorage = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
  }
  if (!localStorage.getItem(KEYS.EWASTE)) {
    localStorage.setItem(KEYS.EWASTE, JSON.stringify(INITIAL_EWASTE));
  }
  if (!localStorage.getItem(KEYS.PICKUPS)) {
    localStorage.setItem(KEYS.PICKUPS, JSON.stringify(INITIAL_PICKUPS));
  }
  if (!localStorage.getItem(KEYS.CENTERS)) {
    localStorage.setItem(KEYS.CENTERS, JSON.stringify(INITIAL_CENTERS));
  }
  if (!localStorage.getItem(KEYS.REWARDS)) {
    localStorage.setItem(KEYS.REWARDS, JSON.stringify(INITIAL_REWARDS));
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  }
  if (!localStorage.getItem(KEYS.METRICS)) {
    localStorage.setItem(KEYS.METRICS, JSON.stringify(ENVIRONMENTAL_METRICS));
  }
};

initStorage();

export const apiService = {
  // Auth & Users
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await new Promise((r) => setTimeout(r, 600)); // Simulate API network latency
    const users = apiService.getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      apiService.setCurrentUser(found);
      return { user: found, token: `jwt_token_${found.id}_${Date.now()}` };
    }

    // Default registration if new email entered in demo mode
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: 'USER',
      points: 100,
      totalRecycledKg: 0,
      totalItemsRecycled: 0,
      co2SavedKg: 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    apiService.setCurrentUser(newUser);

    return { user: newUser, token: `jwt_token_${newUser.id}_${Date.now()}` };
  },

  switchUserRole: (role: UserRole): User => {
    const users = apiService.getUsers();
    let target = users.find((u) => u.role === role);
    if (!target) {
      target = {
        id: `user-${role.toLowerCase()}-${Date.now()}`,
        name: `${role.charAt(0) + role.slice(1).toLowerCase()} Demo`,
        email: `${role.toLowerCase()}@ewastex.com`,
        role,
        points: 500,
        totalRecycledKg: 10,
        totalItemsRecycled: 5,
        co2SavedKg: 15,
        createdAt: new Date().toISOString(),
      };
      users.push(target);
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
    apiService.setCurrentUser(target);
    return target;
  },

  register: async (name: string, email: string, role: UserRole = 'USER'): Promise<User> => {
    await new Promise((r) => setTimeout(r, 500));
    const users = apiService.getUsers();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      points: 150,
      totalRecycledKg: 0,
      totalItemsRecycled: 0,
      co2SavedKg: 0,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    apiService.setCurrentUser(newUser);
    return newUser;
  },

  updateUserProfile: (userId: string, updates: Partial<User>): User => {
    const users = apiService.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      const curr = apiService.getCurrentUser();
      if (curr && curr.id === userId) {
        apiService.setCurrentUser(users[idx]);
      }
      return users[idx];
    }
    throw new Error('User not found');
  },

  // E-Waste Items
  getEwasteItems: (): EwasteItem[] => {
    return JSON.parse(localStorage.getItem(KEYS.EWASTE) || '[]');
  },

  getEwasteById: (idOrTracking: string): EwasteItem | null => {
    const items = apiService.getEwasteItems();
    return items.find((i) => i.id === idOrTracking || i.trackingId.toLowerCase() === idOrTracking.toLowerCase()) || null;
  },

  createEwasteItem: async (itemData: Omit<EwasteItem, 'id' | 'trackingId' | 'status' | 'lifecycle' | 'createdAt'>): Promise<EwasteItem> => {
    await new Promise((r) => setTimeout(r, 600));
    const items = apiService.getEwasteItems();
    const trackingId = `EW-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newItem: EwasteItem = {
      ...itemData,
      id: `ew-${Date.now()}`,
      trackingId,
      status: 'SUBMITTED',
      lifecycle: [
        {
          status: 'SUBMITTED',
          timestamp: new Date().toLocaleString(),
          location: 'User Registered Location',
          note: 'Item successfully registered into E-WasteX network',
        },
      ],
      createdAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    localStorage.setItem(KEYS.EWASTE, JSON.stringify(items));
    return newItem;
  },

  updateEwasteStatus: (id: string, status: EwasteItem['status'], note: string, location: string): EwasteItem => {
    const items = apiService.getEwasteItems();
    const idx = items.findIndex((i) => i.id === id || i.trackingId === id);
    if (idx !== -1) {
      items[idx].status = status;
      items[idx].lifecycle.push({
        status,
        timestamp: new Date().toLocaleString(),
        location,
        note,
      });
      localStorage.setItem(KEYS.EWASTE, JSON.stringify(items));
      return items[idx];
    }
    throw new Error('E-waste item not found');
  },

  // Pickups
  getPickups: (): PickupRequest[] => {
    return JSON.parse(localStorage.getItem(KEYS.PICKUPS) || '[]');
  },

  getPickupById: (idOrPickupId: string): PickupRequest | null => {
    const pickups = apiService.getPickups();
    return pickups.find((p) => p.id === idOrPickupId || p.pickupId.toLowerCase() === idOrPickupId.toLowerCase()) || null;
  },

  createPickup: async (pickupData: {
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
    notes?: string;
  }): Promise<PickupRequest> => {
    await new Promise((r) => setTimeout(r, 700));
    const pickups = apiService.getPickups();
    const pickupId = `PU-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPickup: PickupRequest = {
      id: `pk-${Date.now()}`,
      pickupId,
      ...pickupData,
      status: 'REQUEST_CREATED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    pickups.unshift(newPickup);
    localStorage.setItem(KEYS.PICKUPS, JSON.stringify(pickups));

    // Also add notification
    apiService.addNotification({
      userId: pickupData.userId,
      title: 'Pickup Request Confirmed!',
      message: `Pickup ${pickupId} is scheduled for ${pickupData.scheduledDate} (${pickupData.timeSlot}).`,
      type: 'PICKUP',
      link: `/track/${pickupId}`,
    });

    return newPickup;
  },

  updatePickupStatus: (
    pickupId: string,
    status: PickupStatus,
    updates?: {
      collectorId?: string;
      collectorName?: string;
      collectorPhone?: string;
      proofImageUrl?: string;
      actualCollectedWeightKg?: number;
      notes?: string;
    }
  ): PickupRequest => {
    const pickups = apiService.getPickups();
    const idx = pickups.findIndex((p) => p.id === pickupId || p.pickupId === pickupId);
    if (idx !== -1) {
      pickups[idx] = {
        ...pickups[idx],
        status,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(KEYS.PICKUPS, JSON.stringify(pickups));

      // If collected or recycled, update item lifecycle & user metrics
      if (status === 'COLLECTED' || status === 'RECYCLED') {
        pickups[idx].items.forEach((item) => {
          try {
            apiService.updateEwasteStatus(
              item.id,
              status === 'COLLECTED' ? 'COLLECTED' : 'RECYCLED',
              `Pickup status updated to ${status}`,
              pickups[idx].address
            );
          } catch {
            // ignore if already updated
          }
        });

        if (status === 'RECYCLED') {
          // award user points
          const user = apiService.getCurrentUser();
          if (user && user.id === pickups[idx].userId) {
            const addedPoints = pickups[idx].items.reduce((acc, i) => acc + (i.rewardPoints || 200), 0);
            const addedWeight = pickups[idx].actualCollectedWeightKg || pickups[idx].items.reduce((acc, i) => acc + i.weightKg, 0);
            apiService.updateUserProfile(user.id, {
              points: user.points + addedPoints,
              totalRecycledKg: user.totalRecycledKg + addedWeight,
              totalItemsRecycled: user.totalItemsRecycled + pickups[idx].items.length,
              co2SavedKg: user.co2SavedKg + addedWeight * 1.5,
            });
          }
        }
      }

      return pickups[idx];
    }
    throw new Error('Pickup request not found');
  },

  // Collection Centers
  getCollectionCenters: (): CollectionCenter[] => {
    return JSON.parse(localStorage.getItem(KEYS.CENTERS) || '[]');
  },

  // Rewards
  getRewards: (): RewardItem[] => {
    return JSON.parse(localStorage.getItem(KEYS.REWARDS) || '[]');
  },

  redeemReward: async (rewardId: string, userId: string): Promise<{ success: boolean; voucherCode?: string; message: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    const rewards = apiService.getRewards();
    const reward = rewards.find((r) => r.id === rewardId);
    const users = apiService.getUsers();
    const userIdx = users.findIndex((u) => u.id === userId);

    if (!reward) return { success: false, message: 'Reward item not found' };
    if (userIdx === -1) return { success: false, message: 'User not found' };

    const user = users[userIdx];
    if (user.points < reward.pointsCost) {
      return { success: false, message: `Insufficient points! You need ${reward.pointsCost - user.points} more points.` };
    }

    if (reward.availableStock <= 0) {
      return { success: false, message: 'Reward is currently out of stock.' };
    }

    // Deduct points & reduce stock
    user.points -= reward.pointsCost;
    reward.availableStock -= 1;

    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(KEYS.REWARDS, JSON.stringify(rewards));
    apiService.setCurrentUser(user);

    const code = reward.voucherCode || `EV-${Math.floor(100000 + Math.random() * 900000)}`;

    apiService.addNotification({
      userId: user.id,
      title: 'Reward Redeemed!',
      message: `You successfully redeemed "${reward.title}". Code: ${code}`,
      type: 'REWARD',
    });

    return {
      success: true,
      voucherCode: code,
      message: `Successfully redeemed ${reward.title}! Your voucher code is ${code}`,
    };
  },

  // Notifications
  getNotifications: (userId: string): NotificationItem[] => {
    const list: NotificationItem[] = JSON.parse(localStorage.getItem(KEYS.NOTIFICATIONS) || '[]');
    return list.filter((n) => n.userId === userId);
  },

  addNotification: (notifData: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>): NotificationItem => {
    const list: NotificationItem[] = JSON.parse(localStorage.getItem(KEYS.NOTIFICATIONS) || '[]');
    const newNotif: NotificationItem = {
      ...notifData,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotif);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
    return newNotif;
  },

  markNotificationAsRead: (id: string): void => {
    const list: NotificationItem[] = JSON.parse(localStorage.getItem(KEYS.NOTIFICATIONS) || '[]');
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
    }
  },

  markAllNotificationsAsRead: (userId: string): void => {
    const list: NotificationItem[] = JSON.parse(localStorage.getItem(KEYS.NOTIFICATIONS) || '[]');
    list.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  },

  // Environmental Metrics
  getEnvironmentalStats: (): EnvironmentalStats => {
    return JSON.parse(localStorage.getItem(KEYS.METRICS) || JSON.stringify(ENVIRONMENTAL_METRICS));
  },

  // Mock AI Scanning
  mockAIScan: async (imageInput: string): Promise<AIScanResult> => {
    await new Promise((r) => setTimeout(r, 2200)); // Animated scanning delay

    const aiDetections: AIScanResult[] = [
      {
        detectedDevice: 'High-End Gaming / Workstation Laptop',
        confidence: 96,
        category: 'Computer Equipment',
        condition: 'Minor Damage',
        hazardLevel: 'Medium',
        estimatedWeightRange: '1.8 – 2.5 KG',
        recyclability: 'High',
        recommendedAction: 'Send to authorized e-waste recycler for lithium battery & precious metal extraction.',
        suggestedValueINR: 2600,
        suggestedPoints: 650,
      },
      {
        detectedDevice: 'Smartphone / OLED Mobile Device',
        confidence: 94,
        category: 'Mobile Devices',
        condition: 'Working',
        hazardLevel: 'Low',
        estimatedWeightRange: '0.15 – 0.25 KG',
        recyclability: 'High',
        recommendedAction: 'Extract neodymium magnet speakers, rare earths, and gold-plated PCB board.',
        suggestedValueINR: 1400,
        suggestedPoints: 350,
      },
      {
        detectedDevice: 'Lithium Polymer Swollen Battery Pack',
        confidence: 98,
        category: 'Batteries & Power',
        condition: 'Severely Damaged',
        hazardLevel: 'High',
        estimatedWeightRange: '0.3 – 0.6 KG',
        recyclability: 'High',
        recommendedAction: 'Immediate hazardous containment required. Do NOT puncture or burn.',
        suggestedValueINR: 350,
        suggestedPoints: 200,
      },
      {
        detectedDevice: 'Smart Television / Flat Monitor Panel',
        confidence: 91,
        category: 'Home Appliances',
        condition: 'Scrap / Parts Only',
        hazardLevel: 'Medium',
        estimatedWeightRange: '8.0 – 14.0 KG',
        recyclability: 'Medium',
        recommendedAction: 'Dismantle LED backlights and salvage copper coils from power supply board.',
        suggestedValueINR: 1100,
        suggestedPoints: 550,
      },
    ];

    // Pick a realistic result based on image length hash or random
    const idx = Math.floor(Math.abs(imageInput.length) % aiDetections.length);
    return aiDetections[idx];
  },
};
