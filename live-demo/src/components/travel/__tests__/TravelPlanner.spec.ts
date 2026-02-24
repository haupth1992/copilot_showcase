import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import TravelPlanner from '../TravelPlanner.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

let attachPoint: HTMLDivElement

function mountComponent(): VueWrapper {
  return mount(TravelPlanner, {
    global: { plugins: [router] },
    attachTo: attachPoint,
  })
}

describe('TravelPlanner', () => {
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
    expect(wrapper.find('.page-title').text()).toContain('Middle-Earth Travel Planner')
  })

  it('renders two location selectors', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.findAll('.location-selector')).toHaveLength(2)
  })

  it('Plan Route button is disabled when no locations selected', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const btn = wrapper.find('.primary-btn')
    expect(btn.attributes('disabled')).toBeDefined()
  })

  it('shows popular quick-pick buttons', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.findAll('.quick-btn').length).toBeGreaterThan(0)
  })

  it('sets from/to when quick pick is clicked', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    const firstQuickBtn = wrapper.findAll('.quick-btn')[0]!
    await firstQuickBtn.trigger('click')
    // After clicking, selects should have values
    const selects = wrapper.findAll('.selector-select')
    expect((selects[0]!.element as HTMLSelectElement).value).not.toBe('')
  })

  it('renders route selector with 4 options', async () => {
    const wrapper = mountComponent()
    await router.isReady()
    expect(wrapper.findAll('.route-option')).toHaveLength(4)
  })

  it('calculates and shows route results after planning', async () => {
    const wrapper = mountComponent()
    await router.isReady()

    // Click the first popular destination
    await wrapper.findAll('.quick-btn')[0]!.trigger('click')

    // Click Plan Route
    const planBtn = wrapper.find('.primary-btn')
    await planBtn.trigger('click')

    // Should show route results
    expect(wrapper.find('.route-results').exists()).toBe(true)
  })

  it('shows route statistics after planning', async () => {
    const wrapper = mountComponent()
    await router.isReady()

    await wrapper.findAll('.quick-btn')[0]!.trigger('click')
    await wrapper.find('.primary-btn').trigger('click')

    expect(wrapper.find('.stats-grid').exists()).toBe(true)
  })

  it('compares all routes when Compare button is clicked', async () => {
    const wrapper = mountComponent()
    await router.isReady()

    await wrapper.findAll('.quick-btn')[0]!.trigger('click')
    await wrapper.find('.secondary-btn').trigger('click')

    expect(wrapper.find('.route-comparison').exists()).toBe(true)
  })

  it('toggles timeline visibility', async () => {
    const wrapper = mountComponent()
    await router.isReady()

    await wrapper.findAll('.quick-btn')[0]!.trigger('click')
    await wrapper.find('.primary-btn').trigger('click')

    // Timeline should be hidden initially
    expect(wrapper.find('.travel-timeline').exists()).toBe(false)

    // Click toggle
    await wrapper.find('.toggle-btn').trigger('click')
    expect(wrapper.find('.travel-timeline').exists()).toBe(true)
  })

  it('random destination button fills both selectors', async () => {
    const wrapper = mountComponent()
    await router.isReady()

    const randomBtn = wrapper.find('.random-btn')
    await randomBtn.trigger('click')

    const selects = wrapper.findAll('.selector-select')
    expect((selects[0]!.element as HTMLSelectElement).value).not.toBe('')
    expect((selects[1]!.element as HTMLSelectElement).value).not.toBe('')
  })
})
