import Logo from '@/components/Logo.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Components mount', () => {
  test('Standard Logo mount', () => {
    const wrapper = mount(Logo, {})

    expect(wrapper).toMatchSnapshot()
  })

  test('Horizontal Logo mount', () => {
    const wrapper = mount(Logo, {
      props: {
        horizontal: true,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
