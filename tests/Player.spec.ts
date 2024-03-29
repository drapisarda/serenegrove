import Player from '@/components/Player.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { originalState } from '@/store/vars'
import { vi } from 'vitest'

describe('Player component test', async () => {
  let wrapper: VueWrapper;

  const playerSteps = originalState.stepsOptions.slice(3).map(step => {
    const newStep = step;
    newStep.file = `http://localhost:3000${step.file}`
    return newStep
  })

  beforeEach(() => {
    wrapper = mount(Player, {
      global: {
        stubs: {
          ClientOnly: {
            template: '<div><slot /></div>',
          },
          RoutineTimer: true,
          RoutineCarousel: true,
          Loader: true,
          FeedbackRequest: true,
          Icon: true,
        }
      },
      props: {
        routineVariation: false,
        duration: 90,
        playerSteps: originalState.stepsOptions.slice(3),
      },
    });
  })

  it('Player UI can be opened', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('changes UI when "play" button is clicked', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.visibleStatus).toBe(false);
    expect(wrapper.vm.pauseStatus).toBe(true);
    expect(wrapper.vm.currentStep).toBeUndefined();

    expect(wrapper.vm.play).toBeDefined();
    await wrapper.find('.player__start button').trigger('click');
    await wrapper.vm.$nextTick();

    /**
     * Possible future implementation: create a testing server to return the mp3 resources,
     * then test the proper loading of the blobs as in Player.vue:getAudioFileUrl
     * expect(wrapper.vm.audio.src.indexOf('blob')).toBe(0)
    */

    expect(wrapper.vm.currentStep).toStrictEqual(playerSteps[0]);
    expect(wrapper.vm.visibleStatus).toBe(true);
    expect(wrapper.vm.pauseStatus).toBe(false);
  });

  it('stops or closes when "Escape" key is pressed', async () => {
    await wrapper.trigger('keyup', { key: 'Escape' });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentStep).toBeUndefined();
    expect(wrapper.vm.visibleStatus).toBe(false);
    expect(wrapper.vm.pauseStatus).toBe(true);
  });
})