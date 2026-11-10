import { CloudRain, Sun, Waves } from 'lucide-react'
import type { LocationRisk } from '@/lib/risk'

export function RiskTypes({ locations }: { locations: LocationRisk[] }) {
  const count = (key: 'flood' | 'heat' | 'waterlogging') => locations.filter((l) => l.scores[key] >= 55).length

  const risks = [
    {
      icon: CloudRain,
      title: 'Urban flooding',
      body: 'Forecast rainfall, terrain and drainage combine to estimate flood risk for low-lying neighbourhoods.',
      inputs: 'Rainfall · Elevation · Drainage',
      stat: count('flood'),
    },
    {
      icon: Sun,
      title: 'Extreme heat',
      body: 'Feels-like temperature, humidity and built-up density drive heat-stress risk with health advisories.',
      inputs: 'Temperature · Humidity · Land use',
      stat: count('heat'),
    },
    {
      icon: Waves,
      title: 'Waterlogging',
      body: 'Street-level waterlogging estimates from rain intensity and known drainage weak points.',
      inputs: 'Rain intensity · Drainage · Hotspots',
      stat: count('waterlogging'),
    },
  ]

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Three risks. One system.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          ClimaPulse converts environmental data into local risk scores and practical actions.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {risks.map((r) => (
            <article key={r.title} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <r.icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-muted-foreground">{r.inputs}</span>
                <span className="font-mono">
                  {r.stat} high-risk {r.stat === 1 ? 'area' : 'areas'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
