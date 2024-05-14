import Modal from '@/components/Modal.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Modal component test', async () => {
  let wrapperWithContent: VueWrapper

  beforeEach(() => {
    wrapperWithContent = mount(Modal, {
      slots: {
        'button-text': '<span>This is button text</span>',
        'modal-title': '<h1>This is a title</h1>',
        'modal-content': '<p>This is content</p>',
      },
    })
  })

  test('modal mounts with default options', () => {
    const wrapper = mount(Modal, {})
    expect(wrapper).toMatchSnapshot()
  })

  test('modal mounts with custom content', () => {
    expect(wrapperWithContent).toMatchSnapshot()
  })

  test('modal opens and closes', async () => {
    await wrapperWithContent.find('.modal__button button').trigger('click')
    expect((wrapperWithContent.vm as any).modalStatus).toBe(true)

    await wrapperWithContent.find('.modal__close').trigger('click')
    expect((wrapperWithContent.vm as any).modalStatus).toBe(false)
  })

  test('modal interacts with keyboard ', async () => {
    await wrapperWithContent.find('.modal__button button').trigger('click')
    await wrapperWithContent.vm.$nextTick()
    expect((wrapperWithContent.vm as any).modalStatus).toBe(true)

    await wrapperWithContent.trigger('keyup', { key: 'Escape' })
    await wrapperWithContent.vm.$nextTick()
    expect((wrapperWithContent.vm as any).modalStatus).toBe(false)
  })
})
