import { cn } from '@/lib/utils'
import type { RiskLevel } from '@/lib/risk-level'

export const levelText: Record<RiskLevel, string> = {
  low: 'text-risk-low',
  moderate: 'text-risk-moderate',
  high: 'text-risk-high',
  critical: 'text-risk-critical',
}

export const levelBg: Record<RiskLevel, string> = {
  low: 'bg-risk-low',
  moderate: 'bg-risk-moderate',
  high: 'bg-risk-high',
  critical: 'bg-risk-critical',
}

export const levelHex: Record<RiskLevel, string> = {
  low: '#3fca85',
  moderate: '#e6c84a',
  high: '#f08a3c',
  critical: '#e5484d',
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-current/30 bg-current/10 px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-wider',
        levelText[level],
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', levelBg[level])} aria-hidden="true" />
      {level}
    </span>
  )
}
