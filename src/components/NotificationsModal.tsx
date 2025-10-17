import React, { useState } from 'react';
import { Bell, Check, Info, Heart, MessageCircle, Calendar, User } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface Notification {
  id: string;
  type: 'event_interest' | 'new_message' | 'event_update' | 'profile_view' | 'review_received';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedId?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dados mockados de notificações
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event_interest',
    title: 'Novo interesse em seu evento',
    message: 'Maria Silva demonstrou interesse no evento "Audição para Espetáculo Contemporâneo"',
    isRead: false,
    createdAt: '2024-01-25T10:30:00Z',
    relatedId: '1'
  },
  {
    id: '2',
    type: 'new_message',
    title: 'Nova mensagem recebida',
    message: 'Você recebeu uma mensagem de João Santos sobre o evento de hip-hop',
    isRead: false,
    createdAt: '2024-01-25T09:15:00Z',
    relatedId: '2'
  },
  {
    id: '3',
    type: 'event_update',
    title: 'Evento atualizado',
    message: 'O evento "Workshop de Hip-Hop" foi atualizado com novas informações',
    isRead: true,
    createdAt: '2024-01-24T16:45:00Z',
    relatedId: '2'
  },
  {
    id: '4',
    type: 'profile_view',
    title: 'Seu perfil foi visualizado',
    message: 'Ana Costa visualizou seu perfil',
    isRead: true,
    createdAt: '2024-01-24T14:20:00Z',
    relatedId: '3'
  },
  {
    id: '5',
    type: 'review_received',
    title: 'Nova avaliação recebida',
    message: 'Você recebeu uma avaliação de 5 estrelas de Arte Produções',
    isRead: true,
    createdAt: '2024-01-23T11:30:00Z',
    relatedId: '4'
  }
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = "h-5 w-5";
    
    switch (type) {
      case 'event_interest':
        return <Heart className={cn(iconClass, "text-red-500")} />;
      case 'new_message':
        return <MessageCircle className={cn(iconClass, "text-blue-500")} />;
      case 'event_update':
        return <Calendar className={cn(iconClass, "text-green-500")} />;
      case 'profile_view':
        return <User className={cn(iconClass, "text-purple-500")} />;
      case 'review_received':
        return <Check className={cn(iconClass, "text-yellow-500")} />;
      default:
        return <Info className={cn(iconClass, "text-gray-500")} />;
    }
  };

  const getNotificationTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'event_interest':
        return 'Interesse em Evento';
      case 'new_message':
        return 'Nova Mensagem';
      case 'event_update':
        return 'Evento Atualizado';
      case 'profile_view':
        return 'Visualização de Perfil';
      case 'review_received':
        return 'Nova Avaliação';
      default:
        return 'Notificação';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notificações"
      size="lg"
    >
      <div className="space-y-4">
        {/* Header com filtros */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={cn(
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors relative',
                filter === 'unread'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              Não lidas
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {/* Lista de notificações */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'p-4 rounded-lg border transition-colors cursor-pointer',
                  notification.isRead
                    ? 'bg-white border-gray-200 hover:border-gray-300'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        'text-sm font-medium',
                        notification.isRead ? 'text-gray-900' : 'text-gray-900'
                      )}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {getNotificationTypeLabel(notification.type)}
                      </span>
                      
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};


