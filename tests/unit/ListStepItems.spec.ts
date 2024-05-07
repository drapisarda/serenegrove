import ListStepItems from '@/components/ListStepItems.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { originalState } from '@/store/vars'
import { expect } from 'vitest'

describe('ListStepItems component test', async () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(ListStepItems, {
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
  })

  test('ListStepItems mounts', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('ListStepItems adds items', () => {
    const addSpy = vi.spyOn(wrapper.vm, 'add')
    const addStepButton = wrapper.findAll('.steps-list .card-footer .button')[0]
    addStepButton.trigger('click')
    expect(addSpy).toHaveBeenCalled()
  })
})
