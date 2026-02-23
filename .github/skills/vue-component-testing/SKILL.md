---
name: vue-component-testing
description: Comprehensive toolkit for testing Vue 3 components using Vitest and Vue Test Utils. Supports Composition API, TypeScript, component mounting, props/emits testing, and user interaction simulation. Perfect for unit testing Vue components in this Hobbit Life Dashboard demo.
argument-hint: "component name and test type"
---

# Vue Component Testing

This skill enables comprehensive testing of Vue 3 components using Vitest and Vue Test Utils, following the patterns established in this LOTR-themed Copilot demonstration repository.

## When to Use This Skill

Use this skill when you need to:
- Test Vue 3 components with Composition API and `<script setup>`
- Verify props, emits, and component behavior
- Simulate user interactions (clicks, form inputs, etc.)
- Test computed properties and reactivity
- Mock Pinia stores or Vue Router
- Write TypeScript-safe component tests
- Follow the project's testing patterns

## Prerequisites

- Vue 3.5+ with Composition API
- Vitest 4.x configured (see `vitest.config.ts`)
- @vue/test-utils installed
- TypeScript 5.9+ with strict mode
- Components following `<script setup lang="ts">` syntax

## Core Capabilities

### 1. Component Mounting
- Mount components with `mount()` or `shallowMount()`
- Pass props and provide context
- Configure global plugins (Pinia, Router)
- Handle async component setup

### 2. User Interaction Testing
- Trigger clicks, form submissions, keyboard events
- Simulate user input into form fields
- Test button states and disabled conditions
- Verify event emissions

### 3. Props & Emits
- Test type-safe props with TypeScript
- Verify emit events and payloads
- Test default prop values
- Validate prop validation rules

### 4. State & Reactivity
- Test computed properties
- Verify reactive data updates
- Test watchers and lifecycle hooks
- Mock Pinia store state

## Usage Examples

### Example 1: Basic Component Test (LOTR-themed)
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MealTracker from '../MealTracker.vue'

describe('MealTracker', () => {
  it('renders all seven Hobbit meals', () => {
    const wrapper = mount(MealTracker)
    const meals = wrapper.findAll('.meal-item')
    expect(meals).toHaveLength(7)
    expect(meals[0].text()).toContain('Breakfast')
    expect(meals[1].text()).toContain('Second Breakfast')
  })
})
```

### Example 2: Props and Emits Testing
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FellowshipMember from '../FellowshipMember.vue'

describe('FellowshipMember', () => {
  it('displays member name and emits select event on click', async () => {
    const wrapper = mount(FellowshipMember, {
      props: {
        name: 'Gandalf',
        role: 'Wizard',
        level: 999
      }
    })
    
    expect(wrapper.text()).toContain('Gandalf')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('memberSelected')).toBeTruthy()
    expect(wrapper.emitted('memberSelected')?.[0]).toEqual([{ name: 'Gandalf' }])
  })
})
```

### Example 3: Form Interaction Testing
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PipeweedForm from '../PipeweedForm.vue'

describe('PipeweedForm', () => {
  it('submits form with correct data', async () => {
    const wrapper = mount(PipeweedForm)
    
    await wrapper.find('input[name="strain"]').setValue('Longbottom Leaf')
    await wrapper.find('input[name="quantity"]').setValue('5')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted('formSubmit')).toBeTruthy()
    const payload = wrapper.emitted('formSubmit')?.[0]?.[0]
    expect(payload).toEqual({
      strain: 'Longbottom Leaf',
      quantity: 5
    })
  })
})
```

### Example 4: Async Component with Pinia Store
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AdventureList from '../AdventureList.vue'

describe('AdventureList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads and displays adventures from store', async () => {
    const wrapper = mount(AdventureList)
    
    // Wait for async data loading
    await wrapper.vm.$nextTick()
    
    const adventures = wrapper.findAll('.adventure-card')
    expect(adventures.length).toBeGreaterThan(0)
    expect(adventures[0].text()).toContain('Quest')
  })
})
```

## Guidelines

1. **Follow project conventions** - Use `describe`, `it`, `expect` from Vitest
2. **Test user behavior, not implementation** - Focus on what users do and see
3. **Use TypeScript types** - Leverage type safety for props and emits
4. **Keep tests simple** - One assertion per test when possible
5. **Name tests clearly** - Describe what the component should do
6. **Test accessibility** - Use `getByRole`, `getByLabelText` when appropriate
7. **Mock external dependencies** - Mock API calls, stores, and router navigation
8. **Clean up after tests** - Use `beforeEach`/`afterEach` for setup/teardown
9. **Test edge cases** - Empty states, loading states, error states
10. **Match LOTR theme** - Use thematic examples (Hobbits, meals, adventures)

## Common Patterns

### Pattern: Setup with Pinia Store
```typescript
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})
```

### Pattern: Mount with Router
```typescript
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: HomeView }]
})

const wrapper = mount(MyComponent, {
  global: {
    plugins: [router]
  }
})
```

### Pattern: Test Async Operations
```typescript
await wrapper.find('button').trigger('click')
await wrapper.vm.$nextTick()
expect(wrapper.text()).toContain('Updated')
```

### Pattern: Check Element Existence
```typescript
const button = wrapper.find('button.submit')
expect(button.exists()).toBe(true)
expect(button.isVisible()).toBe(true)
```

## Test File Structure

Place test files in `__tests__/` directories alongside components:
```
src/
├── components/
│   ├── fellowship/
│   │   ├── FellowshipView.vue
│   │   └── __tests__/
│   │       └── FellowshipView.spec.ts
│   ├── home/
│   │   ├── HomeView.vue
│   │   └── __tests__/
│   │       └── HomeView.spec.ts
```

## Run Tests

```bash
# Run all unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run with coverage
npm run test:unit -- --coverage
```

## Reference Files

- [vitest.config.ts](../../../live-demo/vitest.config.ts) - Vitest configuration
- [App.spec.ts](../../../live-demo/src/__tests__/App.spec.ts) - Example test file
- [Vitest docs](https://vitest.dev) - Official Vitest documentation
- [Vue Test Utils docs](https://test-utils.vuejs.org/) - Official testing library

## Limitations

- Does not test visual rendering (use Playwright for visual testing)
- Cannot test browser-specific APIs without mocking
- Async timing can be tricky (use `nextTick()` and proper `await`)
- Store mocking may require additional setup for complex state
