<template>
	<div id="root-container" style="margin-top: 5dvh;">
		<div id="main-container">
			<div id="instance-error-container" v-if="!instanceUrl">
				<div v-if="instanceError" style="color: red;">
					{{ instanceError }}
				</div>
				<form @submit="selectInstance">
					<div>
						<label for="instance-url">Instance URL</label>
						<br>
						<input type="url" name="instance-url" id="instance-url" required v-model="instanceUrlInput">
					</div>
					<div>
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
			<div v-else id="auth-form-container">
				<slot />
				<div v-if="!['/recover', '/reset-password'].includes(route.path)">Forgot password? Recover <NuxtLink href="/recover">here</NuxtLink>!</div>
			</div>
			<div v-if="instanceUrl">
				Instance URL is set to <span style="color: var(--primary-color);">{{ instanceUrl }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch';

const instanceUrl = ref<string | null | undefined>(null);
const instanceUrlInput = ref<string>();
const instanceError = ref<string>();
const apiVersion = useRuntimeConfig().public.apiVersion;
const apiBase = useCookie("api_base");
const registrationEnabled = useState("registrationEnabled", () => true);

const route = useRoute();

const query = route.query as Record<string, string>;
const searchParams = new URLSearchParams(query);
searchParams.delete("token");

onMounted(async () => {
	instanceUrl.value = useCookie("instance_url").value;
	console.log("set instance url to:", instanceUrl.value);
});

async function selectInstance(e: Event) {
	e.preventDefault();
	console.log("trying input instance");
	if (instanceUrlInput.value) {
		const gorbTxtUrl = new URL(`/.well-known/gorb.txt`, instanceUrlInput.value);
		console.log("input has value");
		try {
			console.log("trying to get gorb.txt:", gorbTxtUrl);
			const res = await $fetch.raw(gorbTxtUrl.href, { responseType: "text" });
			const parsed = parseWellKnown(res._data as string);
			console.log("parsed:", parsed);
			if (parsed.ApiBaseUrl) {
				apiBase.value = `${parsed.ApiBaseUrl}/v${apiVersion}`;
				console.log("set apiBase to:", parsed.ApiBaseUrl);
				const origin = new URL(res.url).origin;
				instanceUrl.value = origin;
				useCookie("instance_url").value = origin;
				console.log("set instance url to:", origin);
				const stats = await useApi().fetchInstanceStats(apiBase.value);
				if (stats) {
					registrationEnabled.value = stats.registration_enabled;
					console.log("set registration enabled value to:", stats.registration_enabled);
				}
				return;
			}
			instanceError.value = "That URL is not a valid instance.";
			return;
		} catch (error: any) {
			if (error instanceof FetchError) {
				console.log("Status code:", error.response?.status);
				if ((error.cause as any).toString().includes("NetworkError")) {
					instanceError.value = "Could not connect to that instance, it may not be set up correctly.";
				}
				if (error.response?.status == 404) {
					instanceError.value = "An instance with that URL does not exist or is currently down.";
				}
			}
			console.error("Error:", error);
		}
	}
}

const form = reactive({
	password: ""
});
</script>

<style>
#root-container,
#main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#auth-form-container {
	display: flex;
	width: 20dvw;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 1em;
	margin-bottom: 2dvh;
}

#auth-form-container form {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: left;
	margin-top: 10dvh;
	gap: 1em;
}

#instance-error-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>