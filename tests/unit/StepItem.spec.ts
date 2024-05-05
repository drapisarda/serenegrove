import StepItem from '@/components/StepItem.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime';
import { expect } from 'vitest'

describe('StepItem component test', async () => {
  const name = 'Lorem Ipsum';
  const icon = 'mantra'
  const duration = 90
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper id leo quis pulvinar. Donec nec aliquet ex, sed convallis purus. Pellentesque auctor nibh vitae quam consequat hendrerit.'
  let wrapper: VueWrapper;

  beforeAll(() => {
    wrapper = mount(StepItem, {
      props: {
        step: {
          id: 0,
          file: '',
          pauseAfter: 0,
          icon,
          name,
          duration,
          description
        }
      },
    });
  })

  test('StepItem content', () => {
    expect(wrapper.find('.card-image icon').attributes().name).toBe(icon);
    expect(wrapper.find('.card-header-title').text().trim()).toBe(name);
    expect(wrapper.find('.card-content__description').text().trim()).toBe(description);
    expect(wrapper.find('.card-header__duration span').text()).toBe(formattedTime(duration));
  })
})