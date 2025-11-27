export type UserRole = 'artist' | 'contractor' | 'admin'

export type ArtistPlanTier = 'basic' | 'advanced' | 'pro'
export type ContractorPlanTier = 'basic' | 'advanced'

export interface Activity {
  id: string
  authorId: string
  message: string
  createdAt: string
  mediaThumb?: string
}

export interface Review {
  id: string
  fromId: string
  toId: string
  rating: number
  comment: string
  createdAt: string
}

export interface BaseUser {
  id: string
  name: string
  role: UserRole
  email: string
  phone: string
  avatar: string
  location: string
  bio: string
  planLabel: string
  social?: {
    instagram?: string
    youtube?: string
    website?: string
  }
}

export interface ArtistProfile extends BaseUser {
  role: 'artist'
  planTier: ArtistPlanTier
  artForms: string[]
  skills: string[]
  heroTagline: string
  highlight: string
  specialties: string[]
  portfolio: {
    photos: string[]
    videos: string[]
  }
  // Professional Data
  cnpj?: string
  facePhoto?: string
  fullBodyPhoto?: string
  sidePhoto?: string
  
  availability: string[]
  stats: {
    views: number
    saved: number
    responseRate: number
  }
  feed: Activity[]
  reviews: Review[]
  preferredCities: string[]
  interestQuota: {
    limit: number
    used: number
  }
}

export interface ContractorProfile extends BaseUser {
  role: 'contractor'
  planTier: ContractorPlanTier
  company: string
  headline: string
  tags: string[]
  activeEvents: string[]
  talentNeeds: string[]
  contactQuota: {
    limit: number
    used: number
  }
}

export interface AdminProfile extends BaseUser {
  role: 'admin'
  permissions: string[]
  alerts: string[]
}

export type PlatformUser = ArtistProfile | ContractorProfile | AdminProfile

export interface EventItem {
  id: string
  title: string
  category: string
  location: string
  city: string
  dateRange: string
  description: string
  requirements: string[]
  benefits: string[]
  budget: string
  status: 'open' | 'closed' | 'highlight'
  contractorId: string
  likedBy: string[]
  interestedBy: string[]
  shareCount: number
  tags: string[]
}

export interface Message {
  id: string
  fromId: string
  toId: string
  content: string
  createdAt: string
  read: boolean
}

export interface MessageThread {
  id: string
  participants: string[]
  lastMessagePreview: string
  updatedAt: string
  messages: Message[]
}

export interface NotificationItem {
  id: string
  type: 'interest' | 'message' | 'event'
  text: string
  createdAt: string
  read: boolean
}

export interface PlanFeature {
  title: string
  description: string
  icon: string
}

export interface PlanOption {
  id: string
  audience: 'artist' | 'contractor'
  tier: ArtistPlanTier | ContractorPlanTier | 'pro'
  label: string
  price: string
  highlight?: string
  cta: string
  features: PlanFeature[]
}

export interface AppDataShape {
  artists: ArtistProfile[]
  contractors: ContractorProfile[]
  admins: AdminProfile[]
  events: EventItem[]
  threads: MessageThread[]
  notifications: NotificationItem[]
  plans: PlanOption[]
}

