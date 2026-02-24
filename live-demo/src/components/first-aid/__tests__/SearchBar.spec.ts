import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBar from '../SearchBar.vue'

/** Minimal default props so the component mounts without warnings */
const defaultProps = {
  search: '',
  severity: 'all' as const,
  culture: 'all' as const,
  sortBy: 'severity' as const,
}

describe('SearchBar', () => {
  it('renders the search input', () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })

  it('renders the sort select dropdown', () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    expect(wrapper.find('.sort-select').exists()).toBe(true)
  })

  it('renders 5 severity filter pills (all + 4 levels)', () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const rows = wrapper.findAll('.filter-row')
    // First row is severity
    const severityPills = rows[0]!.findAll('.filter-pill')
    expect(severityPills).toHaveLength(5)
  })

  it('renders 7 culture filter pills (all + 6 origins)', () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const rows = wrapper.findAll('.filter-row')
    // Second row is culture
    const culturePills = rows[1]!.findAll('.filter-pill')
    expect(culturePills).toHaveLength(7)
  })

  it('marks the active severity pill with the active class', () => {
    const wrapper = mount(SearchBar, {
      props: { ...defaultProps, severity: 'critical' },
    })
    const pills = wrapper.findAll('.filter-row')[0]!.findAll('.filter-pill')
    const criticalPill = pills.find((p) => p.text().includes('Critical'))
    expect(criticalPill?.classes()).toContain('active')
  })

  it('marks the active culture pill with the active class', () => {
    const wrapper = mount(SearchBar, {
      props: { ...defaultProps, culture: 'Elven' },
    })
    const culturePills = wrapper.findAll('.filter-row')[1]!.findAll('.filter-pill')
    const elvenPill = culturePills.find((p) => p.text().includes('Elven'))
    expect(elvenPill?.classes()).toContain('active')
  })

  it('emits update:search when the input value changes', async () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const input = wrapper.find('.search-input')
    await input.setValue('athelas')
    expect(wrapper.emitted('update:search')).toBeTruthy()
    expect(wrapper.emitted('update:search')![0]).toEqual(['athelas'])
  })

  it('emits update:severity when a severity pill is clicked', async () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const pills = wrapper.findAll('.filter-row')[0]!.findAll('.filter-pill')
    const criticalPill = pills.find((p) => p.text().includes('Critical'))
    await criticalPill?.trigger('click')
    expect(wrapper.emitted('update:severity')).toBeTruthy()
    expect(wrapper.emitted('update:severity')![0]).toEqual(['critical'])
  })

  it('emits update:culture when a culture pill is clicked', async () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const culturePills = wrapper.findAll('.filter-row')[1]!.findAll('.filter-pill')
    const elvenPill = culturePills.find((p) => p.text().includes('Elven'))
    await elvenPill?.trigger('click')
    expect(wrapper.emitted('update:culture')).toBeTruthy()
    expect(wrapper.emitted('update:culture')![0]).toEqual(['Elven'])
  })

  it('emits update:sortBy when the sort select changes', async () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    await wrapper.find('.sort-select').setValue('name')
    expect(wrapper.emitted('update:sortBy')).toBeTruthy()
    expect(wrapper.emitted('update:sortBy')![0]).toEqual(['name'])
  })

  it('renders correct placeholder text', () => {
    const wrapper = mount(SearchBar, { props: defaultProps })
    const input = wrapper.find<HTMLInputElement>('.search-input').element
    expect(input.placeholder).toContain('Search injuries')
  })
})
