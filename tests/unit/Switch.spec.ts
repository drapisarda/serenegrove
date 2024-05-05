import Switch from '@/components/Switch.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

describe('Switch component test', async () => {
  let wrapper: VueWrapper;
  const modelValue = false;

  beforeAll(() => {
    wrapper = mount(Switch, {
      props: {
        modelValue,
        id: 'switch'
      },
    });
  })

  test('Switch emit and checkbox functionality', () => {
    wrapper.find('.toggle-input').trigger('click');
    wrapper.find('.toggle-input').trigger('click');
    expect(wrapper.emitted().updateModelValue[0][0]).toBe(!modelValue);
    expect(wrapper.emitted().updateModelValue[1][0]).toBe(!!modelValue);
    expect(wrapper.emitted().updateModelValue.length).toBe(2);
  })
})