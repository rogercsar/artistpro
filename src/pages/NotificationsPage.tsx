import { useState } from 'react'
import { Bell, Calendar, Heart, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import type { NotificationItem } from '../types'

export function NotificationsPage() {
  const { data, currentUser } = useApp()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Faça login para ver suas notificações</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button>Fazer login</Button>
        </Link>
      </div>
    )
  }

  const filteredNotifications = data.notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read
    return true
  })

  const unreadCount = data.notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'interest':
        return <Heart size={20} className="text-brand-600" />
      case 'message':
        return <MessageCircle size={20} className="text-blue-600" />
      case 'event':
        return <Calendar size={20} className="text-emerald-600" />
      default:
        return <Bell size={20} className="text-slate-600" />
    }
  }

  const getNotificationLink = (notif: NotificationItem) => {
    switch (notif.type) {
      case 'interest':
        return '/profile'
      case 'message':
        return '/messages'
      case 'event':
        return '/events'
      default:
        return '/'
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">Notificações</h1>
          <p className="mt-2 text-slate-600">
            {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Todas lidas'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Não lidas
            {unreadCount > 0 && (
              <Badge variant="accent" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
            <Bell size={48} className="mx-auto text-slate-300" />
            <p className="mt-4 font-semibold">
              {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação ainda'}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Você receberá notificações sobre interesses, mensagens e novos eventos
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <Link
              key={notif.id}
              to={getNotificationLink(notif)}
              className="block rounded-3xl border border-slate-100 bg-white p-6 transition hover:border-brand-300 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 rounded-full p-3 ${
                    notif.read ? 'bg-slate-100' : 'bg-brand-50'
                  }`}
                >
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notif.text}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(notif.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-brand-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

