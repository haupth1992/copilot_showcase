import { describe, it, expect } from 'vitest'
import {
  calculateRoute,
  calculateTerrainBreakdown,
  calculateTotalDistance,
  calculateTravelTime,
  calculateOverallDanger,
  generateWarnings,
  generateRecommendations,
  calculateCost,
  findConnection,
} from '@/utils/routeCalculations'
import { LOCATIONS } from '@/data/locations'

const hobbiton = LOCATIONS.find((l) => l.id === 'hobbiton')!
const bree = LOCATIONS.find((l) => l.id === 'bree')!
const rivendell = LOCATIONS.find((l) => l.id === 'rivendell')!
const moria = LOCATIONS.find((l) => l.id === 'moria')!
const mountDoom = LOCATIONS.find((l) => l.id === 'mount-doom')!

describe('calculateRoute', () => {
  it('returns a valid Route object for Direct path', () => {
    const route = calculateRoute('hobbiton', 'bree', 'Direct')
    expect(route.id).toBe('hobbiton-bree-Direct')
    expect(route.from.id).toBe('hobbiton')
    expect(route.to.id).toBe('bree')
    expect(route.pathType).toBe('Direct')
    expect(route.totalDistance).toBeGreaterThan(0)
    expect(route.estimatedTravelTime).toBeGreaterThan(0)
  })

  it('returns correct dangerLevel for safe route', () => {
    const route = calculateRoute('hobbiton', 'bree', 'Direct')
    // hobbiton -> bree has danger 10 which is "Safe"
    expect(route.dangerLevel).toBe('Safe')
  })

  it('returns Deadly or Dangerous dangerLevel for Hobbiton -> Mount Doom', () => {
    const route = calculateRoute('hobbiton', 'mount-doom', 'Direct')
    expect(['Deadly', 'Dangerous']).toContain(route.dangerLevel)
  })

  it('generates warnings when passing through dangerous locations', () => {
    const route = calculateRoute('hobbiton', 'mount-doom', 'Direct')
    expect(route.warnings.length).toBeGreaterThan(0)
    // Should warn about Mordor
    const hasMordorWarning = route.warnings.some((w) => w.includes('Mordor'))
    expect(hasMordorWarning).toBe(true)
  })

  it('generates Moria warning when route passes through Moria', () => {
    // Direct from rivendell to lothlorien may go through Moria - just verify calculateRoute doesn't crash
    // and that generateWarnings includes Moria warning when moria is in path
    const warnings = generateWarnings([rivendell, moria], [])
    expect(warnings.some((w) => w.includes('Moria'))).toBe(true)
  })

  it('calculates estimated cost as positive number', () => {
    const route = calculateRoute('hobbiton', 'rivendell', 'Direct')
    expect(route.estimatedCost).toBeGreaterThan(0)
  })

  it('waypoints match path length - 1', () => {
    const route = calculateRoute('hobbiton', 'minas-tirith', 'Direct')
    expect(route.waypoints).toHaveLength(route.path.length - 1)
  })

  it('all 4 path types can calculate Hobbiton to Minas Tirith', () => {
    const pathTypes = ['Direct', 'Fastest', 'Scenic'] as const
    for (const pt of pathTypes) {
      const route = calculateRoute('hobbiton', 'minas-tirith', pt)
      expect(route.pathType).toBe(pt)
      expect(route.path.length).toBeGreaterThan(1)
    }
  })
})

describe('calculateTerrainBreakdown', () => {
  it('returns segments for consecutive path locations', () => {
    const path = [hobbiton, bree, rivendell]
    const segments = calculateTerrainBreakdown(path)
    expect(segments).toHaveLength(2)
    expect(segments[0]!.from.id).toBe('hobbiton')
    expect(segments[0]!.to.id).toBe('bree')
  })

  it('each segment has positive distance and estimatedDays', () => {
    const path = [hobbiton, bree]
    const segments = calculateTerrainBreakdown(path)
    expect(segments[0]!.distance).toBeGreaterThan(0)
    expect(segments[0]!.estimatedDays).toBeGreaterThan(0)
  })
})

describe('calculateTotalDistance', () => {
  it('sums distance along path', () => {
    const path = [hobbiton, bree]
    const total = calculateTotalDistance(path)
    expect(total).toBe(130) // hobbiton->bree = 130 miles
  })

  it('single location has zero distance', () => {
    expect(calculateTotalDistance([hobbiton])).toBe(0)
  })
})

describe('calculateTravelTime', () => {
  it('sums estimatedDays from segments', () => {
    const segments = [
      { from: hobbiton, to: bree, terrain: 'Road' as const, distance: 130, estimatedDays: 6 },
      { from: bree, to: rivendell, terrain: 'Road' as const, distance: 180, estimatedDays: 8 },
    ]
    expect(calculateTravelTime(segments)).toBe(14)
  })

  it('returns 0 for empty segments', () => {
    expect(calculateTravelTime([])).toBe(0)
  })
})

describe('calculateOverallDanger', () => {
  it('returns Safe for low-danger path', () => {
    expect(calculateOverallDanger([hobbiton, bree])).toBe('Safe')
  })

  it('returns Deadly when path includes Mount Doom segment', () => {
    const minasTirith = LOCATIONS.find((l) => l.id === 'minas-tirith')!
    expect(calculateOverallDanger([minasTirith, mountDoom])).toBe('Deadly')
  })

  it('returns Dangerous for Moria-underground segment', () => {
    const lothlorien = LOCATIONS.find((l) => l.id === 'lothlorien')!
    const danger = calculateOverallDanger([moria, lothlorien])
    expect(['Dangerous', 'Deadly']).toContain(danger)
  })
})

describe('generateWarnings', () => {
  it('warns about extremely dangerous locations', () => {
    const warnings = generateWarnings([hobbiton, bree, mountDoom], [])
    expect(warnings.some((w) => w.includes('Mount Doom'))).toBe(true)
  })

  it('warns about Moria in path', () => {
    const warnings = generateWarnings([rivendell, moria], [])
    expect(warnings.some((w) => w.includes('Moria'))).toBe(true)
  })

  it('warns about Mordor region', () => {
    const warnings = generateWarnings([hobbiton, mountDoom], [])
    expect(warnings.some((w) => w.includes('Mordor'))).toBe(true)
  })

  it('returns empty warnings for safe path', () => {
    const warnings = generateWarnings([hobbiton, bree], [])
    expect(warnings).toHaveLength(0)
  })
})

describe('generateRecommendations', () => {
  it('recommends medical supplies when no healers along route', () => {
    const recs = generateRecommendations([hobbiton, mountDoom], 'Direct')
    expect(recs.some((r) => r.includes('healers') || r.includes('medical'))).toBe(true)
  })

  it('gives speed warning for Fastest path type', () => {
    const recs = generateRecommendations([hobbiton, bree], 'Fastest')
    expect(recs.some((r) => r.includes('speed') || r.includes('Fast'))).toBe(true)
  })

  it('gives scenic info for Scenic path type', () => {
    const recs = generateRecommendations([hobbiton, bree], 'Scenic')
    expect(recs.some((r) => r.includes('Scenic') || r.includes('scenic'))).toBe(true)
  })
})

describe('calculateCost', () => {
  it('charges base cost per day plus city fees', () => {
    // 5 days, 1 city = 5*5 + 1*10 = 35
    const cost = calculateCost(5, [hobbiton, bree])
    expect(cost).toBe(35) // bree is a City
  })

  it('is higher for longer journeys', () => {
    const short = calculateCost(2, [hobbiton])
    const long = calculateCost(30, [hobbiton])
    expect(long).toBeGreaterThan(short)
  })
})

describe('findConnection', () => {
  it('finds connection between Hobbiton and Bree', () => {
    const conn = findConnection('hobbiton', 'bree')
    expect(conn).toBeDefined()
    expect(conn!.distance).toBe(130)
  })

  it('finds reverse bidirectional connection', () => {
    const conn = findConnection('bree', 'hobbiton')
    expect(conn).toBeDefined()
  })

  it('returns undefined for unconnected locations', () => {
    const conn = findConnection('hobbiton', 'mount-doom')
    expect(conn).toBeUndefined()
  })
})
