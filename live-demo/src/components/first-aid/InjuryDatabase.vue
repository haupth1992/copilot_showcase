<script setup lang="ts">
import { ref, computed } from 'vue'

type InjurySeverity = 'critical' | 'serious' | 'moderate' | 'mild'
type InjuryType = 'dark-magic' | 'combat' | 'creature' | 'fire' | 'poison' | 'environmental'

interface TreatmentStep {
  step: number
  instruction: string
  elvishNote?: string
}

interface Injury {
  id: string
  name: string
  icon: string
  severity: InjurySeverity
  type: InjuryType
  cause: string
  symptoms: string[]
  treatment: TreatmentStep[]
  healingTime: string
  requiredHerbs: string[]
  warningNote?: string
  quote?: string
}

const injuries: Injury[] = [
  {
    id: 'morgul-wound',
    name: 'Morgul Blade Wound',
    icon: '🗡️',
    severity: 'critical',
    type: 'dark-magic',
    cause: 'Struck by an enchanted Nazgûl blade on Weathertop',
    symptoms: [
      'Spreading cold from wound site toward the heart',
      'Gradual fading into the Wraith world — increasing translucency',
      'Extreme pallor, confusion, and fever',
      'Blade fragment visible on X-scroll, migrating toward the heart',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Bind wound immediately with athelas (Kingsfoil) poultice',
        elvishNote: 'Only athelas prepared by the hands of the King holds full healing power',
      },
      { step: 2, instruction: 'Transport patient to Rivendell or an Elvish sanctuary within 72 hours' },
      { step: 3, instruction: 'Administer Elvish medicine as prepared by Lord Elrond himself' },
      { step: 4, instruction: 'Bed rest in the Halls of Rivendell for a minimum of 14 days' },
    ],
    healingTime: '14+ days under Elvish care',
    requiredHerbs: ['Athelas (Kingsfoil)', 'Miruvor cordial'],
    warningNote: 'Requires an Elvish healer or the hands of the King. Do not attempt solo treatment.',
    quote: '"He is passing into the shadow world; he will soon become a wraith." — Glorfindel',
  },
  {
    id: 'shelob-bite',
    name: "Shelob's Spider Bite",
    icon: '🕷️',
    severity: 'critical',
    type: 'poison',
    cause: 'Bitten by Shelob, the Great Spider of Cirith Ungol',
    symptoms: [
      'Immediate paralysis spreading from bite site',
      'Slowed breathing and apparent death-like stillness',
      'Pale, cold skin — vital signs barely detectable',
      'Thick webbing may encase the patient',
    ],
    treatment: [
      { step: 1, instruction: 'Use Sting or another Elvish blade to cut away webbing — it glows near the spider' },
      {
        step: 2,
        instruction: 'Administer Miruvor cordial to the lips immediately',
        elvishNote: "Galadriel's gift — a few drops revive even the gravest cases",
      },
      { step: 3, instruction: 'Apply Phial of Galadriel light to the wound to neutralise dark venom' },
      { step: 4, instruction: 'Keep patient warm and still; paralysis should lift within 2–6 hours' },
    ],
    healingTime: '2–6 hours for initial recovery; full strength returns in 3 days',
    requiredHerbs: ['Miruvor cordial', 'Phial of Galadriel (light therapy)'],
    warningNote: 'Patient may appear dead — do not abandon them. Check for faint heartbeat.',
    quote: '"Do not let him die, and do not abandon him!" — Samwise Gamgee',
  },
  {
    id: 'dragon-fire',
    name: 'Dragon Fire Burn',
    icon: '🔥',
    severity: 'critical',
    type: 'fire',
    cause: "Caught in the full blast of Smaug's fire breath",
    symptoms: [
      'Third-degree burns across large body surface areas',
      'Singed hair and melted armour',
      'Respiratory distress from inhaled smoke and flame',
      'Shock and extreme pain',
    ],
    treatment: [
      { step: 1, instruction: 'Remove the patient from range of the dragon immediately — priority above all else' },
      { step: 2, instruction: 'Cool burns with cold water for 20 minutes; do not use ice' },
      {
        step: 3,
        instruction: 'Apply athelas and aloe vera poultice to burned areas',
        elvishNote: 'Elves of Lothlórien blend athelas with cooling salves for burn treatment',
      },
      { step: 4, instruction: 'Wrap loosely with clean linen; transport to Elvish healer urgently' },
    ],
    healingTime: '4–8 weeks with Elvish healing salves',
    requiredHerbs: ['Athelas (Kingsfoil)', 'Cooling aloe vera salve', 'Elvish burn poultice'],
    warningNote: 'Dragon fire burns deeper than ordinary flame. Standard remedies are insufficient.',
    quote: '"The dwarves that heard the sound fled in terror. Smaug had spoken." — The Hobbit',
  },
  {
    id: 'orc-arrow',
    name: 'Orc Arrow Wound',
    icon: '🏹',
    severity: 'serious',
    type: 'combat',
    cause: 'Struck by a barbed orc arrow in combat',
    symptoms: [
      'Penetrating wound with barbed arrowhead lodged in tissue',
      'Rapid bleeding and bruising around entry point',
      'Possible mild poison from Morgul-tipped variants',
      'Pain on movement of the affected limb',
    ],
    treatment: [
      { step: 1, instruction: 'Stabilise the arrow — do not pull it out in the field' },
      {
        step: 2,
        instruction: 'Pack wound with athelas leaves and apply firm pressure',
        elvishNote: 'Fresh-bruised athelas leaves draw out orc poison effectively',
      },
      { step: 3, instruction: 'Have a healer surgically remove the barbed head under controlled conditions' },
      { step: 4, instruction: 'Wash wound thoroughly and bind with clean linen; monitor for infection' },
    ],
    healingTime: '3–7 days with proper care',
    requiredHerbs: ['Athelas (Kingsfoil)', 'Yarrow for clotting', 'Elvish antiseptic salve'],
    quote: '"He took an arrow in the knee — and still fought on." — Minas Tirith field record',
  },
  {
    id: 'nazgul-terror',
    name: 'Nazgûl Terror Shock',
    icon: '👁️',
    severity: 'serious',
    type: 'dark-magic',
    cause: 'Exposed to the Black Breath of a Ringwraith at close range',
    symptoms: [
      'Profound despair and inability to act or speak',
      'Extreme cold — patient feels the world has ended',
      'Trembling, unresponsive state',
      'Vivid visions of shadow and flame',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Shield the patient from further exposure; face them away from darkness',
        elvishNote: 'Elvish light and song can counteract the Black Breath in early stages',
      },
      { step: 2, instruction: 'Administer warm athelas tea — the scent alone provides significant relief' },
      { step: 3, instruction: 'Speak words of comfort and of the light; silence prolongs the shadow' },
      {
        step: 4,
        instruction: "Seek the hands of the King — only kingsfoil applied by Aragorn fully cures advanced Black Breath",
      },
    ],
    healingTime: '1–3 days for mild exposure; weeks for severe cases',
    requiredHerbs: ['Athelas (Kingsfoil) tea', 'Elvish light source'],
    warningNote: "Severe Black Breath requires King Aragorn's healing touch to fully cure.",
    quote: '"The Houses of Healing. Men said that the hands of the king were the hands of a healer." — ROTK',
  },
  {
    id: 'troll-club',
    name: 'Troll Club Bludgeoning',
    icon: '🪨',
    severity: 'serious',
    type: 'combat',
    cause: 'Struck by a stone or wooden club wielded by a cave troll',
    symptoms: [
      'Multiple fractures and severe blunt force trauma',
      'Deep bruising across the impact zone',
      'Possible internal bleeding',
      'Temporary loss of consciousness',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Assess for spinal injury before moving the patient — move only if in immediate danger',
      },
      {
        step: 2,
        instruction: 'Splint suspected fractures with straight branches and linen bindings',
        elvishNote: 'Dwarven healers recommend immobilising joints above and below the break',
      },
      { step: 3, instruction: 'Apply cold compress to reduce swelling; elevate limb if possible' },
      { step: 4, instruction: 'Transport to the nearest healer on a stretcher — no walking' },
    ],
    healingTime: '4–6 weeks for bone fractures',
    requiredHerbs: ['Willow bark (pain relief)', 'Athelas poultice for bruising', 'Comfrey salve'],
    quote: '"Cave troll!" — Boromir, in the Mines of Moria',
  },
  {
    id: 'warg-bite',
    name: 'Warg Bite',
    icon: '🐺',
    severity: 'moderate',
    type: 'creature',
    cause: "Bitten by a Warg or a Warg-rider's mount",
    symptoms: [
      'Deep puncture wounds from large canine teeth',
      'Significant bleeding and tissue tearing',
      'Risk of infection from warg saliva',
      'Bruising from crushing jaw pressure',
    ],
    treatment: [
      { step: 1, instruction: 'Wash the wound thoroughly with clean water for at least 5 minutes' },
      {
        step: 2,
        instruction: 'Pack with athelas and yarrow leaves, apply firm pressure for 10 minutes',
        elvishNote: 'Warg saliva carries a mild poison — athelas neutralises it within an hour',
      },
      { step: 3, instruction: 'Bind wound firmly; watch for signs of infection over the next 48 hours' },
      { step: 4, instruction: 'Administer willow bark tea for pain and fever management' },
    ],
    healingTime: '5–10 days',
    requiredHerbs: ['Athelas (Kingsfoil)', 'Yarrow (clotting)', 'Willow bark tea'],
    quote: '"Out of the darkness, the shapes of Wargs came bounding." — FOTR',
  },
  {
    id: 'mirkwood-spider',
    name: 'Mirkwood Spider Webbing',
    icon: '🕸️',
    severity: 'moderate',
    type: 'poison',
    cause: 'Ensnared and bitten by lesser spiders of Mirkwood forest',
    symptoms: [
      'Sticky webbing restricting movement',
      'Mild sedative venom causing drowsiness',
      'Small puncture wounds at bite site',
      'Disorientation and mild hallucinations',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Cut webbing with a sharp blade — an Elvish blade is ideal but any sharp edge works',
      },
      {
        step: 2,
        instruction: 'Wash bite sites with fresh water; apply athelas poultice',
        elvishNote: 'Deep Mirkwood athelas is especially potent against spider venom',
      },
      { step: 3, instruction: 'Keep patient awake and moving; do not allow them to sleep for 2 hours' },
      { step: 4, instruction: 'Administer strong tea with honey to counteract the sedative effect' },
    ],
    healingTime: '1–2 days',
    requiredHerbs: ['Athelas poultice', 'Strong tea with honey', 'Fresh stream water'],
    quote: '"Flies and spiders! Flies and spiders! Fry them, and bite them!" — Gollum, Mirkwood region',
  },
  {
    id: 'ent-stomp',
    name: 'Ent-Stomp Crush Injury',
    icon: '🌳',
    severity: 'moderate',
    type: 'environmental',
    cause: 'Accidentally stood on by an Ent during the march on Isengard',
    symptoms: [
      'Compression injuries to feet or lower extremities',
      'Severe bruising and possible hairline fractures',
      'Soil and bark debris embedded in wound',
      'Significant pain and swelling',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Raise a very loud shout to alert the Ent — they are not always aware of small folk',
        elvishNote: "Crying out in Sindarin often gains the Ent's immediate apologetic attention",
      },
      { step: 2, instruction: 'Remove patient from under the Ent carefully; check for continued threat' },
      {
        step: 3,
        instruction: 'Clean debris from wound; apply cold Entwater compress — it has mild healing properties',
      },
      {
        step: 4,
        instruction: 'Splint and elevate; imbibe Ent-draught if available — it aids healing significantly',
      },
    ],
    healingTime: '1–3 weeks; Ent-draught accelerates recovery',
    requiredHerbs: ['Ent-draught (if available)', 'Cold Entwater compress', 'Athelas for bruising'],
    quote: '"Treebeard\'s apologies are almost as long as his strides." — Merry Brandybuck',
  },
  {
    id: 'lembas-overdose',
    name: 'Lembas Overconsumption',
    icon: '🍞',
    severity: 'mild',
    type: 'environmental',
    cause: 'Ate more than three bites of Lembas bread in a single sitting',
    symptoms: [
      'Extreme fullness and inability to move',
      'Drowsiness and mild euphoria',
      'Possible discomfort and bloating',
      'Unyielding good health paradoxically',
    ],
    treatment: [
      { step: 1, instruction: 'Cease all further Lembas consumption immediately' },
      {
        step: 2,
        instruction: 'Lie on the ground and stare at the sky until the sensation passes',
        elvishNote: 'This is by far the most pleasant ailment in all of Middle-Earth',
      },
      { step: 3, instruction: 'Drink plenty of water — Lembas is very dense in the stomach' },
      { step: 4, instruction: 'Wait 2–4 hours; all symptoms resolve without treatment' },
    ],
    healingTime: '2–4 hours of resting comfortably',
    requiredHerbs: ['Water (plain)', 'Fresh air', 'Patience'],
    quote: '"One small bite is enough to fill the stomach of a grown man." — Legolas (the warning everyone ignores)',
  },
]

const searchQuery = ref('')
const activeSeverityFilter = ref<InjurySeverity | 'all'>('all')
const selectedInjuryId = ref<string | null>(null)

const severityOptions: Array<{ value: InjurySeverity | 'all'; label: string }> = [
  { value: 'all', label: 'All Severities' },
  { value: 'critical', label: '💀 Critical' },
  { value: 'serious', label: '⚠️ Serious' },
  { value: 'moderate', label: '🩹 Moderate' },
  { value: 'mild', label: '✅ Mild' },
]

const filteredInjuries = computed(() =>
  injuries.filter((injury) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch =
      !q ||
      injury.name.toLowerCase().includes(q) ||
      injury.cause.toLowerCase().includes(q) ||
      injury.requiredHerbs.some((h) => h.toLowerCase().includes(q))
    const matchesSeverity =
      activeSeverityFilter.value === 'all' || injury.severity === activeSeverityFilter.value
    return matchesSearch && matchesSeverity
  }),
)

function getSeverityColor(severity: InjurySeverity): string {
  const map: Record<InjurySeverity, string> = {
    critical: 'var(--color-mordor-red)',
    serious: 'var(--color-warning)',
    moderate: 'var(--color-info)',
    mild: 'var(--color-success)',
  }
  return map[severity]
}

function toggleInjury(id: string) {
  selectedInjuryId.value = selectedInjuryId.value === id ? null : id
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
        <div class="filter-bar">
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Search injuries, causes, or herbs..."
          />
          <div class="filter-group">
            <button
              v-for="opt in severityOptions"
              :key="opt.value"
              :class="['filter-pill', { active: activeSeverityFilter === opt.value }]"
              @click="activeSeverityFilter = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
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
            Even Gandalf couldn't find a match. Try adjusting your search or filter.
          </p>
        </div>

        <div v-else class="injuries-grid">
          <article
            v-for="injury in filteredInjuries"
            :key="injury.id"
            class="injury-card"
            :class="`severity-${injury.severity}`"
            @click="toggleInjury(injury.id)"
          >
            <!-- Card Header -->
            <div class="injury-header">
              <span class="injury-icon">{{ injury.icon }}</span>
              <span
                class="severity-badge"
                :style="{ backgroundColor: getSeverityColor(injury.severity) }"
              >
                {{ injury.severity }}
              </span>
            </div>

            <h3 class="injury-name">{{ injury.name }}</h3>
            <p class="injury-cause">{{ injury.cause }}</p>

            <div class="injury-meta">
              <span class="meta-label">⏱ {{ injury.healingTime }}</span>
            </div>

            <div class="expand-hint">
              {{ selectedInjuryId === injury.id ? '▲ Hide details' : '▼ Show treatment' }}
            </div>

            <!-- Expandable Detail Panel -->
            <div v-show="selectedInjuryId === injury.id" class="injury-detail">
              <hr class="detail-divider" />

              <h4 class="detail-heading">Symptoms</h4>
              <ul class="symptoms-list">
                <li v-for="sym in injury.symptoms" :key="sym">{{ sym }}</li>
              </ul>

              <h4 class="detail-heading">Treatment Steps</h4>
              <ol class="treatment-steps">
                <li
                  v-for="step in injury.treatment"
                  :key="step.step"
                  class="treatment-step"
                >
                  <p>{{ step.instruction }}</p>
                  <p v-if="step.elvishNote" class="elvish-note">🧝 {{ step.elvishNote }}</p>
                </li>
              </ol>

              <h4 class="detail-heading">Required Herbs &amp; Remedies</h4>
              <div class="herb-badges">
                <span v-for="herb in injury.requiredHerbs" :key="herb" class="herb-badge">
                  🌿 {{ herb }}
                </span>
              </div>

              <div v-if="injury.warningNote" class="warning-callout">
                ⚠️ {{ injury.warningNote }}
              </div>

              <p v-if="injury.quote" class="injury-quote">{{ injury.quote }}</p>
            </div>
          </article>
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
/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Filter Bar
───────────────────────────────────────── */
.filter-section {
  background: var(--color-parchment);
  padding: var(--spacing-xl) 0 var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: var(--shadow-sm);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.search-input {
  flex: 1;
  min-width: 220px;
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

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-pill {
  padding: var(--spacing-sm) var(--spacing-md);
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

.results-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

/* ─────────────────────────────────────────
   Injuries Section
───────────────────────────────────────── */
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

.severity-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  margin-bottom: var(--spacing-sm);
}

.meta-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
}

.expand-hint {
  font-size: var(--font-size-sm);
  color: var(--color-shire-green);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-sm);
}

/* ─────────────────────────────────────────
   Detail Panel
───────────────────────────────────────── */
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

.herb-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.herb-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-shire-green);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
}

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

/* ─────────────────────────────────────────
   CTA Footer
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Responsive
───────────────────────────────────────── */
@media (max-width: 768px) {
  .first-aid-hero {
    min-height: 200px;
  }

  .page-title {
    font-size: var(--font-size-3xl);
  }

  .filter-bar {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .injuries-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
