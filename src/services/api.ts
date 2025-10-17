import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Event, DancerProfile, ContractorProfile, User } from '../types';
import { mockEvents, mockDancerProfiles, mockContractorProfiles } from '../data/mockData';

export async function fetchEvents(category?: 'dance' | 'theater' | 'clowning' | 'music'): Promise<Event[]> {
  if (!isSupabaseConfigured) return mockEvents;
  let query = supabase.from('events_view').select('*').order('date', { ascending: true });
  if (category) query = query.eq('category', category);
  const { data, error } = await query as any;
  if (error) {
    console.error('fetchEvents error', error);
    return mockEvents;
  }
  return (data as any[]) as Event[];
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
  return data as any as Event;
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