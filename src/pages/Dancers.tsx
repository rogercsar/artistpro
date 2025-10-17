import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Heart, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { mockDancerProfiles } from '../data/mockData';
import { fetchDancers } from '../services/api';
import { brazilianStates, getCitiesByState } from '../data/brazilianLocations';
import { useFavorites } from '../hooks/useFavorites';
import { ContactModal } from '../components/ContactModal';

export const Dancers: React.FC = () => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [dancers, setDancers] = useState(mockDancerProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDanceStyle, setSelectedDanceStyle] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'dance' | 'theater' | 'clowning' | 'music'>('dance');
  const [showFilters, setShowFilters] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedDancer, setSelectedDancer] = useState<any>(null);

  const danceStyles = ['Ballet Clássico', 'Dança Contemporânea', 'Hip-Hop', 'Jazz', 'Street Dance', 'Breaking'];

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchDancers(selectedCategory);
        const normalized = list.map((d: any) => ({
          ...d,
          danceStyles: Array.isArray(d.danceStyles) ? d.danceStyles : []
        }));
        setDancers(normalized as any);
      } catch (e) {
        setDancers(mockDancerProfiles);
      }
    })();
  }, [selectedCategory]);

  const filteredDancers = dancers.filter(dancer => {
    const matchesSearch = dancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dancer.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || dancer.location?.includes(selectedState);
    const matchesCity = !selectedCity || dancer.location?.includes(selectedCity);
    const matchesDanceStyle = !selectedDanceStyle || (Array.isArray((dancer as any).danceStyles) && (dancer as any).danceStyles.includes(selectedDanceStyle));
    const matchesLevel = !selectedLevel || dancer.level === selectedLevel;
    
    return matchesSearch && matchesState && matchesCity && matchesDanceStyle && matchesLevel;
  });

  const availableCities = selectedState ? getCitiesByState(selectedState) : [];

  // Função para favoritar/desfavoritar bailarino
  const handleFavoriteToggle = (dancerId: string) => {
    if (isFavorite('dancer', dancerId)) {
      removeFavorite('dancer', dancerId);
    } else {
      addFavorite('dancer', dancerId);
    }
  };

  // Função para abrir modal de contato
  const handleContact = (dancer: any) => {
    setSelectedDancer(dancer);
    setIsContactModalOpen(true);
  };

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
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">
              Artistas
            </h1>
            <p className="text-lg text-gray-600">Dança, Teatro, Clown e Música</p>
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
              placeholder="Buscar artistas..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  Estilo / Gênero
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">Todos os níveis</option>
                  <option value="basic">Básico</option>
                  <option value="advanced">Avançado</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDancers.map((dancer) => {
          const levelBadge = getLevelBadge(dancer.level);
          return (
            <Card key={dancer.id} hover className="text-center">
              <CardContent>
                <div className="relative mb-4">
                  <img
                    src={dancer.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                    alt={dancer.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  {dancer.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {dancer.name}
                </h3>
                
                <div className="flex items-center justify-center mb-2">
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
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {dancer.rating}
                  </span>
                </div>

                <div className="flex items-center justify-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelBadge.bg} ${levelBadge.text}`}>
                    {levelBadge.label}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {dancer.location}
                </p>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {dancer.bio}
                </p>

                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {dancer.danceStyles.slice(0, 2).map((style) => (
                    <span
                      key={style}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {style}
                    </span>
                  ))}
                  {dancer.danceStyles.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{dancer.danceStyles.length - 2}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link to={`/profile/${dancer.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleFavoriteToggle(dancer.id)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite('dancer', dancer.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContact(dancer)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDancers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Heart className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum artista encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}

      {/* Modal de Contato */}
      {selectedDancer && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
            setSelectedDancer(null);
          }}
          contactName={selectedDancer.name}
          contactType="dancer"
          contactInfo={{
            email: selectedDancer.email,
            phone: selectedDancer.phone,
            instagram: selectedDancer.socialMedia?.instagram,
            facebook: selectedDancer.socialMedia?.facebook,
            twitter: selectedDancer.socialMedia?.twitter,
          }}
        />
      )}
    </div>
  );
};

