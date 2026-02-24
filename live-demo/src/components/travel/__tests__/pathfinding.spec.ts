import { describe, it, expect } from 'vitest'
import { findPath, calculateHeuristic, calculateEdgeCost, getNeighbors } from '@/utils/pathfinding'
import { LOCATIONS } from '@/data/locations'

const hobbiton = LOCATIONS.find((l) => l.id === 'hobbiton')!
const bree = LOCATIONS.find((l) => l.id === 'bree')!
const rivendell = LOCATIONS.find((l) => l.id === 'rivendell')!
const mountDoom = LOCATIONS.find((l) => l.id === 'mount-doom')!
const moria = LOCATIONS.find((l) => l.id === 'moria')!

describe('findPath', () => {
  it('finds direct path from Hobbiton to Bree', () => {
    const path = findPath('hobbiton', 'bree', { prioritizeSafety: false, preferRoads: false })
    expect(path[0]!.id).toBe('hobbiton')
    expect(path[path.length - 1]!.id).toBe('bree')
    expect(path.length).toBeGreaterThanOrEqual(2)
  })

  it('finds path from Hobbiton to Mount Doom', () => {
    const path = findPath('hobbiton', 'mount-doom', { prioritizeSafety: false, preferRoads: false })
    expect(path[0]!.id).toBe('hobbiton')
    expect(path[path.length - 1]!.id).toBe('mount-doom')
    expect(path.length).toBeGreaterThan(2)
  })

  it('returns trivial path when start equals goal', () => {
    const path = findPath('hobbiton', 'hobbiton', { prioritizeSafety: false, preferRoads: false })
    expect(path).toHaveLength(1)
    expect(path[0]!.id).toBe('hobbiton')
  })

  it('throws for invalid location IDs', () => {
    expect(() =>
      findPath('invalid-start', 'bree', { prioritizeSafety: false, preferRoads: false }),
    ).toThrow('Invalid start or goal location')
  })

  it('safest path avoids Moria when possible', () => {
    const path = findPath('rivendell', 'lothlorien', {
      prioritizeSafety: true,
      maxDangerLevel: 50,
      preferRoads: true,
      avoidTerrain: ['Underground'],
    })
    // Safest should avoid underground Moria route
    const passedThroughMoria = path.some((l) => l.id === 'moria')
    expect(passedThroughMoria).toBe(false)
  })

  it('finds valid path from Rivendell to Minas Tirith', () => {
    const path = findPath('rivendell', 'minas-tirith', {
      prioritizeSafety: false,
      preferRoads: false,
    })
    expect(path[0]!.id).toBe('rivendell')
    expect(path[path.length - 1]!.id).toBe('minas-tirith')
  })

  it('respects maxDangerLevel option', () => {
    // With maxDangerLevel 40, paths with danger > 40 are excluded
    const path = findPath('hobbiton', 'minas-tirith', {
      prioritizeSafety: false,
      preferRoads: false,
      maxDangerLevel: 40,
    })
    expect(path[0]!.id).toBe('hobbiton')
    expect(path[path.length - 1]!.id).toBe('minas-tirith')
  })
})

describe('calculateHeuristic', () => {
  it('returns 0 for same location', () => {
    expect(calculateHeuristic(hobbiton, hobbiton)).toBe(0)
  })

  it('returns positive value for different locations', () => {
    expect(calculateHeuristic(hobbiton, mountDoom)).toBeGreaterThan(0)
  })

  it('is symmetric (same distance both ways)', () => {
    const ab = calculateHeuristic(hobbiton, rivendell)
    const ba = calculateHeuristic(rivendell, hobbiton)
    expect(ab).toBeCloseTo(ba, 5)
  })

  it('closer locations have smaller heuristic', () => {
    const toBree = calculateHeuristic(hobbiton, bree)
    const toMordor = calculateHeuristic(hobbiton, mountDoom)
    expect(toBree).toBeLessThan(toMordor)
  })
})

describe('calculateEdgeCost', () => {
  const roadConn = { from: 'hobbiton', to: 'bree', distance: 130, terrain: 'Road' as const, baseDangerLevel: 10, bidirectional: true }
  const mountainConn = { from: 'bree', to: 'moria', distance: 240, terrain: 'Mountain' as const, baseDangerLevel: 60, bidirectional: true }

  it('road terrain costs less than mountain terrain', () => {
    const roadCost = calculateEdgeCost(roadConn, { prioritizeSafety: false, preferRoads: false })
    const mountainCost = calculateEdgeCost(mountainConn, { prioritizeSafety: false, preferRoads: false })
    // Road: 130 * 1.0 = 130, Mountain: 240 * 2.0 = 480
    expect(roadCost).toBeLessThan(mountainCost)
  })

  it('safety option adds danger penalty', () => {
    const normal = calculateEdgeCost(mountainConn, { prioritizeSafety: false, preferRoads: false })
    const safe = calculateEdgeCost(mountainConn, { prioritizeSafety: true, preferRoads: false })
    expect(safe).toBeGreaterThan(normal)
  })

  it('road preference discounts road connections', () => {
    const noPreference = calculateEdgeCost(roadConn, { prioritizeSafety: false, preferRoads: false })
    const withPreference = calculateEdgeCost(roadConn, { prioritizeSafety: false, preferRoads: true })
    expect(withPreference).toBeLessThan(noPreference)
  })

  it('avoided terrain gets heavy penalty', () => {
    const normal = calculateEdgeCost(mountainConn, { prioritizeSafety: false, preferRoads: false })
    const avoided = calculateEdgeCost(mountainConn, { prioritizeSafety: false, preferRoads: false, avoidTerrain: ['Mountain'] })
    expect(avoided).toBeGreaterThan(normal * 4)
  })
})

describe('getNeighbors', () => {
  it('returns direct neighbors of Hobbiton', () => {
    const neighbors = getNeighbors(hobbiton, { prioritizeSafety: false, preferRoads: false })
    const ids = neighbors.map((n) => n.location.id)
    expect(ids).toContain('bree')
  })

  it('returns bidirectional neighbors', () => {
    const neighbors = getNeighbors(bree, { prioritizeSafety: false, preferRoads: false })
    const ids = neighbors.map((n) => n.location.id)
    // bree connects to hobbiton (bidirectional), rivendell, moria, rohan-edoras
    expect(ids).toContain('hobbiton')
    expect(ids).toContain('rivendell')
  })

  it('filters neighbors above maxDangerLevel', () => {
    const neighborsAll = getNeighbors(moria, { prioritizeSafety: false, preferRoads: false })
    const neighborsSafe = getNeighbors(moria, { prioritizeSafety: false, preferRoads: false, maxDangerLevel: 50 })
    // Moria has Underground -> Lothlorien at danger 75, which should be filtered
    expect(neighborsSafe.length).toBeLessThan(neighborsAll.length)
  })
})
