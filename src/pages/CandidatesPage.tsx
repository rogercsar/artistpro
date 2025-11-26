import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, CheckCircle, XCircle, Clock, Eye, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import type { ArtistProfile } from '../types'

type CandidateStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'

interface Candidate {
  artistId: string
  eventId: string
  status: CandidateStatus
  appliedAt: string
  notes?: string
}

const statusConfig: Record<CandidateStatus, { label: string; color: string; icon: any }> = {
  new: { label: 'Novos', color: 'bg-blue-100 text-blue-700', icon: Clock },
  reviewing: { label: 'Em análise', color: 'bg-amber-100 text-amber-700', icon: Eye },
  shortlisted: { label: 'Selecionados', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  rejected: { label: 'Recusados', color: 'bg-red-100 text-red-700', icon: XCircle },
  hired: { label: 'Contratados', color: 'bg-brand-100 text-brand-700', icon: CheckCircle },
}

export function CandidatesPage() {
  const { data, currentUser } = useApp()
  const { eventId } = useParams()

  if (!currentUser || currentUser.role !== 'contractor') {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Apenas contratantes podem acessar esta página</p>
      </div>
    )
  }

  const event = eventId ? data.events.find((e) => e.id === eventId) : null
  const allEvents = data.events.filter((e) => e.contractorId === currentUser.id)

  // Criar candidatos a partir dos interessados
  const candidatesByEvent = useMemo(() => {
    const candidates: Record<string, Candidate[]> = {}
    
    allEvents.forEach((evt) => {
      candidates[evt.id] = evt.interestedBy.map((artistId, index) => {
        // Tentar recuperar status salvo, senão usar padrão baseado no índice
        const statusKey = `candidate:${evt.id}:${artistId}`
        const savedStatus = localStorage.getItem(statusKey) as CandidateStatus | null
        const defaultStatus = (['new', 'reviewing', 'shortlisted', 'rejected', 'hired'][index % 5] || 'new') as CandidateStatus
        
        return {
          artistId,
          eventId: evt.id,
          status: savedStatus || defaultStatus,
          appliedAt: new Date(Date.now() - index * 86400000).toISOString(),
        }
      })
    })
    
    return candidates
  }, [allEvents])

  const selectedEvent = event || allEvents[0]
  const candidates = selectedEvent ? candidatesByEvent[selectedEvent.id] || [] : []

  const candidatesByStatus = useMemo(() => {
    const grouped: Record<CandidateStatus, Candidate[]> = {
      new: [],
      reviewing: [],
      shortlisted: [],
      rejected: [],
      hired: [],
    }
    
    candidates.forEach((candidate) => {
      grouped[candidate.status].push(candidate)
    })
    
    return grouped
  }, [candidates])

  const updateCandidateStatus = (artistId: string, newStatus: CandidateStatus) => {
    // Armazenar status no localStorage
    const statusKey = `candidate:${selectedEvent?.id}:${artistId}`
    localStorage.setItem(statusKey, newStatus)
    // Forçar re-render
    window.location.reload()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="sm" iconLeft={<ArrowLeft size={16} />}>
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-semibold text-slate-900">Gestão de Candidaturas</h1>
          <p className="mt-2 text-slate-600">Organize interessados por pipeline e gerencie seu processo seletivo</p>
        </div>
      </div>

      {allEvents.length > 0 && (
        <div className="rounded-3xl border border-slate-100 bg-white p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Selecione o evento</label>
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
            value={selectedEvent?.id || ''}
            onChange={(e) => {
              // Navegar para a página com o evento selecionado
              window.location.href = `/candidates/${e.target.value}`
            }}
          >
            {allEvents.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title} ({evt.interestedBy.length} candidatos)
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedEvent && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-slate-900">{selectedEvent.title}</h2>
            <p className="mt-1 text-slate-600">{selectedEvent.category} • {selectedEvent.city}</p>
            <div className="mt-4 flex gap-4 text-sm">
              <Badge variant="neutral">{candidates.length} candidatos</Badge>
              <Badge variant="brand">{selectedEvent.interestedBy.length} interessados</Badge>
            </div>
          </div>

          <div className="grid gap-4 overflow-x-auto md:grid-cols-5">
            {Object.entries(statusConfig).map(([status, config]) => {
              const StatusIcon = config.icon
              const statusCandidates = candidatesByStatus[status as CandidateStatus]
              
              return (
                <div key={status} className="min-w-[200px] rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIcon size={18} className={config.color.replace('bg-', 'text-').replace('-100', '-600')} />
                      <h3 className="font-semibold text-slate-900">{config.label}</h3>
                    </div>
                    <Badge variant="neutral" className={config.color}>
                      {statusCandidates.length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {statusCandidates.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-400">
                        Nenhum candidato
                      </div>
                    ) : (
                      statusCandidates.map((candidate) => {
                        const artist = data.artists.find((a) => a.id === candidate.artistId)
                        if (!artist) return null
                        
                        return (
                          <CandidateCard
                            key={candidate.artistId}
                            candidate={candidate}
                            artist={artist}
                            onStatusChange={updateCandidateStatus}
                            statusConfig={statusConfig}
                          />
                        )
                      })
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!selectedEvent && (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
          <p className="font-semibold">Nenhum evento encontrado</p>
          <p className="mt-2 text-sm">Crie um evento para começar a receber candidaturas</p>
          <Link to="/events/new" className="mt-4 inline-block">
            <Button>Criar evento</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

function CandidateCard({
  candidate,
  artist,
  onStatusChange,
  statusConfig,
}: {
  candidate: Candidate
  artist: ArtistProfile
  onStatusChange: (artistId: string, status: CandidateStatus) => void
  statusConfig: typeof statusConfig
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className="group rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Link to={`/profile/artist/${artist.id}`} className="block">
        <div className="flex items-start gap-3">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-slate-900">{artist.name}</p>
            <p className="mt-1 text-xs text-slate-500">{artist.planLabel}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {artist.skills.slice(0, 2).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {new Date(candidate.appliedAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
          <Link to={`/profile/artist/${artist.id}`} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Ver perfil
            </Button>
          </Link>
          <Link to={`/messages`} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full text-xs" iconLeft={<MessageCircle size={14} />}>
              Mensagem
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-3 flex gap-1">
        {Object.entries(statusConfig).map(([status, config]) => {
          if (status === candidate.status) return null
          return (
            <button
              key={status}
              onClick={() => onStatusChange(candidate.artistId, status as CandidateStatus)}
              className={`flex-1 rounded-lg px-2 py-1 text-xs font-semibold transition ${config.color} hover:opacity-80`}
              title={`Mover para ${config.label}`}
            >
              {config.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

