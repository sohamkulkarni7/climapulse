import { CloudRain, Thermometer, Droplets, Wind } from 'lucide-react'
import { RiskBadge, levelBg, levelText } from '@/components/risk-badge'
import { riskLevel, type LocationRisk } from '@/lib/risk'
import { cn } from '@/lib/utils'

export function ScoreCard({ risk }: { risk: LocationRisk }) {
  const bars = [
    { label: 'Flood', value: risk.scores.flood },
    { label: 'Heat', value: risk.scores.heat },
    { label: 'Waterlogging', value: risk.scores.waterlogging },
  ]

  return (
    <section aria-labelledby="score-heading" className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 id="score-heading" className="text-sm font-medium text-muted-foreground">Overall risk · next 24h</h2>
        <RiskBadge level={risk.level} />
      </div>
      <p className="flex items-baseline gap-2">
        <span className={cn('font-mono text-6xl font-semibold leading-none', levelText[risk.level])}>{risk.scores.overall}</span>
        <span className="font-mono text-muted-foreground">/100</span>
      </p>
      <ul className="flex flex-col gap-3">
        {bars.map((b) => (
          <li key={b.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span>{b.label}</span>
              <span className="font-mono">{b.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="presentation">
              <div className={cn('h-full rounded-full', levelBg[riskLevel(b.value)])} style={{ width: `${Math.max(b.value, 2)}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
        <div className="flex items-center gap-2">
          <CloudRain className="size-4 text-chart-1" aria-hidden="true" />
          <dt className="sr-only">Rainfall 24h</dt>
          <dd className="font-mono">{risk.rain24h} mm</dd>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="size-4 text-chart-2" aria-hidden="true" />
          <dt className="sr-only">Max temperature</dt>
          <dd className="font-mono">{risk.maxTemp}°C</dd>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="size-4 text-primary" aria-hidden="true" />
          <dt className="sr-only">Average humidity</dt>
          <dd className="font-mono">{risk.avgHumidity}%</dd>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="size-4 text-muted-foreground" aria-hidden="true" />
          <dt className="sr-only">Max wind</dt>
          <dd className="font-mono">{risk.maxWind} km/h</dd>
        </div>
      </dl>
    </section>
  )
}
