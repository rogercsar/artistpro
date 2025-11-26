import { useParams, Link } from 'react-router-dom'
import { Calendar, Heart, MapPin, Share2, Sparkles, Star, ArrowLeft, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import clsx from 'clsx'

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, currentUser, toggleInterest, toggleLike } = useApp()

  const event = data.events.find((e) => e.id === id)
  const contractor = event ? data.contractors.find((c) => c.id === event.contractorId) : undefined

  if (!event) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Evento não encontrado</p>
        <Link to="/events" className="mt-4 inline-block text-brand-600">
          ← Voltar para eventos
        </Link>
      </div>
    )
  }

  const isInterested = !!currentUser && event.interestedBy.includes(currentUser.id)
  const isLiked = !!currentUser && event.likedBy.includes(currentUser.id)

  return (
    <div className="space-y-8">
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
      >
        <ArrowLeft size={16} />
        Voltar para eventos
      </Link>

      <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        {event.status === 'highlight' && (
          <Badge variant="accent" className="mb-4 w-fit">
            <Sparkles size={14} />
            Destaque
          </Badge>
        )}

        <header className="mb-6 space-y-3">
          <p className="text-sm uppercase tracking-wide text-slate-500">{event.category}</p>
          <h1 className="font-display text-4xl font-semibold text-slate-900">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Calendar size={18} className="text-brand-500" />
              {event.dateRange}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18} className="text-brand-500" />
              {event.location} • {event.city}
            </span>
            {contractor && (
              <Link
                to={`/profile/contractor/${contractor.id}`}
                className="inline-flex items-center gap-2 text-brand-600 hover:underline"
              >
                <Star size={18} className="text-amber-500" />
                {contractor.company}
              </Link>
            )}
          </div>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mb-8 space-y-6">
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold text-slate-900">Sobre o evento</h2>
            <p className="text-slate-600">{event.description}</p>
          </section>

          <div className="grid gap-6 rounded-2xl bg-slate-50 p-6 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Requisitos</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {event.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2">
                    <span className="mt-1 text-brand-500">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Benefícios</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {event.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-500">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Oferta</p>
              <p className="text-2xl font-bold text-slate-900">{event.budget}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex gap-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <span>{event.interestedBy.length} interesses</span>
            <span>{event.shareCount} compartilhamentos</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => toggleLike(event.id)}
              className={clsx(
                'border',
                isLiked ? 'border-brand-400 text-brand-600' : 'border-slate-200',
              )}
              iconLeft={<Heart size={16} className={isLiked ? 'fill-brand-500 text-white' : ''} />}
            >
              {isLiked ? 'Salvo' : 'Salvar'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="border border-slate-200"
              iconLeft={<Share2 size={16} />}
            >
              Compartilhar
            </Button>
            {contractor && currentUser && currentUser.role === 'artist' && (
              <Link to={`/profile/contractor/${contractor.id}`}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="border border-slate-200"
                  iconLeft={<MessageCircle size={16} />}
                >
                  Contatar
                </Button>
              </Link>
            )}
            <Button
              type="button"
              size="sm"
              className={isInterested ? 'bg-emerald-600 hover:bg-emerald-700' : undefined}
              onClick={() => toggleInterest(event.id)}
            >
              {isInterested ? 'Interesse enviado' : 'Tenho interesse'}
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}

