export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

export function riskLevel(score: number): RiskLevel {
  if (score >= 75) return 'critical'
  if (score >= 55) return 'high'
  if (score >= 30) return 'moderate'
  return 'low'
}
