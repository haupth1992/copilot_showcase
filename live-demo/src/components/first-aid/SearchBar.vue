<script setup lang="ts">
import type { CulturalOrigin, InjurySeverity, SortField } from '@/data/injuries'

interface Props {
  search: string
  severity: InjurySeverity | 'all'
  culture: CulturalOrigin | 'all'
  sortBy: SortField
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:severity': [value: InjurySeverity | 'all']
  'update:culture': [value: CulturalOrigin | 'all']
  'update:sortBy': [value: SortField]
}>()

const severityOptions: Array<{ value: InjurySeverity | 'all'; label: string }> = [
  { value: 'all', label: 'All Severities' },
  { value: 'critical', label: '💀 Critical' },
  { value: 'serious', label: '⚠️ Serious' },
  { value: 'moderate', label: '🩹 Moderate' },
  { value: 'mild', label: '✅ Mild' },
]

const cultureOptions: Array<{ value: CulturalOrigin | 'all'; label: string }> = [
  { value: 'all', label: 'All Origins' },
  { value: 'Elven', label: '🧝 Elven' },
  { value: 'Human', label: '🧑 Human' },
  { value: 'Hobbit', label: '🦶 Hobbit' },
  { value: 'Dwarven', label: '⛏️ Dwarven' },
  { value: 'Wizardly', label: '🧙 Wizardly' },
  { value: 'Orcish', label: '🗡️ Orcish' },
]

const sortOptions: Array<{ value: SortField; label: string }> = [
  { value: 'severity', label: 'Severity (worst first)' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'healingTime', label: 'Healing Time (fastest first)' },
  { value: 'effectiveness', label: 'Effectiveness (highest first)' },
]
</script>

<template>
  <div class="search-bar" role="search">
    <!-- Text Search -->
    <input
      :value="props.search"
      class="search-input"
      type="text"
      placeholder="Search injuries, causes, herbs, or symptoms..."
      aria-label="Search injuries"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <!-- Sort Dropdown -->
    <select
      :value="props.sortBy"
      class="sort-select"
      aria-label="Sort injuries by"
      @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortField)"
    >
      <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <!-- Severity Filter Pills -->
    <div class="filter-row" role="group" aria-label="Filter by severity">
      <button
        v-for="opt in severityOptions"
        :key="opt.value"
        :class="['filter-pill', { active: props.severity === opt.value }]"
        :aria-pressed="props.severity === opt.value"
        @click="emit('update:severity', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Cultural Origin Filter Pills -->
    <div class="filter-row" role="group" aria-label="Filter by cultural origin">
      <button
        v-for="opt in cultureOptions"
        :key="opt.value"
        :class="['filter-pill', 'culture-pill', { active: props.culture === opt.value }]"
        :aria-pressed="props.culture === opt.value"
        @click="emit('update:culture', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: white;
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  border-color: var(--color-shire-green);
}

.sort-select {
  align-self: flex-start;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  background: white;
  color: var(--color-text);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.sort-select:focus {
  border-color: var(--color-shire-green);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-pill {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border);
  background: white;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-pill:hover {
  border-color: var(--color-shire-green);
  color: var(--color-shire-green);
}

.filter-pill.active {
  background: var(--color-shire-green);
  border-color: var(--color-shire-green);
  color: white;
}

.culture-pill.active {
  background: var(--color-elven-silver, #7c9a7c);
  border-color: var(--color-elven-silver, #7c9a7c);
}
</style>
