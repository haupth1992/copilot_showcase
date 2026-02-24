/**
 * Utility functions for searching, filtering, and sorting the injury database.
 * Extracted for testability and reuse.
 */

import { SEVERITY_RANK, type CulturalOrigin, type Injury, type InjurySeverity, type SortField } from '@/data/injuries'

/**
 * Filter injuries by a freetext search query.
 * Matches against name, cause, and required herbs.
 */
export function searchInjuries(injuries: Injury[], query: string): Injury[] {
  const q = query.trim().toLowerCase()
  if (!q) return injuries
  return injuries.filter(
    (injury) =>
      injury.name.toLowerCase().includes(q) ||
      injury.cause.toLowerCase().includes(q) ||
      injury.requiredHerbs.some((h) => h.toLowerCase().includes(q)) ||
      injury.symptoms.some((s) => s.toLowerCase().includes(q)),
  )
}

/**
 * Filter injuries by severity. Pass `'all'` to skip severity filtering.
 */
export function filterBySeverity(
  injuries: Injury[],
  severity: InjurySeverity | 'all',
): Injury[] {
  if (severity === 'all') return injuries
  return injuries.filter((i) => i.severity === severity)
}

/**
 * Filter injuries by cultural origin. Pass `'all'` to skip origin filtering.
 */
export function filterByCulture(
  injuries: Injury[],
  culture: CulturalOrigin | 'all',
): Injury[] {
  if (culture === 'all') return injuries
  return injuries.filter((i) => i.culturalOrigin === culture)
}

/**
 * Sort injuries by a given field.
 * Severity sorts worst-first (critical → mild).
 * Name sorts A–Z.
 * HealingTime sorts fastest-first (fewest days).
 * Effectiveness sorts highest-first.
 */
export function sortInjuries(injuries: Injury[], sortBy: SortField): Injury[] {
  const sorted = [...injuries]
  switch (sortBy) {
    case 'severity':
      return sorted.sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity])
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'healingTime':
      return sorted.sort((a, b) => a.healingDays - b.healingDays)
    case 'effectiveness':
      return sorted.sort((a, b) => b.effectiveness - a.effectiveness)
    default:
      return sorted
  }
}

/**
 * Apply all active filters + sort in one pass.
 */
export function applyFilters(
  injuries: Injury[],
  options: {
    query: string
    severity: InjurySeverity | 'all'
    culture: CulturalOrigin | 'all'
    sortBy: SortField
  },
): Injury[] {
  let result = searchInjuries(injuries, options.query)
  result = filterBySeverity(result, options.severity)
  result = filterByCulture(result, options.culture)
  result = sortInjuries(result, options.sortBy)
  return result
}
