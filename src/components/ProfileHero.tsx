import { Camera, MapPin, ShieldCheck, Users, Edit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { PlatformUser } from '../types'
import { Badge } from './Badge'
import { Button } from './Button'

interface ProfileHeroProps {
  user: PlatformUser
}

export function ProfileHero({ user }: ProfileHeroProps) {
  const { currentUser } = useApp()
  const isOwnProfile = currentUser?.id === user.id

  return (
    <section className="relative overflow-hidden rounded-3xl bg-hero-gradient p-6 text-white shadow-glow md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-xl"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{user.planLabel}</Badge>
            {user.role === 'artist' && user.planLabel.toLowerCase().includes('pro') && (
              <Badge variant="outline" className="bg-white/20 text-white">
                <ShieldCheck size={14} />
                Perfil verificado
              </Badge>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold">{user.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">{user.bio}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-white">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {user.location}
            </span>
            {user.role === 'contractor' && (
              <span className="inline-flex items-center gap-2">
                <Users size={16} />
                Casting aberto
              </span>
            )}
          </div>
        </div>
        {isOwnProfile && (
          <div className="flex flex-col gap-3">
            <Link to="/profile/edit">
              <Button className="bg-white text-brand-700" iconLeft={<Edit size={16} />}>
                Editar perfil
              </Button>
            </Link>
            <Button variant="ghost" className="border-white/40 text-white" iconLeft={<Camera size={16} />}>
              Adicionar mídia
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

