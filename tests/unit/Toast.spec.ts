import Toast from '@/components/Toast.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalStore } from '@/store/global'
import { ToastStyles } from '@/store/types'

describe('RoutineCarousel component test', async () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers({ shouldAdvanceTime: true })

    wrapper = mount(Toast, {
      props: {},
    })
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  test('RoutineCarousel mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  test('Toast a message, then hide it', async () => {
    const { setToastMessage } = useGlobalStore()
    setToastMessage(`Lorem Ipsum dolor sit amet`, ToastStyles.Success)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.toast').classes().includes('toast--visible')).toBe(
      true,
    )

    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.find('.toast').classes().includes('toast--visible')).toBe(
      false,
    )
  })

  test('Toast a message, then hide it', async () => {
    const secondMessage = `Lorem Ipsum dolor sit amet Bis`
    const { setToastMessage } = useGlobalStore()
    setToastMessage(`Lorem Ipsum dolor sit amet`, ToastStyles.Success)
    await wrapper.vm.$nextTick()
    setToastMessage(secondMessage, ToastStyles.Success)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.toast').text()).toBe(secondMessage)
  })
})
