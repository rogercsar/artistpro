interface StatHighlightProps {
  value: string
  label: string
  description?: string
}

export function StatHighlight({ value, label, description }: StatHighlightProps) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm">
      <p className="font-display text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
    </div>
  )
}

