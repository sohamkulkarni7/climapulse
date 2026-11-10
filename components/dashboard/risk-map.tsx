'use client'

import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/navigation'
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { levelHex } from '@/components/risk-badge'
import { riskLevel, type RiskLevel } from '@/lib/risk-level'

export type MapMode = 'overall' | 'flood' | 'heat' | 'waterlogging'

export type MapPoint = {
  id: string
  name: string
  lat: number
  lon: number
  level: RiskLevel
  overall: number
  flood: number
  heat: number
  waterlogging: number
}

export function RiskMap({ points, selectedId, mode }: { points: MapPoint[]; selectedId: string; mode: MapMode }) {
  const router = useRouter()

  return (
    <MapContainer center={[18.54, 73.85]} zoom={11} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles-dark"
      />
      {points.map((p) => {
        const value = p[mode]
        const color = levelHex[riskLevel(value)]
        const selected = p.id === selectedId
        return (
          <CircleMarker
            key={`${p.id}-${mode}`}
            center={[p.lat, p.lon]}
            radius={8 + value / 8}
            pathOptions={{
              color: selected ? '#ffffff' : color,
              weight: selected ? 3 : 1.5,
              fillColor: color,
              fillOpacity: 0.55,
            }}
            eventHandlers={{ click: () => router.push(`/dashboard?loc=${p.id}`, { scroll: false }) }}
          >
            <Tooltip direction="top">
              <strong>{p.name}</strong> · {mode === 'overall' ? 'Overall' : mode} {value}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
