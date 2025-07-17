export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log("to.fullPath:", to.fullPath);
	const loading = useState("loading");
	const accessToken = useCookie("access_token").value;
	const apiBase = useCookie("api_base").value;
	const { fetchInstanceStats } = useApi();
	
	console.log("[AUTH] instance url:", apiBase);
	if (apiBase && !Object.keys(to.query).includes("special") && to.path != "/verify-email") {
		const user = await useAuth().getUser();
		const stats = await fetchInstanceStats(apiBase);
		console.log("[AUTH] stats:", stats);
		console.log("[AUTH] email verification check:", user?.email && !user.email_verified && stats.email_verification_required);
		if (user?.email && !user.email_verified && stats.email_verification_required) {
			return await navigateTo("/register?special=verify_email");
		}
	}

	if (["/login", "/register", "/recover", "/reset-password"].includes(to.path) && !Object.keys(to.query).includes("special")) {
		console.log("path is login or register");
		const apiBase = useCookie("api_base");
		console.log("apiBase gotten:", apiBase.value);
		if (!apiBase.value) {
			const requestUrl = useRequestURL();
			console.log("request url:", requestUrl.href);
			const apiVersion = useRuntimeConfig().public.apiVersion;
			console.log("api version:", apiVersion);
			console.log("apiBase not set");
			const { status, data: gorbTxt } = await useFetch(`${requestUrl.protocol}//${requestUrl.host}/.well-known/gorb.txt`, { responseType: "text" });
			if (status.value == "success" && gorbTxt.value) {
				console.log("got gorb.txt:", gorbTxt.value);
				const parsed = parseWellKnown(gorbTxt.value as string);
				if (parsed.ApiBaseUrl) {
					apiBase.value = `${parsed.ApiBaseUrl}/v${apiVersion}`;
					console.log("set apiBase to:", parsed.ApiBaseUrl);
					console.log("hHEYOO");
					const instanceUrl = useCookie("instance_url");
					console.log("hHEYOO 2");
					console.log("instance url:", instanceUrl.value);
					if (!instanceUrl.value) {
						instanceUrl.value = `${requestUrl.protocol}//${requestUrl.host}`;
						console.log("set instance url to:", instanceUrl.value);
					}
				}
			}
		}
		if (accessToken) {
			return await navigateTo("/");
		}
		return;
	};

	if (!accessToken) {
		loading.value = true;
		console.log("set loading to true");
		const { refresh } = useAuth();
		console.log("hi");
		await refresh();
		const query = new URLSearchParams();
		query.set("redirect_to", to.path);
		loading.value = false;
		console.log("set loading to false");
		return await navigateTo("/login?" + (query ?? ""));
	}
})
