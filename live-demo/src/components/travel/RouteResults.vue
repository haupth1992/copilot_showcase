<script setup lang="ts">
import type { Route } from '@/types/travel'
import DangerMeter from './DangerMeter.vue'

interface Props {
  route: Route
}

defineProps<Props>()

function toLeagues(miles: number): string {
  return (miles / 3).toFixed(1)
}
</script>

<template>
  <div class="route-results">
    <div class="results-header">
      <h3 class="results-title">
        {{ route.from.name }} → {{ route.to.name }}
        <span class="path-type-badge">{{ route.pathType }}</span>
      </h3>
    </div>

    <!-- Key stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{{ route.totalDistance }}</span>
        <span class="stat-label">miles ({{ toLeagues(route.totalDistance) }} leagues)</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ route.estimatedTravelTime }}</span>
        <span class="stat-label">days travel</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ route.estimatedCost }} 🪙</span>
        <span class="stat-label">silver pieces</span>
      </div>
    </div>

    <!-- Danger meter -->
    <div class="section">
      <h4 class="section-title">Danger Level</h4>
      <DangerMeter :level="route.dangerLevel" />
    </div>

    <!-- Path -->
    <div class="section">
      <h4 class="section-title">Route Path</h4>
      <ol class="path-list">
        <li v-for="(loc, idx) in route.path" :key="loc.id" class="path-step">
          <span class="step-num">{{ idx + 1 }}</span>
          <span class="step-name">{{ loc.name }}</span>
          <span class="step-region">{{ loc.region }}</span>
        </li>
      </ol>
    </div>

    <!-- Terrain breakdown -->
    <div class="section">
      <h4 class="section-title">Terrain Breakdown</h4>
      <ul class="terrain-list">
        <li v-for="seg in route.terrainBreakdown" :key="`${seg.from.id}-${seg.to.id}`" class="terrain-seg">
          <span class="seg-route">{{ seg.from.name }} → {{ seg.to.name }}</span>
          <span class="seg-terrain">{{ seg.terrain }}</span>
          <span class="seg-details">{{ seg.distance }} mi · {{ seg.estimatedDays }}d</span>
        </li>
      </ul>
    </div>

    <!-- Warnings -->
    <div v-if="route.warnings.length" class="section warnings-section">
      <h4 class="section-title">⚠️ Warnings</h4>
      <ul class="message-list">
        <li v-for="(warn, i) in route.warnings" :key="i" class="warning-item">{{ warn }}</li>
      </ul>
    </div>

    <!-- Recommendations -->
    <div v-if="route.recommendations.length" class="section">
      <h4 class="section-title">💡 Recommendations</h4>
      <ul class="message-list">
        <li v-for="(rec, i) in route.recommendations" :key="i" class="rec-item">{{ rec }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.route-results {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.results-header {
  border-bottom: 2px solid var(--color-parchment);
  padding-bottom: var(--spacing-md);
}

.results-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.path-type-badge {
  background: var(--color-shire-green);
  color: white;
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  background: var(--color-parchment);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.path-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.path-step {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-parchment);
  border-radius: var(--radius-sm);
}

.step-num {
  background: var(--color-shire-green);
  color: white;
  width: 22px;
  height: 22px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.step-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-brown);
}

.step-region {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin-left: auto;
}

.terrain-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.terrain-seg {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-parchment);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  align-items: center;
}

.seg-terrain {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.seg-details {
  color: var(--color-text-light);
  font-size: var(--font-size-xs);
  white-space: nowrap;
}

.message-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.warning-item {
  padding: var(--spacing-xs) var(--spacing-md);
  background: #fff3e0;
  border-left: 3px solid var(--color-warning);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}

.rec-item {
  padding: var(--spacing-xs) var(--spacing-md);
  background: #e8f5e9;
  border-left: 3px solid var(--color-success);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}
</style>
