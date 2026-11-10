import { ShieldCheck, MapPin } from 'lucide-react'
import { guidanceFor, type LocationRisk } from '@/lib/risk'

export function Guidance({ risk }: { risk: LocationRisk }) {
  const tips = guidanceFor(risk)
  const peak = [...risk.timeline].sort(
    (a, b) => Math.max(b.flood, b.heat, b.waterlogging) - Math.max(a.flood, a.heat, a.waterlogging),
  )[0]

  return (
    <section aria-labelledby="guidance-heading" className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
      <h2 id="guidance-heading" className="text-sm font-medium text-muted-foreground">Recommended actions</h2>
      <ul className="flex flex-col gap-3">
        {tips.map((t) => (
          <li key={t} className="flex gap-3 text-sm leading-relaxed">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 text-sm">
        {peak && (
          <p>
            <span className="text-muted-foreground">Peak risk window: </span>
            <span className="font-mono">{peak.label}</span>
          </p>
        )}
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span>
            <span className="text-muted-foreground">Known hotspots: </span>
            {risk.location.vulnerableSpots.join(', ')}
          </span>
        </p>
      </div>
    </section>
  )
}
