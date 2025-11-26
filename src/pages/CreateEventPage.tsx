import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import type { EventItem } from '../types'

export function CreateEventPage() {
  const { currentUser, createEvent } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (!currentUser || currentUser.role !== 'contractor') {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Apenas contratantes podem criar eventos</p>
        <Button className="mt-4" onClick={() => navigate('/login')}>
          Fazer login como contratante
        </Button>
      </div>
    )
  }

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    city: '',
    dateRange: '',
    description: '',
    requirements: '',
    benefits: '',
    budget: '',
    tags: '',
    status: 'open' as 'open' | 'highlight',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const newEvent: Omit<EventItem, 'id' | 'contractorId' | 'likedBy' | 'interestedBy' | 'shareCount'> = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      city: formData.city,
      dateRange: formData.dateRange,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(Boolean),
      benefits: formData.benefits.split('\n').filter(Boolean),
      budget: formData.budget,
      status: formData.status,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }

    createEvent(newEvent, currentUser.id)
    setLoading(false)
    navigate('/events')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/events')} iconLeft={<ArrowLeft size={16} />}>
          Voltar
        </Button>
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">Criar Novo Evento</h1>
          <p className="text-slate-600">Publique uma oportunidade para artistas</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Informações Básicas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Título do evento *</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Festival de Dança Contemporânea 2025"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Categoria *</label>
              <select
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Show/Festival">Show/Festival</option>
                <option value="Turnê Corporativa">Turnê Corporativa</option>
                <option value="Evento Privado">Evento Privado</option>
                <option value="Audição">Audição</option>
                <option value="Workshop">Workshop</option>
                <option value="Produção Teatral">Produção Teatral</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'highlight' })}
              >
                <option value="open">Aberto</option>
                <option value="highlight">Em Destaque</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Local *</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Auditório Municipal"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Cidade *</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ex: São Paulo"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Período *</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.dateRange}
                onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                placeholder="Ex: 10 - 12 Abril 2025"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Orçamento *</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="Ex: R$ 45k + bônus mídia"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Descrição *</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o evento, o que você está procurando e o que torna esta oportunidade especial..."
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Requisitos e Benefícios</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Requisitos (um por linha) *
              </label>
              <textarea
                required
                rows={6}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Ex:&#10;Set de 45 minutos&#10;Disponível para coletiva&#10;Entrega de release"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Benefícios (um por linha) *
              </label>
              <textarea
                required
                rows={6}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Ex:&#10;Backline completo&#10;Hotel 5*&#10;Campanha de mídia"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Tags</h2>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Ex: Música, Pop, Festival"
            />
            <p className="mt-2 text-xs text-slate-500">
              {formData.tags.split(',').filter(Boolean).length} tags adicionadas
            </p>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/events')}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} iconLeft={<Save size={16} />}>
            Publicar evento
          </Button>
        </div>
      </form>
    </div>
  )
}

