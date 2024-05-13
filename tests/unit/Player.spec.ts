import Player from '@/components/Player.vue'
import RoutineTimer from '@/components/RoutineTimer.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { originalState } from '@/store/vars'
import { expect } from 'vitest'

describe('Player component test', async () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Player, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>',
          },
          RoutineTimer,
          RoutineCarousel: true,
          Loader: true,
          FeedbackRequest: true,
          Icon: true,
        },
      },
      props: {
        duration: 90,
        playerSteps: originalState.stepsOptions.slice(3),
        pauseAfter: 0,
        routineModifier: originalState.routineVariations[0].modifier,
      },
    })
  })

  test('Player UI can be opened', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  test('UI changes when "play" button is clicked', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.visibleStatus).toBe(false)
    expect(wrapper.vm.pauseStatus).toBe(true)
    expect(wrapper.vm.currentStep).toBe(undefined)

    wrapper.find('.player__start button').trigger('click')
    await wrapper.vm.$nextTick()

    /**
     * Possible future implementation: create a testing server to return the mp3 resources,
     * then test the proper loading of the blobs as in Player.vue:getAudioFileUrl
     * expect(wrapper.vm.audio.src.indexOf('blob')).toBe(0)
     */

    expect(wrapper.vm.visibleStatus).toBe(true)
    expect(wrapper.vm.pauseStatus).toBe(false)
    await wrapper.vm.$nextTick()
  })

  test('Player stops when "Escape" key is pressed. It closes when it is pressed again', async () => {
    wrapper.find('.player__start button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.pauseStatus).toBe(false)
    expect(wrapper.vm.visibleStatus).toBe(true)

    await wrapper.trigger('keyup', { key: 'Escape' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.pauseStatus).toBe(true)

    await wrapper.trigger('keyup', { key: 'Escape' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.visibleStatus).toBe(false)
  })

  test('Player stops when the close button is pressed. It closes when it is clicked again', async () => {
    wrapper.find('.player__start button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.pauseStatus).toBe(false)
    expect(wrapper.vm.visibleStatus).toBe(true)

    wrapper.find('.button--close').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.pauseStatus).toBe(true)

    wrapper.find('.button--close').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.visibleStatus).toBe(false)
  })

  test('Player pauses when the the play/pause button is pressed during play. It plays when it is clicked again', async () => {
    wrapper.find('.player__start button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.pauseStatus).toBe(false)
    expect(wrapper.vm.visibleStatus).toBe(true)

    wrapper.find('.player__action__button--pause').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.visibleStatus).toBe(true)
    expect(wrapper.vm.pauseStatus).toBe(true)

    wrapper.find('.player__action__button--play').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.pauseStatus).toBe(false)
    expect(wrapper.vm.visibleStatus).toBe(true)
  })
})
