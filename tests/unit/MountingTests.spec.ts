import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import Navigation from '@/components/Navigation.vue'
import Newsletter from '@/components/Newsletter.vue'
import Loader from '@/components/Loader.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Components mount', async () => {
  const components = [Footer, Hero, Navigation, Newsletter, Loader]

  components.forEach((component) => {
    const wrapper = mount(component, {})
    test(`${wrapper.vm.$options.__name} Mounts`, () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
