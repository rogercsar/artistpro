import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Event, DancerProfile, ContractorProfile, User, Favorite } from '../types';
import { mockEvents, mockDancerProfiles, mockContractorProfiles } from '../data/mockData';

function mapContractorFromView(p: any): ContractorProfile {
  return {
    id: p?.id || '',
    email: p?.email || '',
    name: p?.name || '',
    type: 'contractor',
    level: (p?.level as any) || 'basic',
    avatar: p?.avatar || p?.avatar_url || undefined,
    bio: p?.bio || undefined,
    location: p?.location || undefined,
    website: p?.website || undefined,
    isVerified: !!p?.is_verified,
    createdAt: p?.created_at || new Date().toISOString(),
    companyName: p?.name || '',
    companyLogo: p?.avatar || p?.avatar_url || undefined,
    companyDescription: p?.bio || undefined,
    events: [],
    reviews: [],
    rating: Number(p?.rating || 0)
  } as ContractorProfile;
}

function mapEventRowToEvent(e: any): Event {
  const budgetMin = e?.budget_min;
  const budgetMax = e?.budget_max;
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    contractorId: e.contractor_id,
    contractor: mapContractorFromView(e.contractor || {}),
    location: e.location,
    date: e.date,
    time: e.time,
    duration: e.duration ?? undefined,
    requirements: e.requirements || [],
    danceStyles: e.genres || e.danceStyles || [],
    budget: budgetMin != null || budgetMax != null ? {
      min: Number(budgetMin || 0),
      max: Number(budgetMax || 0),
      currency: e.budget_currency || 'BRL'
    } : undefined,
    maxParticipants: e.max_participants ?? undefined,
    currentParticipants: [],
    interestedDancers: [],
    status: e.status,
    createdAt: e.created_at,
    images: e.images || [],
    tags: e.tags || []
  } as Event;
}

export async function fetchEvents(category?: 'dance' | 'theater' | 'clowning' | 'music'): Promise<Event[]> {
  if (!isSupabaseConfigured) return mockEvents;
  let query = supabase.from('events_view').select('*').order('date', { ascending: true });
  if (category) query = (query as any).eq('category', category);
  const { data, error } = await (query as any);
  if (error) {
    console.error('fetchEvents error', error);
    return mockEvents;
  }
  return (data as any[]).map(mapEventRowToEvent);
}

export async function fetchEventById(id: string): Promise<Event | undefined> {
  if (!isSupabaseConfigured) return mockEvents.find(e => e.id === id);
  const { data, error } = await supabase
    .from('events_view')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('fetchEventById error', error);
    return mockEvents.find(e => e.id === id);
  }
  return mapEventRowToEvent(data as any);
}

export async function fetchDancers(category: 'dance' | 'theater' | 'clowning' | 'music' = 'dance'): Promise<DancerProfile[]> {
  if (!isSupabaseConfigured) return mockDancerProfiles;
  const { data, error } = await supabase
    .from('profiles_view')
    .select('*')
    .eq('role', 'artist')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('fetchDancers error', error);
    return mockDancerProfiles;
  }
  // Garantir compatibilidade mínima com DancerProfile esperado no front
  const mapped = (data as any[]).map((p: any) => ({
    id: p.id,
    email: p.email || '',
    name: p.name || '',
    type: 'dancer',
    level: (p.level as any) || 'basic',
    avatar: p.avatar_url || undefined,
    bio: p.bio || undefined,
    location: p.location || undefined,
    website: p.website || undefined,
    socialMedia: p.social_media || undefined,
    isVerified: !!p.is_verified,
    createdAt: p.created_at,
    skills: [],
    portfolio: { photos: p.portfolio_photos || [], videos: p.portfolio_videos || [] },
    availability: {},
    experience: '',
    danceStyles: [],
    reviews: [],
    rating: Number(p.rating || 0)
  })) as DancerProfile[];
  return mapped;
}

export async function fetchContractors(category?: 'dance' | 'theater' | 'clowning' | 'music'): Promise<ContractorProfile[]> {
  if (!isSupabaseConfigured) return mockContractorProfiles;
  let query = supabase
    .from('profiles_view')
    .select('*')
    .eq('role', 'contractor')
    .order('created_at', { ascending: false }) as any;
  if (category) query = query.eq('contractor_category', category);
  const { data, error } = await query;
  if (error) {
    console.error('fetchContractors error', error);
    return mockContractorProfiles;
  }
  const mapped = (data as any[]).map((p: any) => ({
    id: p.id,
    email: p.email || '',
    name: p.name || '',
    type: 'contractor',
    level: (p.level as any) || 'basic',
    avatar: p.avatar_url || undefined,
    bio: p.bio || undefined,
    location: p.location || undefined,
    website: p.website || undefined,
    isVerified: !!p.is_verified,
    createdAt: p.created_at,
    companyName: p.name || '',
    companyLogo: p.avatar_url || undefined,
    companyDescription: p.bio || undefined,
    events: [],
    reviews: [],
    rating: Number(p.rating || 0)
  })) as ContractorProfile[];
  return mapped;
}

export async function createEvent(payload: any): Promise<{ ok: boolean; id?: string; error?: any }>{
  if (!isSupabaseConfigured) return { ok: false, error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('events')
    .insert(payload)
    .select('id')
    .single();
  if (error) return { ok: false, error };
  return { ok: true, id: (data as any).id };
}

export async function upsertProfile(id: string, payload: Partial<User>): Promise<{ ok: boolean; error?: any }>{
  if (!isSupabaseConfigured) return { ok: false, error: 'Supabase not configured' };
  const { error } = await supabase
    .from('profiles')
    .upsert({ id, ...payload })
    .eq('id', id);
  if (error) return { ok: false, error };
  return { ok: true };
}

// -------- Event Interests (user ↔ event) --------
export async function getMyEventInterest(eventId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { data, error } = await supabase
    .from('event_interests')
    .select('id')
    .eq('event_id', eventId)
    .limit(1);
  if (error) {
    console.error('getMyEventInterest error', error);
    return false;
  }
  return Array.isArray(data) && data.length > 0;
}

export async function addEventInterest(eventId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return false;
  const { error } = await supabase
    .from('event_interests')
    .insert({ event_id: eventId, user_id: userId });
  if (error) {
    console.error('addEventInterest error', error);
    return false;
  }
  return true;
}

export async function removeEventInterest(eventId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return false;
  const { error } = await supabase
    .from('event_interests')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', userId);
  if (error) {
    console.error('removeEventInterest error', error);
    return false;
  }
  return true;
}

export async function getEventInterestCount(eventId: string): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  const { count, error } = await supabase
    .from('event_interests')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId);
  if (error) {
    console.error('getEventInterestCount error', error);
    return 0;
  }
  return count || 0;
}

// -------- Favorites --------
function mapFavoriteRowToFavorite(row: any): Favorite {
  const type = row.type === 'artist' ? 'dancer' : row.type;
  return {
    id: row.id,
    userId: row.user_id,
    type: type,
    itemId: row.item_id,
    createdAt: row.created_at
  } as Favorite;
}

export async function fetchMyFavorites(): Promise<Favorite[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('fetchMyFavorites error', error);
    return [];
  }
  return (data as any[]).map(mapFavoriteRowToFavorite);
}

export async function addFavoriteItem(type: 'event' | 'dancer' | 'contractor', itemId: string): Promise<Favorite | null> {
  if (!isSupabaseConfigured) return null;
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return null;
  const dbType = type === 'dancer' ? 'artist' : type;
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, type: dbType, item_id: itemId })
    .select('*')
    .single();
  if (error) {
    console.error('addFavoriteItem error', error);
    return null;
  }
  return mapFavoriteRowToFavorite(data as any);
}

export async function removeFavoriteItem(type: 'event' | 'dancer' | 'contractor', itemId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return false;
  const dbType = type === 'dancer' ? 'artist' : type;
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('type', dbType)
    .eq('item_id', itemId);
  if (error) {
    console.error('removeFavoriteItem error', error);
    return false;
  }
  return true;
}

// -------- Bulk fetch helpers for Favorites page --------
export async function fetchEventsByIds(ids: string[]): Promise<Event[]> {
  if (!isSupabaseConfigured || ids.length === 0) return [];
  const { data, error } = await supabase
    .from('events_view')
    .select('*')
    .in('id', ids);
  if (error) {
    console.error('fetchEventsByIds error', error);
    return [];
  }
  return (data as any[]).map(mapEventRowToEvent);
}

export async function fetchProfilesByIds(ids: string[]): Promise<(DancerProfile | ContractorProfile)[]> {
  if (!isSupabaseConfigured || ids.length === 0) return [] as any[];
  const { data, error } = await supabase
    .from('profiles_view')
    .select('*')
    .in('id', ids);
  if (error) {
    console.error('fetchProfilesByIds error', error);
    return [];
  }
  return (data as any[]).map((p: any) => {
    if (p.role === 'contractor') {
      return mapContractorFromView(p);
    }
    // artist → map to DancerProfile minimal
    const mapped: DancerProfile = {
      id: p.id,
      email: p.email || '',
      name: p.name || '',
      type: 'dancer',
      level: (p.level as any) || 'basic',
      avatar: p.avatar_url || undefined,
      bio: p.bio || undefined,
      location: p.location || undefined,
      website: p.website || undefined,
      isVerified: !!p.is_verified,
      createdAt: p.created_at,
      skills: [],
      portfolio: { photos: p.portfolio_photos || [], videos: p.portfolio_videos || [] },
      availability: {},
      experience: '',
      danceStyles: [],
      reviews: [],
      rating: Number(p.rating || 0)
    };
    return mapped;
  });
}