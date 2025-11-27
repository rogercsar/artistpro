import { useMemo, useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { EventCard } from '../components/EventCard'
import { Badge } from '../components/Badge'

export function EventsPage() {
  const { data, currentUser, toggleInterest, toggleLike } = useApp()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [city, setCity] = useState('Todas')

  const categories = ['Todos', ...new Set(data.events.map((event) => event.category))]
  const cities = ['Todas', ...new Set(data.events.map((event) => event.city))]

  const filtered = useMemo(() => {
    return data.events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Todos' || event.category === category
      const matchesCity = city === 'Todas' || event.city === city
      return matchesSearch && matchesCategory && matchesCity
    })
  }, [category, city, data.events, search])

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Badge variant="neutral" className="w-fit">
          Feed de eventos
        </Badge>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-900">
              Oportunidades para artistas
            </h1>
            <p className="text-slate-600">
              Filtre por categoria, cidade e descubra eventos alinhados ao seu perfil.
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3">
            <Search size={16} className="text-slate-500" />
            <input
              type="search"
              placeholder="Buscar por nome do evento ou palavra-chave"
              className="h-12 w-full border-none bg-transparent text-sm focus:outline-none"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3">
            <Filter size={16} className="text-slate-500" />
            <select
              className="h-12 w-full border-none bg-transparent text-sm focus:outline-none"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3">
            <Filter size={16} className="text-slate-500" />
            <select
              className="h-12 w-full border-none bg-transparent text-sm focus:outline-none"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              {cities.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
            Nenhum evento encontrado com esses filtros. Tente ajustar os critérios.
          </div>
        )}
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            contractorName={data.contractors.find((c) => c.id === event.contractorId)?.company}
            isInterested={!!currentUser && event.interestedBy.includes(currentUser.id)}
            isLiked={!!currentUser && event.likedBy.includes(currentUser.id)}
            onToggleInterest={() => {
              if (!currentUser) {
                alert('Faça login para demonstrar interesse neste evento.')
                return
              }
              if (currentUser.role !== 'artist') {
                alert('Apenas artistas podem demonstrar interesse em eventos.')
                return
              }
              toggleInterest(event.id)
            }}
            onToggleLike={() => {
              if (!currentUser) {
                alert('Faça login para salvar este evento.')
                return
              }
              toggleLike(event.id)
            }}
            onShare={() => {
              const url = `${window.location.origin}/events/${event.id}`
              navigator.clipboard.writeText(url)
              alert('Link do evento copiado para a área de transferência!')
            }}
          />
        ))}
      </div>
    </div>
  )
}

