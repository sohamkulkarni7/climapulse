import 'server-only'
import { LOCATIONS, type Location } from './locations'
import { riskLevel, type RiskLevel } from './risk-level'

export { riskLevel, type RiskLevel }

export type HourPoint = {
  time: string
  temperature: number
  apparentTemperature: number
  humidity: number
  precipitation: number
  windSpeed: number
}

export type RiskScores = { flood: number; heat: number; waterlogging: number; overall: number }

export type Factor = { label: string; value: string; impact: number }

export type LocationRisk = {
  location: Location
  scores: RiskScores
  level: RiskLevel
  rain24h: number
  peakRainRate: number
  maxTemp: number
  maxFeelsLike: number
  avgHumidity: number
  maxWind: number
  floodFactors: Factor[]
  heatFactors: Factor[]
  hourly: HourPoint[]
  timeline: { label: string; start: string; flood: number; heat: number; waterlogging: number }[]
}

export type RiskSnapshot = {
  fetchedAt: string
  source: 'open-meteo' | 'unavailable'
  locations: LocationRisk[]
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const round = (v: number) => Math.round(v)

function scoreWindow(loc: Location, hours: HourPoint[], horizonHours: number) {
  const rainTotal = hours.reduce((s, h) => s + h.precipitation, 0)
  const scaledRain = rainTotal * (24 / Math.max(horizonHours, 1))
  const peakRate = Math.max(0, ...hours.map((h) => h.precipitation))
  const maxFeels = Math.max(...hours.map((h) => h.apparentTemperature))

  const rainScore = clamp(scaledRain / 60)
  const intensityScore = clamp(peakRate / 15)
  const heatScore = clamp((maxFeels - 30) / 15)

  const flood = 100 * (0.45 * rainScore + 0.2 * intensityScore + 0.2 * loc.lowLying * Math.max(rainScore, 0.15) + 0.15 * loc.drainageWeakness * Math.max(rainScore, 0.15))
  const waterlogging = 100 * (0.4 * intensityScore + 0.3 * rainScore + 0.3 * loc.drainageWeakness * Math.max(intensityScore, rainScore, 0.15))
  const heat = 100 * (0.75 * heatScore + 0.25 * loc.builtUp * Math.max(heatScore, 0.2))

  return {
    flood: round(clamp(flood, 0, 100)),
    heat: round(clamp(heat, 0, 100)),
    waterlogging: round(clamp(waterlogging, 0, 100)),
    rainTotal,
    peakRate,
    maxFeels,
  }
}

function overallScore(s: { flood: number; heat: number; waterlogging: number }) {
  const max = Math.max(s.flood, s.heat, s.waterlogging)
  const avg = (s.flood + s.heat + s.waterlogging) / 3
  return round(max * 0.7 + avg * 0.3)
}

function buildLocationRisk(loc: Location, hourly: HourPoint[]): LocationRisk {
  const next24 = hourly.slice(0, 24)
  const w = scoreWindow(loc, next24, 24)
  const scores = { flood: w.flood, heat: w.heat, waterlogging: w.waterlogging, overall: overallScore(w) }

  const timeline = []
  for (let i = 0; i < Math.min(hourly.length, 72); i += 6) {
    const slice = hourly.slice(i, i + 6)
    if (slice.length === 0) break
    const s = scoreWindow(loc, slice, slice.length)
    const d = new Date(slice[0].time)
    timeline.push({
      label: d.toLocaleString('en-IN', { weekday: 'short', hour: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' }),
      start: slice[0].time,
      flood: s.flood,
      heat: s.heat,
      waterlogging: s.waterlogging,
    })
  }

  const maxTemp = Math.max(...next24.map((h) => h.temperature))
  const avgHumidity = next24.reduce((s, h) => s + h.humidity, 0) / next24.length

  return {
    location: loc,
    scores,
    level: riskLevel(scores.overall),
    rain24h: Number(w.rainTotal.toFixed(1)),
    peakRainRate: Number(w.peakRate.toFixed(1)),
    maxTemp: Number(maxTemp.toFixed(1)),
    maxFeelsLike: Number(w.maxFeels.toFixed(1)),
    avgHumidity: round(avgHumidity),
    maxWind: round(Math.max(...next24.map((h) => h.windSpeed))),
    floodFactors: [
      { label: 'Forecast rainfall (24h)', value: `${w.rainTotal.toFixed(1)} mm`, impact: clamp(w.rainTotal / 60) },
      { label: 'Peak rain intensity', value: `${w.peakRate.toFixed(1)} mm/h`, impact: clamp(w.peakRate / 15) },
      { label: 'Low-lying terrain', value: `${round(loc.lowLying * 100)}%`, impact: loc.lowLying },
      { label: 'Drainage weakness', value: `${round(loc.drainageWeakness * 100)}%`, impact: loc.drainageWeakness },
    ],
    heatFactors: [
      { label: 'Max feels-like', value: `${w.maxFeels.toFixed(1)}°C`, impact: clamp((w.maxFeels - 30) / 15) },
      { label: 'Built-up density', value: `${round(loc.builtUp * 100)}%`, impact: loc.builtUp },
      { label: 'Average humidity', value: `${round(avgHumidity)}%`, impact: clamp(avgHumidity / 100) },
    ],
    hourly,
    timeline,
  }
}

type OpenMeteoResponse = {
  hourly: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature: number[]
    relative_humidity_2m: number[]
    precipitation: number[]
    wind_speed_10m: number[]
  }
}

export async function getRiskSnapshot(): Promise<RiskSnapshot> {
  const params = new URLSearchParams({
    latitude: LOCATIONS.map((l) => l.lat).join(','),
    longitude: LOCATIONS.map((l) => l.lon).join(','),
    hourly: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m',
    forecast_days: '4',
    timezone: 'Asia/Kolkata',
  })

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { next: { revalidate: 900 } })
    if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`)
    const data = (await res.json()) as OpenMeteoResponse[] | OpenMeteoResponse
    const list = Array.isArray(data) ? data : [data]

    const nowKey = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).slice(0, 13)

    const locations = LOCATIONS.map((loc, i) => {
      const h = list[i].hourly
      const startIdx = Math.max(0, h.time.findIndex((t) => t.slice(0, 13) === nowKey))
      const hourly: HourPoint[] = h.time.slice(startIdx, startIdx + 72).map((time, j) => {
        const k = startIdx + j
        return {
          time,
          temperature: h.temperature_2m[k] ?? 0,
          apparentTemperature: h.apparent_temperature[k] ?? 0,
          humidity: h.relative_humidity_2m[k] ?? 0,
          precipitation: h.precipitation[k] ?? 0,
          windSpeed: h.wind_speed_10m[k] ?? 0,
        }
      })
      return buildLocationRisk(loc, hourly)
    })

    return { fetchedAt: new Date().toISOString(), source: 'open-meteo', locations }
  } catch (error) {
    console.error('Failed to fetch forecast data', error)
    return { fetchedAt: new Date().toISOString(), source: 'unavailable', locations: [] }
  }
}

export function guidanceFor(risk: LocationRisk): string[] {
  const tips: string[] = []
  const { flood, heat, waterlogging } = risk.scores
  if (flood >= 55) {
    tips.push('Move valuables and electrical appliances above ground level.')
    tips.push(`Avoid riverbanks and underpasses near ${risk.location.name}.`)
  } else if (flood >= 30) {
    tips.push('Keep an eye on official IMD rainfall bulletins through the day.')
  }
  if (waterlogging >= 55) {
    tips.push(`Expect waterlogging around ${risk.location.vulnerableSpots.join(' and ')}. Plan alternate routes.`)
  } else if (waterlogging >= 30) {
    tips.push('Report blocked drains in your street before rain intensifies.')
  }
  if (heat >= 55) {
    tips.push('Limit outdoor activity between 12 PM and 4 PM and drink water regularly.')
    tips.push('Check on elderly neighbours and anyone without cooling at home.')
  } else if (heat >= 30) {
    tips.push('Stay hydrated and prefer shaded routes during the afternoon.')
  }
  if (tips.length === 0) {
    tips.push('No significant climate risk expected in the next 24 hours.')
    tips.push('A good time to clear gutters and check your emergency kit.')
  }
  return tips
}
