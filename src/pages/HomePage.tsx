import { ArrowRight, CheckCircle, MessageCircle, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { StatHighlight } from '../components/StatHighlight'
import { PlanCard } from '../components/PlanCard'
import { EventCard } from '../components/EventCard'

export function HomePage() {
  const { data, currentUser, toggleInterest, toggleLike } = useApp()
  const featuredEvents = data.events.slice(0, 2)
  const heroUser = currentUser ?? data.artists[0]

  return (
    <div className="space-y-16">
      <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-xl shadow-brand-600/5 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="accent" className="w-fit">
              Plataforma multiplataforma para talentos
            </Badge>
            <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900">
              Conecte artistas incríveis a eventos que importam — tudo em uma experiência mobile first.
            </h1>
            <p className="text-lg text-slate-600">
              ArtistPro reúne perfis verificados, feed de eventos, planos flexíveis e ferramentas de comunicação
              para artistas e contratantes evoluírem juntos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white"
              >
                Começar agora
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700"
              >
                Explorar eventos
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Perfis verificados manualmente
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={16} className="text-brand-500" />
                Chat direto com contratantes
              </span>
            </div>
          </div>
          <div className="glass rounded-[28px] border border-white/40 p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase text-white/70">Perfil em destaque</p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={heroUser.avatar}
                alt={heroUser.name}
                className="h-16 w-16 rounded-2xl border-4 border-white object-cover"
              />
              <div>
                <p className="font-display text-xl text-white">{heroUser.name}</p>
                <p className="text-sm text-white/80">{heroUser.location}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <StatHighlight value="18k+" label="Visualizações de perfil" />
              <StatHighlight value="280+" label="Eventos publicados" />
              <StatHighlight value="98%" label="Feedback positivo" />
              <StatHighlight value="24h" label="Tempo médio de resposta" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-brand-600">Planos inteligentes</p>
            <h2 className="font-display text-3xl font-semibold text-slate-900">Cresça no seu ritmo</h2>
            <p className="mt-2 text-slate-600">
              Opções para artistas e contratantes, com limites claros e benefícios que desbloqueiam engajamento.
            </p>
          </div>
          <Link to="/plans" className="text-sm font-semibold text-brand-600">
            Ver todos os planos →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.plans.slice(0, 4).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3">
          <Badge variant="neutral" className="w-fit">
            Feed inteligente
          </Badge>
          <h2 className="font-display text-3xl font-semibold text-slate-900">Eventos abertos agora</h2>
          <p className="text-slate-600">
            Descubra oportunidades alinhadas às suas habilidades. Marque interesse com um toque e acompanhe tudo no app.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              contractorName={
                data.contractors.find((c) => c.id === event.contractorId)?.company
              }
              isInterested={!!currentUser && event.interestedBy.includes(currentUser.id)}
              isLiked={!!currentUser && event.likedBy.includes(currentUser.id)}
              onToggleInterest={() => toggleInterest(event.id)}
              onToggleLike={() => toggleLike(event.id)}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl bg-slate-900 p-8 text-white lg:grid-cols-3">
        <div className="space-y-3">
          <Badge variant="accent">Produtoras e artistas</Badge>
          <h2 className="font-display text-3xl font-semibold">Tudo em um único painel</h2>
          <p className="text-white/70">
            Mobile first para talentos em movimento, com dashboard web completo para admins e contratantes.
          </p>
          <Button className="bg-white text-slate-900" iconRight={<ArrowRight size={16} />}>
            Conhecer plataforma
          </Button>
        </div>
        <div className="rounded-3xl bg-white/10 p-6">
          <Zap className="text-amber-300" />
          <h3 className="mt-3 font-semibold">Admin controla tudo</h3>
          <p className="text-sm text-white/70">
            Painel com moderação de conteúdo, métricas e gestão de assinaturas em tempo real.
          </p>
        </div>
        <div className="rounded-3xl bg-white/10 p-6">
          <MessageCircle className="text-brand-200" />
          <h3 className="mt-3 font-semibold">Comunicação instantânea</h3>
          <p className="text-sm text-white/70">
            Chat direto entre artistas Pro e contratantes avançados, com templates e alertas.
          </p>
        </div>
      </section>
    </div>
  )
}

