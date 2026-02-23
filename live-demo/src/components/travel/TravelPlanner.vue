<script setup lang="ts">
// Middle-Earth Travel Planner - Coming Soon
</script>

<template>
  <div class="placeholder-view">
    <div class="container">
      <div class="placeholder-content">
        <div class="placeholder-icon">🗺️</div>
        <h1 class="placeholder-title">Middle-Earth Travel Planner</h1>
        <p class="placeholder-description">
          Plan safe routes through Middle-Earth. Calculate travel times, avoid dangerous
          regions, and find the best paths from the Shire to Mordor.
        </p>
        <div class="coming-soon-badge">Coming Soon</div>
        <router-link to="/" class="back-button">
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder-view {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) 0;
}

.placeholder-content {
  text-align: center;
  max-width: 600px;
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.placeholder-icon {
  font-size: 5rem;
  margin-bottom: var(--spacing-lg);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.placeholder-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-md);
}

.placeholder-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
}

.coming-soon-badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-ring-gold);
  color: var(--color-dark-brown);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
}

.back-button {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-shire-green);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.back-button:hover {
  background-color: #5a7a1f;
  transform: scale(1.05);
}
</style>
