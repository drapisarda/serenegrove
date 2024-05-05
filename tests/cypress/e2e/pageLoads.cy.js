const pages = [
  { id: 'Home', url: '/' },
  { id: 'Create', url: '/create/' },
  { id: 'About', url: '/about/' },
  { id: 'Why Meditation', url: '/why-meditation/' },
  { id: 'Privacy', url: '/privacy/' },
  { id: 'Newsletter', url: '/newsletter/' },
  { id: 'Credits', url: '/credits/' },
]

describe('Loads pages', () => {
  pages.forEach((page) => {
    it(page.id, () => {
      cy.visit('http://localhost:3000' + page.url)
    })
  })
})
