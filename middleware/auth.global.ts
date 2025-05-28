export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log("to.path:", to.path);
	const accessToken = useCookie("access_token").value;
	if (["/login", "/register"].includes(to.path)) {
		if (accessToken) {
			return await navigateTo("/");
		}
		return;
	};

	if (!accessToken) {
		const { refresh } = useAuth();
		console.log("hi");
		await refresh();
		const query = new URLSearchParams();
		query.set("redirect_to", to.path);
		return await navigateTo("/login" + (query ?? ""));
	}
})
