import ListItem from '@/components/ListItem.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime';

describe('ListItem component test', async () => {
  const name = 'Lorem Ipsum';
  const icon = 'mantra'
  const duration = 90
  let wrapper: VueWrapper;

  beforeAll(() => {
    wrapper = mount(ListItem, {
      props: {
        step: {
          icon,
          name,
          duration
        }
      },
    });
  })

  test('ListItem content', () => {
    expect(wrapper.find('.card-image icon').attributes().name).toBe(icon);
    expect(wrapper.find('.card-header__title').text().trim()).toBe(name);
    expect(wrapper.find('.card-header__duration span').text()).toBe(formattedTime(duration));
  })

  test('List Item event emit', () => {
    wrapper.find('.card-actions--move-up').trigger('click')
    expect(wrapper.emitted().moveUp.length).toBe(1)

    wrapper.find('.card-actions--move-down').trigger('click')
    expect(wrapper.emitted().moveDown.length).toBe(1)

    wrapper.find('.card-actions--remove').trigger('click')
    expect(wrapper.emitted().remove.length).toBe(1)
  })
})