<script setup lang="ts">
interface Feature {
  id: string
  icon: string
  title: string
  description: string
  path: string
  color: string
}

const features: Feature[] = [
  {
    id: 'lembas',
    icon: '🍞',
    title: 'Lembas Bread Calculator',
    description: 'Calculate how much Lembas bread you need for your journey. One bite can sustain a grown man for a day!',
    path: '/lembas',
    color: 'var(--color-shire-green)'
  },
  {
    id: 'ring',
    icon: '🔍',
    title: 'Ring Detection System',
    description: 'Monitor ring usage and track Nazgûl proximity. Keep an eye on the Eye of Sauron attention meter!',
    path: '/ring-detector',
    color: 'var(--color-ring-gold)'
  },
  {
    id: 'weapons',
    icon: '🗡️',
    title: 'Weapon Proficiency Tracker',
    description: 'Track your combat skills with various Middle-Earth weapons. From Sting to Andúril!',
    path: '/weapons',
    color: 'var(--color-elven-silver)'
  },
  {
    id: 'first-aid',
    icon: '🌿',
    title: 'Elvish First Aid Guide',
    description: 'Treatment guide for common Middle-Earth injuries. From Morgul wounds to spider bites.',
    path: '/first-aid',
    color: '#4caf50'
  },
  {
    id: 'travel',
    icon: '🗺️',
    title: 'Middle-Earth Travel Planner',
    description: 'Plan safe routes through Middle-Earth. Avoid Mordor (unless necessary).',
    path: '/travel',
    color: '#2196f3'
  },
  {
    id: 'pipeweed',
    icon: '🍃',
    title: 'Pipe-Weed Dealer Finder',
    description: 'Find the finest pipe-weed in the Southfarthing. From Longbottom Leaf to Old Toby!',
    path: '/pipeweed',
    color: '#8bc34a'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <img src="/brodo_swaggins.png" alt="Brodo Swaggins" class="hero-avatar" />
          <h1 class="hero-title">
            Brodo Swaggins
          </h1>
          <h2 class="hero-subtitle">Middle-Earth Survival Kit</h2>
          <p class="hero-description">
            Everything a hobbit needs to survive beyond the Shire. Whether you're embarking on an
            unexpected journey or just planning second breakfast, we've got you covered!
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="features-title">Essential Survival Tools</h2>
        <p class="features-subtitle">
          Six essential tools for the modern adventuring hobbit
        </p>

        <div class="features-grid">
          <article
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
          >
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              {{ feature.icon }}
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <router-link :to="feature.path" class="feature-button">
              Explore
              <span class="button-arrow">→</span>
            </router-link>
          </article>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready for Adventure?</h2>
          <p class="cta-text">
            "It's a dangerous business, Brodo, going out your door. You step onto the road,
            and if you don't keep your feet, there's no knowing where you might be swept off to."
          </p>
          <p class="cta-author">— Bilbo Baggins</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--color-shire-green) 0%, #5a7a1f 100%);
  color: white;
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.hero-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  border: 4px solid var(--color-ring-gold);
  object-fit: cover;
  box-shadow: var(--shadow-xl);
  margin-bottom: var(--spacing-lg);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-subtitle {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-lg);
  color: var(--color-ring-gold);
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

/* Features Section */
.features {
  padding: var(--spacing-2xl) 0;
}

.features-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-sm);
}

.features-subtitle {
  font-size: var(--font-size-lg);
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-2xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.feature-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-shire-green);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-md);
}

.feature-description {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  flex-grow: 1;
}

.feature-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-shire-green);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
}

.feature-button:hover {
  background-color: #5a7a1f;
  transform: scale(1.05);
}

.button-arrow {
  transition: transform var(--transition-fast);
}

.feature-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Call to Action Section */
.cta {
  background: linear-gradient(135deg, var(--color-ring-gold) 0%, #e6c200 100%);
  padding: var(--spacing-2xl) 0;
  margin-top: var(--spacing-2xl);
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-lg);
}

.cta-text {
  font-size: var(--font-size-lg);
  font-style: italic;
  color: var(--color-dark-brown);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.cta-author {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .hero-icon {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
  }

  .hero-description {
    font-size: var(--font-size-base);
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .features-title {
    font-size: var(--font-size-2xl);
  }

  .cta-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
