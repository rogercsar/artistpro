import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Clock, Star, Users, Trash2, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useFavorites } from '../hooks/useFavorites';
import { mockEvents, mockDancerProfiles, mockContractorProfiles } from '../data/mockData';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { fetchEventsByIds, fetchProfilesByIds } from '../services/api';
import { ContractorProfile, DancerProfile, Event } from '../types';

export const Favorites: React.FC = () => {
  const { favorites, removeFavorite, getFavoritesByType } = useFavorites();
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'dancers' | 'contractors'>('all');

  const favoriteEvents = getFavoritesByType('event');
  const favoriteDancers = getFavoritesByType('dancer');
  const favoriteContractors = getFavoritesByType('contractor');

  const [eventsById, setEventsById] = useState<Record<string, Event>>({});
  const [dancersById, setDancersById] = useState<Record<string, DancerProfile>>({});
  const [contractorsById, setContractorsById] = useState<Record<string, ContractorProfile>>({});

  const eventIds = useMemo(() => favoriteEvents.map(f => f.itemId), [favoriteEvents]);
  const dancerIds = useMemo(() => favoriteDancers.map(f => f.itemId), [favoriteDancers]);
  const contractorIds = useMemo(() => favoriteContractors.map(f => f.itemId), [favoriteContractors]);

  useEffect(() => {
    const load = async () => {
      if (isSupabaseConfigured) {
        try {
          if (eventIds.length > 0) {
            const events = await fetchEventsByIds(eventIds);
            setEventsById(Object.fromEntries(events.map(e => [e.id, e])));
          } else {
            setEventsById({});
          }
          const profileIds = Array.from(new Set([...dancerIds, ...contractorIds]));
          if (profileIds.length > 0) {
            const profiles = await fetchProfilesByIds(profileIds);
            const dancers: Record<string, DancerProfile> = {};
            const contractors: Record<string, ContractorProfile> = {};
            for (const p of profiles) {
              if ((p as any).type === 'contractor') {
                contractors[p.id] = p as ContractorProfile;
              } else {
                dancers[p.id] = p as DancerProfile;
              }
            }
            setDancersById(dancers);
            setContractorsById(contractors);
          } else {
            setDancersById({});
            setContractorsById({});
          }
        } catch (e) {
          console.error('Erro carregando favoritos reais, usando mocks', e);
          // fallback mocks
          setEventsById(Object.fromEntries(mockEvents.map(e => [e.id, e])));
          setDancersById(Object.fromEntries(mockDancerProfiles.map(d => [d.id, d])) as any);
          setContractorsById(Object.fromEntries(mockContractorProfiles.map(c => [c.id, c])) as any);
        }
      } else {
        // modo mock
        setEventsById(Object.fromEntries(mockEvents.map(e => [e.id, e])));
        setDancersById(Object.fromEntries(mockDancerProfiles.map(d => [d.id, d])) as any);
        setContractorsById(Object.fromEntries(mockContractorProfiles.map(c => [c.id, c])) as any);
      }
    };
    load();
  }, [eventIds, dancerIds, contractorIds]);

  const handleRemoveFavorite = (type: 'event' | 'dancer' | 'contractor', itemId: string) => {
    removeFavorite(type, itemId);
  };

  const tabs = [
    { id: 'all', label: 'Todos', count: favorites.length },
    { id: 'events', label: 'Eventos', count: favoriteEvents.length },
    { id: 'dancers', label: 'Artistas', count: favoriteDancers.length },
    { id: 'contractors', label: 'Contratantes', count: favoriteContractors.length },
  ];

  const getLevelBadge = (level: string) => {
    const badges = {
      basic: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Básico' },
      advanced: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Avançado' },
      pro: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Pro' }
    };
    return badges[level as keyof typeof badges] || badges.basic;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Favoritos</h1>
        <p className="text-gray-600">
          Gerencie seus eventos, artistas e contratantes favoritos
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Todos os Favoritos */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {favorites.length === 0 ? (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito ainda</h3>
                    <p className="text-gray-600 mb-6">
                      Comece favoritando eventos, bailarinos ou contratantes que te interessam.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button asChild>
                        <Link to="/events">Explorar Eventos</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/dancers">Ver Artistas</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Eventos Favoritos */}
                {favoriteEvents.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Eventos Favoritos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteEvents.map((favorite) => {
                        const event = eventsById[favorite.itemId];
                        if (!event) return null;
                        
                        return (
                          <Card key={favorite.id} hover>
                            <CardContent>
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
                                <button
                                  onClick={() => handleRemoveFavorite('event', event.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  title="Remover dos favoritos"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {new Date(event.date).toLocaleDateString('pt-BR')}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {event.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {event.location}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{event.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-1">
                                  {event.danceStyles.slice(0, 2).map((style) => (
                                    <span
                                      key={style}
                                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                                    >
                                      {style}
                                    </span>
                                  ))}
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/events/${event.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Ver
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Artistas Favoritos */}
                {favoriteDancers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Artistas Favoritos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {favoriteDancers.map((favorite) => {
                        const dancer = dancersById[favorite.itemId];
                        if (!dancer) return null;
                        
                        const levelBadge = getLevelBadge(dancer.level);
                        
                        return (
                          <Card key={favorite.id} hover>
                            <CardContent>
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={dancer.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                                    alt={dancer.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{dancer.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelBadge.bg} ${levelBadge.text}`}>
                                      {levelBadge.label}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveFavorite('dancer', dancer.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  title="Remover dos favoritos"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(dancer.rating)
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-1 text-sm text-gray-600">{dancer.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{dancer.bio}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-1">
                                  {dancer.danceStyles.slice(0, 2).map((style) => (
                                    <span
                                      key={style}
                                      className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs"
                                    >
                                      {style}
                                    </span>
                                  ))}
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/profile/${dancer.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Ver
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Contratantes Favoritos */}
                {favoriteContractors.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contratantes Favoritos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteContractors.map((favorite) => {
                        const contractor = contractorsById[favorite.itemId];
                        if (!contractor) return null;
                        
                        return (
                          <Card key={favorite.id} hover>
                            <CardContent>
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={contractor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                                    alt={contractor.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{contractor.name}</h3>
                                    <p className="text-sm text-gray-600">{contractor.companyName}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveFavorite('contractor', contractor.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  title="Remover dos favoritos"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(contractor.rating)
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-1 text-sm text-gray-600">{contractor.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{contractor.companyDescription}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Users className="h-4 w-4 mr-1" />
                                  {contractor.events.length} eventos
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/profile/${contractor.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Ver
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Filtros específicos para cada tipo */}
        {activeTab !== 'all' && (
          <div>
            {activeTab === 'events' && favoriteEvents.length === 0 && (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento favorito</h3>
                    <p className="text-gray-600 mb-6">
                      Explore eventos e adicione os que te interessam aos favoritos.
                    </p>
                    <Button asChild>
                      <Link to="/events">Explorar Eventos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'dancers' && favoriteDancers.length === 0 && (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artista favorito</h3>
                    <p className="text-gray-600 mb-6">
                      Descubra artistas talentosos e adicione aos seus favoritos.
                    </p>
                    <Button asChild>
                      <Link to="/dancers">Ver Artistas</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'contractors' && favoriteContractors.length === 0 && (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum contratante favorito</h3>
                    <p className="text-gray-600 mb-6">
                      Conheça contratantes e empresas que organizam eventos.
                    </p>
                    <Button asChild>
                      <Link to="/events">Explorar Eventos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

