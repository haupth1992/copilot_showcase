import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import InjuryDatabase from '../InjuryDatabase.vue'

// Minimal router so router-link resolves without errors
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

// Attach to document so isVisible() works correctly in jsdom
let attachPoint: HTMLDivElement

function mountComponent(): VueWrapper {
  return mount(InjuryDatabase, {
    global: { plugins: [router] },
    attachTo: attachPoint,
  })
}

describe('InjuryDatabase', () => {
  beforeEach(() => {
    attachPoint = document.createElement('div')
    document.body.appendChild(attachPoint)
  })

  afterEach(() => {
    document.body.removeChild(attachPoint)
  })

  it('renders the page title', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.find('.page-title').text()).toContain('Elvish First Aid Guide')
  })

  it('renders all 10 injuries by default', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.findAll('.injury-card')).toHaveLength(10)
  })

  it('filters injuries by severity when a filter pill is clicked', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const criticalPill = wrapper.findAll('.filter-pill').find((p) => p.text().includes('Critical'))
    await criticalPill?.trigger('click')
    // 3 critical injuries: morgul-wound, shelob-bite, dragon-fire
    expect(wrapper.findAll('.injury-card')).toHaveLength(3)
  })

  it('filters injuries by search query matching name', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    await wrapper.find('.search-input').setValue('morgul')
    expect(wrapper.findAll('.injury-card')).toHaveLength(1)
    expect(wrapper.find('.injury-name').text()).toBe('Morgul Blade Wound')
  })

  it('filters injuries by search query matching herb', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    await wrapper.find('.search-input').setValue('miruvor')
    // Both shelob-bite and morgul-wound have Miruvor cordial
    expect(wrapper.findAll('.injury-card').length).toBeGreaterThan(0)
  })

  it('shows empty state when no injuries match the search', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    await wrapper.find('.search-input').setValue('balrog sandwich recipe xyz')
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.find('.injuries-grid').exists()).toBe(false)
  })

  it('shows results count text', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.find('.results-count').text()).toContain('10 injuries found')
  })

  it('shows singular "injury" when exactly one result', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    await wrapper.find('.search-input').setValue('lembas overconsumption')
    expect(wrapper.find('.results-count').text()).toContain('1 injury found')
  })

  it('expands an injury card when clicked', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const firstCard = wrapper.findAll('.injury-card')[0]!
    // Detail panel hidden initially
    expect(wrapper.findAll('.injury-detail')[0]!.isVisible()).toBe(false)
    await firstCard.trigger('click')
    expect(wrapper.findAll('.injury-detail')[0]!.isVisible()).toBe(true)
  })

  it('collapses an injury card when clicked again', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const firstCard = wrapper.findAll('.injury-card')[0]!
    await firstCard.trigger('click')
    expect(wrapper.findAll('.injury-detail')[0]!.isVisible()).toBe(true)
    await firstCard.trigger('click')
    expect(wrapper.findAll('.injury-detail')[0]!.isVisible()).toBe(false)
  })

  it('updates expand-hint text when card is toggled', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const firstCard = wrapper.findAll('.injury-card')[0]!
    expect(firstCard.find('.expand-hint').text()).toContain('Show treatment')
    await firstCard.trigger('click')
    expect(firstCard.find('.expand-hint').text()).toContain('Hide details')
  })

  it('all severity filter pills are rendered', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const pills = wrapper.findAll('.filter-pill')
    expect(pills).toHaveLength(5) // all, critical, serious, moderate, mild
  })

  it('marks the active filter pill with the active class', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    // "All Severities" is active by default
    expect(wrapper.findAll('.filter-pill')[0]!.classes()).toContain('active')
    // Click "Mild"
    const mildPill = wrapper.findAll('.filter-pill').find((p) => p.text().includes('Mild'))
    await mildPill?.trigger('click')
    expect(mildPill?.classes()).toContain('active')
  })
})
