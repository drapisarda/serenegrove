import Player from '@/components/Player.vue'
import FeedbackRequest from '@/components/FeedbackRequest.vue'
import Loader from '@/components/Loader.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('Player component test', async () => {
  let wrapper: VueWrapper;

  beforeAll(() => {
    wrapper = mount(Player, {
      components: [
        FeedbackRequest,
        Loader
      ],
      props: {
        routineVariation: false,
        duration: 90,
        playerSteps: [],
      },
    });
  })

  test('Player can be opened', () => {
    expect(wrapper.find('.player__playing').html().length).toBeGreaterThan(0);
    wrapper.find('.player__start button').trigger('click');
  })
})