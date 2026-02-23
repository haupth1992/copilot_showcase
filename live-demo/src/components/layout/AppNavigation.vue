<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Define emits for navigation event
const emit = defineEmits<{
  navigate: []
}>()

interface NavItem {
  path: string
  label: string
  icon: string
}

const mainNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/fellowship', label: 'The Fellowship', icon: '💍' }
]

const toolsItems: NavItem[] = [
  { path: '/lembas', label: 'Lembas Calculator', icon: '🍞' },
  { path: '/ring-detector', label: 'Ring Detector', icon: '🔍' },
  { path: '/weapons', label: 'Weapons', icon: '🗡️' },
  { path: '/first-aid', label: 'First Aid', icon: '🌿' },
  { path: '/travel', label: 'Travel Planner', icon: '🗺️' },
  { path: '/pipeweed', label: 'Pipe-Weed Finder', icon: '🍃' }
]

const toolsDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleToolsDropdown = () => {
  toolsDropdownOpen.value = !toolsDropdownOpen.value
}

const closeDropdown = () => {
  toolsDropdownOpen.value = false
}

const handleToolClick = () => {
  closeDropdown()
  emit('navigate')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="app-navigation">
    <ul class="nav-list">
      <!-- Main Navigation Items -->
      <li v-for="item in mainNavItems" :key="item.path" class="nav-item">
        <router-link
          :to="item.path"
          class="nav-link"
          @click="emit('navigate')"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </li>

      <!-- Tools Dropdown -->
      <li class="nav-item dropdown" ref="dropdownRef">
        <button
          class="nav-link dropdown-toggle"
          @click.stop="toggleToolsDropdown"
          :aria-expanded="toolsDropdownOpen"
          aria-haspopup="true"
        >
          <span class="nav-icon">🎒</span>
          <span class="nav-label">Survival Tools</span>
          <span class="dropdown-arrow" :class="{ open: toolsDropdownOpen }">▼</span>
        </button>

        <transition name="dropdown">
          <ul v-if="toolsDropdownOpen" class="dropdown-menu">
            <li v-for="tool in toolsItems" :key="tool.path" class="dropdown-item">
              <router-link
                :to="tool.path"
                class="dropdown-link"
                @click="handleToolClick"
              >
                <span class="nav-icon">{{ tool.icon }}</span>
                <span class="nav-label">{{ tool.label }}</span>
              </router-link>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.app-navigation {
  width: 100%;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--spacing-sm);
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  font-family: inherit;
  transition: all var(--transition-fast);
  white-space: nowrap;
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: var(--color-ring-gold);
  color: var(--color-dark-brown);
  font-weight: var(--font-weight-semibold);
}

.nav-icon {
  font-size: var(--font-size-lg);
  line-height: 1;
}

.nav-label {
  line-height: 1;
}

/* Dropdown Specific Styles */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  position: relative;
}

.dropdown-arrow {
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-xs);
  transition: transform var(--transition-fast);
  line-height: 1;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + var(--spacing-sm));
  left: 0;
  min-width: 220px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  list-style: none;
  margin: 0;
  padding: var(--spacing-sm);
  z-index: 1000;
  border: 2px solid var(--color-ring-gold);
}

.dropdown-item {
  margin: 0;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  color: var(--color-dark-brown);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.dropdown-link:hover {
  background-color: var(--color-parchment);
  transform: translateX(4px);
}

.dropdown-link.router-link-active {
  background-color: var(--color-shire-green);
  color: white;
  font-weight: var(--font-weight-semibold);
}

.dropdown-link .nav-icon {
  font-size: var(--font-size-lg);
}

/* Dropdown Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-base);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile Layout */
@media (max-width: 768px) {
  .nav-list {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-md);
  }

  .nav-icon {
    font-size: var(--font-size-xl);
  }

  .nav-label {
    font-size: var(--font-size-base);
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    margin-left: var(--spacing-lg);
    margin-top: var(--spacing-xs);
  }

  .dropdown-link {
    color: white;
  }

  .dropdown-link:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  .dropdown-link.router-link-active {
    background-color: var(--color-ring-gold);
    color: var(--color-dark-brown);
  }
}
</style>
