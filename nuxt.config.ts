// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: true,
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
        { hid: 'description', name: 'description', content: 'With SereneGrove you can create your custom guided meditation, using your favourite mindfulness exercises' },
        { property: 'og:title', content: process.env.TITLE },
        { property: 'og:image', content: `/assets/img/social.png` },
        { property: 'og:description', content: 'With SereneGrove you can create your custom guided meditation, using your favourite mindfulness exercises' },
        { name: 'twitter:card', content: 'summary' },
      ],
      title: process.env.TITLE,
      link: [
        { rel: 'canonical', href: "https://www.serenegrove.com/"}
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "http://Schema.org",
            "@type": "Organization",
            "url": "https://www.serenegrove.com",
          }),
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      test1: process.env.TEST_1,
      feedback_form: process.env.FEEDBACK_FORM,
      title: process.env.TITLE
    }
  }
})
