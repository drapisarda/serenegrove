import { setup, $fetch } from '@nuxt/test-utils';
import { describe, it, expect } from 'vitest';

describe('Pages are loading', async () => {
  const pages = [
    {id: 'Home', url: '/'},
    {id: 'Create', url: '/create/'},
    {id: 'About', url: '/about/'},
    {id: 'why Meditation', url: '/why-meditation/'},
    {id: 'Privacy', url: '/privacy/'},
    {id: 'Newsletter', url: '/newsletter/'},
    {id: 'Credits', url: '/credits/'},
  ]

  await setup({
    rootDir: '/',
  })

  pages.forEach(page => {
    it(page.id, async () => {
      const html = await $fetch(page.url)
      expect(html).toBeDefined()
    });
  })
});
