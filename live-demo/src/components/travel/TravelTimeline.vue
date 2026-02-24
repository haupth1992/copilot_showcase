<script setup lang="ts">
import type { Waypoint } from '@/types/travel'

interface Props {
  waypoints: Waypoint[]
}

defineProps<Props>()
</script>

<template>
  <div class="travel-timeline" aria-label="Travel timeline">
    <div
      v-for="(wp, idx) in waypoints"
      :key="wp.location.id"
      class="timeline-item"
    >
      <!-- Connector line -->
      <div class="timeline-connector">
        <div :class="['connector-dot', { 'has-inn': wp.restRecommended }]" />
        <div v-if="idx < waypoints.length - 1" class="connector-line" />
      </div>

      <!-- Content -->
      <div :class="['timeline-content', { 'rest-stop': wp.restRecommended }]">
        <div class="timeline-header">
          <span class="day-badge">Day {{ wp.dayNumber }}</span>
          <span class="location-name">{{ wp.location.name }}</span>
          <span v-if="wp.restRecommended" class="rest-badge">🛏️ Rest</span>
        </div>
        <p class="timeline-desc">{{ wp.description }}</p>
        <div v-if="wp.facilities.length" class="facilities">
          <span
            v-for="fac in wp.facilities"
            :key="fac"
            class="facility-chip"
          >{{ fac }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.travel-timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: var(--spacing-md);
}

.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
}

.connector-dot {
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  background: var(--color-shire-green);
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--color-shire-green);
  flex-shrink: 0;
}

.connector-dot.has-inn {
  background: var(--color-ring-gold);
  box-shadow: 0 0 0 2px var(--color-ring-gold);
}

.connector-line {
  width: 2px;
  flex: 1;
  background: var(--color-border);
  min-height: var(--spacing-xl);
  margin: var(--spacing-xs) 0;
}

.timeline-content {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.timeline-content.rest-stop {
  border-color: var(--color-ring-gold);
  background: #fffef0;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xs);
}

.day-badge {
  background: var(--color-shire-green);
  color: white;
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}

.location-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  font-size: var(--font-size-sm);
}

.rest-badge {
  background: var(--color-ring-gold);
  color: var(--color-dark-brown);
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  margin-left: auto;
}

.timeline-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xs);
}

.facilities {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.facility-chip {
  background: var(--color-parchment);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 1px var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}
</style>
