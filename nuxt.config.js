import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-test',
    title: 'nuxt-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  pwa: {
    workbox: {
      offline: false,
      dev: true, // 開発環境でもPWA機能を有効に
      // Workboxのデフォルト設定を上書き
      // オフライン時のナビゲーションリクエストをキャッチして/testページを返す
      runtimeCaching: [
        {
          urlPattern: '.*', // すべてのリクエストにマッチ
          handler: 'CacheFirst', // オフライン時はキャッシュを優先して使用
          method: 'GET', // GETリクエストのみを対象
          strategyOptions: {
            cacheName: 'nuxt2-pwa-cache', // キャッシュストレージの名前
            cacheableResponse: { statuses: [0, 200] }, // キャッシュ可能なレスポンスステータス
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 50, // 最大エントリ数
              maxAgeSeconds: 30 * 24 * 60 * 60, // キャッシュの最大期間（30日）
            },
          }],
        },
        {
          urlPattern: 'http://localhost:3000/test',
          handler: 'CacheFirst', // オフライン時はキャッシュを優先して使用
          strategyOptions: {
            cacheName: 'offlinePage',
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        // 他のキャッシュ設定...
      ],
      // 他のPWA設定...
    },
  },

}
