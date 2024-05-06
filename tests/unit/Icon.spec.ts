import Icon from '@/components/Icon.vue'
import { originalState } from '@/store/vars'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Components mount', () => {
  test('Icons mount', () => {
    originalState.stepsOptions.forEach((step) => {
      const wrapper = mount(Icon, {
        name: step.icon,
      })

      expect(wrapper).toMatchSnapshot()
    })
  })
})
