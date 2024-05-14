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

    const emittedUpdates = wrapper.emitted('update:modelValue')
    if (!emittedUpdates) throw new Error('Switch fails on emitting updates')
    expect(emittedUpdates[0][0]).toEqual(firstValue)
    expect(emittedUpdates[0][1]).toBe(secondValue)
  })
})
