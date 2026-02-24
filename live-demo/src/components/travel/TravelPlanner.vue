<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PathType, Route } from '@/types/travel'
import { LOCATIONS } from '@/data/locations'
import { calculateRoute } from '@/utils/routeCalculations'
import LocationSelector from './LocationSelector.vue'
import RouteSelector from './RouteSelector.vue'
import RouteResults from './RouteResults.vue'
import DangerMeter from './DangerMeter.vue'
import TravelTimeline from './TravelTimeline.vue'
import RouteComparison from './RouteComparison.vue'

const fromId = ref('')
const toId = ref('')
const selectedPathType = ref<PathType>('Direct')
const isLoading = ref(false)
const error = ref('')

const activeRoute = ref<Route | null>(null)
const allRoutes = ref<Route[]>([])
const showComparison = ref(false)
const showTimeline = ref(false)

// Popular destination quick picks
const popularDestinations = [
  { from: 'hobbiton', to: 'rivendell', label: 'Hobbiton → Rivendell' },
  { from: 'hobbiton', to: 'mount-doom', label: 'Hobbiton → Mount Doom' },
  { from: 'rivendell', to: 'minas-tirith', label: 'Rivendell → Minas Tirith' },
]

const canCalculate = computed(() => fromId.value && toId.value && fromId.value !== toId.value)

function quickSelect(from: string, to: string) {
  fromId.value = from
  toId.value = to
}

function randomDestination() {
  const ids = LOCATIONS.map((l) => l.id)
  const from = ids[Math.floor(Math.random() * ids.length)] ?? ids[0]!
  let to = ids[Math.floor(Math.random() * ids.length)] ?? ids[1]!
  while (to === from) {
    to = ids[Math.floor(Math.random() * ids.length)] ?? ids[1]!
  }
  fromId.value = from
  toId.value = to
}

function planRoute() {
  if (!canCalculate.value) return
  error.value = ''
  isLoading.value = true

  try {
    const route = calculateRoute(fromId.value, toId.value, selectedPathType.value)
    activeRoute.value = route
    showComparison.value = false
    showTimeline.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Could not calculate route.'
    activeRoute.value = null
  } finally {
    isLoading.value = false
  }
}

function compareAllRoutes() {
  if (!canCalculate.value) return
  error.value = ''
  isLoading.value = true
  allRoutes.value = []

  const pathTypes: PathType[] = ['Direct', 'Safest', 'Fastest', 'Scenic']
  const results: Route[] = []

  for (const pt of pathTypes) {
    try {
      results.push(calculateRoute(fromId.value, toId.value, pt))
    } catch {
      // Some path types may not find a route (e.g. Safest through very dangerous graph)
    }
  }

  allRoutes.value = results
  showComparison.value = true
  isLoading.value = false
}

function selectFromComparison(pathType: PathType) {
  selectedPathType.value = pathType
  const route = allRoutes.value.find((r) => r.pathType === pathType)
  if (route) {
    activeRoute.value = route
    showComparison.value = false
  }
}
</script>

<template>
  <div class="travel-planner">
    <div class="container">
      <!-- Page header -->
      <header class="page-header">
        <h1 class="page-title">🗺️ Middle-Earth Travel Planner</h1>
        <p class="page-subtitle">
          "Not all those who wander are lost… but planning helps!" — Plan safe routes across
          Middle-Earth with A* pathfinding.
        </p>
      </header>

      <!-- Planning form -->
      <section class="planner-form" aria-label="Route planner">
        <div class="selectors-row">
          <LocationSelector v-model="fromId" label="From" :exclude-id="toId" />
          <div class="swap-icon" aria-hidden="true">→</div>
          <LocationSelector v-model="toId" label="To" :exclude-id="fromId" />
        </div>

        <!-- Quick picks -->
        <div class="quick-picks">
          <span class="quick-label">Popular routes:</span>
          <button
            v-for="dest in popularDestinations"
            :key="dest.label"
            class="quick-btn"
            @click="quickSelect(dest.from, dest.to)"
          >
            {{ dest.label }}
          </button>
          <button class="quick-btn random-btn" @click="randomDestination">🎲 Random</button>
        </div>

        <!-- Route type selector -->
        <div class="selector-section">
          <h2 class="selector-heading">Path Strategy</h2>
          <RouteSelector v-model="selectedPathType" />
        </div>

        <!-- Action buttons -->
        <div class="action-row">
          <button
            class="plan-btn primary-btn"
            :disabled="!canCalculate || isLoading"
            @click="planRoute"
          >
            {{ isLoading ? '⏳ Calculating…' : '🗺️ Plan Route' }}
          </button>
          <button
            class="plan-btn secondary-btn"
            :disabled="!canCalculate || isLoading"
            @click="compareAllRoutes"
          >
            📊 Compare All Routes
          </button>
        </div>

        <p v-if="error" class="error-message" role="alert">{{ error }}</p>
      </section>

      <!-- Route comparison -->
      <section v-if="showComparison && allRoutes.length" class="results-section">
        <h2 class="results-heading">Route Comparison</h2>
        <RouteComparison :routes="allRoutes" @select="selectFromComparison" />
      </section>

      <!-- Active route results -->
      <section v-if="activeRoute" class="results-section">
        <div class="results-actions">
          <h2 class="results-heading">Route Details</h2>
          <button class="toggle-btn" @click="showTimeline = !showTimeline">
            {{ showTimeline ? '📋 Hide Timeline' : '📅 Show Timeline' }}
          </button>
        </div>

        <RouteResults :route="activeRoute" />

        <!-- Timeline -->
        <div v-if="showTimeline" class="timeline-section">
          <h3 class="timeline-heading">Journey Timeline</h3>
          <div class="danger-overview">
            <span class="danger-label">Overall Danger:</span>
            <DangerMeter :level="activeRoute.dangerLevel" />
          </div>
          <TravelTimeline :waypoints="activeRoute.waypoints" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.travel-planner {
  min-height: calc(100vh - 200px);
  padding: var(--spacing-2xl) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  font-style: italic;
  max-width: 700px;
  margin: 0 auto;
}

.planner-form {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.selectors-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-md);
  align-items: start;
}

.swap-icon {
  font-size: 1.5rem;
  color: var(--color-text-light);
  padding-top: 2rem;
  text-align: center;
}

.quick-picks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
}

.quick-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
}

.quick-btn {
  background: var(--color-parchment);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-dark-brown);
}

.quick-btn:hover {
  background: var(--color-shire-green);
  color: white;
  border-color: var(--color-shire-green);
}

.random-btn {
  border-color: var(--color-ring-gold);
}

.selector-heading {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.action-row {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.plan-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.primary-btn {
  background: var(--color-shire-green);
  color: white;
}

.primary-btn:hover:not(:disabled) {
  background: #5a7a1f;
  transform: translateY(-1px);
}

.secondary-btn {
  background: var(--color-parchment);
  color: var(--color-dark-brown);
  border: 2px solid var(--color-border);
}

.secondary-btn:hover:not(:disabled) {
  border-color: var(--color-shire-green);
}

.plan-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-mordor-red);
  background: #ffebee;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  border-left: 3px solid var(--color-mordor-red);
}

.results-section {
  margin-bottom: var(--spacing-2xl);
}

.results-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.results-heading {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
}

.toggle-btn {
  background: var(--color-parchment);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-dark-brown);
}

.toggle-btn:hover {
  border-color: var(--color-shire-green);
}

.timeline-section {
  margin-top: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.timeline-heading {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-md);
}

.danger-overview {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-parchment);
  border-radius: var(--radius-md);
}

.danger-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .selectors-row {
    grid-template-columns: 1fr;
  }
  .swap-icon {
    transform: rotate(90deg);
    padding-top: 0;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
