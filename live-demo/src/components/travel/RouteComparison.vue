<script setup lang="ts">
import type { Route, PathType, DangerLevel } from '@/types/travel'
import DangerMeter from './DangerMeter.vue'

interface Props {
  routes: Route[]
}

defineProps<Props>()

const emit = defineEmits<{
  select: [pathType: PathType]
}>()

const pathTypeOrder: PathType[] = ['Direct', 'Safest', 'Fastest', 'Scenic']

const pathTypeIcons: Record<PathType, string> = {
  Direct: '📍',
  Safest: '🛡️',
  Fastest: '⚡',
  Scenic: '🌄',
}

function bestValue(routes: Route[], key: 'totalDistance' | 'estimatedTravelTime' | 'estimatedCost' | 'dangerLevel'): string {
  if (key === 'dangerLevel') {
    const order: DangerLevel[] = ['Safe', 'Low Risk', 'Moderate', 'Dangerous', 'Deadly']
    const min = Math.min(...routes.map((r) => order.indexOf(r.dangerLevel)))
    return routes[routes.findIndex((r) => order.indexOf(r.dangerLevel) === min)]?.pathType ?? ''
  }
  const values = routes.map((r) => r[key] as number)
  const minVal = Math.min(...values)
  return routes[values.indexOf(minVal)]?.pathType ?? ''
}
</script>

<template>
  <div class="route-comparison" role="table" aria-label="Route comparison">
    <!-- Header row -->
    <div class="comparison-grid comparison-header" role="row">
      <div class="comp-cell label-cell" role="columnheader">Metric</div>
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        class="comp-cell header-cell"
        role="columnheader"
      >
        <span class="pt-icon">{{ pathTypeIcons[pt] }}</span>
        <span class="pt-label">{{ pt }}</span>
      </div>
    </div>

    <!-- Distance row -->
    <div class="comparison-grid" role="row">
      <div class="comp-cell label-cell" role="rowheader">Distance</div>
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        :class="['comp-cell', 'value-cell', { best: bestValue(routes, 'totalDistance') === pt }]"
        role="cell"
      >
        <template v-if="routes.find((r) => r.pathType === pt)">
          {{ routes.find((r) => r.pathType === pt)!.totalDistance }} mi
          <span v-if="bestValue(routes, 'totalDistance') === pt" class="best-badge">Best</span>
        </template>
        <span v-else class="na">N/A</span>
      </div>
    </div>

    <!-- Travel time row -->
    <div class="comparison-grid" role="row">
      <div class="comp-cell label-cell" role="rowheader">Travel Time</div>
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        :class="['comp-cell', 'value-cell', { best: bestValue(routes, 'estimatedTravelTime') === pt }]"
        role="cell"
      >
        <template v-if="routes.find((r) => r.pathType === pt)">
          {{ routes.find((r) => r.pathType === pt)!.estimatedTravelTime }} days
          <span v-if="bestValue(routes, 'estimatedTravelTime') === pt" class="best-badge">Best</span>
        </template>
        <span v-else class="na">N/A</span>
      </div>
    </div>

    <!-- Cost row -->
    <div class="comparison-grid" role="row">
      <div class="comp-cell label-cell" role="rowheader">Cost</div>
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        :class="['comp-cell', 'value-cell', { best: bestValue(routes, 'estimatedCost') === pt }]"
        role="cell"
      >
        <template v-if="routes.find((r) => r.pathType === pt)">
          {{ routes.find((r) => r.pathType === pt)!.estimatedCost }} 🪙
          <span v-if="bestValue(routes, 'estimatedCost') === pt" class="best-badge">Best</span>
        </template>
        <span v-else class="na">N/A</span>
      </div>
    </div>

    <!-- Danger row -->
    <div class="comparison-grid" role="row">
      <div class="comp-cell label-cell" role="rowheader">Danger</div>
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        :class="['comp-cell', 'value-cell', { best: bestValue(routes, 'dangerLevel') === pt }]"
        role="cell"
      >
        <template v-if="routes.find((r) => r.pathType === pt)">
          <DangerMeter :level="routes.find((r) => r.pathType === pt)!.dangerLevel" />
        </template>
        <span v-else class="na">N/A</span>
      </div>
    </div>

    <!-- Select buttons -->
    <div class="comparison-grid" role="row">
      <div class="comp-cell label-cell" role="rowheader" />
      <div
        v-for="pt in pathTypeOrder"
        :key="pt"
        class="comp-cell value-cell"
        role="cell"
      >
        <button
          v-if="routes.find((r) => r.pathType === pt)"
          class="select-btn"
          @click="emit('select', pt)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.route-comparison {
  overflow-x: auto;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 100px repeat(4, 1fr);
  gap: 1px;
  background: var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 1px;
}

.comp-cell {
  background: white;
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  text-align: center;
}

.comparison-header .comp-cell {
  background: var(--color-parchment);
}

.label-cell {
  background: var(--color-parchment) !important;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
  align-items: flex-start;
}

.header-cell {
  flex-direction: column;
}

.pt-icon {
  font-size: 1.25rem;
}

.pt-label {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}

.value-cell {
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}

.value-cell.best {
  background: #f0f5e0;
}

.best-badge {
  background: var(--color-shire-green);
  color: white;
  padding: 1px var(--spacing-xs);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
}

.na {
  color: var(--color-text-light);
  font-style: italic;
}

.select-btn {
  background: var(--color-shire-green);
  color: white;
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.select-btn:hover {
  background: #5a7a1f;
}
</style>
