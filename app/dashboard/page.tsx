import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { LocationPicker } from '@/components/dashboard/location-picker'
import { ScoreCard } from '@/components/dashboard/score-card'
import { RiskFactors } from '@/components/dashboard/risk-factors'
import { Guidance } from '@/components/dashboard/guidance'
import { ForecastCharts } from '@/components/dashboard/forecast-charts'
import { RiskMapPanel } from '@/components/dashboard/risk-map-panel'
import { RiskTimeline } from '@/components/dashboard/risk-timeline'
import { ComparisonTable } from '@/components/dashboard/comparison-table'
import { getRiskSnapshot } from '@/lib/risk'

export const metadata: Metadata = {
  title: 'Live dashboard — ClimaPulse AI',
  description: 'Live hyperlocal flood, heat and waterlogging risk scores across Pune.',
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ loc?: string }> }) {
  const { loc } = await searchParams
  const snapshot = await getRiskSnapshot()

  if (snapshot.locations.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold">Forecast data is unavailable</h1>
          <p className="mt-3 text-muted-foreground">
            We could not reach the forecast provider. ClimaPulse does not invent predictions, so please try again shortly.
          </p>
        </main>
      </>
    )
  }

  const selected = snapshot.locations.find((l) => l.location.id === loc) ?? snapshot.locations[0]

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Climate risk · {selected.location.name}</h1>
              <p className="text-sm text-muted-foreground">
                Live Open-Meteo forecast · updated{' '}
                {new Date(snapshot.fetchedAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                  timeZone: 'Asia/Kolkata',
                })}{' '}
                IST
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Model estimate · not an official warning</p>
          </div>
          <LocationPicker locations={snapshot.locations} selectedId={selected.location.id} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ScoreCard risk={selected} />
          <RiskFactors risk={selected} />
          <Guidance risk={selected} />
        </div>

        <ForecastCharts hourly={selected.hourly} />
        <RiskTimeline risk={selected} />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <RiskMapPanel
            selectedId={selected.location.id}
            points={snapshot.locations.map((l) => ({
              id: l.location.id,
              name: l.location.name,
              lat: l.location.lat,
              lon: l.location.lon,
              level: l.level,
              overall: l.scores.overall,
              flood: l.scores.flood,
              heat: l.scores.heat,
              waterlogging: l.scores.waterlogging,
            }))}
          />
          <ComparisonTable locations={snapshot.locations} selectedId={selected.location.id} />
        </div>
      </main>
    </>
  )
}
