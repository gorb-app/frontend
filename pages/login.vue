<template>
	<NuxtLayout>
		<form @submit="formLogin">
			<div>
				<label for="username">Username/Email</label>
				<br>
				<input type="text" name="username" id="username" v-model="form.username">
			</div>
			<div>
				<label for="password">Password</label>
				<br>
				<input type="password" name="password" id="password" v-model="form.password">
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
		<div v-if="registrationEnabled">
			Don't have an account? <NuxtLink :href="registerUrl">Register</NuxtLink> one!
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import type { StatsResponse } from '~/types/interfaces';


definePageMeta({
	layout: "auth"
})

const form = reactive({
	username: "",
	password: "",
});

//const authStore = useAuthStore();

const query = useRoute().query as Record<string, string>;
const searchParams = new URLSearchParams(query);

const instanceUrl = useCookie("instance_url").value;
const registrationEnabled = ref<boolean>(true);

if (instanceUrl) {
	const statsUrl = new URL("/stats", instanceUrl).href;
	const { status, data } = await useFetch<StatsResponse>(statsUrl);
	if (status.value == "success" && data.value) {
		registrationEnabled.value = data.value.registration_enabled;
	}
}

const registerUrl = `/register?${searchParams}`

const { login } = useAuth();

async function formLogin(e: Event) {
	e.preventDefault();
	console.log("Sending login data");
	try {
		await login(form.username, form.password, "Linux Laptop");
		console.log("logged in");
		if (query.redirect_to) {
			console.log("redirecting to:", query.redirect_to);
			return await navigateTo(query.redirect_to);
		}
		return await navigateTo("/");
	} catch (error) {
		console.error("Error logging in:", error);
	}
	//return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>