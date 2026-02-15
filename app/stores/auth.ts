import type { CookieRef } from '#app';
import { defineStore } from 'pinia'

interface State {
	accessToken: CookieRef<string | null | undefined> | undefined;
}

interface TokenResponse {
	access_token: string;
	device_name: string;
}

export const useAuthStore = defineStore("auth", {
	state: (): State => ({
		accessToken: undefined,
	}),
	getters: {
		isAuthenticated: (state) => Boolean(state.accessToken),
	},
	actions: {
		async clear() {
			this.accessToken = null;
			//await navigateTo("/login");
		},

		async register(username: string, email: string, password: string) {
			const hashedPass = await hashPassword(password);
			const res = await fetchWithApi("/auth/register", {
				method: "POST", body: {
					email,
					identifier: username,
					password: hashedPass,
					device_name: "Linux Laptop",
				}
			}) as TokenResponse;
			
			this.accessToken = res.access_token;
		},

		async login(username: string, password: string, device_name: string) {
			const hashedPass = await hashPassword(password);
			console.log("hashedPass:", hashedPass);
			//authStore.setAccessToken(accessToken);
			const res = await fetchWithApi("/auth/login", {
				method: "POST", body: {
					username,
					password: hashedPass,
					device_name,
				}
			}) as TokenResponse;
			console.log("hi");
			const cookie = useCookie("access_token");
			cookie.value = res.access_token;
			this.accessToken = cookie;
			console.log("access token:", this.accessToken);
			console.log("cookie token:", cookie.value);
			//await fetchUser();
		},

		async logout() {
			console.log("access:", this.accessToken);
			await fetchWithApi("/auth/logout", { method: "DELETE" });
			await this.clear();
			return await navigateTo("/login");
		},
		
		async revoke(password: string) {
			const hashedPass = await hashPassword(password);
		
			await fetchWithApi("/auth/revoke", {
				method: "POST",
				body: {
					password: hashedPass,
					device_name: "Linux Laptop",
				}
			});
	
			this.clear();
		},

		async refresh() {
			console.log("refreshing");
			const res = await fetchWithApi("/auth/refresh", {
				method: "POST",
			}) as TokenResponse;
			console.log("finished refreshing:", res);
			if (res && res.access_token) {
				const cookie = useCookie("access_token");
				cookie.value = res.access_token;
				this.accessToken = cookie;
				console.log("set new access token");
			} else {
				console.log("refresh didn't return access token");
			}
		},		

		// as in email the password link
		async requestPasswordReset() {
			// ...
		},

		async disableAccount() {
			// ...
		},
	
		async deleteAccount() {
			// ...
		},
	},
})
