import FeedbackRequest from '@/components/FeedbackRequest.vue'
import { mount } from '@vue/test-utils'

describe('Components mount', async () => {
  vi.mock('#imports', () => {
    return {
      useRuntimeConfig() {
        return {
          public: {
            feedback_form: 'value',
          },
        }
      },
    }
  })

  test(`FeedbackRequest Mounts`, () => {
    mount(FeedbackRequest, {
      useRuntimeConfig: () => {},
    })
  })
})
