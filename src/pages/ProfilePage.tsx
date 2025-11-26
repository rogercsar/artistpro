import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookmarkPlus, Calendar, Camera, MessageCircle, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { ProfileHero } from '../components/ProfileHero'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import type { PlatformUser, ArtistProfile, ContractorProfile, AdminProfile } from '../types'

export function ProfilePage() {
  const { data, currentUser } = useApp()
  const { id, type } = useParams()

  const resolvedUser: PlatformUser | undefined = useMemo(() => {
    if (id && type === 'artist') {
      return data.artists.find((artist) => artist.id === id)
    }
    if (id && type === 'contractor') {
      return data.contractors.find((contractor) => contractor.id === id)
    }
    if (id && type === 'admin') {
      return data.admins.find((admin) => admin.id === id)
    }
    return currentUser ?? data.artists[0]
  }, [currentUser, data, id, type])

  if (!resolvedUser) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        Perfil não encontrado. Verifique o link ou faça login.
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <ProfileHero user={resolvedUser} />

      {resolvedUser.role === 'artist' ? (
        <ArtistProfileSections artist={resolvedUser} />
      ) : resolvedUser.role === 'contractor' ? (
        <ContractorProfileSections contractor={resolvedUser} />
      ) : (
        <AdminPanelAlerts admin={resolvedUser} />
      )}
    </div>
  )

  function ArtistProfileSections({ artist }: { artist: ArtistProfile }) {
    return (
      <>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Skills e Habilidades</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {artist.skills.map((skill: string) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Agenda visível</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {artist.availability.map((slot: string) => (
                <li key={slot} className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-500" />
                  {slot}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <h3 className="font-semibold text-slate-900">Preferências</h3>
            <p className="mt-2 text-sm text-slate-600">Cidades alvo</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {artist.preferredCities.map((city: string) => (
                <Badge key={city} variant="brand">
                  {city}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <header className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Portfólio</h3>
              <Button size="sm" variant="ghost" iconLeft={<Camera size={16} />}>
                Enviar mídia
              </Button>
            </header>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {artist.portfolio.photos.map((photo: string) => (
                <img
                  key={photo}
                  src={`${photo}?auto=format&fit=crop&w=400&q=80`}
                  alt="Portfólio"
                  className="h-28 w-full rounded-2xl object-cover"
                />
              ))}
              {artist.portfolio.photos.length === 0 && (
                <div className="col-span-3 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
                  Adicione fotos e vídeos para liberar todo o potencial do plano.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6">
            <header className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Feed pessoal</h3>
            </header>
            <div className="mt-4 space-y-4">
              {artist.feed.map((activity: { id: string; createdAt: string; message: string }) => (
                <div key={activity.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    {new Date(activity.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="mt-1 text-slate-900">{activity.message}</p>
                </div>
              ))}
              {artist.feed.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
                  Publique atualizações do seu trabalho. Perfis Pro têm alcance ampliado.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Reviews</h3>
              <p className="text-sm text-slate-500">Contratantes reais avaliando sua entrega.</p>
            </div>
            <Button size="sm" variant="ghost" iconLeft={<BookmarkPlus size={16} />}>
              Pedir avaliação
            </Button>
          </header>
          <div className="mt-4 space-y-4">
            {artist.reviews.map((review: { id: string; rating: number; comment: string; createdAt: string }) => (
              <article key={review.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="text-sm text-amber-500">{'★'.repeat(review.rating)}</p>
                <p className="mt-2 text-slate-900">{review.comment}</p>
                <p className="mt-1 text-xs uppercase text-slate-500">
                  {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </article>
            ))}
            {artist.reviews.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
                Assim que concluir um job, peça avaliação para liberar métricas avançadas.
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  function ContractorProfileSections({ contractor }: { contractor: ContractorProfile }) {
    const events = data.events.filter((event: { contractorId: string }) => event.contractorId === contractor.id)
    return (
      <>
        <section className="rounded-3xl border border-slate-100 bg-white p-6">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Eventos ativos</h3>
              <p className="text-sm text-slate-500">
                Gerencie candidatos, likes e interesses em um só lugar.
              </p>
            </div>
            <Link to="/events/new">
              <Button iconLeft={<Calendar size={16} />}>Publicar novo evento</Button>
            </Link>
          </header>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {events.map((event: { id: string; category: string; title: string; description: string; interestedBy: string[]; likedBy: string[] }) => (
              <article key={event.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase text-slate-500">{event.category}</p>
                    <h4 className="mt-2 font-semibold text-slate-900">{event.title}</h4>
                    <p className="text-sm text-slate-600">{event.description}</p>
                    <div className="mt-3 flex gap-4 text-xs font-semibold uppercase text-slate-500">
                      <span>{event.interestedBy.length} interesses</span>
                      <span>{event.likedBy.length} favoritos</span>
                    </div>
                  </div>
                  {event.interestedBy.length > 0 && (
                    <Link to={`/candidates/${event.id}`}>
                      <Button variant="ghost" size="sm" iconLeft={<Users size={16} />}>
                        Gerenciar
                      </Button>
                    </Link>
                  )}
                </div>
              </article>
            ))}
            {events.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
                Publique seu primeiro evento para receber recomendações automáticas de artistas.
              </div>
            )}
          </div>
        </section>
        <section className="rounded-3xl border border-slate-100 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Conversas recentes</h3>
          <div className="mt-4 space-y-4">
            {data.threads.map((thread: { id: string; updatedAt: string; lastMessagePreview: string }) => (
              <div key={thread.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Atualizado em {new Date(thread.updatedAt).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-slate-900">{thread.lastMessagePreview}</p>
                </div>
                <Button variant="ghost" size="sm" iconLeft={<MessageCircle size={16} />}>
                  Abrir chat
                </Button>
              </div>
            ))}
            {data.threads.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
                Nenhuma conversa ainda. Envie mensagens para artistas favoritos.
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  function AdminPanelAlerts({ admin }: { admin: AdminProfile }) {
    return (
      <section className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6">
        <h3 className="font-semibold text-slate-900">Painel do administrador</h3>
        <ul className="space-y-3">
          {admin.alerts.map((alert: string) => (
            <li
              key={alert}
              className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-slate-800"
            >
              {alert}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

