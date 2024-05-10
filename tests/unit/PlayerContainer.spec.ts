import PlayerContainer from '@/components/PlayerContainer.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { expect } from 'vitest'

describe('PlayerContainer component test', async () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(PlayerContainer, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>',
          },
          Player: true,
        },
      },
    })
  })

  test('PlayerContainer UI can be opened', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })
})
