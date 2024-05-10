import Switch from '@/components/Switch.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Switch component test', async () => {
  let wrapper: VueWrapper
  const modelValue = false

  beforeAll(() => {
    wrapper = mount(Switch, {
      props: {
        modelValue,
        value: false,
        label: 'Lorem Label',
        id: 'loremId',
      },
    })
  })

  test('Switch mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })
})
