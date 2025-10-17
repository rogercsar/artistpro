import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell, Search, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { NotificationsModal } from '../NotificationsModal';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getLevelBadge = (level: string) => {
    const badges = {
      basic: 'bg-gray-100 text-gray-800',
      advanced: 'bg-blue-100 text-blue-800',
      pro: 'bg-purple-100 text-purple-800'
    };
    return badges[level as keyof typeof badges] || badges.basic;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200/70 dark:border-slate-800/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-gray-100">artistpro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
              Eventos
            </Link>
            <Link to="/dancers" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
              Artistas
            </Link>
            {isAuthenticated && user?.type === 'contractor' && (
              <Link to="/create-event" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
                Criar Evento
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => setIsNotificationsOpen(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full', getLevelBadge(user?.level || 'basic'))}>
                        {user?.level === 'basic' ? 'Básico' : user?.level === 'advanced' ? 'Avançado' : 'Pro'}
                      </span>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800 py-1">
                      <Link
                        to={`/profile/${user?.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Meu Perfil
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Favoritos
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Configurações
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Entrar
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Cadastrar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-800 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/events"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link
                to="/dancers"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Artistas
              </Link>
              {isAuthenticated && user?.type === 'contractor' && (
                <Link
                  to="/create-event"
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Criar Evento
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full', getLevelBadge(user?.level || 'basic'))}>
                        {user?.level === 'basic' ? 'Básico' : user?.level === 'advanced' ? 'Avançado' : 'Pro'}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/profile/${user?.id}`}
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Entrar
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Modal de Notificações */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
};
