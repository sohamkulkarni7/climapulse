import type { Factor, LocationRisk } from '@/lib/risk'

function FactorList({ title, factors }: { title: string; factors: Factor[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {factors.map((f) => (
          <li key={f.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-sm">
            <span>{f.label}</span>
            <span className="font-mono text-muted-foreground">{f.value}</span>
            <div className="col-span-2 h-1 overflow-hidden rounded-full bg-muted" role="presentation">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(f.impact * 100, 2)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RiskFactors({ risk }: { risk: LocationRisk }) {
  return (
    <section aria-labelledby="factors-heading" className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
      <h2 id="factors-heading" className="text-sm font-medium text-muted-foreground">Why this score?</h2>
      <FactorList title="Flood & waterlogging" factors={risk.floodFactors} />
      <FactorList title="Heat" factors={risk.heatFactors} />
    </section>
  )
}
