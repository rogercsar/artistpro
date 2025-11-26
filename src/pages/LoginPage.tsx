import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'

const roles = [
  { value: 'artist', label: 'Artista' },
  { value: 'contractor', label: 'Contratante' },
  { value: 'admin', label: 'Admin' },
] as const

export function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [role, setRole] = useState<typeof roles[number]['value']>('artist')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = login(email, role)
    if (!result.success) {
      setFeedback(result.message ?? 'Não foi possível entrar')
      return
    }
    navigate(role === 'admin' ? '/profile/admin' : '/profile')
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
      <Badge variant="neutral">Acesso seguro</Badge>
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Entrar no ArtistPro</h1>
        <p className="mt-2 text-sm text-slate-500">Selecione sua função para carregarmos o painel correto.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="text-sm font-semibold text-slate-700">Sou:</label>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((roleOption) => (
            <button
              type="button"
              key={roleOption.value}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                role === roleOption.value
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-600'
              }`}
              onClick={() => setRole(roleOption.value)}
            >
              {roleOption.label}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            E-mail cadastrado
          </label>
          <input
            id="email"
            type="email"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm focus:border-brand-400 focus:outline-none"
            placeholder="voce@exemplo.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex justify-between text-sm text-brand-600">
          <button type="button">Esqueci minha senha</button>
          <Link to="/register" className="font-semibold">
            Criar nova conta
          </Link>
        </div>
        {feedback && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{feedback}</p>
        )}
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}

