import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import type { ArtistPlanTier, ContractorPlanTier } from '../types'

type Role = 'artist' | 'contractor'

export function RegisterPage() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('artist')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    planTier: 'basic',
    artForms: '',
    skills: '',
    company: '',
    tags: '',
  })
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (role === 'artist') {
      const result = register({
        role,
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
        planTier: form.planTier as ArtistPlanTier,
        artForms: form.artForms.split(',').map((value) => value.trim()).filter(Boolean),
        skills: form.skills.split(',').map((value) => value.trim()).filter(Boolean),
      })
      if (result.success) {
        navigate('/profile')
      } else {
        setFeedback(result.message ?? 'Não foi possível criar conta')
      }
      return
    }
    const result = register({
      role,
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      bio: form.bio,
      planTier: form.planTier as ContractorPlanTier,
      company: form.company,
      tags: form.tags.split(',').map((value) => value.trim()).filter(Boolean),
    })
    if (result.success) {
      navigate('/profile')
    } else {
      setFeedback(result.message ?? 'Não foi possível criar conta')
    }
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
      <div className="space-y-2">
        <Badge variant="brand">Cadastro rápido</Badge>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Crie sua conta ArtistPro
        </h1>
        <p className="text-sm text-slate-500">
          Mobile first para artistas, painel completo para contratantes. Planos flexíveis e upgrade instantâneo.
        </p>
      </div>
      <div className="flex gap-3">
        {(['artist', 'contractor'] as Role[]).map((roleOption) => (
          <button
            key={roleOption}
            type="button"
            className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${
              role === roleOption
                ? 'border-brand-400 bg-brand-50 text-brand-700'
                : 'border-slate-200 text-slate-600'
            }`}
            onClick={() => setRole(roleOption)}
          >
            {roleOption === 'artist' ? 'Sou artista' : 'Sou contratante'}
          </button>
        ))}
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        {[
          { label: 'Nome completo', field: 'name', placeholder: 'Seu nome artístico' },
          { label: 'E-mail', field: 'email', placeholder: 'voce@exemplo.com', type: 'email' },
          { label: 'Telefone/WhatsApp', field: 'phone', placeholder: '(XX) 99999-9999' },
          { label: 'Cidade', field: 'location', placeholder: 'São Paulo • SP' },
        ].map((input) => (
          <label key={input.field} className="space-y-2 text-sm font-semibold text-slate-700">
            {input.label}
            <input
              required
              type={input.type ?? 'text'}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
              placeholder={input.placeholder}
              value={form[input.field as keyof typeof form]}
              onChange={(event) => handleChange(input.field, event.target.value)}
            />
          </label>
        ))}
        <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
          Conte sua história
          <textarea
            required
            className="min-h-[120px] w-full rounded-2xl border border-slate-200 p-4 text-sm focus:border-brand-400 focus:outline-none"
            placeholder="Bio profissional, principais conquistas e objetivos."
            value={form.bio}
            onChange={(event) => handleChange('bio', event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          Plano desejado
          <select
            className="h-12 w-full rounded-2xl border border-slate-200 px-3 text-sm focus:border-brand-400 focus:outline-none"
            value={form.planTier}
            onChange={(event) => handleChange('planTier', event.target.value)}
          >
            <option value="basic">Básico</option>
            <option value="advanced">Avançado</option>
            <option value="pro">Pro</option>
          </select>
        </label>
        {role === 'artist' ? (
          <>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Tipos de arte (separados por vírgula)
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
                placeholder="Música, Teatro, Dança"
                value={form.artForms}
                onChange={(event) => handleChange('artForms', event.target.value)}
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Habilidades principais
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
                placeholder="Voz R&B, composição, arranjos"
                value={form.skills}
                onChange={(event) => handleChange('skills', event.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Empresa/Produtora
              <input
                required
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
                placeholder="Nome da empresa"
                value={form.company}
                onChange={(event) => handleChange('company', event.target.value)}
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Tipos de eventos (separados por vírgula)
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
                placeholder="Festivais, corporativo, teatro"
                value={form.tags}
                onChange={(event) => handleChange('tags', event.target.value)}
              />
            </label>
          </>
        )}
        {feedback && (
          <p className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {feedback}
          </p>
        )}
        <div className="md:col-span-2">
          <Button type="submit" className="w-full">
            Finalizar cadastro
          </Button>
          <p className="mt-2 text-center text-xs text-slate-500">
            Ao continuar, você concorda com os termos de uso e políticas de privacidade ArtistPro.
          </p>
        </div>
      </form>
    </div>
  )
}

