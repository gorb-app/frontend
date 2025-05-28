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
    baseURL: "/web"
  },
  runtimeConfig: {
    public: {
      apiVersion: 1
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