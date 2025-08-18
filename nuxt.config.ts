// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', "@pinia/nuxt", "@nuxt/icon"],
  ssr: false,
  app: {
    /*
      Defines what prefix the client runs on
      E.g.: baseURL set to "/web" would host at https://gorb.app/web
      Default is "/" (aka root), which hosts at https://gorb.app/
    */
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Gorb',
      // this is purely used to embed in that other chat app, and similar stuff
      meta: [
        { property: 'og:title', content: 'Gorb' },
        { property: 'og:description', content: 'Gorb is an open-source (and eventually federated) chat platform where you can join and chat in servers, chat privately in DMs, and more.' },
        { property: 'og:url', content: 'https://gorb.app/web' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Gorb' },
        { property: 'theme-color', content: "#df5f0b" }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiVersion: 1,
      messageGroupingMaxDifference: 300000,
      buildTimeString: new Date().toISOString(),
      gitHash: process.env.GIT_SHORT_REV || "N/A",
    }
  },
  /* nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:8080/api",
        changeOrigin: true,
        prependPath: true,
        ws: true
      }
    }
  } */
})