<script setup lang="ts">
interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  description: string
  specialty: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'brodo',
    name: 'Brodo Swaggins',
    role: 'Junior Vibe Coder',
    avatar: '/brodo_swaggins.png',
    description: 'Fresh out of the Shire with maximum swagger and minimal experience. Brings the vibes while learning the ropes.',
    specialty: 'Asking Questions, GitHub Copilot, Coffee Brewing, Meme Creation'
  },
  {
    id: 'samwise',
    name: 'Samwise Damn G',
    role: 'DevOps Engineer',
    avatar: '/samwise.png',
    description: 'Never leaves a fellow developer stranded. Expert in CI/CD pipelines and potato cultivation.',
    specialty: 'Docker, Kubernetes, Lembas Bread Optimization'
  },
  {
    id: 'gandalf',
    name: 'Gandalf the Lit',
    role: 'Tech Lead & Architect',
    avatar: '/gandalf_the_lit.jpeg',
    description: 'A wizard is never late with code reviews, nor is he early. He merges precisely when he means to.',
    specialty: 'System Architecture, Mentoring, Debugging Dark Magic'
  },
  {
    id: 'legolas',
    name: 'Swagolas',
    role: 'QA',
    avatar: '/swagolas.jpg',
    description: 'Sharp eye that never misses a bug. Breaks things so users don\'t have to. Master of edge cases.',
    specialty: 'Test Automation, Bug Hunting, Playwright, Breaking Things Gracefully'
  },
  {
    id: 'gimli',
    name: 'Gimli "Gem-Beard"',
    role: 'Full-Stack Dev',
    avatar: '/gimli.jpeg',
    description: 'And my axe! ...and my frontend, and my backend. Crafts features from database to UI with legendary skill.',
    specialty: 'Vue.js, Node.js, PostgreSQL, RESTful APIs, End-to-End Development'
  },
  {
    id: 'aragorn',
    name: 'Aragold',
    role: 'Product Owner',
    avatar: '/aragold.jfif',
    description: 'The ranger who became king of the product roadmap. Leads the team through the wilderness of stakeholder requirements.',
    specialty: 'Roadmap Planning, Stakeholder Management, Backlog Grooming, Agile Ceremonies'
  }
]
</script>

<template>
  <div class="fellowship-view">
    <!-- Hero Section with Header Image -->
    <section class="fellowship-hero">
      <div class="hero-overlay">
        <div class="container">
          <h1 class="page-title">The Fellowship of the Bling</h1>
          <p class="page-subtitle">
            Not all those who code are lost
          </p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <h2 class="section-title">About Our Fellowship</h2>

          <div class="bling-info">
            <div class="bling-icon">💍✨</div>
            <p class="intro-text">
              We are the <strong>Fellowship of the Bling</strong> – a legendary crew of developers,
              designers, and digital adventurers who embarked on an epic quest to build the most swaggin'
              survival kit in all of Middle-Earth.
            </p>
          </div>

          <div class="mission-statement">
            <h3 class="subsection-title">Our Quest</h3>
            <p>
              Born from the fires of Mount Doom (and late-night coding sessions), our fellowship was
              assembled to create tools that no hobbit should venture beyond the Shire without. From
              calculating Lembas bread portions to detecting the influence of the One Ring, we've got
              your back on every adventure.
            </p>

            <h3 class="subsection-title">Why "Bling"?</h3>
            <p>
              While Frodo's fellowship carried the burden of the One Ring, we carry the swagger of
              modern web development. Our "bling" isn't just about flashy gold rings – it's about
              crafting experiences that shine, code that sparkles, and tools that dazzle. We're here
              to prove that even in the darkest dungeons (or debugging sessions), style matters.
            </p>

            <h3 class="subsection-title">Our Values</h3>
            <ul class="values-list">
              <li><strong>🎯 Second Breakfast First:</strong> We believe in work-life balance and never skip meals</li>
              <li><strong>🤝 No Hobbit Left Behind:</strong> We support each other through every Git merge conflict</li>
              <li><strong>✨ Swag Over Everything:</strong> If it doesn't look good, it doesn't go out</li>
              <li><strong>🛡️ One Code to Rule Them All:</strong> We write clean, maintainable, legendary code</li>
              <li><strong>🌟 Share the Load:</strong> Open source, open hearts, open source code reviews</li>
            </ul>
          </div>

          <div class="tech-stack-info">
            <h3 class="subsection-title">Our Arsenal</h3>
            <p>
              Forged in the fires of modern web development, our survival kit is built with:
            </p>
            <div class="tech-badges">
              <span class="tech-badge">Vue 3</span>
              <span class="tech-badge">TypeScript</span>
              <span class="tech-badge">Pinia</span>
              <span class="tech-badge">Vue Router</span>
              <span class="tech-badge">Vite</span>
              <span class="tech-badge">Vitest</span>
              <span class="tech-badge">Playwright</span>
              <span class="tech-badge">GitHub Copilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">Meet the Fellowship</h2>
        <p class="section-subtitle">
          The brave souls behind the code
        </p>

        <div class="team-grid">
          <article
            v-for="member in teamMembers"
            :key="member.id"
            class="team-card"
          >
            <div class="member-avatar">
              <img
                v-if="member.avatar.startsWith('/')"
                :src="member.avatar"
                :alt="member.name"
                :class="['avatar-img', { 'avatar-img-samwise': member.id === 'samwise' }]"
              />
              <span v-else class="avatar-emoji">{{ member.avatar }}</span>
            </div>
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-description">{{ member.description }}</p>
            <div class="member-specialty">
              <strong>Specialties:</strong> {{ member.specialty }}
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Join the Adventure</h2>
          <p class="cta-text">
            "The road goes ever on and on, down from the door where it began. Now far ahead the road has gone,
            and I must follow, if I can."
          </p>
          <p class="cta-subtext">— Bilbo Baggins</p>
          <router-link to="/" class="cta-button">
            Back to Survival Kit
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section with Header Image */
.fellowship-hero {
  background-color: var(--color-dark-brown);
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url('/header_img.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
}

.hero-overlay {
  width: 100%;
  padding: var(--spacing-2xl) 0;
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  color: var(--color-ring-gold);
}

.page-subtitle {
  font-size: var(--font-size-xl);
  font-style: italic;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* About Section */
.about-section {
  padding: var(--spacing-2xl) 0;
  background: white;
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-subtitle {
  text-align: center;
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  margin-bottom: var(--spacing-2xl);
}

.bling-info {
  display: flex;
  align-items: start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-ring-gold) 0%, #e6c200 100%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.bling-icon {
  font-size: 3rem;
  line-height: 1;
  flex-shrink: 0;
}

.intro-text {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--color-dark-brown);
  margin: 0;
}

.mission-statement {
  margin-bottom: var(--spacing-2xl);
}

.subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-shire-green);
  margin: var(--spacing-xl) 0 var(--spacing-md);
}

.mission-statement p {
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
}

.values-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0;
}

.values-list li {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  background: var(--color-parchment);
  border-left: 4px solid var(--color-shire-green);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.tech-stack-info {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-parchment);
  border-radius: var(--radius-lg);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.tech-badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-shire-green);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
}

/* Team Section */
.team-section {
  padding: var(--spacing-2xl) 0;
  background: linear-gradient(to bottom, white 0%, var(--color-parchment) 100%);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.team-card {
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

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-ring-gold);
}

.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  border: 3px solid var(--color-ring-gold);
  overflow: hidden;
  background: var(--color-parchment);
  box-shadow: var(--shadow-md);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-img-samwise {
  object-position: 0% 0%;
}

.avatar-emoji {
  font-size: 3rem;
  line-height: 1;
}

.member-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-brown);
  margin-bottom: var(--spacing-xs);
}

.member-role {
  font-size: var(--font-size-sm);
  color: var(--color-shire-green);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.member-description {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.member-specialty {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  width: 100%;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-2xl) 0;
  background: linear-gradient(135deg, var(--color-shire-green) 0%, #5a7a1f 100%);
  color: white;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  color: var(--color-ring-gold);
}

.cta-text {
  font-size: var(--font-size-lg);
  font-style: italic;
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.cta-subtext {
  font-size: var(--font-size-base);
  opacity: 0.9;
  margin-bottom: var(--spacing-xl);
}

.cta-button {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--color-ring-gold);
  color: var(--color-dark-brown);
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-lg);
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-xl);
  background: #ffd700;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-3xl);
  }

  .page-subtitle {
    font-size: var(--font-size-lg);
  }

  .fellowship-hero {
    min-height: 300px;
  }

  .bling-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
