import { useState } from 'react'
import { Users, AlertTriangle, TrendingUp, Settings, Shield, FileText } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'

export function AdminPage() {
  const { data, currentUser } = useApp()
  const [activeTab, setActiveTab] = useState<'users' | 'events' | 'stats' | 'settings'>('users')

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Acesso restrito. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const stats = {
    totalUsers: data.artists.length + data.contractors.length,
    totalEvents: data.events.length,
    activeEvents: data.events.filter((e) => e.status === 'open' || e.status === 'highlight').length,
    pendingVerifications: 3,
    reports: 1,
  }

  return (
    <div className="space-y-8">
      <header>
        <Badge variant="neutral" className="mb-3 w-fit">
          Painel administrativo
        </Badge>
        <h1 className="font-display text-4xl font-semibold text-slate-900">Gerenciamento da plataforma</h1>
        <p className="mt-2 text-slate-600">Gerencie usuários, eventos e configurações do sistema.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-100 p-3">
              <Users className="text-brand-600" size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Total de usuários</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <FileText className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Eventos ativos</p>
              <p className="text-2xl font-bold text-slate-900">{stats.activeEvents}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-100 p-3">
              <AlertTriangle className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Pendências</p>
              <p className="text-2xl font-bold text-slate-900">{stats.pendingVerifications}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-3">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Denúncias</p>
              <p className="text-2xl font-bold text-slate-900">{stats.reports}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users size={16} className="mr-2 inline" />
          Usuários
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'events'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText size={16} className="mr-2 inline" />
          Eventos
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'stats'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp size={16} className="mr-2 inline" />
          Estatísticas
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'settings'
              ? 'border-b-2 border-brand-600 text-brand-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Settings size={16} className="mr-2 inline" />
          Configurações
        </button>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        {activeTab === 'users' && <UsersTab data={data} />}
        {activeTab === 'events' && <EventsTab data={data} />}
        {activeTab === 'stats' && <StatsTab data={data} />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  )
}

function UsersTab({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Gerenciar usuários</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Artistas ({data.artists.length})</p>
            <p className="text-sm text-slate-600">Gerenciar perfis de artistas</p>
          </div>
          <Button size="sm" variant="ghost">
            Ver todos
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Contratantes ({data.contractors.length})</p>
            <p className="text-sm text-slate-600">Gerenciar perfis de contratantes</p>
          </div>
          <Button size="sm" variant="ghost">
            Ver todos
          </Button>
        </div>
      </div>
    </div>
  )
}

function EventsTab({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Gerenciar eventos</h2>
      <p className="text-slate-600">Total de eventos: {data.events.length}</p>
      <div className="space-y-2">
        {data.events.slice(0, 5).map((event: any) => (
          <div key={event.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-slate-900">{event.title}</p>
              <p className="text-sm text-slate-600">{event.category} • {event.city}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                Editar
              </Button>
              <Button size="sm" variant="ghost" className="text-red-600">
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsTab({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Estatísticas da plataforma</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-500">Artistas por plano</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Básico</span>
              <span className="font-semibold">
                {data.artists.filter((a: any) => a.planLabel === 'Básico').length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Avançado</span>
              <span className="font-semibold">
                {data.artists.filter((a: any) => a.planLabel === 'Avançado').length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pro</span>
              <span className="font-semibold">
                {data.artists.filter((a: any) => a.planLabel === 'Pro').length}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-500">Eventos por status</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Abertos</span>
              <span className="font-semibold">
                {data.events.filter((e: any) => e.status === 'open').length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Em destaque</span>
              <span className="font-semibold">
                {data.events.filter((e: any) => e.status === 'highlight').length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fechados</span>
              <span className="font-semibold">
                {data.events.filter((e: any) => e.status === 'closed').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Configurações</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Gerenciar planos de assinatura</p>
            <p className="text-sm text-slate-600">Editar preços e recursos dos planos</p>
          </div>
          <Button size="sm">Configurar</Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Moderação de conteúdo</p>
            <p className="text-sm text-slate-600">Revisar denúncias e conteúdo reportado</p>
          </div>
          <Button size="sm">Revisar</Button>
        </div>
      </div>
    </div>
  )
}

