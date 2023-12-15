import PlayerBar from '@/components/PlayerBar.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime';

describe('PlayerBar component test', async () => {
  let wrapper: VueWrapper;
  const duration = 90;

  beforeAll(() => {
    wrapper = mount(PlayerBar, {
      props: {
        duration
      },
    });
  })

  test('PlayerBar content', () => {
    expect(wrapper.find('.player-bar__duration span').text()).toBe(formattedTime(duration));
  })
})