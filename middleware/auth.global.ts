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
		return await navigateTo("/login");
	}
})
