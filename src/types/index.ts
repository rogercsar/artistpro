export interface User {
  id: string;
  email: string;
  name: string;
  type: 'dancer' | 'contractor' | 'admin';
  level: 'basic' | 'advanced' | 'pro';
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  birthDate?: string;
  theme?: 'light' | 'dark';
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  createdAt: string;
  isVerified?: boolean;
  subscription?: {
    plan: 'basic' | 'advanced' | 'pro';
    startDate: string;
    endDate?: string;
    isActive: boolean;
  };
}

export interface DancerProfile extends User {
  type: 'dancer';
  skills: string[];
  portfolio: {
    photos: string[];
    videos: string[];
  };
  availability: {
    [key: string]: boolean; // day of week -> available
  };
  experience: string;
  danceStyles: string[];
  socialMedia?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    twitter?: string;
  };
  reviews: Review[];
  rating: number;
}

export interface ContractorProfile extends User {
  type: 'contractor';
  companyName: string;
  companyLogo?: string;
  companyDescription?: string;
  website?: string;
  events: Event[];
  reviews: Review[];
  rating: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  contractorId: string;
  contractor: ContractorProfile;
  location: string;
  date: string;
  time: string;
  duration?: number; // in hours
  requirements: string[];
  danceStyles: string[];
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  maxParticipants?: number;
  currentParticipants: string[]; // dancer IDs
  interestedDancers: string[]; // dancer IDs
  status: 'active' | 'closed' | 'cancelled';
  createdAt: string;
  images?: string[];
  tags: string[];
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number; // 1-5
  comment: string;
  eventId?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'event_interest' | 'new_message' | 'event_update' | 'profile_view' | 'review_received';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedId?: string; // event ID, user ID, etc.
}

export interface ActivityPost {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  createdAt: string;
  likes: string[]; // user IDs
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: string[];
}

export interface SearchFilters {
  location?: string;
  danceStyles?: string[];
  skills?: string[];
  availability?: string[];
  budget?: {
    min: number;
    max: number;
  };
  rating?: number;
  level?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Favorite {
  id: string;
  userId: string;
  type: 'event' | 'dancer' | 'contractor';
  itemId: string;
  createdAt: string;
}

export interface AppState {
  auth: AuthState;
  events: Event[];
  users: User[];
  notifications: Notification[];
  messages: Message[];
  favorites: Favorite[];
  currentFilters: SearchFilters;
}

