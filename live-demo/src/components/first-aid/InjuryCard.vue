<script setup lang="ts">
import type { Injury } from '@/data/injuries'
import { computed, ref } from 'vue'
import SeverityBadge from './SeverityBadge.vue'

interface Props {
  injury: Injury
  expanded: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ toggle: [id: string] }>()

// ── Ingredient checklist (persisted in localStorage) ───────────────────────

/**
 * Build a storage key for a specific herb on a specific injury.
 */
function herbKey(injuryId: string, herb: string): string {
  return `first-aid:checklist:${injuryId}:${herb}`
}

/**
 * Read checked state for a single herb from localStorage.
 */
function isHerbChecked(injuryId: string, herb: string): boolean {
  return localStorage.getItem(herbKey(injuryId, herb)) === 'true'
}

/**
 * Toggle the checked state of a herb in localStorage.
 * We use a reactive ref map so the template re-renders on change.
 */
const checkedHerbs = ref<Record<string, boolean>>(
  Object.fromEntries(
    props.injury.requiredHerbs.map((herb) => [herb, isHerbChecked(props.injury.id, herb)]),
  ),
)

function toggleHerb(herb: string): void {
  const next = !checkedHerbs.value[herb]
  checkedHerbs.value[herb] = next
  localStorage.setItem(herbKey(props.injury.id, herb), String(next))
}

const allHerbsChecked = computed(() =>
  props.injury.requiredHerbs.every((h) => checkedHerbs.value[h]),
)

// ── Print ──────────────────────────────────────────────────────────────────

/**
 * Set a data attribute on the card element so CSS can target it for printing,
 * then invoke window.print().
 */
function printRemedy(): void {
  window.print()
}
</script>

<template>
  <article
    class="injury-card"
    :class="`severity-${props.injury.severity}`"
    :data-injury-id="props.injury.id"
    @click="emit('toggle', props.injury.id)"
  >
    <!-- Card Header -->
    <div class="injury-header">
      <span class="injury-icon" aria-hidden="true">{{ props.injury.icon }}</span>
      <SeverityBadge :severity="props.injury.severity" />
    </div>

    <h3 class="injury-name">{{ props.injury.name }}</h3>
    <p class="injury-cause">{{ props.injury.cause }}</p>

    <div class="injury-meta">
      <span class="meta-label">⏱ {{ props.injury.healingTime }}</span>
      <span class="meta-label origin-label">{{ props.injury.culturalOrigin }}</span>
      <span class="meta-label effectiveness-label">
        ✨ {{ props.injury.effectiveness }}% effective
      </span>
    </div>

    <div class="expand-hint">
      {{ props.expanded ? '▲ Hide details' : '▼ Show treatment' }}
    </div>

    <!-- Expandable Detail Panel -->
    <div v-show="props.expanded" class="injury-detail" @click.stop>
      <hr class="detail-divider" />

      <!-- Symptoms -->
      <h4 class="detail-heading">Symptoms</h4>
      <ul class="symptoms-list">
        <li v-for="sym in props.injury.symptoms" :key="sym">{{ sym }}</li>
      </ul>

      <!-- Treatment Steps -->
      <h4 class="detail-heading">Treatment Steps</h4>
      <ol class="treatment-steps">
        <li
          v-for="step in props.injury.treatment"
          :key="step.step"
          class="treatment-step"
        >
          <p>{{ step.instruction }}</p>
          <p v-if="step.elvishNote" class="elvish-note">🧝 {{ step.elvishNote }}</p>
        </li>
      </ol>

      <!-- Ingredient Checklist -->
      <h4 class="detail-heading">
        Required Herbs &amp; Remedies
        <span v-if="allHerbsChecked" class="all-checked-badge">✅ All gathered!</span>
      </h4>
      <ul class="herb-checklist">
        <li
          v-for="herb in props.injury.requiredHerbs"
          :key="herb"
          class="herb-item"
          :class="{ checked: checkedHerbs[herb] }"
          @click.stop="toggleHerb(herb)"
        >
          <span class="herb-checkbox" :aria-checked="checkedHerbs[herb]" role="checkbox" tabindex="0" @keydown.space.prevent="toggleHerb(herb)">
            {{ checkedHerbs[herb] ? '☑' : '☐' }}
          </span>
          <span class="herb-name">🌿 {{ herb }}</span>
        </li>
      </ul>

      <!-- Warning & Quote -->
      <div v-if="props.injury.warningNote" class="warning-callout">
        ⚠️ {{ props.injury.warningNote }}
      </div>
      <p v-if="props.injury.quote" class="injury-quote">{{ props.injury.quote }}</p>

      <!-- Print Button -->
      <button class="print-btn" @click.stop="printRemedy">🖨️ Print Remedy</button>
    </div>
  </article>
</template>

<style scoped>
.injury-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  border: 2px solid transparent;
  cursor: pointer;
}

.injury-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-shire-green);
}

.injury-card.severity-critical {
  border-left: 5px solid var(--color-mordor-red);
}
.injury-card.severity-serious {
  border-left: 5px solid var(--color-warning);
}
.injury-card.severity-moderate {
  border-left: 5px solid var(--color-info);
}
.injury-card.severity-mild {
  border-left: 5px solid var(--color-success);
}

.injury-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.injury-icon {
  font-size: 2.5rem;
}

.injury-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.injury-cause {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
}

.injury-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.meta-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
}

.origin-label {
  background: var(--color-parchment);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
}

.effectiveness-label {
  color: var(--color-shire-green);
  font-weight: var(--font-weight-semibold);
}

.expand-hint {
  font-size: var(--font-size-sm);
  color: var(--color-shire-green);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-sm);
}

/* ── Detail Panel ───────────────────────────────────────────────── */
.detail-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-md) 0;
}

.detail-heading {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.all-checked-badge {
  font-size: var(--font-size-xs);
  background: var(--color-success);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  text-transform: none;
  letter-spacing: 0;
}

.symptoms-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.symptoms-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  padding-left: var(--spacing-md);
  position: relative;
}

.symptoms-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-shire-green);
  font-weight: var(--font-weight-bold);
}

.treatment-steps {
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.treatment-step {
  padding: var(--spacing-md);
  background: var(--color-parchment);
  border-left: 4px solid var(--color-shire-green);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  line-height: 1.5;
  counter-increment: step-counter;
  position: relative;
  padding-left: calc(var(--spacing-md) + 1.5rem);
}

.treatment-step::before {
  content: counter(step-counter);
  position: absolute;
  left: var(--spacing-sm);
  top: var(--spacing-md);
  background: var(--color-shire-green);
  color: white;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
}

.elvish-note {
  font-style: italic;
  color: var(--color-text-light);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
}

/* ── Herb Checklist ─────────────────────────────────────────────── */
.herb-checklist {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.herb-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
  user-select: none;
}

.herb-item:hover {
  background: var(--color-parchment);
}

.herb-item.checked .herb-name {
  text-decoration: line-through;
  color: var(--color-text-light);
  opacity: 0.6;
}

.herb-checkbox {
  font-size: 1.2rem;
  color: var(--color-shire-green);
  min-width: 1.4rem;
}

.herb-name {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

/* ── Warning & Quote ────────────────────────────────────────────── */
.warning-callout {
  padding: var(--spacing-md);
  background: rgba(139, 0, 0, 0.07);
  border-left: 4px solid var(--color-mordor-red);
  border-radius: var(--radius-sm);
  color: var(--color-mordor-red);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
}

.injury-quote {
  font-style: italic;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-left: 3px solid var(--color-elven-silver);
}

/* ── Print Button ───────────────────────────────────────────────── */
.print-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-parchment);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.print-btn:hover {
  border-color: var(--color-shire-green);
  color: var(--color-shire-green);
  background: white;
}

/* ── Print Styles ───────────────────────────────────────────────── */
@media print {
  .injury-card:not([data-injury-id]) {
    display: none;
  }

  .print-btn,
  .expand-hint {
    display: none;
  }

  .injury-card {
    box-shadow: none;
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }
}
</style>
