import Logo from '@/components/Logo.vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

describe('Components mount', () => {
  it('Standard Logo mount', () => {
    const wrapper = mount(Logo, {})

    expect(wrapper).toMatchSnapshot()
  })

  it('Horizontal Logo mount', () => {
    const wrapper = mount(Logo, {
      props: {
        horizontal: true,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
