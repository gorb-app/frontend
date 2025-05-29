export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log("to.fullPath:", to.fullPath);
	const loading = useState("loading");
	const accessToken = useCookie("access_token").value;
	if (["/login", "/register"].includes(to.path)) {
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
