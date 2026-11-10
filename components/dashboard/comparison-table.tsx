import Link from 'next/link'
import { RiskBadge } from '@/components/risk-badge'
import type { LocationRisk } from '@/lib/risk'
import { cn } from '@/lib/utils'

export function ComparisonTable({ locations, selectedId }: { locations: LocationRisk[]; selectedId: string }) {
  const sorted = [...locations].sort((a, b) => b.scores.overall - a.scores.overall)

  return (
    <section aria-labelledby="compare-heading" className="rounded-xl border border-border bg-card p-6">
      <h2 id="compare-heading" className="text-sm font-medium">All neighbourhoods</h2>
      <p className="text-xs text-muted-foreground">Sorted by overall risk</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="pb-2 font-medium">Area</th>
              <th scope="col" className="pb-2 text-right font-medium">Flood</th>
              <th scope="col" className="pb-2 text-right font-medium">Heat</th>
              <th scope="col" className="pb-2 text-right font-medium">Water</th>
              <th scope="col" className="pb-2 text-right font-medium">Level</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {sorted.map((l) => (
              <tr key={l.location.id} className={cn('border-t border-border', l.location.id === selectedId && 'bg-primary/5')}>
                <th scope="row" className="py-2 font-sans font-normal">
                  <Link href={`/dashboard?loc=${l.location.id}`} scroll={false} className="hover:text-primary">
                    {l.location.name}
                  </Link>
                </th>
                <td className="py-2 text-right">{l.scores.flood}</td>
                <td className="py-2 text-right">{l.scores.heat}</td>
                <td className="py-2 text-right">{l.scores.waterlogging}</td>
                <td className="py-2 text-right">
                  <RiskBadge level={l.level} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
