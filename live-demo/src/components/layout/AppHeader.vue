<script setup lang="ts">
import { ref } from 'vue'
import AppNavigation from './AppNavigation.vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo on the left -->
        <div class="logo-section">
          <router-link to="/" class="logo">
            <img src="/brodo_swaggins.png" alt="Brodo Swaggins" class="logo-avatar" />
            <div class="logo-text">
              <h1 class="logo-title">Brodo Swaggins</h1>
              <p class="logo-subtitle">Middle-Earth Survival Kit</p>
            </div>
          </router-link>
        </div>

        <!-- Navigation on the right -->
        <div class="nav-section">
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <span class="hamburger-icon">☰</span>
          </button>

          <nav class="desktop-nav">
            <AppNavigation />
          </nav>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="mobile-nav">
        <AppNavigation @navigate="mobileMenuOpen = false" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, var(--color-shire-green) 0%, #5a7a1f 100%);
  color: white;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: var(--spacing-md) 0;
  gap: var(--spacing-2xl);
}

.logo-section {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  color: white;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.nav-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.logo-avatar {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-ring-gold);
  object-fit: cover;
  box-shadow: var(--shadow-md);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin: 0;
}

.logo-subtitle {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
  font-weight: var(--font-weight-normal);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: var(--font-size-2xl);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.mobile-menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburger-icon {
  display: block;
  line-height: 1;
}

.desktop-nav {
  display: block;
}

.mobile-nav {
  display: none;
  padding: var(--spacing-lg) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: var(--spacing-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .logo-title {
    font-size: var(--font-size-lg);
  }

  .logo-subtitle {
    font-size: var(--font-size-xs);
  }

  .logo-avatar {
    width: 40px;
    height: 40px;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
