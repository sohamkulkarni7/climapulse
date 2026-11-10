import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/landing/hero'
import { RiskTypes } from '@/components/landing/risk-types'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Methodology } from '@/components/landing/methodology'
import { getRiskSnapshot } from '@/lib/risk'

export default async function HomePage() {
  const snapshot = await getRiskSnapshot()
  const featured = [...snapshot.locations].sort((a, b) => b.scores.overall - a.scores.overall)[0]

  return (
    <>
      <SiteHeader />
      <main>
        <Hero featured={featured} monitored={snapshot.locations.length} fetchedAt={snapshot.fetchedAt} />
        <RiskTypes locations={snapshot.locations} />
        <HowItWorks />
        <Methodology />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          Forecast data from Open-Meteo. ClimaPulse scores are model estimates for planning, not official warnings.
          Always follow IMD and local authority advisories.
        </div>
      </footer>
    </>
  )
}
