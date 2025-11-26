import { Badge } from '../components/Badge'
import { PlanCard } from '../components/PlanCard'
import { useApp } from '../context/AppContext'

export function PlansPage() {
  const { data } = useApp()
  const artistPlans = data.plans.filter((plan) => plan.audience === 'artist')
  const contractorPlans = data.plans.filter((plan) => plan.audience === 'contractor')

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <Badge variant="neutral" className="w-fit">
          Planos de assinatura
        </Badge>
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Escolha como quer evoluir
        </h1>
        <p className="text-slate-600">
          Assinaturas flexíveis com limites claros para cada papel na plataforma. Comece grátis e faça upgrade sem dor de cabeça.
        </p>
      </section>
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Para Artistas</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {artistPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Para Contratantes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {contractorPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  )
}

