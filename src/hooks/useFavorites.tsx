import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Favorite } from '../types';
import { useAuth } from './useAuth';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { addFavoriteItem, fetchMyFavorites, removeFavoriteItem } from '../services/api';

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (type: 'event' | 'dancer' | 'contractor', itemId: string) => void;
  removeFavorite: (type: 'event' | 'dancer' | 'contractor', itemId: string) => void;
  isFavorite: (type: 'event' | 'dancer' | 'contractor', itemId: string) => boolean;
  getFavoritesByType: (type: 'event' | 'dancer' | 'contractor') => Favorite[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (isSupabaseConfigured && isAuthenticated) {
        try {
          const rows = await fetchMyFavorites();
          setFavorites(rows);
          try { localStorage.setItem('artistpro_favorites', JSON.stringify(rows)); } catch {}
          return;
        } catch (e) {
          console.error('Erro ao buscar favoritos do Supabase, usando localStorage', e);
        }
      }
      // Fallback localStorage (migração de danz_* para artistpro_*)
      const savedFavorites = localStorage.getItem('artistpro_favorites') || localStorage.getItem('danz_favorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      } else {
        setFavorites([]);
      }
    };
    load();
  }, [isAuthenticated]);

  useEffect(() => {
    // Salvar favoritos no localStorage usando nova chave
    localStorage.setItem('artistpro_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = async (type: 'event' | 'dancer' | 'contractor', itemId: string) => {
    if (isSupabaseConfigured && isAuthenticated) {
      const created = await addFavoriteItem(type, itemId);
      if (created) {
        setFavorites(prev => {
          const exists = prev.some(f => f.type === created.type && f.itemId === created.itemId);
          if (exists) return prev;
          return [created, ...prev];
        });
      }
      return;
    }
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      userId: 'current_user',
      type,
      itemId,
      createdAt: new Date().toISOString()
    };
    setFavorites(prev => {
      const exists = prev.some(fav => fav.type === type && fav.itemId === itemId);
      if (exists) return prev;
      return [newFavorite, ...prev];
    });
  };

  const removeFavorite = async (type: 'event' | 'dancer' | 'contractor', itemId: string) => {
    if (isSupabaseConfigured && isAuthenticated) {
      const ok = await removeFavoriteItem(type, itemId);
      if (ok) {
        setFavorites(prev => prev.filter(fav => !(fav.type === type && fav.itemId === itemId)));
      }
      return;
    }
    setFavorites(prev => prev.filter(fav => !(fav.type === type && fav.itemId === itemId)));
  };

  const isFavorite = (type: 'event' | 'dancer' | 'contractor', itemId: string): boolean => {
    return favorites.some(fav => fav.type === type && fav.itemId === itemId);
  };

  const getFavoritesByType = (type: 'event' | 'dancer' | 'contractor'): Favorite[] => {
    return favorites.filter(fav => fav.type === type);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      getFavoritesByType
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

