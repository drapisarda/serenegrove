import { formattedTime } from '@/composables/formattedTime'
import { expect } from 'vitest'

describe('formattedTime time formats', async () => {
  test('All the formats', () => {
    expect(formattedTime(1)).toBe('00:01')
    expect(formattedTime(61)).toBe('01:01')
    expect(formattedTime(3661)).toBe('01:01:01')
  })
})
