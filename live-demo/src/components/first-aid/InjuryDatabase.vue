<script setup lang="ts">
import { computed, ref } from 'vue'
import { INJURIES, type CulturalOrigin, type InjurySeverity, type SortField } from '@/data/injuries'
import { applyFilters } from '@/utils/injuryFilters'
import SearchBar from './SearchBar.vue'
import InjuryCard from './InjuryCard.vue'

// ── Filter / sort state ────────────────────────────────────────────────────
const searchQuery = ref('')
const activeSeverityFilter = ref<InjurySeverity | 'all'>('all')
const activeCultureFilter = ref<CulturalOrigin | 'all'>('all')
const activeSortBy = ref<SortField>('severity')

const expandedInjuryId = ref<string | null>(null)

// ── Derived injury list ────────────────────────────────────────────────────
const filteredInjuries = computed(() =>
  applyFilters(INJURIES, {
    query: searchQuery.value,
    severity: activeSeverityFilter.value,
    culture: activeCultureFilter.value,
    sortBy: activeSortBy.value,
  }),
)

function toggleInjury(id: string): void {
  expandedInjuryId.value = expandedInjuryId.value === id ? null : id
}
</script>

<template>
  <div class="first-aid-view">
    <!-- Hero Section -->
    <section class="first-aid-hero">
      <div class="hero-overlay">
        <div class="container">
          <h1 class="page-title">🌿 Elvish First Aid Guide</h1>
          <p class="page-subtitle">"The hands of the king are the hands of a healer"</p>
        </div>
      </div>
    </section>

    <!-- Search & Filter Bar -->
    <section class="filter-section">
      <div class="container">
        <SearchBar
          :search="searchQuery"
          :severity="activeSeverityFilter"
          :culture="activeCultureFilter"
          :sort-by="activeSortBy"
          @update:search="searchQuery = $event"
          @update:severity="activeSeverityFilter = $event"
          @update:culture="activeCultureFilter = $event"
          @update:sort-by="activeSortBy = $event"
        />
        <p class="results-count">
          {{ filteredInjuries.length }}
          {{ filteredInjuries.length === 1 ? 'injury' : 'injuries' }} found
        </p>
      </div>
    </section>

    <!-- Injury Cards Grid -->
    <section class="injuries-section">
      <div class="container">
        <!-- Empty State -->
        <div v-if="filteredInjuries.length === 0" class="empty-state">
          <div class="empty-icon">🧙</div>
          <h3 class="empty-title">No injuries found</h3>
          <p class="empty-text">
            Even Gandalf couldn't find a match. Try adjusting your search or filters.
          </p>
        </div>

        <div v-else class="injuries-grid">
          <InjuryCard
            v-for="injury in filteredInjuries"
            :key="injury.id"
            :injury="injury"
            :expanded="expandedInjuryId === injury.id"
            @toggle="toggleInjury"
          />
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Stay Safe Out There, Adventurer</h2>
          <p class="cta-text">
            "Not all those who wander are lost — but some really should have packed more athelas."
          </p>
          <router-link to="/" class="cta-button">← Back to Survival Kit</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.first-aid-hero {
  background: linear-gradient(135deg, #2e4a1e 0%, var(--color-shire-green) 100%);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-overlay {
  width: 100%;
  padding: var(--spacing-2xl) 0;
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-ring-gold);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  font-style: italic;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

.filter-section {
  background: var(--color-parchment);
  padding: var(--spacing-xl) 0 var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: var(--shadow-sm);
}

.results-count {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.injuries-section {
  background: white;
  padding: var(--spacing-2xl) 0;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.empty-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.empty-text {
  color: var(--color-text-light);
  font-size: var(--font-size-lg);
}

.injuries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.cta-section {
  background: linear-gradient(135deg, var(--color-shire-green) 0%, #3d5012 100%);
  padding: var(--spacing-2xl) 0;
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-ring-gold);
  margin-bottom: var(--spacing-md);
}

.cta-text {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--color-ring-gold);
  color: var(--color-dark-brown);
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
}

.cta-button:hover {
  background: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-xl);
}

@media (max-width: 768px) {
  .first-aid-hero {
    min-height: 200px;
  }

  .page-title {
    font-size: var(--font-size-3xl);
  }

  .injuries-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
