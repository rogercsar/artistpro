import clsx from 'clsx'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'brand' | 'accent' | 'neutral' | 'outline'
  icon?: ReactNode
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  brand: 'bg-brand-100 text-brand-700 border-transparent',
  accent: 'bg-orange-100 text-accent border-transparent',
  neutral: 'bg-slate-100 text-slate-700 border-transparent',
  outline: 'bg-white text-slate-700 border border-slate-200',
}

export function Badge({
  children,
  variant = 'brand',
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}

