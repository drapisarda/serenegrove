import RoutineCarousel from '@/components/RoutineCarousel.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'
import { originalState } from '@/store/vars'

describe('RoutineCarousel component test', async () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(RoutineCarousel, {
      props: {
        currentStepIndex: 0,
        playerSteps: originalState.stepsOptions.splice(3),
      },
    })
  })

  test('RoutineCarousel mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })
})
