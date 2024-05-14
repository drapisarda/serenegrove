import Switch from '@/components/Switch.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Switch component test', async () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(Switch, {
      props: {
        modelValue: false,
        label: 'Lorem Label',
        id: 'loremId',
      },
    })
  })

  test('Switch mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  test('Switch changes value and emits properly', async () => {
    expect(wrapper.emitted()['update:modelValue']).toBe(undefined)

    const firstValue = true
    const secondValue = false
    await wrapper.get('input').setValue(firstValue)
    await wrapper.get('input').setValue(secondValue)

    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(firstValue)
    expect(wrapper.emitted()['update:modelValue'][0][1]).toBe(secondValue)
  })
})
