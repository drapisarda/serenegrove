// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  css: [
  ],
  vite: {
    resolve: {
      alias: [
        {
          find: /^~(.*)$/,
          replacement: 'node_modules/$1',
        },
      ],
    },
    plugins: [
      svgLoader(),
    ]
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'robots', content: 'no-index' }
      ]
    },
    baseURL: '/calmroots/',
  },
})
