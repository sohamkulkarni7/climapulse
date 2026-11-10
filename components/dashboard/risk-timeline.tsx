import { levelBg } from '@/components/risk-badge'
import { riskLevel, type LocationRisk } from '@/lib/risk'
import { cn } from '@/lib/utils'

const rows = [
  { key: 'flood', label: 'Flood' },
  { key: 'heat', label: 'Heat' },
  { key: 'waterlogging', label: 'Waterlogging' },
] as const

export function RiskTimeline({ risk }: { risk: LocationRisk }) {
  return (
    <section aria-labelledby="timeline-heading" className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="timeline-heading" className="text-sm font-medium">72-hour risk timeline</h2>
        <p className="text-xs text-muted-foreground">Six-hour windows · score shown in each cell</p>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-1 text-xs">
          <thead>
            <tr>
              <th scope="col" className="sr-only">Risk</th>
              {risk.timeline.map((t) => (
                <th key={t.start} scope="col" className="px-1 pb-1 text-left font-mono font-normal text-muted-foreground">
                  {t.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <th scope="row" className="pr-3 text-left font-medium whitespace-nowrap">{r.label}</th>
                {risk.timeline.map((t) => {
                  const v = t[r.key]
                  const level = riskLevel(v)
                  return (
                    <td key={t.start} className="p-0">
                      <div
                        className={cn(
                          'flex h-9 items-center justify-center rounded-md font-mono',
                          level === 'low' ? 'bg-risk-low/15 text-risk-low' : cn(levelBg[level], 'text-background'),
                        )}
                        title={`${r.label} ${v} (${level}) · ${t.label}`}
                      >
                        {v}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
