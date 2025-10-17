import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Heart, Share2, MessageCircle, ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { mockEvents, mockDancerProfiles } from '../data/mockData';
import { fetchEventById, addEventInterest, getEventInterestCount, getMyEventInterest, removeEventInterest } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { ContactModal } from '../components/ContactModal';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabaseClient';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isInterested, setIsInterested] = useState(false);
  const [interestedCount, setInterestedCount] = useState<number>(mockEvents.find(e => e.id === id)?.interestedDancers?.length || 0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [event, setEvent] = useState(mockEvents.find(e => e.id === id)!);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const e = await fetchEventById(id);
      if (e) {
        const mapped: any = { ...e, danceStyles: (e as any).danceStyles || (e as any).genres || [] };
        setEvent(mapped);
      }
      // Sync interesse e contador com Supabase quando disponível
      if (id && isSupabaseConfigured) {
        try {
          const count = await getEventInterestCount(id);
          setInterestedCount(count);
        } catch {}
      } else {
        setInterestedCount(mockEvents.find(m => m.id === id)?.interestedDancers?.length || 0);
      }
      if (id && isAuthenticated && user?.type === 'dancer' && isSupabaseConfigured) {
        try {
          const mine = await getMyEventInterest(id);
          setIsInterested(mine);
        } catch {}
      } else {
        setIsInterested(false);
      }
    })();
  }, [id, isAuthenticated, user?.type]);

  // Função para favoritar/desfavoritar evento
  const handleFavoriteToggle = () => {
    if (!event) return;
    if (isFavorite('event', event.id)) {
      removeFavorite('event', event.id);
    } else {
      addFavorite('event', event.id);
    }
  };

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento não encontrado</h1>
          <Button asChild>
            <Link to="/events">Voltar aos Eventos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleInterest = async () => {
    if (!isAuthenticated) {
      // Redirecionar para login
      window.location.href = '/login';
      return;
    }
    if (user?.type !== 'dancer') return;

    if (isSupabaseConfigured && id) {
      if (isInterested) {
        const ok = await removeEventInterest(id);
        if (ok) {
          setIsInterested(false);
          setInterestedCount((c) => Math.max(0, c - 1));
        }
      } else {
        const ok = await addEventInterest(id);
        if (ok) {
          setIsInterested(true);
          setInterestedCount((c) => c + 1);
        }
      }
      return;
    }
    // Fallback local (mock)
    setIsInterested((v) => !v);
    setInterestedCount((c) => (isInterested ? Math.max(0, c - 1) : c + 1));
  };

  const interestedDancers = mockDancerProfiles.filter(dancer => 
    event.interestedDancers?.includes(dancer.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Eventos
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Event Images */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${event.title} ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Event Info */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full ${
                      event.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status === 'active' ? 'Ativo' : event.status}
                    </span>
                    {!isSupabaseConfigured && (
                      <span>{interestedCount} interessados</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleFavoriteToggle}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite('event', event.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Data</p>
                      <p className="text-gray-600">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Horário</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Local</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {event.duration && (
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Duração</p>
                        <p className="text-gray-600">{event.duration} horas</p>
                      </div>
                    </div>
                  )}
                  
                  {event.budget && (
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Orçamento</p>
                        <p className="text-gray-600">
                          R$ {event.budget.min.toLocaleString()} - R$ {event.budget.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {event.maxParticipants && (
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Vagas</p>
                        <p className="text-gray-600">
                          {event.currentParticipants.length} / {event.maxParticipants}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Genres / Styles */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Gêneros / Estilos</h3>
                <div className="flex flex-wrap gap-2">
                  {event.danceStyles.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Requisitos</h3>
                <ul className="space-y-2">
                  {event.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated && user?.type === 'dancer' ? (
                  <Button
                    onClick={handleInterest}
                    variant={isInterested ? "secondary" : "primary"}
                    className="flex-1"
                  >
                    {isInterested ? 'Interessado ✓' : 'Tenho Interesse'}
                  </Button>
                ) : !isAuthenticated ? (
                  <Button asChild className="flex-1">
                    <Link to="/login">
                      Faça login para se interessar
                    </Link>
                  </Button>
                ) : null}
                
                <Button 
                  variant="outline"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contatar Organizador
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contractor Info */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Organizador</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={event.contractor.avatar}
                  alt={event.contractor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{event.contractor.name}</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(event.contractor.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {event.contractor.rating}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link to={`/profile/${event.contractorId}`}>
                  Ver Perfil Completo
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Interested Artists (somente no modo mock) */}
          {!isSupabaseConfigured && interestedDancers.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">
                  Artistas Interessados ({interestedDancers.length})
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {interestedDancers.slice(0, 5).map((dancer) => (
                    <div key={dancer.id} className="flex items-center space-x-3">
                      <img
                        src={dancer.avatar}
                        alt={dancer.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {dancer.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {dancer.location}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/profile/${dancer.id}`}>
                          Ver
                        </Link>
                      </Button>
                    </div>
                  ))}
                  {interestedDancers.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{interestedDancers.length - 5} outros
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactName={event.contractor.name}
        contactType="contractor"
        contactInfo={{
          email: event.contractor.email,
          phone: event.contractor.phone,
        }}
      />
    </div>
  );
};

