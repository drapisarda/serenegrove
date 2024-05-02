import Switch from '@/components/Switch.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('Switch component test', async () => {
  let wrapper: VueWrapper;
  const modelValue = 0;

  beforeAll(() => {
    wrapper = mount(Switch, {
      props: {
        modelValue
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