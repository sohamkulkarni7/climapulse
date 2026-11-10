'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import type { MapPoint, MapMode } from './risk-map'
import { cn } from '@/lib/utils'

const RiskMap = dynamic(() => import('./risk-map').then((m) => m.RiskMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-lg bg-muted" />,
})

const modes: { id: MapMode; label: string }[] = [
  { id: 'overall', label: 'All risks' },
  { id: 'flood', label: 'Flood' },
  { id: 'heat', label: 'Heat' },
  { id: 'waterlogging', label: 'Waterlogging' },
]

export function RiskMapPanel({ points, selectedId }: { points: MapPoint[]; selectedId: string }) {
  const [mode, setMode] = useState<MapMode>('overall')

  return (
    <section aria-labelledby="map-heading" className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="map-heading" className="text-sm font-medium">Risk map · Pune</h2>
          <p className="text-xs text-muted-foreground">Click a marker to open that area</p>
        </div>
        <div role="group" aria-label="Map layer" className="flex rounded-lg bg-muted p-0.5 text-xs">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                'rounded-md px-2.5 py-1 transition-colors',
                mode === m.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 h-80 overflow-hidden rounded-lg lg:h-full lg:min-h-80">
        <RiskMap points={points} selectedId={selectedId} mode={mode} />
      </div>
    </section>
  )
}
