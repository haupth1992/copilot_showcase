// Middle-Earth Travel Planner - Type Definitions

export interface Location {
  id: string
  name: string
  region: Region
  coordinates: Coordinates
  type: LocationType
  safetyRating: number // 0-100
  description: string
  facilities: Facility[]
  notableFeatures: string[]
  elevation: number // in feet (for heuristic calculations)
}

export interface Coordinates {
  x: number // Map coordinate (0-100)
  y: number // Map coordinate (0-100)
}

export type Region =
  | 'Shire'
  | 'Eriador'
  | 'Rivendell'
  | 'Lothlórien'
  | 'Misty Mountains'
  | 'Rohan'
  | 'Gondor'
  | 'Mordor'

export type LocationType = 'City' | 'Village' | 'Fortress' | 'Ruin' | 'Landmark' | 'Danger Zone'

export type Facility = 'Inn' | 'Stables' | 'Market' | 'Healer' | 'Armory' | 'Port'

// Graph edge representing connection between locations
export interface LocationConnection {
  from: string // location id
  to: string // location id
  distance: number // in miles
  terrain: Terrain
  baseDangerLevel: number // 0-100
  bidirectional: boolean // can travel both ways
}

export interface Route {
  id: string
  from: Location
  to: Location
  path: Location[] // ordered array of locations in route
  totalDistance: number // in miles
  estimatedTravelTime: number // in days
  pathType: PathType
  dangerLevel: DangerLevel
  terrainBreakdown: TerrainSegment[]
  waypoints: Waypoint[]
  recommendations: string[]
  warnings: string[]
  estimatedCost: number // in silver pieces
}

export type PathType = 'Direct' | 'Safest' | 'Fastest' | 'Scenic'

export type DangerLevel = 'Safe' | 'Low Risk' | 'Moderate' | 'Dangerous' | 'Deadly'

export type Terrain = 'Road' | 'Forest' | 'Mountain' | 'River' | 'Plains' | 'Swamp' | 'Underground'

export interface TerrainSegment {
  from: Location
  to: Location
  terrain: Terrain
  distance: number
  estimatedDays: number
}

export interface Waypoint {
  location: Location
  dayNumber: number
  description: string
  restRecommended: boolean
  facilities: Facility[]
}

// A* Pathfinding types
export interface PathNode {
  location: Location
  gCost: number // Cost from start to this node
  hCost: number // Heuristic cost to goal
  fCost: number // gCost + hCost
  parent: PathNode | null
}

export interface PathfindingOptions {
  prioritizeSafety: boolean
  avoidTerrain?: Terrain[]
  maxDangerLevel?: number
  preferRoads: boolean
}
