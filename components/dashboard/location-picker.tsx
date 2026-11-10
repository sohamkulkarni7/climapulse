import Link from 'next/link'
import type { LocationRisk } from '@/lib/risk'
import { levelBg } from '@/components/risk-badge'
import { cn } from '@/lib/utils'

export function LocationPicker({ locations, selectedId }: { locations: LocationRisk[]; selectedId: string }) {
  return (
    <nav aria-label="Select neighbourhood" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex gap-2 pb-1">
        {locations.map((l) => {
          const active = l.location.id === selectedId
          return (
            <li key={l.location.id}>
              <Link
                href={`/dashboard?loc=${l.location.id}`}
                scroll={false}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors',
                  active
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                )}
              >
                <span className={cn('size-2 rounded-full', levelBg[l.level])} aria-hidden="true" />
                {l.location.name}
                <span className="font-mono text-xs">{l.scores.overall}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
