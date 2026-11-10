export type Location = {
  id: string
  name: string
  lat: number
  lon: number
  /** 0–1, higher means more low-lying relative to surroundings */
  lowLying: number
  /** 0–1, higher means weaker drainage capacity */
  drainageWeakness: number
  /** 0–1, share of built-up surface */
  builtUp: number
  vulnerableSpots: string[]
}

export const LOCATIONS: Location[] = [
  { id: 'shivajinagar', name: 'Shivajinagar', lat: 18.5308, lon: 73.8475, lowLying: 0.75, drainageWeakness: 0.7, builtUp: 0.85, vulnerableSpots: ['FC Road', 'University Circle'] },
  { id: 'kothrud', name: 'Kothrud', lat: 18.5074, lon: 73.8077, lowLying: 0.35, drainageWeakness: 0.45, builtUp: 0.8, vulnerableSpots: ['Paud Road', 'Karve Road'] },
  { id: 'hadapsar', name: 'Hadapsar', lat: 18.5089, lon: 73.926, lowLying: 0.6, drainageWeakness: 0.65, builtUp: 0.75, vulnerableSpots: ['Magarpatta Junction', 'Solapur Road'] },
  { id: 'hinjewadi', name: 'Hinjewadi', lat: 18.5913, lon: 73.7389, lowLying: 0.4, drainageWeakness: 0.6, builtUp: 0.7, vulnerableSpots: ['Phase 1 Underpass', 'Wakad Bridge'] },
  { id: 'viman-nagar', name: 'Viman Nagar', lat: 18.5679, lon: 73.9143, lowLying: 0.45, drainageWeakness: 0.5, builtUp: 0.82, vulnerableSpots: ['Phoenix Mall Road'] },
  { id: 'kharadi', name: 'Kharadi', lat: 18.5515, lon: 73.9348, lowLying: 0.55, drainageWeakness: 0.55, builtUp: 0.72, vulnerableSpots: ['EON IT Park Road'] },
  { id: 'baner', name: 'Baner', lat: 18.559, lon: 73.7868, lowLying: 0.3, drainageWeakness: 0.5, builtUp: 0.74, vulnerableSpots: ['Baner Road', 'Balewadi Phata'] },
  { id: 'aundh', name: 'Aundh', lat: 18.5602, lon: 73.8031, lowLying: 0.5, drainageWeakness: 0.4, builtUp: 0.7, vulnerableSpots: ['Bremen Chowk'] },
  { id: 'swargate', name: 'Swargate', lat: 18.5018, lon: 73.8636, lowLying: 0.65, drainageWeakness: 0.75, builtUp: 0.9, vulnerableSpots: ['Swargate Bus Depot', 'Shankarsheth Road'] },
  { id: 'katraj', name: 'Katraj', lat: 18.4575, lon: 73.8677, lowLying: 0.55, drainageWeakness: 0.6, builtUp: 0.65, vulnerableSpots: ['Katraj Lake Road'] },
  { id: 'yerawada', name: 'Yerawada', lat: 18.5529, lon: 73.8797, lowLying: 0.8, drainageWeakness: 0.65, builtUp: 0.78, vulnerableSpots: ['Mula-Mutha riverbank', 'Shastri Nagar'] },
  { id: 'pimpri', name: 'Pimpri', lat: 18.6298, lon: 73.7997, lowLying: 0.5, drainageWeakness: 0.55, builtUp: 0.83, vulnerableSpots: ['Pimpri Chowk', 'Old Mumbai Highway'] },
]

export function getLocation(id: string | undefined) {
  return LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0]
}
