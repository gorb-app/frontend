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
			</div>
			<div v-if="instanceUrl">
				Instance URL is set to {{ instanceUrl }}
			</div>
			<div v-if="auth.accessToken.value">
				You're logged in!
				<form @submit="logout">
					<div>
						<label for="logout-password">Password</label>
						<br>
						<input type="password" name="logout-password" id="logout-password" v-model="form.password"
							required>
					</div>
					<div>
						<button type="submit">Log out</button>
					</div>
				</form>
				<div>
					<button @click="refresh">Refresh</button>
				</div>
				<div>
					<button @click="showUser">Show user</button>
				</div>
				<div>
					<button @click="getUser">Get me</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch';

const instanceUrl = ref<string | null | undefined>(null);
const instanceUrlInput = ref<string>();
const instanceError = ref<string>();
const requestUrl = useRequestURL();
const apiVersion = useRuntimeConfig().public.apiVersion;
const apiBase = useCookie("api_base");
const gorbTxtError = ref<string>("");

const auth = useAuth();

const { status, data: gorbTxt } = await useFetch(`${requestUrl.protocol}//${requestUrl.host}/.well-known/gorb.txt`, { responseType: "text" });
if (status.value == "success" && gorbTxt.value) {
	console.log("got gorb.txt:", gorbTxt.value);
	const parsed = parseWellKnown(gorbTxt.value as string);
	if (parsed.ApiBaseUrl) {
		apiBase.value = parsed.ApiBaseUrl;
		console.log("set apiBase to:", parsed.ApiBaseUrl);
	}
} else {
	gorbTxtError.value = "Failed to find that instance.";
}

onMounted(async () => {
	const cookie = useCookie("instance_url").value;
	instanceUrl.value = cookie;
	console.log(cookie);
	console.log("set instance url to:", instanceUrl.value);
});

async function selectInstance(e: Event) {
	e.preventDefault();
	console.log("trying input instance");
	if (instanceUrlInput.value) {
		console.log("input has value");
		const gorbTxtUrl = new URL(`/.well-known/gorb.txt`, instanceUrlInput.value);
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

async function logout(e: Event) {
	e.preventDefault();
	await auth.logout(form.password);
	console.log("logout");
}

async function refresh(e: Event) {
	e.preventDefault();
	await auth.refresh();
	console.log("refreshed");
}

async function getUser(e: Event) {
	e.preventDefault();
	await auth.getUser();
	console.log("user:", auth.user.value);
}

async function showUser(e: Event) {
	e.preventDefault();
	console.log("user:", auth.user.value);
}

</script>

<style>
#root-container,
#main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#auth-form-container,
#auth-form-container form {
	display: flex;
	width: 50dvw;
	flex-direction: column;
	align-items: center;
	gap: 1em;
}

#auth-form-container form {
	text-align: left;
	margin-top: 10dvh;
}

#instance-error-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>