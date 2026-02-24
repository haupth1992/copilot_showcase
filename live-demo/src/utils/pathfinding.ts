import type { Location, LocationConnection, PathNode, PathfindingOptions } from '@/types/travel'
import { LOCATIONS } from '@/data/locations'
import { CONNECTIONS } from '@/data/connections'

/**
 * A* Pathfinding Algorithm
 * Finds the optimal route between two locations using A* search
 *
 * @param startId - Starting location ID
 * @param goalId - Destination location ID
 * @param options - Pathfinding preferences
 * @returns Array of locations representing the optimal path
 */
export function findPath(
  startId: string,
  goalId: string,
  options: PathfindingOptions,
): Location[] {
  const start = LOCATIONS.find((l) => l.id === startId)
  const goal = LOCATIONS.find((l) => l.id === goalId)

  if (!start || !goal) {
    throw new Error('Invalid start or goal location')
  }

  // Same location - return trivial path
  if (startId === goalId) {
    return [start]
  }

  // Initialize open and closed sets
  const openSet: PathNode[] = []
  const closedSet = new Set<string>()

  // Create start node
  const startNode: PathNode = {
    location: start,
    gCost: 0,
    hCost: calculateHeuristic(start, goal),
    fCost: 0,
    parent: null,
  }
  startNode.fCost = startNode.gCost + startNode.hCost

  openSet.push(startNode)

  // Main A* loop
  while (openSet.length > 0) {
    // Get node with lowest fCost
    const currentNode = getLowestFCostNode(openSet)

    // Goal reached!
    if (currentNode.location.id === goalId) {
      return reconstructPath(currentNode)
    }

    // Move current from open to closed
    removeFromArray(openSet, currentNode)
    closedSet.add(currentNode.location.id)

    // Check all neighbors
    const neighbors = getNeighbors(currentNode.location, options)

    for (const neighborData of neighbors) {
      const { location: neighbor, connection } = neighborData

      // Skip if already evaluated
      if (closedSet.has(neighbor.id)) continue

      // Calculate costs
      const tentativeGCost = currentNode.gCost + calculateEdgeCost(connection, options)

      // Check if neighbor is in open set
      const existingNode = openSet.find((n) => n.location.id === neighbor.id)

      if (!existingNode) {
        // New node
        const neighborNode: PathNode = {
          location: neighbor,
          gCost: tentativeGCost,
          hCost: calculateHeuristic(neighbor, goal),
          fCost: 0,
          parent: currentNode,
        }
        neighborNode.fCost = neighborNode.gCost + neighborNode.hCost
        openSet.push(neighborNode)
      } else if (tentativeGCost < existingNode.gCost) {
        // Better path found
        existingNode.gCost = tentativeGCost
        existingNode.fCost = existingNode.gCost + existingNode.hCost
        existingNode.parent = currentNode
      }
    }
  }

  // No path found
  throw new Error(`No path exists from ${start.name} to ${goal.name}`)
}

/**
 * Heuristic function (Euclidean distance)
 * Admissible heuristic that never overestimates the actual cost
 */
export function calculateHeuristic(from: Location, to: Location): number {
  const dx = to.coordinates.x - from.coordinates.x
  const dy = to.coordinates.y - from.coordinates.y
  const euclideanDistance = Math.sqrt(dx * dx + dy * dy)

  // Scale factor: 1 coordinate unit = ~10 miles
  return euclideanDistance * 10
}

/**
 * Calculate the cost of traversing an edge
 * Considers distance, terrain difficulty, and safety
 */
export function calculateEdgeCost(
  connection: LocationConnection,
  options: PathfindingOptions,
): number {
  let cost = connection.distance

  // Terrain multipliers
  const terrainCost: Record<string, number> = {
    Road: 1.0,
    Plains: 1.2,
    Forest: 1.5,
    Mountain: 2.0,
    River: 1.8,
    Swamp: 2.5,
    Underground: 3.0,
  }

  cost *= terrainCost[connection.terrain] ?? 1.5

  // Safety considerations
  if (options.prioritizeSafety) {
    // Add penalty for dangerous routes
    const dangerPenalty = connection.baseDangerLevel * 2
    cost += dangerPenalty
  }

  // Terrain avoidance
  if (options.avoidTerrain?.includes(connection.terrain)) {
    cost *= 5.0 // Heavy penalty for avoided terrain
  }

  // Road preference
  if (options.preferRoads && connection.terrain === 'Road') {
    cost *= 0.8 // 20% discount for roads
  }

  return cost
}

/**
 * Get neighboring locations with their connections
 */
export function getNeighbors(
  location: Location,
  options: PathfindingOptions,
): Array<{ location: Location; connection: LocationConnection }> {
  const neighbors: Array<{ location: Location; connection: LocationConnection }> = []

  for (const connection of CONNECTIONS) {
    let neighborId: string | null = null

    if (connection.from === location.id) {
      neighborId = connection.to
    } else if (connection.bidirectional && connection.to === location.id) {
      neighborId = connection.from
    }

    if (neighborId) {
      // Check danger level filter
      if (
        options.maxDangerLevel !== undefined &&
        connection.baseDangerLevel > options.maxDangerLevel
      ) {
        continue
      }

      const neighbor = LOCATIONS.find((l) => l.id === neighborId)
      if (neighbor) {
        neighbors.push({ location: neighbor, connection })
      }
    }
  }

  return neighbors
}

/**
 * Reconstruct path by following parent pointers
 */
function reconstructPath(node: PathNode): Location[] {
  const path: Location[] = []
  let current: PathNode | null = node

  while (current !== null) {
    path.unshift(current.location)
    current = current.parent
  }

  return path
}

/**
 * Get node with lowest fCost from open set
 */
function getLowestFCostNode(openSet: PathNode[]): PathNode {
  return openSet.reduce((lowest, node) => (node.fCost < lowest.fCost ? node : lowest))
}

/**
 * Remove node from array
 */
function removeFromArray(array: PathNode[], node: PathNode): void {
  const index = array.indexOf(node)
  if (index > -1) {
    array.splice(index, 1)
  }
}
