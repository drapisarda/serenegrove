import Icon from '@/components/Icon.vue'
import { originalState } from '@/store/vars'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Components mount', () => {
  originalState.stepsOptions.forEach((step) => {
    test(`Icons mount ${step.name}`, () => {
      const wrapper = mount(Icon, {
        name: step.icon,
      })

      expect(wrapper).toMatchSnapshot()
    })
  })
})
