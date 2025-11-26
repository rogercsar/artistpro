import { mockData } from '../data/mockData'
import type {
  AppDataShape,
  ArtistProfile,
  ContractorProfile,
  EventItem,
  PlatformUser,
} from '../types'

const DATA_KEY = 'artistpro:data'
const SESSION_KEY = 'artistpro:session'

const hasWindow = () => typeof window !== 'undefined'

const safeParse = <T>(raw: string | null): T | null => {
  try {
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

export const storageService = {
  bootstrap(): AppDataShape {
    if (!hasWindow()) return mockData
    const cached = safeParse<AppDataShape>(localStorage.getItem(DATA_KEY))
    if (!cached) {
      localStorage.setItem(DATA_KEY, JSON.stringify(mockData))
      return mockData
    }
    
    // Mesclar usuários de teste do mockData com dados existentes
    // Garante que os usuários de teste sempre estejam disponíveis
    const testArtist = mockData.artists.find((a) => a.id === 'artist-test')
    const testContractor = mockData.contractors.find((c) => c.id === 'contractor-test')
    const testAdmin = mockData.admins.find((a) => a.id === 'admin-test')
    
    let updated = { ...cached }
    
    // Adicionar/atualizar artista de teste
    if (testArtist) {
      const existingIndex = updated.artists.findIndex((a) => a.id === 'artist-test')
      if (existingIndex >= 0) {
        updated.artists[existingIndex] = testArtist
      } else {
        updated.artists.push(testArtist)
      }
    }
    
    // Adicionar/atualizar contratante de teste
    if (testContractor) {
      const existingIndex = updated.contractors.findIndex((c) => c.id === 'contractor-test')
      if (existingIndex >= 0) {
        updated.contractors[existingIndex] = testContractor
      } else {
        updated.contractors.push(testContractor)
      }
    }
    
    // Adicionar/atualizar admin de teste
    if (testAdmin) {
      const existingIndex = updated.admins.findIndex((a) => a.id === 'admin-test')
      if (existingIndex >= 0) {
        updated.admins[existingIndex] = testAdmin
      } else {
        updated.admins.push(testAdmin)
      }
    }
    
    // Salvar dados atualizados
    localStorage.setItem(DATA_KEY, JSON.stringify(updated))
    return updated
  },
  getData(): AppDataShape {
    if (!hasWindow()) return mockData
    const cached = safeParse<AppDataShape>(localStorage.getItem(DATA_KEY))
    return cached ?? this.bootstrap()
  },
  saveData(next: AppDataShape) {
    if (!hasWindow()) return
    localStorage.setItem(DATA_KEY, JSON.stringify(next))
  },
  getSession(): PlatformUser | null {
    if (!hasWindow()) return null
    return safeParse<PlatformUser>(localStorage.getItem(SESSION_KEY))
  },
  saveSession(user: PlatformUser | null) {
    if (!hasWindow()) return
    if (!user) {
      localStorage.removeItem(SESSION_KEY)
      return
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  },
  upsertArtist(profile: ArtistProfile) {
    const data = this.getData()
    const artists = data.artists.some((a) => a.id === profile.id)
      ? data.artists.map((a) => (a.id === profile.id ? profile : a))
      : [...data.artists, profile]
    const next = { ...data, artists }
    this.saveData(next)
    return next
  },
  upsertContractor(profile: ContractorProfile) {
    const data = this.getData()
    const contractors = data.contractors.some((c) => c.id === profile.id)
      ? data.contractors.map((c) => (c.id === profile.id ? profile : c))
      : [...data.contractors, profile]
    const next = { ...data, contractors }
    this.saveData(next)
    return next
  },
  toggleEventInterest(eventId: string, artistId: string) {
    const data = this.getData()
    const events = data.events.map((event) => {
      if (event.id !== eventId) return event
      const interested = new Set(event.interestedBy)
      interested.has(artistId) ? interested.delete(artistId) : interested.add(artistId)
      return { ...event, interestedBy: Array.from(interested) }
    })
    const next = { ...data, events }
    this.saveData(next)
    return next
  },
  toggleEventLike(eventId: string, userId: string) {
    const data = this.getData()
    const events = data.events.map((event) => {
      if (event.id !== eventId) return event
      const liked = new Set(event.likedBy)
      liked.has(userId) ? liked.delete(userId) : liked.add(userId)
      return { ...event, likedBy: Array.from(liked) }
    })
    const next = { ...data, events }
    this.saveData(next)
    return next
  },
  addEvent(newEvent: EventItem) {
    const data = this.getData()
    const next = { ...data, events: [newEvent, ...data.events] }
    this.saveData(next)
    return next
  },
  reset() {
    if (!hasWindow()) return
    localStorage.setItem(DATA_KEY, JSON.stringify(mockData))
    localStorage.removeItem(SESSION_KEY)
  },
  cloneData(): AppDataShape {
    return clone(this.getData())
  },
}

