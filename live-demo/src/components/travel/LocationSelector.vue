<script setup lang="ts">
import { computed } from 'vue'
import { LOCATIONS } from '@/data/locations'

interface Props {
  modelValue: string
  label: string
  excludeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  excludeId: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const options = computed(() =>
  LOCATIONS.filter((l) => l.id !== props.excludeId),
)

const selected = computed(() =>
  LOCATIONS.find((l) => l.id === props.modelValue) ?? null,
)

function onSelect(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}

function safetyClass(rating: number): string {
  if (rating >= 80) return 'safe'
  if (rating >= 50) return 'moderate'
  if (rating >= 30) return 'dangerous'
  return 'deadly'
}

function safetyLabel(rating: number): string {
  if (rating >= 80) return '🟢'
  if (rating >= 50) return '🟡'
  if (rating >= 30) return '🟠'
  return '🔴'
}
</script>

<template>
  <div class="location-selector">
    <label class="selector-label" :for="`loc-${label}`">{{ label }}</label>
    <select
      :id="`loc-${label}`"
      class="selector-select"
      :value="modelValue"
      aria-label="Select location"
      @change="onSelect"
    >
      <option value="" disabled>Choose a location…</option>
      <option v-for="loc in options" :key="loc.id" :value="loc.id">
        {{ safetyLabel(loc.safetyRating) }} {{ loc.name }} ({{ loc.region }})
      </option>
    </select>

    <div v-if="selected" class="location-preview">
      <div class="preview-header">
        <span class="preview-name">{{ selected.name }}</span>
        <span :class="['safety-badge', safetyClass(selected.safetyRating)]">
          Safety {{ selected.safetyRating }}/100
        </span>
      </div>
      <p class="preview-desc">{{ selected.description }}</p>
      <div v-if="selected.facilities.length" class="preview-facilities">
        <span
          v-for="facility in selected.facilities"
          :key="facility"
          class="facility-tag"
        >{{ facility }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.location-selector {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.selector-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.selector-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: white;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.selector-select:focus {
  outline: none;
  border-color: var(--color-shire-green);
}

.location-preview {
  background: var(--color-parchment);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.preview-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
}

.safety-badge {
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}

.safety-badge.safe { background: #d4edda; color: #155724; }
.safety-badge.moderate { background: #fff3cd; color: #856404; }
.safety-badge.dangerous { background: #ffe0b2; color: #e65100; }
.safety-badge.deadly { background: #ffcdd2; color: #b71c1c; }

.preview-desc {
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
}

.preview-facilities {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.facility-tag {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 2px var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
}
</style>
