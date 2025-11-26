import { createContext, useContext, useMemo, useState } from 'react'
import type {
  AppDataShape,
  ArtistPlanTier,
  ContractorPlanTier,
  EventItem,
  PlatformUser,
  UserRole,
} from '../types'
import { storageService } from '../services/storage'

type RegisterPayload =
  | {
      role: 'artist'
      name: string
      email: string
      phone: string
      location: string
      bio: string
      planTier: ArtistPlanTier
      artForms: string[]
      skills: string[]
    }
  | {
      role: 'contractor'
      name: string
      email: string
      phone: string
      location: string
      bio: string
      planTier: ContractorPlanTier
      company: string
      tags: string[]
    }

interface AuthResult {
  success: boolean
  message?: string
  user?: PlatformUser
}

interface AppContextValue {
  data: AppDataShape
  currentUser: PlatformUser | null
  login: (email: string, role: UserRole) => AuthResult
  logout: () => void
  register: (payload: RegisterPayload) => AuthResult
  toggleInterest: (eventId: string) => void
  toggleLike: (eventId: string) => void
  updateProfile: (user: PlatformUser) => void
  updateUser: (user: PlatformUser) => void
  createEvent: (event: Omit<EventItem, 'id' | 'contractorId' | 'likedBy' | 'interestedBy' | 'shareCount'>, contractorId: string) => void
  getEventById: (id: string) => EventItem | undefined
  getEventsByContractor: (contractorId: string) => EventItem[]
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}`

const planLabelMap: Record<string, string> = {
  basic: 'Básico',
  advanced: 'Avançado',
  pro: 'Pro',
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AppDataShape>(() => storageService.bootstrap())
  const [currentUser, setCurrentUser] = useState<PlatformUser | null>(() =>
    storageService.getSession(),
  )

  const persist = (next: AppDataShape) => {
    setData(next)
    storageService.saveData(next)
  }

  const login = (email: string, role: UserRole): AuthResult => {
    const pool =
      role === 'artist'
        ? data.artists
        : role === 'contractor'
          ? data.contractors
          : data.admins

    const found = pool.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (!found) {
      return { success: false, message: 'Usuário não encontrado. Cadastre-se em minutos.' }
    }
    setCurrentUser(found)
    storageService.saveSession(found)
    return { success: true, user: found }
  }

  const logout = () => {
    setCurrentUser(null)
    storageService.saveSession(null)
  }

  const register = (payload: RegisterPayload): AuthResult => {
    if (payload.role === 'artist') {
      const newArtist = {
        id: generateId('artist'),
        role: 'artist' as const,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        location: payload.location,
        bio: payload.bio,
        avatar: `https://i.pravatar.cc/150?u=${payload.email}`,
        planLabel: planLabelMap[payload.planTier],
        planTier: payload.planTier,
        heroTagline: 'Novo talento na ArtistPro',
        highlight: 'Complete seu portfólio para mais destaque',
        artForms: payload.artForms,
        specialties: payload.skills.slice(0, 3),
        skills: payload.skills,
        portfolio: { photos: [], videos: [] },
        availability: ['Datas flexíveis'],
        stats: { views: 0, saved: 0, responseRate: 100 },
        feed: [],
        reviews: [],
        preferredCities: [],
        interestQuota: {
          limit: payload.planTier === 'basic' ? 10 : 999,
          used: 0,
        },
      }
      const next = { ...data, artists: [...data.artists, newArtist] }
      persist(next)
      setCurrentUser(newArtist)
      storageService.saveSession(newArtist)
      return { success: true, user: newArtist }
    }

    const newContractor = {
      id: generateId('contractor'),
      role: 'contractor' as const,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      location: payload.location,
      bio: payload.bio,
      avatar: `https://i.pravatar.cc/150?u=${payload.email}`,
      planLabel: planLabelMap[payload.planTier],
      planTier: payload.planTier,
      company: payload.company,
      headline: 'Novo contratante na ArtistPro',
      tags: payload.tags,
      activeEvents: [],
      talentNeeds: payload.tags,
      contactQuota: {
        limit: payload.planTier === 'basic' ? 5 : 999,
        used: 0,
      },
    }
    const next = { ...data, contractors: [...data.contractors, newContractor] }
    persist(next)
    setCurrentUser(newContractor)
    storageService.saveSession(newContractor)
    return { success: true, user: newContractor }
  }

  const toggleInterest = (eventId: string) => {
    if (!currentUser || currentUser.role !== 'artist') return
    const next = storageService.toggleEventInterest(eventId, currentUser.id)
    setData(next)
  }

  const toggleLike = (eventId: string) => {
    if (!currentUser) return
    const next = storageService.toggleEventLike(eventId, currentUser.id)
    setData(next)
  }

  const updateProfile = (user: PlatformUser) => {
    let next: AppDataShape = data
    if (user.role === 'artist') {
      next = storageService.upsertArtist(user)
    } else if (user.role === 'contractor') {
      next = storageService.upsertContractor(user)
    }
    setCurrentUser(user)
    storageService.saveSession(user)
    setData(next)
  }

  const updateUser = updateProfile

  const createEvent = (
    event: Omit<EventItem, 'id' | 'contractorId' | 'likedBy' | 'interestedBy' | 'shareCount'>,
    contractorId: string,
  ) => {
    const newEvent: EventItem = {
      ...event,
      id: generateId('event'),
      contractorId,
      likedBy: [],
      interestedBy: [],
      shareCount: 0,
    }
    const next = { ...data, events: [...data.events, newEvent] }
    persist(next)
  }

  const value: AppContextValue = useMemo(
    () => ({
      data,
      currentUser,
      login,
      logout,
      register,
      toggleInterest,
      toggleLike,
      updateProfile,
      updateUser,
      createEvent,
      getEventById: (id: string) => data.events.find((event) => event.id === id),
      getEventsByContractor: (contractorId: string) =>
        data.events.filter((event) => event.contractorId === contractorId),
    }),
    [data, currentUser],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp deve ser usado dentro do AppProvider')
  }
  return ctx
}

