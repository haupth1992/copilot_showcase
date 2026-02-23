<script setup lang="ts">
const currentYear = new Date().getFullYear()

interface Quote {
  text: string
  author: string
}

// Rotating LOTR quotes
const quotes: Quote[] = [
  { text: "Not all those who wander are lost.", author: "Bilbo Baggins" },
  { text: "Even the smallest person can change the course of the future.", author: "Galadriel" },
  { text: "All we have to decide is what to do with the time that is given us.", author: "Gandalf" },
  { text: "Home is behind, the world ahead.", author: "Bilbo Baggins" },
  { text: "There is some good in this world, and it's worth fighting for.", author: "Samwise Gamgee" }
]

const randomIndex = Math.floor(Math.random() * quotes.length)
const randomQuote: Quote = quotes[randomIndex]!
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="quote-section">
          <blockquote class="quote">
            <p class="quote-text">"{{ randomQuote.text }}"</p>
            <cite class="quote-author">— {{ randomQuote.author }}</cite>
          </blockquote>
        </div>

        <div class="footer-info">
          <p class="copyright">
            © {{ currentYear }} Brodo Swaggins Middle-Earth Survival Kit
          </p>
          <p class="subtitle">
            Built with 💚 for hobbits, by hobbits
          </p>
          <p class="tech-stack">
            Powered by Vue 3, TypeScript & GitHub Copilot
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, var(--color-dark-brown) 0%, #2c1810 100%);
  color: var(--color-parchment);
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  margin-top: auto;
  border-top: 3px solid var(--color-ring-gold);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-lg);
}

.quote-section {
  max-width: 600px;
}

.quote {
  margin: 0;
  font-style: italic;
}

.quote-text {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  color: var(--color-ring-gold);
}

.quote-author {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-elven-silver);
  font-style: normal;
  font-weight: var(--font-weight-medium);
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.copyright {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.subtitle {
  font-size: var(--font-size-sm);
  opacity: 0.8;
  margin: 0;
}

.tech-stack {
  font-size: var(--font-size-xs);
  opacity: 0.6;
  margin: 0;
  font-family: var(--font-mono);
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-footer {
    padding: var(--spacing-xl) 0 var(--spacing-lg);
  }

  .quote-text {
    font-size: var(--font-size-base);
  }
}
</style>
