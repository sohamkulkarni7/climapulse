'use client'

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { HourPoint } from '@/lib/risk'


const axis = { stroke: 'var(--muted-foreground)', fontSize: 11, tickLine: false, axisLine: false }

function formatHour(time: string) {
  const d = new Date(time)
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true })
}

const tooltipStyle = {
  contentStyle: { background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 },
  labelStyle: { color: 'var(--muted-foreground)' },
}

export function ForecastCharts({ hourly }: { hourly: HourPoint[] }) {
  const data = hourly.slice(0, 24).map((h) => ({ ...h, hour: formatHour(h.time) }))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section aria-labelledby="rain-heading" className="rounded-xl border border-border bg-card p-6">
        <h2 id="rain-heading" className="text-sm font-medium">Rainfall · next 24h</h2>
        <p className="text-xs text-muted-foreground">mm per hour</p>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -20, right: 4 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="hour" {...axis} interval={3} />
              <YAxis {...axis} allowDecimals />
              <Tooltip {...tooltipStyle} cursor={{ fill: 'var(--muted)' }} formatter={(v) => [`${v} mm`, 'Rain']} />
              <Bar dataKey="precipitation" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section aria-labelledby="temp-heading" className="rounded-xl border border-border bg-card p-6">
        <h2 id="temp-heading" className="text-sm font-medium">Temperature · next 24h</h2>
        <p className="text-xs text-muted-foreground">°C, actual and feels-like · dashed line is 40°C heat threshold</p>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: -20, right: 4 }}>
              <defs>
                <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="hour" {...axis} interval={3} />
              <YAxis {...axis} domain={['dataMin - 3', 42]} />
              <Tooltip {...tooltipStyle} />
              <ReferenceLine y={40} stroke="var(--risk-critical)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="temperature" name="Temp" stroke="var(--chart-2)" fill="url(#tempFill)" strokeWidth={2} />
              <Area type="monotone" dataKey="apparentTemperature" name="Feels like" stroke="var(--primary)" fill="none" strokeWidth={1.5} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
