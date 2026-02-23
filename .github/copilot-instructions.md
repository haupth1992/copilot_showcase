# GitHub Copilot Instructions

## Project Overview

This is an **educational and demonstration repository** showcasing GitHub Copilot's Agent and MCP (Model Context Protocol) features. It contains two main components:

1. **Keynote Presentation** (slides/) - A MARP-based slideshow titled "One Tool to Rule Them All" with a Lord of the Rings theme demonstrating Copilot's evolution from autocomplete to agentic AI
2. **Live Demo Application** (live-demo/) - A Vue.js "Hobbit Life Dashboard" used for live coding demonstrations

**Purpose**: Demonstrate Copilot capabilities including inline autocomplete, agent mode, MCP integrations (Playwright, GitHub), and test generation in a fun, educational context.

**Target Audience**: Software engineers learning about AI-assisted coding and GitHub Copilot features.

## Tech Stack

### live-demo/ (Vue.js Application)

**Frontend**
- Vue 3.5+ with TypeScript
- Vue Router 5.x for routing
- Pinia 3.x for state management
- Vite 7.x as build tool and dev server

**Testing**
- Vitest 4.x for unit tests with @vue/test-utils
- Playwright 1.58+ for end-to-end tests
- jsdom for DOM testing environment

**Code Quality**
- TypeScript 5.9+ with strict type checking
- ESLint 9.x + Oxlint for linting
- Prettier 3.8 for code formatting
- Pre-configured linting rules in `.eslintrc`, `.oxlintrc.json`, `.prettierrc.json`

**MCP Servers** (configured in `.vscode/mcp.json`)
- Marp MCP for slide generation/editing
- Playwright MCP for browser automation and testing
- GitHub MCP (optional) for repository interactions

### slides/ (Presentation)

- MARP for markdown-based slides
- Otto Group branding assets
- LOTR-themed content throughout

## Project Structure

```
.
├── slides/
│   ├── copilot-showcase.md         # MARP presentation (LOTR-themed)
│   └── images/                     # Slide assets
├── live-demo/
│   ├── src/
│   │   ├── App.vue                 # Main app component
│   │   ├── main.ts                 # App entry point
│   │   ├── components/             # Vue components (organized by feature)
│   │   │   ├── home/               # Home page components
│   │   │   ├── fellowship/         # Fellowship feature
│   │   │   ├── pipeweed/           # Pipeweed dealer finder
│   │   │   ├── lembas/             # Lembas calculator
│   │   │   ├── travel/             # Travel planner
│   │   │   ├── ring/               # Ring detector
│   │   │   ├── weapons/            # Weapon list
│   │   │   ├── first-aid/          # Injury database
│   │   │   └── layout/             # Layout components (header, footer, nav)
│   │   ├── router/                 # Vue Router configuration
│   │   ├── stores/                 # Pinia stores
│   │   ├── styles/                 # Global styles and CSS variables
│   │   └── __tests__/              # Unit tests (co-located with components)
│   ├── e2e/                        # Playwright E2E tests
│   ├── public/                     # Static assets
│   └── [config files]              # vite.config.ts, tsconfig.json, etc.
├── docs/                           # Documentation
└── .vscode/mcp.json                # MCP server configurations
```

## Coding Guidelines

### Vue.js + TypeScript Patterns

**Always use:**
- Vue 3 Composition API with `<script setup lang="ts">` syntax (NOT Options API)
- TypeScript with explicit type annotations for props, emits, and composables
- Component structure: `<script>`, `<template>`, `<style scoped>` (in that order)
- Type-safe props with `defineProps<T>()` and `withDefaults()`
- Type-safe emits with `defineEmits<T>()`

**Example component structure:**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  updated: [value: number]
}>()
</script>

<template>
  <div class="component">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style scoped>
.component { /* ... */ }
</style>
```

### Code Quality

- **Linting**: Follow rules in `.eslintrc`, `.oxlintrc.json` - run `npm run lint` before committing
- **Formatting**: Prettier auto-formats on save - see `.prettierrc.json`
- **Type Safety**: Enable strict TypeScript - no `any` types unless absolutely necessary
- **Naming**: Use clear, descriptive names (components in PascalCase, composables as `useSomething`)
- **Keep it Simple**: This is educational code - clarity over cleverness

## Testing Requirements

### Unit Tests (Vitest)
- Write unit tests for all components and utilities in `__tests__/` directories
- Use `describe`, `it`, `expect` from Vitest
- Mount components with `@vue/test-utils`
- Test props, emits, computed properties, and user interactions
- Example:
  ```typescript
  import { describe, it, expect } from 'vitest'
  import { mount } from '@vue/test-utils'
  import MealTracker from '../MealTracker.vue'
  
  describe('MealTracker', () => {
    it('renders all seven Hobbit meals', () => {
      const wrapper = mount(MealTracker)
      expect(wrapper.findAll('.meal')).toHaveLength(7)
    })
  })
  ```

### E2E Tests (Playwright)
- Test complete user workflows in `e2e/` directory
- Use Playwright MCP server for AI-assisted test generation
- Focus on critical user paths and accessibility
- Example:
  ```typescript
  test('user can navigate to fellowship page', async ({ page }) => {
    await page.goto('/')
    await page.click('a:has-text("Fellowship")')
    await expect(page).toHaveURL('/fellowship')
  })
  ```

**Run tests**: `npm run test:unit` (Vitest) or `npm run test:e2e` (Playwright)

## Available Resources

### Scripts (live-demo/)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Type-check and build for production
- `npm run lint` - Run ESLint + Oxlint linters
- `npm run format` - Format code with Prettier
- `npm run test:unit` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run type-check` - Run TypeScript type checking

### MCP Servers (`.vscode/mcp.json`)
- **Marp MCP**: Generate and edit presentation slides
- **Playwright MCP**: Create browser automation tests, take screenshots, interact with pages
- **GitHub MCP** (optional): Create issues, PRs, search code, manage repository

### Configuration Files
- `.eslintrc` + `.oxlintrc.json` - Linting rules
- `.prettierrc.json` - Code formatting rules
- `vite.config.ts` - Vite build configuration
- `vitest.config.ts` - Vitest test configuration
- `playwright.config.ts` - Playwright E2E test configuration
- `tsconfig.json` - TypeScript compiler options

## Agent Skills

This repository includes specialized Agent Skills that provide domain-specific knowledge and workflows for common tasks. Skills are automatically loaded by GitHub Copilot when you work on related tasks.

### Available Skills

**📍 Location:** `.github/skills/`

#### 1. marp-slide-generation
**Purpose:** Create and edit professional MARP presentations with Otto Group branding and LOTR themes

**Use this skill when:**
- Adding slides to the keynote presentation
- Creating new MARP-based slideshows
- Formatting technical content with code blocks
- Implementing two-column layouts with images
- Applying Otto Group brand styling

**Key capabilities:**
- Otto Group color palette and styling
- LOTR-themed content patterns
- Code syntax highlighting
- Two-column responsive layouts
- Slide structure and frontmatter configuration

#### 2. playwright-hobbit-testing
**Purpose:** End-to-end testing for the Hobbit Life Dashboard using Playwright

**Use this skill when:**
- Testing complete user workflows (fellowship, pipeweed, meals, travel)
- Verifying navigation and routing
- Testing browser interactions and form submissions
- Capturing screenshots for visual regression
- Monitoring network requests and API calls

**Key capabilities:**
- Browser automation patterns
- LOTR-themed test scenarios
- Async/await testing best practices
- Page object patterns
- Accessibility testing

#### 3. vue-component-testing
**Purpose:** Comprehensive unit testing for Vue 3 components using Vitest and Vue Test Utils

**Use this skill when:**
- Testing Vue components with Composition API
- Verifying props, emits, and reactivity
- Simulating user interactions
- Testing computed properties
- Mocking Pinia stores or Vue Router

**Key capabilities:**
- Component mounting strategies
- TypeScript-safe test patterns
- User interaction simulation
- Event emission testing
- Store and router mocking

### How Skills Work

Skills are **automatically invoked** by Copilot when you request tasks that match their domain. For example:

- "Add a slide about agent modes" → Uses **marp-slide-generation**
- "Test the fellowship page navigation" → Uses **playwright-hobbit-testing**
- "Write tests for MealTracker component" → Uses **vue-component-testing**

Each skill file contains detailed instructions, examples, and best practices that guide Copilot to produce consistent, high-quality results aligned with this repository's standards.

### Creating New Skills

To add a new skill to this repository:

1. Create directory: `.github/skills/your-skill-name/`
2. Add skill file: `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: your-skill-name
   description: Brief description of what this skill does
   argument-hint: "context or parameters"
   ---
   
   # Skill Name
   
   [Detailed instructions, examples, and guidelines]
   ```
3. Skill will be automatically loaded by Copilot

## Repository-Specific Guidelines

### LOTR Theme Consistency
- All live-demo components should maintain the Hobbit/LOTR theme (meals, pipeweed, adventures, etc.)
- Slide content should use LOTR references and quotes
- Keep tone professional yet entertaining ("professional-nerdy")

### Educational Purpose
- Code should be clear and well-documented for learning
- Prioritize readability over clever optimizations
- Add comments explaining "why" not just "what"
- All features should demonstrate Copilot capabilities

### Demo Flow Considerations
- Components should be buildable incrementally during live demos
- Test generation should showcase both unit and E2E testing
- MCP integrations should be easy to demonstrate
- Keep features simple enough to complete in 7-8 minutes

## Documentation Standards

- Use JSDoc for TypeScript functions and utilities
- Document component props, emits, and usage with inline comments
- Keep README files up-to-date with setup instructions and scripts
- Add comments in complex logic to explain intent

## Development Workflow

### Adding New Features
1. Review existing code patterns and conventions
2. Use Composition API with TypeScript for all Vue components
3. Write tests alongside implementation
4. Run `npm run lint` and `npm run test:unit` before committing
5. Ensure changes maintain educational value and LOTR theme

### Refactoring Code
- Maintain backward compatibility unless explicitly requested
- Update tests and documentation together with code changes
- Run full test suite to ensure no regressions

### When Acting as an Agent
- Break down complex tasks into logical, incremental steps
- Review existing patterns before making changes
- Update all related files (code, tests, docs) together
- Validate changes with tests before completing tasks
- Remember this is an educational repository - maintain clarity and teaching value

## Common Patterns to Follow

### Component Props
```typescript
interface Props {
  meals: Meal[]
  maxCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxCount: 7
})
```

### Event Emits
```typescript
const emit = defineEmits<{
  mealAdded: [meal: Meal]
  mealRemoved: [id: string]
}>()
```

### Composables
```typescript
// useHobbitMeals.ts
import { ref, computed } from 'vue'

export function useHobbitMeals() {
  const meals = ref<Meal[]>([])
  const totalCalories = computed(() => 
    meals.value.reduce((sum, m) => sum + m.calories, 0)
  )
  
  return { meals, totalCalories }
}
```

### Test Structure
```typescript
describe('MealTracker', () => {
  it('should add second breakfast when button clicked', () => {
    const wrapper = mount(MealTracker)
    wrapper.find('button.add-meal').trigger('click')
    expect(wrapper.vm.meals).toHaveLength(2)
  })
})
```

## What NOT to Do

- ❌ Don't add external dependencies without discussion (keep it simple)
- ❌ Don't write complex, hard-to-understand code (this is educational)
- ❌ Don't skip tests or documentation
- ❌ Don't use magic numbers or unclear variable names
- ❌ Don't add features that don't serve the educational purpose
- ❌ Don't break existing functionality when adding new features
- ❌ Don't lose the LOTR theme consistency in demo components

## Summary

This repository demonstrates best practices for AI-assisted development through a keynote presentation and live coding demo. When working here:
- **Write clean, documented, tested code**
- **Follow established patterns and conventions**
- **Maintain the educational value**
- **Keep the LOTR theme consistent and fun**
- **Ensure all changes are thoroughly validated**
- **Think about the presentation audience's experience**

Your goal is to help maintain this repository as an excellent example of what's possible with GitHub Copilot while keeping it accessible, educational, and entertaining for developers learning about AI-assisted coding.
