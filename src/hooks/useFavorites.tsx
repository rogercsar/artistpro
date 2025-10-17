import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Favorite } from '../types';

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

  useEffect(() => {
    // Carregar favoritos do localStorage (migração de danz_* para artistpro_*)
    const savedFavorites = localStorage.getItem('artistpro_favorites') || localStorage.getItem('danz_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Salvar favoritos no localStorage usando nova chave
    localStorage.setItem('artistpro_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (type: 'event' | 'dancer' | 'contractor', itemId: string) => {
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      userId: 'current_user', // Em uma aplicação real, isso viria do contexto de auth
      type,
      itemId,
      createdAt: new Date().toISOString()
    };

    setFavorites(prev => {
      // Verificar se já existe
      const exists = prev.some(fav => fav.type === type && fav.itemId === itemId);
      if (exists) return prev;
      return [...prev, newFavorite];
    });
  };

  const removeFavorite = (type: 'event' | 'dancer' | 'contractor', itemId: string) => {
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

