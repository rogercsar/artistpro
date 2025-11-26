import * as Icons from 'lucide-react'
import type { PlanOption } from '../types'
import { Badge } from './Badge'
import { Button } from './Button'

interface PlanCardProps {
  plan: PlanOption
}

const iconMap = {
  User: Icons.User,
  Star: Icons.Star,
  MessageCircle: Icons.MessageCircle,
  Images: Icons.Images,
  Calendar: Icons.Calendar,
  Share2: Icons.Share2,
  Sparkles: Icons.Sparkles,
  Activity: Icons.Activity,
  Users: Icons.Users,
  MessageSquare: Icons.MessageSquare,
  Search: Icons.Search,
  Infinity: Icons.Infinity,
  Filter: Icons.Filter,
  KanbanSquare: Icons.KanbanSquare,
} as const

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <div
      className={`card-hover flex flex-col gap-6 rounded-3xl border bg-white p-6 ${
        plan.highlight ? 'border-brand-300 shadow-glow' : 'border-slate-100 shadow-sm'
      }`}
    >
      <div className="flex flex-col gap-2">
        <Badge variant={plan.audience === 'artist' ? 'brand' : 'neutral'}>
          {plan.audience === 'artist' ? 'Artistas' : 'Contratantes'}
        </Badge>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-2xl font-semibold text-slate-900">{plan.label}</h3>
          {plan.highlight && <Badge variant="accent">{plan.highlight}</Badge>}
        </div>
        <p className="text-3xl font-semibold text-slate-900">{plan.price}</p>
      </div>
      <ul className="space-y-3 text-sm text-slate-600">
        {plan.features.map((feature) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Icons.Check
          return (
            <li key={feature.title} className="flex gap-3">
              <span className="mt-0.5 rounded-full bg-brand-50 p-2 text-brand-600">
                <Icon size={14} />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{feature.title}</p>
                <p>{feature.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <Button variant={plan.audience === 'artist' ? 'secondary' : 'primary'} size="lg">
        {plan.cta}
      </Button>
    </div>
  )
}

