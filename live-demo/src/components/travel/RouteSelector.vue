<script setup lang="ts">
import type { PathType } from '@/types/travel'

interface RouteOption {
  type: PathType
  icon: string
  label: string
  description: string
}

interface Props {
  modelValue: PathType
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: PathType]
}>()

const routeOptions: RouteOption[] = [
  {
    type: 'Direct',
    icon: '📍',
    label: 'Direct',
    description: 'Shortest path by distance',
  },
  {
    type: 'Safest',
    icon: '🛡️',
    label: 'Safest',
    description: 'Avoids danger zones (max danger 50)',
  },
  {
    type: 'Fastest',
    icon: '⚡',
    label: 'Fastest',
    description: 'Prefers roads, optimises for speed',
  },
  {
    type: 'Scenic',
    icon: '🌄',
    label: 'Scenic',
    description: 'Avoids underground & swamps',
  },
]
</script>

<template>
  <div class="route-selector" role="group" aria-label="Select route type">
    <div
      v-for="option in routeOptions"
      :key="option.type"
      :class="['route-option', { active: modelValue === option.type }]"
      role="radio"
      :aria-checked="modelValue === option.type"
      tabindex="0"
      @click="emit('update:modelValue', option.type)"
      @keydown.enter.space="emit('update:modelValue', option.type)"
    >
      <span class="option-icon">{{ option.icon }}</span>
      <span class="option-label">{{ option.label }}</span>
      <span class="option-desc">{{ option.description }}</span>
    </div>
  </div>
</template>

<style scoped>
.route-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

@media (min-width: 600px) {
  .route-selector {
    grid-template-columns: repeat(4, 1fr);
  }
}

.route-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: white;
  cursor: pointer;
  text-align: center;
  transition: all var(--transition-fast);
}

.route-option:hover {
  border-color: var(--color-shire-green);
  background: var(--color-parchment);
}

.route-option.active {
  border-color: var(--color-shire-green);
  background: #f0f5e0;
}

.option-icon {
  font-size: 1.5rem;
}

.option-label {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}

.option-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  line-height: 1.4;
}
</style>
