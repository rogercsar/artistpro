import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Button } from './Button'

const navLinks = [
  { to: '/events', label: 'Eventos' },
  { to: '/plans', label: 'Planos' },
  { to: '/profile', label: 'Perfil' },
]

export function Navbar() {
  const { currentUser, logout } = useApp()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="rounded-2xl bg-brand-600 px-3 py-1 text-white">Artist</span>
          <span className="text-slate-900">Pro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {currentUser?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <>
              <span className="text-sm text-slate-600">
                Olá, <strong className="text-slate-900">{currentUser.name.split(' ')[0]}</strong>
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Criar conta
              </Link>
            </>
          )}
        </div>
        <button
          className="rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-2xl px-3 py-2 text-sm font-semibold ${
                  location.pathname === link.to
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className={`rounded-2xl px-3 py-2 text-sm font-semibold ${
                  location.pathname === '/admin'
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600'
                }`}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="mt-4 flex flex-col gap-2">
              {currentUser ? (
                <Button onClick={logout}>Sair</Button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    Criar conta
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

