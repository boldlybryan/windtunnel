// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui-pro'
  ],

  css: ['~/assets/css/main.css'],

  uiPro: {
    license: process.env.MY_ENVIRONMENT_VARIABLE,
    mdc: true,
    content: true
  },

  ui: {
    fonts: true, 
    colorMode: false
  }


})