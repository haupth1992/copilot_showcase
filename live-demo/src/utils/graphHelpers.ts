import type { Location, LocationConnection } from '@/types/travel'
import { LOCATIONS } from '@/data/locations'
import { CONNECTIONS } from '@/data/connections'

/**
 * Get all direct neighbors of a location (both directions)
 */
export function getDirectNeighbors(locationId: string): Location[] {
  const neighborIds = new Set<string>()

  for (const conn of CONNECTIONS) {
    if (conn.from === locationId) {
      neighborIds.add(conn.to)
    } else if (conn.bidirectional && conn.to === locationId) {
      neighborIds.add(conn.from)
    }
  }

  return LOCATIONS.filter((l) => neighborIds.has(l.id))
}

/**
 * Get all connections involving a location
 */
export function getLocationConnections(locationId: string): LocationConnection[] {
  return CONNECTIONS.filter(
    (c) =>
      c.from === locationId || (c.bidirectional && c.to === locationId),
  )
}

/**
 * Check whether a path exists between two locations (BFS)
 */
export function pathExists(startId: string, goalId: string): boolean {
  if (startId === goalId) return true

  const visited = new Set<string>()
  const queue: string[] = [startId]

  while (queue.length > 0) {
    const current = queue.shift()!
    if (visited.has(current)) continue
    visited.add(current)

    const neighbors = getDirectNeighbors(current)
    for (const neighbor of neighbors) {
      if (neighbor.id === goalId) return true
      if (!visited.has(neighbor.id)) {
        queue.push(neighbor.id)
      }
    }
  }

  return false
}

/**
 * Calculate Euclidean distance between two locations' coordinates
 */
export function coordinateDistance(a: Location, b: Location): number {
  const dx = b.coordinates.x - a.coordinates.x
  const dy = b.coordinates.y - a.coordinates.y
  return Math.sqrt(dx * dx + dy * dy)
}
