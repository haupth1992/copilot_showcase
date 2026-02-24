import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RouteSelector from '../RouteSelector.vue'
import type { PathType } from '@/types/travel'

describe('RouteSelector', () => {
  it('renders all 4 route options', () => {
    const wrapper = mount(RouteSelector, { props: { modelValue: 'Direct' } })
    expect(wrapper.findAll('.route-option')).toHaveLength(4)
  })

  it('marks the active option with "active" class', () => {
    const wrapper = mount(RouteSelector, { props: { modelValue: 'Safest' } })
    const activeOption = wrapper.find('.route-option.active')
    expect(activeOption.exists()).toBe(true)
    expect(activeOption.find('.option-label').text()).toBe('Safest')
  })

  it('emits update:modelValue when an option is clicked', async () => {
    const wrapper = mount(RouteSelector, { props: { modelValue: 'Direct' } })
    const options = wrapper.findAll('.route-option')
    // Click "Fastest" (3rd option)
    await options[2]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue')![0] as PathType[])[0]).toBe('Fastest')
  })

  it('shows icons for all options', () => {
    const wrapper = mount(RouteSelector, { props: { modelValue: 'Direct' } })
    expect(wrapper.findAll('.option-icon')).toHaveLength(4)
  })

  it('shows descriptions for all options', () => {
    const wrapper = mount(RouteSelector, { props: { modelValue: 'Direct' } })
    const descs = wrapper.findAll('.option-desc')
    expect(descs).toHaveLength(4)
    descs.forEach((d) => expect(d.text().length).toBeGreaterThan(0))
  })

  it('emits correct type for each option', async () => {
    const pathTypes: PathType[] = ['Direct', 'Safest', 'Fastest', 'Scenic']
    for (let i = 0; i < pathTypes.length; i++) {
      const wrapper = mount(RouteSelector, { props: { modelValue: 'Direct' } })
      await wrapper.findAll('.route-option')[i]!.trigger('click')
      expect((wrapper.emitted('update:modelValue')![0] as PathType[])[0]).toBe(pathTypes[i])
    }
  })
})
