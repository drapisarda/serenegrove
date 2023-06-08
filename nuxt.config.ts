// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

interface Device {
  userAgent: string
  isDesktop: boolean
  isIos: boolean
  isAndroid: boolean
  isMobile: boolean
  isMobileOrTablet: boolean
  isDesktopOrTablet: boolean
  isTablet: boolean
  isWindows: boolean
  isMacOS: boolean
  isApple: boolean
  isSafari: boolean
  isFirefox: boolean
  isEdge: boolean
  isChrome: boolean
  isSamsung: boolean
  isCrawler: boolean
}

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    ['nuxt-cache-ssr', {
      // Can be disable per enviroment, like in dev
      enabled: true,
      store: {
        type: 'memory',
        max: 500,
        ttl: 1000 * 60 // 1 Minute
      },
      pages: [
        // these are prefixes of pages that need to be cached, for caching homepage use '/'
        '/',
        '/about',
        '/newsletter',
        '/credits',
      ],
    }]
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
      ],
      title: 'SereneGrove - Your custom guided meditation routine'
    },
  },
  runtimeConfig: {
    public: {
      test1: process.env.TEST_1,
      feedback_form: process.env.FEEDBACK_FORM,
    }
  }
})
