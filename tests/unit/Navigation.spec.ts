import Navigation from '@/components/Navigation.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Navigation component test', async () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Navigation, {})
  })

  test('Navigation mounts', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('Mobile Navigation menu toggles with clicks', async () => {
    const toggleMenuSpy = vi.spyOn(wrapper.vm, 'toggleMenu')
    const burgerIcon = wrapper.find('.navbar-menu .navbar-burger')
    const closeIcon = wrapper.find('.navbar-menu .button--close')
    const navBar = wrapper.find('.navbar-start')

    expect(!navBar.isVisible())
    burgerIcon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(toggleMenuSpy).toHaveBeenCalledTimes(1)
    expect(navBar.isVisible())

    closeIcon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(toggleMenuSpy).toHaveBeenCalledTimes(2)
    expect(!navBar.isVisible())
  })

  test('Mobile Navigation menu toggles with keyboard', async () => {
    const toggleMenuSpy = vi.spyOn(wrapper.vm, 'toggleMenu')
    const burgerIcon = wrapper.find('.navbar-menu .navbar-burger')
    const closeIcon = wrapper.find('.navbar-menu .button--close')
    const navBar = wrapper.find('.navbar-start')

    expect(!navBar.isVisible())
    burgerIcon.trigger('keyup', { key: 'Escape' })
    await wrapper.vm.$nextTick()
    expect(toggleMenuSpy).toHaveBeenCalledTimes(1)
    expect(navBar.isVisible())

    closeIcon.trigger('keyup', { key: 'Escape' })
    await wrapper.vm.$nextTick()
    expect(toggleMenuSpy).toHaveBeenCalledTimes(2)
    expect(!navBar.isVisible())
  })
})
