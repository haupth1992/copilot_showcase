import { INJURIES, SEVERITY_RANK } from '@/data/injuries'
import {
  applyFilters,
  filterByCulture,
  filterBySeverity,
  searchInjuries,
  sortInjuries,
} from '@/utils/injuryFilters'
import { describe, expect, it } from 'vitest'

describe('INJURIES dataset', () => {
  it('contains at least 15 injuries', () => {
    expect(INJURIES.length).toBeGreaterThanOrEqual(15)
  })

  it('every injury has a unique id', () => {
    const ids = INJURIES.map((i) => i.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('every injury has a culturalOrigin field', () => {
    INJURIES.forEach((injury) => {
      expect(injury.culturalOrigin).toBeTruthy()
    })
  })

  it('every injury has an effectiveness value between 0 and 100', () => {
    INJURIES.forEach((injury) => {
      expect(injury.effectiveness).toBeGreaterThanOrEqual(0)
      expect(injury.effectiveness).toBeLessThanOrEqual(100)
    })
  })

  it('every injury has at least one required herb', () => {
    INJURIES.forEach((injury) => {
      expect(injury.requiredHerbs.length).toBeGreaterThan(0)
    })
  })

  it('every injury has healingDays >= 0', () => {
    INJURIES.forEach((injury) => {
      expect(injury.healingDays).toBeGreaterThanOrEqual(0)
    })
  })

  it('SEVERITY_RANK ranks critical as worst (lowest number)', () => {
    expect(SEVERITY_RANK.critical).toBeLessThan(SEVERITY_RANK.serious)
    expect(SEVERITY_RANK.serious).toBeLessThan(SEVERITY_RANK.moderate)
    expect(SEVERITY_RANK.moderate).toBeLessThan(SEVERITY_RANK.mild)
  })
})

describe('searchInjuries', () => {
  it('returns all injuries when query is empty', () => {
    expect(searchInjuries(INJURIES, '')).toHaveLength(INJURIES.length)
  })

  it('finds an injury by exact name', () => {
    const results = searchInjuries(INJURIES, 'Morgul Blade Wound')
    expect(results).toHaveLength(1)
    expect(results[0]!.id).toBe('morgul-wound')
  })

  it('finds injuries by partial name (case insensitive)', () => {
    const results = searchInjuries(INJURIES, 'spider')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((r) => r.id === 'shelob-bite' || r.id === 'mirkwood-spider')).toBe(true)
  })

  it('finds injuries by herb name', () => {
    const results = searchInjuries(INJURIES, 'miruvor')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.requiredHerbs.some((h) => h.toLowerCase().includes('miruvor')))).toBe(true)
  })

  it('finds injuries by symptom text', () => {
    const results = searchInjuries(INJURIES, 'paralysis')
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns empty array when no match', () => {
    expect(searchInjuries(INJURIES, 'balrog sandwich no match xyz')).toHaveLength(0)
  })
})

describe('filterBySeverity', () => {
  it('returns all injuries when severity is "all"', () => {
    expect(filterBySeverity(INJURIES, 'all')).toHaveLength(INJURIES.length)
  })

  it('returns only critical injuries', () => {
    const results = filterBySeverity(INJURIES, 'critical')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.severity === 'critical')).toBe(true)
  })

  it('returns only mild injuries', () => {
    const results = filterBySeverity(INJURIES, 'mild')
    expect(results.every((r) => r.severity === 'mild')).toBe(true)
  })
})

describe('filterByCulture', () => {
  it('returns all injuries when culture is "all"', () => {
    expect(filterByCulture(INJURIES, 'all')).toHaveLength(INJURIES.length)
  })

  it('returns only Elven-origin injuries', () => {
    const results = filterByCulture(INJURIES, 'Elven')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.culturalOrigin === 'Elven')).toBe(true)
  })

  it('returns only Dwarven-origin injuries', () => {
    const results = filterByCulture(INJURIES, 'Dwarven')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.culturalOrigin === 'Dwarven')).toBe(true)
  })
})

describe('sortInjuries', () => {
  it('sorts by severity — critical comes first', () => {
    const sorted = sortInjuries(INJURIES, 'severity')
    expect(sorted[0]!.severity).toBe('critical')
    expect(sorted[sorted.length - 1]!.severity).toBe('mild')
  })

  it('sorts by name A–Z', () => {
    const sorted = sortInjuries(INJURIES, 'name')
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1]!.name.localeCompare(sorted[i]!.name)).toBeLessThanOrEqual(0)
    }
  })

  it('sorts by healingTime — fewest days first', () => {
    const sorted = sortInjuries(INJURIES, 'healingTime')
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1]!.healingDays).toBeLessThanOrEqual(sorted[i]!.healingDays)
    }
  })

  it('sorts by effectiveness — highest first', () => {
    const sorted = sortInjuries(INJURIES, 'effectiveness')
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1]!.effectiveness).toBeGreaterThanOrEqual(sorted[i]!.effectiveness)
    }
  })

  it('does not mutate the original array', () => {
    const original = [...INJURIES]
    sortInjuries(INJURIES, 'name')
    expect(INJURIES[0]!.id).toBe(original[0]!.id)
  })
})

describe('applyFilters', () => {
  it('returns all injuries with default (no-op) filters', () => {
    const result = applyFilters(INJURIES, {
      query: '',
      severity: 'all',
      culture: 'all',
      sortBy: 'severity',
    })
    expect(result).toHaveLength(INJURIES.length)
  })

  it('applies search + severity filter in combination', () => {
    const result = applyFilters(INJURIES, {
      query: 'athelas',
      severity: 'critical',
      culture: 'all',
      sortBy: 'severity',
    })
    expect(result.every((r) => r.severity === 'critical')).toBe(true)
    expect(
      result.every((r) =>
        r.requiredHerbs.some((h) => h.toLowerCase().includes('athelas')) ||
        r.cause.toLowerCase().includes('athelas') ||
        r.name.toLowerCase().includes('athelas'),
      ),
    ).toBe(true)
  })

  it('returns empty array when filters yield no results', () => {
    const result = applyFilters(INJURIES, {
      query: 'xyz no match',
      severity: 'all',
      culture: 'all',
      sortBy: 'name',
    })
    expect(result).toHaveLength(0)
  })
})
