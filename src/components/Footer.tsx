import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ArtistPro. Criado para a cena criativa latino-americana.</p>
        <div className="flex gap-6">
          <Link to="/plans" className="hover:text-brand-600">
            Planos
          </Link>
          <Link to="/events" className="hover:text-brand-600">
            Eventos
          </Link>
          <a
            href="mailto:contato@artistpro.com"
            className="hover:text-brand-600"
          >
            contato@artistpro.com
          </a>
        </div>
      </div>
    </footer>
  )
}

