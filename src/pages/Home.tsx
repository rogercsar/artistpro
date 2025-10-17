import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Calendar, MapPin, Heart, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { mockEvents, mockDancerProfiles } from '../data/mockData';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const featuredEvents = mockEvents.slice(0, 3);
  const featuredDancers = mockDancerProfiles.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Conecte-se através da{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Arte
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              A plataforma que une artistas talentosos e contratantes em busca de excelência.
              Descubra oportunidades, construa sua carreira e faça parte da comunidade criativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Link to="/events">
                      Ver Eventos
                    </Link>
                  </Button>
                </>
              ) : (
                <Button size="lg" asChild>
                  <Link to="/events">
                    Explorar Eventos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Artistas Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-gray-600">Eventos Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Contratantes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Eventos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Descubra as melhores oportunidades para artistas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} hover className="overflow-hidden">
                <div className="relative">
                  <img
                    src={event.images?.[0] || 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=250&fit=crop'}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.status === 'active' ? 'Ativo' : event.status}
                    </span>
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
                      {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.budget && (
                      <div className="text-sm text-gray-500">
                        R$ {event.budget.min.toLocaleString()} - R$ {event.budget.max.toLocaleString()}
                      </div>
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
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/events">
                Ver Todos os Eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Dancers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Artistas em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Conheça talentos incríveis da nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDancers.map((dancer) => (
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

                  <p className="text-sm text-gray-600 mb-3">
                    {dancer.location}
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

                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={`/profile/${dancer.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/dancers">
                Ver Todos os Artistas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Junte-se à comunidade artistpro e descubra um mundo de oportunidades
          </p>
          {!isAuthenticated ? (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/profile">
                Completar Perfil
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};


