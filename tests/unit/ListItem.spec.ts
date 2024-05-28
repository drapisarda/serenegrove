import ListItem from '@/components/ListItem.vue'
import { mount } from '@vue/test-utils'
import { formattedTime } from '@/composables/formattedTime'
import { expect } from 'vitest'

describe('ListItem component test', async () => {
  const name = 'Lorem Ipsum'
  const icon = 'mantra'
  const duration = 90
  const step = {
    id: 0,
    file: '',
    description: '',
    pauseAfter: 0,
    icon,
    name,
    duration,
  }

  test('ListItem content', () => {
    const wrapper = mount(ListItem, {
      props: {
        index: 0,
        isFirst: false,
        isLast: false,
        step,
      },
    })
    expect(wrapper.find('.card-image icon').attributes().name).toBe(icon)
    expect(wrapper.find('.card-header__title').text().trim()).toBe(name)
    expect(wrapper.find('.card-header__duration span').text()).toBe(
      formattedTime(duration),
    )
  })

  test('List Item event emit', () => {
    const wrapper = mount(ListItem, {
      props: {
        index: 0,
        isFirst: false,
        isLast: false,
        step,
      },
    })

    wrapper.find('.card-actions--move-up').trigger('click')
    expect(wrapper.emitted().moveUp.length).toBe(1)

    wrapper.find('.card-actions--move-down').trigger('click')
    expect(wrapper.emitted().moveDown.length).toBe(1)

    wrapper.find('.card-actions--remove').trigger('click')
    expect(wrapper.emitted().remove.length).toBe(1)
  })
})
