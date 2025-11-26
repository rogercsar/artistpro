import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconLeft?: ReactNode
  iconRight?: ReactNode
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600',
  secondary:
    'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900 shadow-lg shadow-slate-900/20',
  ghost:
    'bg-white text-slate-900 border border-slate-200 hover:border-brand-400 focus-visible:outline-brand-500',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {iconLeft && <span className="mr-2 flex items-center text-lg">{iconLeft}</span>}
      {loading ? 'Carregando...' : children}
      {iconRight && <span className="ml-2 flex items-center text-lg">{iconRight}</span>}
    </button>
  )
}

