// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
      // ...
      'nuxt-icon',
      [
        '@pinia/nuxt',
        {
          autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            // automatically imports `defineStore` as `definePiniaStore`
            ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
          ]
        }
      ]
    ],
    typescript: {
      strict: true,
      typeCheck: true
    },
    css: [
      '~/assets/css/main.css',
      '~/assets/css/main.scss',
      // '~/assets/css/_base.scss',
    ],
    
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/assets/css/_base.scss" as *;'
          }
        }
      }
    }
})
