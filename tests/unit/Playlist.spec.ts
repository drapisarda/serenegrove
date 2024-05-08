import Playlist from '@/components/Playlist.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { expect } from 'vitest'

describe('Playlist component test', async () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(Playlist, {})
  })

  test('Playlist UI can be opened', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  test('Playlist UI toggle with clicks', () => {
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(false)
    wrapper.find('.playlist__toggle').trigger('click')
    expect(wrapper.find('.playlist.open')).toBeDefined()
    wrapper.find('.playlist__toggle').trigger('click')
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(false)
  })

  test('Playlist UI toggle with touch', async () => {
    const scrollDownLimit = wrapper.vm.scrollDownLimit

    const manageTouchStartSpy = vi.spyOn(wrapper.vm, 'manageTouchStart')
    const manageTouchEndSpy = vi.spyOn(wrapper.vm, 'manageTouchEnd')
    const manageTouchMoveSpy = vi.spyOn(wrapper.vm, 'manageTouchMove')
    expect(manageTouchStartSpy).not.toHaveBeenCalled()
    expect(manageTouchEndSpy).not.toHaveBeenCalled()
    expect(manageTouchMoveSpy).not.toHaveBeenCalled()

    expect(wrapper.find('.playlist').classes().includes('open')).toBe(false)

    // Open the playlist
    wrapper.find('.playlist__toggle').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(true)

    // touch scroll down but not enough to close
    wrapper.find('.playlist').trigger('touchstart', {
      touches: [{ pageY: 0 }],
    })
    wrapper.find('.playlist').trigger('touchmove', {
      touches: [{ pageY: scrollDownLimit / 2 }],
    })
    wrapper.find('.playlist').trigger('touchend')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(true)

    // touch scrolls up
    wrapper.find('.playlist').trigger('touchstart', {
      touches: [{ pageY: 0 }],
    })
    wrapper.find('.playlist').trigger('touchmove', {
      touches: [{ pageY: -scrollDownLimit - 1 }],
    })
    wrapper.find('.playlist').trigger('touchend')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(true)

    // touch scroll down enough to close
    wrapper.find('.playlist').trigger('touchstart', {
      touches: [{ pageY: 0 }],
    })
    wrapper.find('.playlist').trigger('touchmove', {
      touches: [{ pageY: scrollDownLimit + 1 }],
    })
    wrapper.find('.playlist').trigger('touchend')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.playlist').classes().includes('open')).toBe(false)
  })
})
