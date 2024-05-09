import RoutineTimer from '@/components/RoutineTimer.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('RoutineTimer component test', async () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(RoutineTimer, {
      props: {
        start: false,
        time: 400,
      },
    })
  })

  test('RoutineTimer mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })
})
