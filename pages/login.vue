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

const registrationEnabled = ref<boolean>(true);
const apiBase = useCookie("api_base");

if (apiBase.value) {
	console.log("apiBase:", apiBase.value);
	const stats = await useApi().fetchInstanceStats(apiBase.value);
	if (stats) {
		registrationEnabled.value = stats.registration_enabled;
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
			return await navigateTo(query.redirect_to, { replace: true });
		}
		return await navigateTo("/", { replace: true });
	} catch (error) {
		console.error("Error logging in:", error);
	}
	//return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>