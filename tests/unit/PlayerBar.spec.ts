import PlayerBar from '@/components/PlayerBar.vue'
import Switch from '@/components/Switch.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime'
import { setActivePinia, createPinia } from 'pinia'
import { expect } from 'vitest'

describe('PlayerBar component test', async () => {
  let wrapper: VueWrapper
  const duration = 90

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(PlayerBar, {
      components: {
        Switch,
      },
      props: {
        duration,
        playerSteps: [],
      },
    })
  })

  test('PlayerBar mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  test('PlayerBar proper displayed duration', () => {
    expect(wrapper.find('.player-bar__duration span').text()).toBe(
      formattedTime(duration),
    )
  })

  test('Switch change managed', async () => {
    wrapper.find('.toggle-switch input').setValue(true)
    expect(wrapper).toMatchSnapshot()
  })
})
