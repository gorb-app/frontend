// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', "@pinia/nuxt"],
  app: {
    /*
      Defines what prefix the client runs on
      E.g.: baseURL set to "/web" would host at https://gorb.app/web
      Default is "/" (aka root), which hosts at https://gorb.app/
    */
    baseURL: "/",
  },
  runtimeConfig: {
    public: {
      apiVersion: 1
    }
  }
})