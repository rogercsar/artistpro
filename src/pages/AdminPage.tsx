import { useState } from 'react'
import { Users, AlertTriangle, TrendingUp, Settings, FileText, Edit, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'

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
  const [showArtists, setShowArtists] = useState(false)
  const [showContractors, setShowContractors] = useState(false)

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Gerenciar usuários</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Artistas ({data.artists.length})</p>
            <p className="text-sm text-slate-600">Gerenciar perfis de artistas</p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setShowArtists(!showArtists)}>
            {showArtists ? 'Ocultar' : 'Ver todos'}
          </Button>
        </div>
        {showArtists && (
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {data.artists.map((artist: any) => (
              <div key={artist.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-900">{artist.name}</p>
                    <p className="text-xs text-slate-500">{artist.email}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => window.location.href = `/profile/artist/${artist.id}`}>
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Contratantes ({data.contractors.length})</p>
            <p className="text-sm text-slate-600">Gerenciar perfis de contratantes</p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setShowContractors(!showContractors)}>
            {showContractors ? 'Ocultar' : 'Ver todos'}
          </Button>
        </div>
        {showContractors && (
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {data.contractors.map((contractor: any) => (
              <div key={contractor.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <img src={contractor.avatar} alt={contractor.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-900">{contractor.name}</p>
                    <p className="text-xs text-slate-500">{contractor.email}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => window.location.href = `/profile/contractor/${contractor.id}`}>
                  Ver perfil
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EventsTab({ data }: { data: any }) {
  const { data: appData } = useApp()
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [deletingEvent, setDeletingEvent] = useState<any>(null)

  const handleEdit = (event: any) => {
    setEditingEvent(event)
  }

  const handleDelete = (event: any) => {
    setDeletingEvent(event)
  }

  const confirmDelete = () => {
    if (deletingEvent) {
      // Em produção, isso seria uma chamada à API
      alert(`Evento "${deletingEvent.title}" seria removido aqui. Em produção, isso atualizaria o banco de dados.`)
      setDeletingEvent(null)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Gerenciar eventos</h2>
      <p className="text-slate-600">Total de eventos: {data.events.length}</p>
      <div className="space-y-2">
        {data.events.slice(0, 10).map((event: any) => {
          const contractor = appData.contractors.find((c: any) => c.id === event.contractorId)
          return (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{event.title}</p>
                <p className="text-sm text-slate-600">
                  {event.category} • {event.city} • {contractor?.name || 'Contratante desconhecido'}
                </p>
                <div className="mt-1 flex gap-2 text-xs text-slate-500">
                  <span>{event.interestedBy.length} interesses</span>
                  <span>{event.likedBy.length} favoritos</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  iconLeft={<Edit size={14} />}
                  onClick={() => handleEdit(event)}
                >
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-600 hover:bg-red-50"
                  iconLeft={<Trash2 size={14} />}
                  onClick={() => handleDelete(event)}
                >
                  Remover
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de edição */}
      {editingEvent && (
        <Modal
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          title={`Editar evento: ${editingEvent.title}`}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditingEvent(null)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Em produção, isso salvaria as alterações no banco de dados.')
                setEditingEvent(null)
              }}>
                Salvar alterações
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Título</label>
              <input
                type="text"
                defaultValue={editingEvent.title}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Categoria</label>
              <input
                type="text"
                defaultValue={editingEvent.category}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select
                defaultValue={editingEvent.status}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
              >
                <option value="open">Aberto</option>
                <option value="highlight">Em destaque</option>
                <option value="closed">Fechado</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Descrição</label>
              <textarea
                defaultValue={editingEvent.description}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de confirmação de remoção */}
      {deletingEvent && (
        <Modal
          isOpen={!!deletingEvent}
          onClose={() => setDeletingEvent(null)}
          title="Confirmar remoção"
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeletingEvent(null)}>
                Cancelar
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirmar remoção
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-slate-600">
              Tem certeza que deseja remover o evento <strong>"{deletingEvent.title}"</strong>?
            </p>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                ⚠️ Esta ação não pode ser desfeita. Todos os dados relacionados a este evento serão perdidos.
              </p>
            </div>
          </div>
        </Modal>
      )}
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
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [showModerationModal, setShowModerationModal] = useState(false)

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Configurações</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Gerenciar planos de assinatura</p>
            <p className="text-sm text-slate-600">Editar preços e recursos dos planos</p>
          </div>
          <Button size="sm" onClick={() => setShowPlansModal(true)}>Configurar</Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-slate-900">Moderação de conteúdo</p>
            <p className="text-sm text-slate-600">Revisar denúncias e conteúdo reportado</p>
          </div>
          <Button size="sm" onClick={() => setShowModerationModal(true)}>Revisar</Button>
        </div>
      </div>

      {/* Modal de configuração de planos */}
      {showPlansModal && (
        <Modal
          isOpen={showPlansModal}
          onClose={() => setShowPlansModal(false)}
          title="Gerenciar planos de assinatura"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowPlansModal(false)}>
                Fechar
              </Button>
              <Button onClick={() => {
                alert('Em produção, isso salvaria as configurações dos planos.')
                setShowPlansModal(false)
              }}>
                Salvar alterações
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <p className="text-sm text-slate-600">
              Configure os preços, recursos e limites de cada plano de assinatura.
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Plano Básico</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Preço mensal:</span>
                    <input
                      type="text"
                      defaultValue="Gratuito"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Limite de interesses:</span>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Plano Avançado</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Preço mensal:</span>
                    <input
                      type="text"
                      defaultValue="R$ 59"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Limite de interesses:</span>
                    <input
                      type="number"
                      defaultValue="999"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Plano Pro</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Preço mensal:</span>
                    <input
                      type="text"
                      defaultValue="R$ 119"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Limite de interesses:</span>
                    <input
                      type="number"
                      defaultValue="999"
                      className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de moderação */}
      {showModerationModal && (
        <Modal
          isOpen={showModerationModal}
          onClose={() => setShowModerationModal(false)}
          title="Moderação de conteúdo"
          size="lg"
          footer={
            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setShowModerationModal(false)}>
                Fechar
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Revisar e gerenciar denúncias, conteúdo reportado e violações de políticas.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Denúncia #001</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Evento reportado por conteúdo inadequado
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Reportado em 20/01/2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-green-600">
                      Aprovar
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Não há mais denúncias pendentes no momento.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

