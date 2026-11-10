import Link from 'next/link'
import { ArrowRight, CloudRain, Droplets, Thermometer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiskBadge, levelText } from '@/components/risk-badge'
import type { LocationRisk } from '@/lib/risk'
import { cn } from '@/lib/utils'

export function Hero({
  featured,
  monitored,
  fetchedAt,
}: {
  featured?: LocationRisk
  monitored: number
  fetchedAt: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.8_0.13_185/0.14),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Predict. Prepare. Protect.</p>
          <h1 className="text-pretty text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Predict climate risks before they become disasters.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Hyperlocal climate intelligence for Pune. Live forecasts are combined with terrain, drainage and land-use
            data to produce explainable flood, heat and waterlogging scores for every neighbourhood.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="h-10 px-4" nativeButton={false} render={<Link href="/dashboard" />}>
              Open live dashboard <ArrowRight aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-4" nativeButton={false} render={<Link href="#method" />}>
              How scores are calculated
            </Button>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <dt className="text-xs text-muted-foreground">Neighbourhoods</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold">{monitored}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Risks tracked</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold">3</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Forecast horizon</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold">72h</dd>
            </div>
          </dl>
        </div>

        {featured ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Highest risk now
              </p>
              <span className="font-mono text-xs text-muted-foreground">
                {new Date(fetchedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{featured.location.name}, Pune</h2>
            <div className="mt-4 flex items-end gap-3">
              <span className={cn('font-mono text-6xl font-semibold leading-none', levelText[featured.level])}>
                {featured.scores.overall}
              </span>
              <span className="pb-1 font-mono text-muted-foreground">/100</span>
              <RiskBadge level={featured.level} className="mb-1 ml-auto" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {(
                [
                  ['Flood', featured.scores.flood],
                  ['Heat', featured.scores.heat],
                  ['Waterlog', featured.scores.waterlogging],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 font-mono text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-sm">
              <li className="flex flex-col gap-1">
                <CloudRain className="size-4 text-chart-1" aria-hidden="true" />
                <span className="font-mono">{featured.rain24h} mm</span>
                <span className="text-xs text-muted-foreground">Rain, 24h</span>
              </li>
              <li className="flex flex-col gap-1">
                <Thermometer className="size-4 text-chart-2" aria-hidden="true" />
                <span className="font-mono">{featured.maxTemp}°C</span>
                <span className="text-xs text-muted-foreground">Max temp</span>
              </li>
              <li className="flex flex-col gap-1">
                <Droplets className="size-4 text-primary" aria-hidden="true" />
                <span className="font-mono">{featured.avgHumidity}%</span>
                <span className="text-xs text-muted-foreground">Humidity</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
            Live forecast data is temporarily unavailable. Please try again shortly.
          </div>
        )}
      </div>
    </section>
  )
}
