import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null
  }),
  getters: {
    getAccessToken: (state) => {
      return state.accessToken;
    }
  },
  actions: {
    setAccessToken(value: string) {
      this.accessToken = value;
    }
  }
})
