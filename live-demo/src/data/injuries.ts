/**
 * Elvish First Aid Guide — Injury Database
 * Static dataset of Middle-Earth injuries with Elvish remedies.
 * Demonstrates typed static data + search/filter/sort patterns.
 */

export type InjurySeverity = 'critical' | 'serious' | 'moderate' | 'mild'
export type InjuryType = 'dark-magic' | 'combat' | 'creature' | 'fire' | 'poison' | 'environmental'
export type CulturalOrigin = 'Elven' | 'Human' | 'Hobbit' | 'Dwarven' | 'Wizardly' | 'Orcish'
export type SortField = 'severity' | 'name' | 'healingTime' | 'effectiveness'

export interface TreatmentStep {
  step: number
  instruction: string
  elvishNote?: string
}

export interface Injury {
  id: string
  name: string
  icon: string
  severity: InjurySeverity
  type: InjuryType
  culturalOrigin: CulturalOrigin
  cause: string
  symptoms: string[]
  treatment: TreatmentStep[]
  /** Human-readable healing duration, e.g. "3–7 days" */
  healingTime: string
  /** Estimated healing time in days (for sorting) */
  healingDays: number
  requiredHerbs: string[]
  /** Remedy effectiveness 0–100 */
  effectiveness: number
  warningNote?: string
  quote?: string
}

/** Numeric rank for sorting by severity (lower = worse) */
export const SEVERITY_RANK: Record<InjurySeverity, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  mild: 3,
}

export const INJURIES: Injury[] = [
  // ── CRITICAL ─────────────────────────────────────────────────────────────
  {
    id: 'morgul-wound',
    name: 'Morgul Blade Wound',
    icon: '🗡️',
    severity: 'critical',
    type: 'dark-magic',
    culturalOrigin: 'Elven',
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
      {
        step: 2,
        instruction: 'Transport patient to Rivendell or an Elvish sanctuary within 72 hours',
      },
      { step: 3, instruction: 'Administer Elvish medicine as prepared by Lord Elrond himself' },
      {
        step: 4,
        instruction: 'Bed rest in the Halls of Rivendell for a minimum of 14 days',
      },
    ],
    healingTime: '14+ days under Elvish care',
    healingDays: 14,
    requiredHerbs: ['Athelas (Kingsfoil)', 'Miruvor cordial'],
    effectiveness: 95,
    warningNote: 'Requires an Elvish healer or the hands of the King. Do not attempt solo treatment.',
    quote: '"He is passing into the shadow world; he will soon become a wraith." — Glorfindel',
  },
  {
    id: 'shelob-bite',
    name: "Shelob's Spider Bite",
    icon: '🕷️',
    severity: 'critical',
    type: 'poison',
    culturalOrigin: 'Elven',
    cause: 'Bitten by Shelob, the Great Spider of Cirith Ungol',
    symptoms: [
      'Immediate paralysis spreading from bite site',
      'Slowed breathing and apparent death-like stillness',
      'Pale, cold skin — vital signs barely detectable',
      'Thick webbing may encase the patient',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Use Sting or another Elvish blade to cut away webbing — it glows near the spider',
      },
      {
        step: 2,
        instruction: 'Administer Miruvor cordial to the lips immediately',
        elvishNote: "Galadriel's gift — a few drops revive even the gravest cases",
      },
      {
        step: 3,
        instruction: 'Apply Phial of Galadriel light to the wound to neutralise dark venom',
      },
      {
        step: 4,
        instruction: 'Keep patient warm and still; paralysis should lift within 2–6 hours',
      },
    ],
    healingTime: '2–6 hours initial; full recovery 3 days',
    healingDays: 3,
    requiredHerbs: ['Miruvor cordial', 'Phial of Galadriel (light therapy)'],
    effectiveness: 90,
    warningNote: 'Patient may appear dead — do not abandon them. Check for faint heartbeat.',
    quote: '"Do not let him die, and do not abandon him!" — Samwise Gamgee',
  },
  {
    id: 'dragon-fire',
    name: 'Dragon Fire Burn',
    icon: '🔥',
    severity: 'critical',
    type: 'fire',
    culturalOrigin: 'Dwarven',
    cause: "Caught in the full blast of Smaug's fire breath",
    symptoms: [
      'Third-degree burns across large body surface areas',
      'Singed hair and melted armour',
      'Respiratory distress from inhaled smoke and flame',
      'Shock and extreme pain',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Remove the patient from range of the dragon immediately — priority above all else',
      },
      { step: 2, instruction: 'Cool burns with cold water for 20 minutes; do not use ice' },
      {
        step: 3,
        instruction: 'Apply athelas and aloe vera poultice to burned areas',
        elvishNote: 'Elves of Lothlórien blend athelas with cooling salves for burn treatment',
      },
      { step: 4, instruction: 'Wrap loosely with clean linen; transport to Elvish healer urgently' },
    ],
    healingTime: '4–8 weeks with Elvish healing salves',
    healingDays: 42,
    requiredHerbs: ['Athelas (Kingsfoil)', 'Cooling aloe vera salve', 'Elvish burn poultice'],
    effectiveness: 75,
    warningNote: 'Dragon fire burns deeper than ordinary flame. Standard remedies are insufficient.',
    quote: '"The dwarves that heard the sound fled in terror. Smaug had spoken." — The Hobbit',
  },
  {
    id: 'balrog-scorch',
    name: 'Balrog Flame Scorch',
    icon: '🌋',
    severity: 'critical',
    type: 'fire',
    culturalOrigin: 'Wizardly',
    cause: 'Exposed to the fire whip or flame aura of a Balrog of Morgoth',
    symptoms: [
      'Catastrophic full-body burns from supernatural fire',
      'Partial blinding from intense magical light',
      'Loss of consciousness from magical concussive force',
      'Lingering Maia-fire corruption in the wound',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'This requires intervention by Valar or Maiar — no mortal remedy suffices alone',
        elvishNote: 'The Eagles of Manwë may be summoned; their feathers have mild healing properties',
      },
      { step: 2, instruction: 'Apply water from the Silverlode or any Elvish-blessed stream immediately' },
      {
        step: 3,
        instruction: 'Invoke the light of the Valar through prayer; wrap patient in Lórien cloth',
      },
      { step: 4, instruction: 'Transport to Lothlórien or Rivendell at maximum possible speed' },
    ],
    healingTime: '~30 days in divine care (or longer for mortals)',
    healingDays: 30,
    requiredHerbs: ['Silverlode water', 'Lórien healing cloth', 'Miruvor cordial'],
    effectiveness: 60,
    warningNote:
      'Only a Wizard (Istari) has survived direct Balrog combat. Mortals should flee at all costs.',
    quote:
      '"You cannot pass! I am a servant of the Secret Fire, wielder of the flame of Anor." — Gandalf the Grey',
  },
  {
    id: 'fell-beast-talon',
    name: 'Fell Beast Talon Wound',
    icon: '🦅',
    severity: 'critical',
    type: 'creature',
    culturalOrigin: 'Human',
    cause: "Seized and struck by a Nazgûl's fell beast mount",
    symptoms: [
      'Deep puncture wounds from massive talons — possibly through armour',
      'Bone fractures from crushing grip pressure',
      'Dark-magic corruption seeping from a Ringwraith-touched beast',
      'Spreading numbness and Black Shadow creeping from wounds',
    ],
    treatment: [
      {
        step: 1,
        instruction:
          'Cleanse wounds immediately with athelas tea — do not allow them to close untreated',
      },
      {
        step: 2,
        instruction: 'Bind fractures and immobilise; the dark magic must be drawn out by athelas steam',
        elvishNote:
          'The athelas must be crushed and steeped while the healer recites words of the Edain',
      },
      { step: 3, instruction: 'Administer Miruvor to combat the Black Breath component' },
      {
        step: 4,
        instruction: "Seek the King's healing touch — the Black Shadow requires Aragorn's hands",
      },
    ],
    healingTime: '7–21 days depending on Black Shadow severity',
    healingDays: 14,
    requiredHerbs: ['Athelas (Kingsfoil)', 'Miruvor cordial', 'Elvish splinting bark'],
    effectiveness: 80,
    warningNote: 'The Ringwraith aura on the wound causes Black Breath — treat as Morgul wound.',
    quote: '"No man can kill me." — The Witch-King of Angmar (before Éowyn proved otherwise)',
  },
  // ── SERIOUS ──────────────────────────────────────────────────────────────
  {
    id: 'orc-arrow',
    name: 'Orc Arrow Wound',
    icon: '🏹',
    severity: 'serious',
    type: 'combat',
    culturalOrigin: 'Human',
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
      {
        step: 3,
        instruction:
          'Have a healer surgically remove the barbed head under controlled conditions',
      },
      {
        step: 4,
        instruction: 'Wash wound thoroughly and bind with clean linen; monitor for infection',
      },
    ],
    healingTime: '3–7 days with proper care',
    healingDays: 5,
    requiredHerbs: ['Athelas (Kingsfoil)', 'Yarrow for clotting', 'Elvish antiseptic salve'],
    effectiveness: 88,
    quote: '"He took an arrow in the knee — and still fought on." — Minas Tirith field record',
  },
  {
    id: 'nazgul-terror',
    name: 'Nazgûl Terror Shock',
    icon: '👁️',
    severity: 'serious',
    type: 'dark-magic',
    culturalOrigin: 'Elven',
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
        instruction:
          "Seek the hands of the King — only kingsfoil applied by Aragorn fully cures advanced Black Breath",
      },
    ],
    healingTime: '1–3 days for mild exposure; weeks for severe',
    healingDays: 3,
    requiredHerbs: ['Athelas (Kingsfoil) tea', 'Elvish light source'],
    effectiveness: 85,
    warningNote: "Severe Black Breath requires King Aragorn's healing touch to fully cure.",
    quote:
      '"The Houses of Healing. Men said that the hands of the king were the hands of a healer." — ROTK',
  },
  {
    id: 'troll-club',
    name: 'Troll Club Bludgeoning',
    icon: '🪨',
    severity: 'serious',
    type: 'combat',
    culturalOrigin: 'Dwarven',
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
        instruction:
          'Assess for spinal injury before moving the patient — move only if in immediate danger',
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
    healingDays: 35,
    requiredHerbs: ['Willow bark (pain relief)', 'Athelas poultice for bruising', 'Comfrey salve'],
    effectiveness: 82,
    quote: '"Cave troll!" — Boromir, in the Mines of Moria',
  },
  {
    id: 'ringwraith-screech',
    name: 'Ringwraith Screech Deafness',
    icon: '🔊',
    severity: 'serious',
    type: 'dark-magic',
    culturalOrigin: 'Elven',
    cause: 'Caught within close range of a Nazgûl death-shriek at full pitch',
    symptoms: [
      'Sudden, total deafness in both ears',
      'Intense ringing tinnitus with shadowed tones',
      'Disorientation and loss of balance',
      'Visions of the Shadow World overlaid on normal sight',
    ],
    treatment: [
      {
        step: 1,
        instruction: "Remove the patient from the Ringwraith's presence — distance is the first cure",
        elvishNote:
          'Elvish counter-songs (specifically the Lay of Lúthien) can dispel the dark resonance',
      },
      { step: 2, instruction: 'Pour warm athelas water gently into each ear canal' },
      { step: 3, instruction: 'Have an Elvish singer perform calming harmonics directly to the patient' },
      { step: 4, instruction: 'Bed rest in a quiet, lit space for 48 hours; avoid all darkness' },
    ],
    healingTime: '2–5 days; full hearing returns slowly',
    healingDays: 4,
    requiredHerbs: ['Athelas (Kingsfoil) water', 'Elvish song (no herb substitute)', 'Miruvor drops'],
    effectiveness: 78,
    warningNote: 'Repeated exposure causes permanent hearing loss and Shadow madness.',
    quote: '"The cry of that fell voice was the last thing many heard that day." — Pelennor Fields account',
  },
  // ── MODERATE ─────────────────────────────────────────────────────────────
  {
    id: 'warg-bite',
    name: 'Warg Bite',
    icon: '🐺',
    severity: 'moderate',
    type: 'creature',
    culturalOrigin: 'Human',
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
    healingDays: 7,
    requiredHerbs: ['Athelas (Kingsfoil)', 'Yarrow (clotting)', 'Willow bark tea'],
    effectiveness: 90,
    quote: '"Out of the darkness, the shapes of Wargs came bounding." — FOTR',
  },
  {
    id: 'mirkwood-spider',
    name: 'Mirkwood Spider Webbing',
    icon: '🕸️',
    severity: 'moderate',
    type: 'poison',
    culturalOrigin: 'Hobbit',
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
    healingDays: 2,
    requiredHerbs: ['Athelas poultice', 'Strong tea with honey', 'Fresh stream water'],
    effectiveness: 95,
    quote: '"Flies and spiders! Flies and spiders! Fry them, and bite them!" — Gollum, Mirkwood region',
  },
  {
    id: 'ent-stomp',
    name: 'Ent-Stomp Crush Injury',
    icon: '🌳',
    severity: 'moderate',
    type: 'environmental',
    culturalOrigin: 'Hobbit',
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
        instruction:
          'Clean debris from wound; apply cold Entwater compress — it has mild healing properties',
      },
      {
        step: 4,
        instruction: 'Splint and elevate; imbibe Ent-draught if available — it aids healing significantly',
      },
    ],
    healingTime: '1–3 weeks; Ent-draught accelerates recovery',
    healingDays: 14,
    requiredHerbs: ['Ent-draught (if available)', 'Cold Entwater compress', 'Athelas for bruising'],
    effectiveness: 85,
    quote: '"Treebeard\'s apologies are almost as long as his strides." — Merry Brandybuck',
  },
  {
    id: 'caradhras-frostbite',
    name: 'Caradhras Frostbite',
    icon: '🏔️',
    severity: 'moderate',
    type: 'environmental',
    culturalOrigin: 'Dwarven',
    cause: 'Prolonged exposure to the supernatural cold of Caradhras, the Cruel',
    symptoms: [
      'Numbness and pallor in extremities — fingers, toes, nose, ears',
      'Skin turning white then blue, hard to the touch',
      'Sharp pain when rewarming begins',
      'Possible supernatural iciness that resists normal warmth',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Descend from the mountain immediately — Caradhras\'s cold is willful and pursues',
        elvishNote:
          'Caradhras is aware. Chanting its name in kindness sometimes appeases the mountain',
      },
      { step: 2, instruction: 'Rewarm affected areas slowly with body heat; no open flames directly' },
      {
        step: 3,
        instruction: 'Brew strong pine-needle tea from the forest below; it counters the mountain-cold',
      },
      { step: 4, instruction: 'Wrap in dry blankets; keep the patient conscious and moving their limbs' },
    ],
    healingTime: '3–14 days depending on severity',
    healingDays: 7,
    requiredHerbs: ['Pine needle tea', 'Dwarven warming ointment', 'Athelas infusion'],
    effectiveness: 80,
    warningNote: 'The cold of Caradhras has a will of its own. Even with treatment, it may persist.',
    quote: '"Caradhras has not forgiven us. He will tear you to pieces." — Boromir',
  },
  // ── MILD ─────────────────────────────────────────────────────────────────
  {
    id: 'lembas-overdose',
    name: 'Lembas Overconsumption',
    icon: '🍞',
    severity: 'mild',
    type: 'environmental',
    culturalOrigin: 'Elven',
    cause: 'Ate more than three bites of Lembas bread in a single sitting',
    symptoms: [
      'Extreme fullness and inability to move',
      'Drowsiness and mild euphoria',
      'Possible discomfort and bloating',
      'Unyielding good health, paradoxically',
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
    healingDays: 0,
    requiredHerbs: ['Water (plain)', 'Fresh air', 'Patience'],
    effectiveness: 100,
    quote:
      '"One small bite is enough to fill the stomach of a grown man." — Legolas (the warning everyone ignores)',
  },
  {
    id: 'dwarf-ale-headache',
    name: 'Dwarven Ale Overconsumption',
    icon: '🍺',
    severity: 'mild',
    type: 'environmental',
    culturalOrigin: 'Dwarven',
    cause: 'Overindulgence in Dwarven ale at the feast halls of Erebor or Moria',
    symptoms: [
      'Thunderous headache upon waking — "as if a cave troll sat on your skull"',
      'Sensitivity to torchlight and pickaxe noise',
      'Memory gaps regarding the previous evening\'s song choices',
      'Intense craving for mushrooms and heavy bread',
    ],
    treatment: [
      {
        step: 1,
        instruction: 'Consume one full flagon of cold mountain spring water immediately',
        elvishNote: 'Elves suggest willow bark tea; Dwarves consider this cowardly but effective',
      },
      { step: 2, instruction: 'Eat a substantial breakfast with bread, mushrooms, and fatty meats' },
      { step: 3, instruction: 'Rest in a dimly lit tunnel away from mining activity' },
      { step: 4, instruction: 'Repeat the previous evening\'s toast, quietly, as a reminder of worth' },
    ],
    healingTime: 'Half a day (or until the next shift)',
    healingDays: 1,
    requiredHerbs: ['Willow bark tea', 'Cold mountain spring water', 'Mushrooms (generous serving)'],
    effectiveness: 97,
    quote: '"Never has there been a Dwarf so hungover that he forgot the way to the gold." — Dwarven proverb',
  },
]
