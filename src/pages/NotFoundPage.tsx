import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase text-brand-600">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900">Página não encontrada</h1>
      <p className="mt-2 text-sm text-slate-600">
        O link pode ter expirado ou você não tem permissão para acessar esta área.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 font-semibold text-white"
        >
          Voltar para o início
        </Link>
        <Link to="/events" className="text-sm font-semibold text-brand-600">
          Ver eventos disponíveis →
        </Link>
      </div>
    </div>
  )
}

