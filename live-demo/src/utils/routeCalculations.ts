import type {
  Route,
  PathType,
  Location,
  TerrainSegment,
  DangerLevel,
  Waypoint,
  Terrain,
} from '@/types/travel'
import { findPath } from './pathfinding'
import { CONNECTIONS } from '@/data/connections'

/**
 * Calculate route based on path type
 */
export function calculateRoute(fromId: string, toId: string, pathType: PathType): Route {
  // Determine pathfinding options based on path type
  const options = getOptionsForPathType(pathType)

  // Find optimal path using A*
  const path = findPath(fromId, toId, options)

  // Calculate route details
  const terrainBreakdown = calculateTerrainBreakdown(path)
  const totalDistance = calculateTotalDistance(path)
  const estimatedTravelTime = calculateTravelTime(terrainBreakdown)
  const dangerLevel = calculateOverallDanger(path)
  const waypoints = generateWaypoints(path, terrainBreakdown)
  const warnings = generateWarnings(path, terrainBreakdown)
  const recommendations = generateRecommendations(path, pathType)
  const estimatedCost = calculateCost(estimatedTravelTime, path)

  return {
    id: `${fromId}-${toId}-${pathType}`,
    from: path[0]!,
    to: path[path.length - 1]!,
    path,
    totalDistance,
    estimatedTravelTime,
    pathType,
    dangerLevel,
    terrainBreakdown,
    waypoints,
    recommendations,
    warnings,
    estimatedCost,
  }
}

/**
 * Get pathfinding options for each path type
 */
export function getOptionsForPathType(pathType: PathType) {
  switch (pathType) {
    case 'Safest':
      return {
        prioritizeSafety: true,
        maxDangerLevel: 50,
        preferRoads: true,
        avoidTerrain: ['Underground'] as Terrain[],
      }
    case 'Fastest':
      return {
        prioritizeSafety: false,
        preferRoads: true,
        avoidTerrain: [] as Terrain[],
      }
    case 'Scenic':
      return {
        prioritizeSafety: false,
        preferRoads: false,
        avoidTerrain: ['Underground', 'Swamp'] as Terrain[],
      }
    case 'Direct':
    default:
      return {
        prioritizeSafety: false,
        preferRoads: false,
        avoidTerrain: [] as Terrain[],
      }
  }
}

/**
 * Calculate terrain breakdown for path
 */
export function calculateTerrainBreakdown(path: Location[]): TerrainSegment[] {
  const segments: TerrainSegment[] = []

  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i]!
    const to = path[i + 1]!

    const connection = findConnection(from.id, to.id)

    if (connection) {
      const speedMap: Record<string, number> = {
        Road: 25,
        Plains: 20,
        Forest: 15,
        Mountain: 10,
        River: 12,
        Swamp: 8,
        Underground: 10,
      }

      const speed = speedMap[connection.terrain] ?? 15
      const estimatedDays = Math.ceil(connection.distance / speed)

      segments.push({
        from,
        to,
        terrain: connection.terrain,
        distance: connection.distance,
        estimatedDays,
      })
    }
  }

  return segments
}

/**
 * Calculate total distance
 */
export function calculateTotalDistance(path: Location[]): number {
  let total = 0

  for (let i = 0; i < path.length - 1; i++) {
    const connection = findConnection(path[i]!.id, path[i + 1]!.id)
    if (connection) {
      total += connection.distance
    }
  }

  return total
}

/**
 * Calculate travel time from terrain breakdown
 */
export function calculateTravelTime(segments: TerrainSegment[]): number {
  return segments.reduce((sum, seg) => sum + seg.estimatedDays, 0)
}

/**
 * Calculate overall danger level for route
 */
export function calculateOverallDanger(path: Location[]): DangerLevel {
  let maxDanger = 0

  for (let i = 0; i < path.length - 1; i++) {
    const connection = findConnection(path[i]!.id, path[i + 1]!.id)
    if (connection) {
      maxDanger = Math.max(maxDanger, connection.baseDangerLevel)
    }
  }

  if (maxDanger >= 80) return 'Deadly'
  if (maxDanger >= 60) return 'Dangerous'
  if (maxDanger >= 40) return 'Moderate'
  if (maxDanger >= 20) return 'Low Risk'
  return 'Safe'
}

/**
 * Generate waypoints with rest recommendations
 */
export function generateWaypoints(path: Location[], segments: TerrainSegment[]): Waypoint[] {
  const waypoints: Waypoint[] = []
  let currentDay = 0

  for (let i = 1; i < path.length; i++) {
    const segment = segments[i - 1]!
    const loc = path[i]!
    currentDay += segment.estimatedDays

    waypoints.push({
      location: loc,
      dayNumber: currentDay,
      description: `Arrive at ${loc.name} via ${segment.terrain.toLowerCase()}`,
      restRecommended: segment.estimatedDays > 3 || loc.facilities.includes('Inn'),
      facilities: loc.facilities,
    })
  }

  return waypoints
}

/**
 * Generate warnings based on route
 */
export function generateWarnings(path: Location[], segments: TerrainSegment[]): string[] {
  const warnings: string[] = []

  // Check for dangerous locations
  const dangerousLocs = path.filter((loc) => loc.safetyRating < 30)
  if (dangerousLocs.length > 0) {
    warnings.push(
      `⚠️ Extremely dangerous areas: ${dangerousLocs.map((l) => l.name).join(', ')}`,
    )
  }

  // Check for difficult terrain
  const difficultTerrain = segments.filter((s) =>
    ['Mountain', 'Swamp', 'Underground'].includes(s.terrain),
  )
  if (difficultTerrain.length > 0) {
    warnings.push(`⛰️ Difficult terrain ahead: ${difficultTerrain.length} challenging segment(s)`)
  }

  // Check for Moria
  if (path.some((loc) => loc.id === 'moria')) {
    warnings.push('👹 Moria is overrun with Orcs and worse. Avoid if possible!')
  }

  // Check for Mordor
  if (path.some((loc) => loc.region === 'Mordor')) {
    warnings.push('👁️ You walk into Mordor... prepare for extreme danger!')
  }

  return warnings
}

/**
 * Generate recommendations
 */
export function generateRecommendations(path: Location[], pathType: PathType): string[] {
  const recs: string[] = []

  // Check facilities along route
  const hasHealers = path.some((loc) => loc.facilities.includes('Healer'))
  if (!hasHealers) {
    recs.push('💊 No healers along route. Bring medical supplies.')
  }

  const hasInns = path.some((loc) => loc.facilities.includes('Inn'))
  if (!hasInns) {
    recs.push('🏕️ No inns available. Prepare for camping.')
  }

  // Path-specific recommendations
  if (pathType === 'Fastest') {
    recs.push('⚡ Fast route prioritizes speed over safety. Stay alert!')
  }

  if (pathType === 'Scenic') {
    recs.push('🌄 Scenic route includes beautiful but slower paths.')
  }

  return recs
}

/**
 * Calculate estimated cost
 */
export function calculateCost(days: number, path: Location[]): number {
  // Base cost: 5 silver per day (food, lodging)
  let cost = days * 5

  // Add toll/entry fees for major cities
  const majorCities = path.filter((loc) => loc.type === 'City' || loc.type === 'Fortress')
  cost += majorCities.length * 10

  return cost
}

/**
 * Helper to find connection between two locations
 */
export function findConnection(fromId: string, toId: string) {
  return CONNECTIONS.find(
    (c) =>
      (c.from === fromId && c.to === toId) ||
      (c.bidirectional && c.from === toId && c.to === fromId),
  )
}
