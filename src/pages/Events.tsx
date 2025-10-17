import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, Clock, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { mockEvents } from '../data/mockData';
import { fetchEvents } from '../services/api';
import { brazilianStates, getCitiesByState } from '../data/brazilianLocations';

export const Events: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDanceStyle, setSelectedDanceStyle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'dance' | 'theater' | 'clowning' | 'music'>('dance');
  const [showFilters, setShowFilters] = useState(false);

  const danceStyles = ['Ballet Clássico', 'Dança Contemporânea', 'Hip-Hop', 'Jazz', 'Street Dance', 'Breaking'];

  useEffect(() => {
    (async () => {
      try {
        const evts = await fetchEvents(selectedCategory);
        // Map possible genres -> danceStyles compatibility and set default category
        const mapped = evts.map((e: any) => ({
          ...e,
          category: e.category || selectedCategory,
          danceStyles: e.danceStyles || e.genres || []
        }));
        setEvents(mapped as any);
      } catch (e) {
        // fallback aos mocks: marcar categoria padrão
        setEvents((mockEvents as any).map((m: any) => ({ ...m, category: 'dance' })));
      }
    })();
  }, [selectedCategory]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || event.location.includes(selectedState);
    const matchesCity = !selectedCity || event.location.includes(selectedCity);
    const matchesDanceStyle = !selectedDanceStyle || event.danceStyles.includes(selectedDanceStyle);
    const matchesCategory = !selectedCategory || (event as any).category === selectedCategory;
    
    return matchesSearch && matchesState && matchesCity && matchesDanceStyle && matchesCategory;
  });

  const availableCities = selectedState ? getCitiesByState(selectedState) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">
              Eventos
            </h1>
            <p className="text-lg text-gray-600">
              Todos os tipos: Dança, Teatro, Clown e Música
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="dance">Dança</option>
              <option value="theater">Teatro</option>
              <option value="clowning">Clown</option>
              <option value="music">Música</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5" />}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity(''); // Reset city when state changes
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">Todos os estados</option>
                  {brazilianStates.map(state => (
                    <option key={state.code} value={state.name}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="">Todas as cidades</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero / Estilo
                </label>
                <select
                  value={selectedDanceStyle}
                  onChange={(e) => setSelectedDanceStyle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">Todos os estilos</option>
                  {danceStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} hover className="overflow-hidden">
            <div className="relative">
              <img
                src={event.images?.[0] || 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=250&fit=crop'}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'active' ? 'Ativo' : event.status}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <CardContent>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                {event.budget && (
                  <div className="text-sm font-medium text-green-600">
                    R$ {event.budget.min.toLocaleString()} - R$ {event.budget.max.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.danceStyles.slice(0, 3).map((style) => (
                  <span
                    key={style}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                  >
                    {style}
                  </span>
                ))}
                {event.danceStyles.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{event.danceStyles.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={event.contractor.avatar}
                    alt={event.contractor.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{event.contractor.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-500">
                    {event.interestedDancers.length} interessados
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/events/${event.id}`}>
                    Ver Detalhes
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}
    </div>
  );
};

