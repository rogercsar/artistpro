import {
  Calendar,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { EventItem } from '../types'
import { Button } from './Button'
import { Badge } from './Badge'
import clsx from 'clsx'

interface EventCardProps {
  event: EventItem
  contractorName?: string
  isInterested: boolean
  isLiked: boolean
  onToggleInterest: () => void
  onToggleLike: () => void
}

export function EventCard({
  event,
  contractorName,
  isInterested,
  isLiked,
  onToggleInterest,
  onToggleLike,
}: EventCardProps) {
  return (
    <article
      className={clsx(
        'card-hover relative flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm',
        event.status === 'highlight' && 'ring-2 ring-brand-200',
      )}
    >
      <Link
        to={`/events/${event.id}`}
        className="absolute inset-0 z-0 rounded-3xl"
        aria-label={`Ver detalhes de ${event.title}`}
      />
      {event.status === 'highlight' && (
        <Badge variant="accent" className="absolute right-6 top-6">
          <Sparkles size={14} />
          Destaque
        </Badge>
      )}
      <header className="relative z-10 flex flex-wrap items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {event.category}
          </p>
          <h3 className="font-display text-xl font-semibold text-slate-900">
            {event.title}
          </h3>
        </div>
      </header>
      <div className="relative z-10 flex flex-wrap items-center gap-6 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Calendar size={16} className="text-brand-500" />
          {event.dateRange}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin size={16} className="text-brand-500" />
          {event.city}
        </span>
        {contractorName && (
          <span className="inline-flex items-center gap-2 text-slate-500">
            <Star size={16} className="text-amber-500" />
            {contractorName}
          </span>
        )}
      </div>
      <p className="relative z-10 text-sm text-slate-600">{event.description}</p>
      <div className="relative z-10 flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="relative z-10 grid gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Requisitos</p>
          <ul className="mt-1 space-y-1">
            {event.requirements.slice(0, 2).map((req) => (
              <li key={req}>• {req}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Benefícios</p>
          <ul className="mt-1 space-y-1">
            {event.benefits.slice(0, 2).map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Oferta</p>
          <p className="text-lg font-semibold text-slate-900">{event.budget}</p>
        </div>
      </div>
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>{event.interestedBy.length} interesses</span>
          <span>{event.shareCount} compartilhamentos</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleLike}
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
          <Button
            type="button"
            size="sm"
            className={isInterested ? 'bg-emerald-600 hover:bg-emerald-700' : undefined}
            onClick={onToggleInterest}
          >
            {isInterested ? 'Interesse enviado' : 'Tenho interesse'}
          </Button>
        </div>
      </footer>
    </article>
  )
}

