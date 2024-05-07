import ListItems from '@/components/ListItems.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { originalState } from '@/store/vars'

describe('ListItems component test', async () => {
  test('ListItems mounts empty', () => {
    const emptyWrapper: VueWrapper = mount(ListItems, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              mainRoutine: originalState,
            },
          }),
        ],
      },
    })

    expect(emptyWrapper).toMatchSnapshot()
  })

  test('ListItems mounts with steps and interactions work', async () => {
    const testingSteps = [0, 2, 4]
    const testingState = {
      ...originalState,
      steps: testingSteps,
    }

    const wrapper: VueWrapper = mount(ListItems, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              mainRoutine: testingState,
            },
          }),
        ],
      },
    })

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.findAll('.list-items li')).toHaveLength(testingSteps.length)

    const moveDownSpy = vi.spyOn(wrapper.vm, 'moveDown')
    const moveUpSpy = vi.spyOn(wrapper.vm, 'moveUp')
    const removeSpy = vi.spyOn(wrapper.vm, 'remove')

    const firstElementMoveDownButton = wrapper
      .findAll('.list-items li')[0]
      .find('.card-actions--move-down')
    await wrapper.find('.list-items').trigger('click')
    await firstElementMoveDownButton.trigger('click')
    expect(moveDownSpy).toHaveBeenCalled()

    const secondElementMoveUpButton = wrapper.findAll(
      '.list-items li .card-actions--move-up',
    )[1]
    await secondElementMoveUpButton.trigger('click')
    expect(moveUpSpy).toHaveBeenCalled()

    const secondItemRemoveButton = wrapper.findAll(
      '.list-items li .card-actions--remove',
    )[1]
    await secondItemRemoveButton.trigger('click')
    expect(removeSpy).toHaveBeenCalled()
  })
})
