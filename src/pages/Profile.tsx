import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Heart, Share2, MessageCircle, Calendar, Clock, Instagram, Youtube, Camera, Video, Edit, Plus, Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { mockDancerProfiles, mockContractorProfiles, mockEvents } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { ContactModal } from '../components/ContactModal';

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('about');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dancer = mockDancerProfiles.find(d => d.id === id);
  const contractor = mockContractorProfiles.find(c => c.id === id);
  const profile = dancer || contractor;

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Perfil não encontrado</h1>
          <Button asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profile.id;
  const isDancer = profile.type === 'dancer';

  // Calcular idade baseada na data de nascimento
  const calculateAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(profile.birthDate);

  // Função para alterar foto
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aqui você implementaria o upload da foto
      // Por enquanto, vamos simular com uma URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        // Atualizar o perfil com a nova foto
        console.log('Nova foto selecionada:', newAvatarUrl);
        alert('Foto alterada com sucesso! (Funcionalidade simulada)');
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para favoritar/desfavoritar
  const handleFavoriteToggle = () => {
    if (isFavorite(profile.type, profile.id)) {
      removeFavorite(profile.type, profile.id);
    } else {
      addFavorite(profile.type, profile.id);
    }
  };

  const getLevelBadge = (level: string) => {
    const badges = {
      basic: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Básico' },
      advanced: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Avançado' },
      pro: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Pro' }
    };
    return badges[level as keyof typeof badges] || badges.basic;
  };

  const levelBadge = getLevelBadge(profile.level);

  const userEvents = isDancer 
    ? mockEvents.filter(e => e.interestedDancers.includes(profile.id))
    : mockEvents.filter(e => e.contractorId === profile.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16">
            <div className="relative">
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {profile.isVerified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
              )}
              {isOwnProfile && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  title="Alterar foto"
                >
                  <Upload className="h-4 w-4 text-white" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            
            <div className="md:ml-6 mt-4 md:mt-0 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {profile.name}
                    {age && <span className="text-xl font-normal text-gray-500 ml-2">({age} anos)</span>}
                  </h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(profile.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">{profile.rating}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelBadge.bg} ${levelBadge.text}`}>
                      {levelBadge.label}
                    </span>
                  </div>
                  <p className="text-gray-600">{profile.location}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 md:mt-0">
                  {!isOwnProfile && (
                    <>
                      <Button 
                        variant="outline"
                        onClick={handleFavoriteToggle}
                        className="flex-1 sm:flex-none"
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isFavorite(profile.type, profile.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="hidden sm:inline">{isFavorite(profile.type, profile.id) ? 'Favoritado' : 'Favoritar'}</span>
                        <span className="sm:hidden">{isFavorite(profile.type, profile.id) ? 'Favoritado' : 'Favoritar'}</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 sm:flex-none"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Compartilhar</span>
                        <span className="sm:hidden">Compartilhar</span>
                      </Button>
                      <Button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 sm:flex-none"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Contatar</span>
                        <span className="sm:hidden">Contatar</span>
                      </Button>
                    </>
                  )}
                  {isOwnProfile && (
                    <Button 
                      asChild
                      className="flex-1 sm:flex-none"
                    >
                      <Link to={`/profile/${profile.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Editar Perfil</span>
                        <span className="sm:hidden">Editar Perfil</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['about', 'portfolio', 'events'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'about' && 'Sobre'}
                  {tab === 'portfolio' && 'Portfólio'}
                  {tab === 'events' && 'Eventos'}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Biografia</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {profile.bio || 'Nenhuma biografia disponível.'}
                  </p>
                </CardContent>
              </Card>

              {isDancer && dancer && (
                <>
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Habilidades</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {dancer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Estilos de Dança</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {dancer.danceStyles.map((style) => (
                          <span
                            key={style}
                            className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Experiência</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{dancer.experience}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Disponibilidade</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                          const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][index];
                          const isAvailable = dancer.availability[dayKey as keyof typeof dancer.availability];
                          return (
                            <div key={day} className="text-center">
                              <div className="text-xs text-gray-500 mb-1">{day}</div>
                              <div className={`w-8 h-8 rounded-full mx-auto ${
                                isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                              } flex items-center justify-center text-xs`}>
                                {isAvailable ? '✓' : '✗'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!isDancer && contractor && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Sobre a Empresa</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {contractor.companyDescription || 'Nenhuma descrição disponível.'}
                    </p>
                    {contractor.website && (
                      <div className="mt-4">
                        <a
                          href={contractor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-500"
                        >
                          {contractor.website}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'portfolio' && isDancer && dancer && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Fotos</h3>
                    {isOwnProfile && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Foto
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {dancer.portfolio.photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dancer.portfolio.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhuma foto no portfólio</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Vídeos</h3>
                    {isOwnProfile && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Vídeo
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {dancer.portfolio.videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dancer.portfolio.videos.map((video, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={video}
                            className="w-full h-48 object-cover rounded-lg"
                            controls
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum vídeo no portfólio</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              {userEvents.length > 0 ? (
                userEvents.map((event) => (
                  <Card key={event.id} hover>
                    <CardContent>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(event.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/events/${event.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum evento encontrado</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Informações de Contato</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{profile.location}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">{profile.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {isDancer && dancer?.socialMedia && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Redes Sociais</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dancer.socialMedia.instagram && (
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 text-pink-500 mr-3" />
                      <a
                        href={`https://instagram.com/${dancer.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        {dancer.socialMedia.instagram}
                      </a>
                    </div>
                  )}
                  {dancer.socialMedia.youtube && (
                    <div className="flex items-center">
                      <Youtube className="h-4 w-4 text-red-500 mr-3" />
                      <a
                        href={`https://youtube.com/@${dancer.socialMedia.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        {dancer.socialMedia.youtube}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Avaliações</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{profile.rating}</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(profile.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{profile.reviews.length} avaliações</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactName={profile.name}
        contactType={profile.type}
        contactInfo={{
          email: profile.email,
          phone: profile.phone,
          instagram: isDancer ? dancer?.socialMedia?.instagram : undefined,
          facebook: isDancer ? dancer?.socialMedia?.facebook : undefined,
          twitter: isDancer ? dancer?.socialMedia?.twitter : undefined,
        }}
      />
    </div>
  );
};

