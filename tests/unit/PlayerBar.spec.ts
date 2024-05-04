import PlayerBar from '@/components/PlayerBar.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime';
import { setActivePinia, createPinia } from 'pinia'

describe('PlayerBar component test', async () => {
  let wrapper: VueWrapper;
  const duration = 90;

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(PlayerBar, {
      props: {
        duration,
        playerSteps: []
      },
    });
  })

  test('PlayerBar content', () => {
    expect(wrapper.find('.player-bar__duration span').text()).to.eq(formattedTime(duration));
  })
})