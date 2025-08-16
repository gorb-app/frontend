import type { UserResponse } from "~/types/interfaces";

export const useAuth = () => {
  const accessToken = useCookie("access_token");
  const user = useState<UserResponse | null>("user", () => null);

  async function clearAuth() {
    accessToken.value = null;
    user.value = null;
	await navigateTo("/login");
  }

  async function register(username: string, email: string, password: string) {
    const hashedPass = await hashPassword(password);
    const res = await fetchWithApi("/auth/register", {
      method: "POST", body:
      {
        email, identifier: username, password: hashedPass, device_name: "Linux Laptop"
      }
    }) as { access_token: string, refresh_token: string };
    //authStore.setAccessToken(accessToken);
    accessToken.value = res.access_token;
  }

  async function login(username: string, password: string, device_name: string) {
    const hashedPass = await hashPassword(password);
    console.log("hashedPass:", hashedPass);
    //authStore.setAccessToken(accessToken);
    const res = await fetchWithApi("/auth/login", {
      method: "POST", body:
      {
        username, password: hashedPass, device_name: "Linux Laptop"
      }
    }) as { access_token: string, refresh_token: string };
    console.log("hi");
    accessToken.value = res.access_token;
    console.log("access token:", accessToken.value);
    //await fetchUser();
  }

  async function logout() {
    console.log("access:", accessToken.value);

    await fetchWithApi("/auth/logout", { method: "DELETE", credentials: "include" });
    clearAuth();

	  return await navigateTo("/login");
  }

  async function revoke(password: string) {
    const hashedPass = await hashPassword(password);

    await fetchWithApi("/auth/revoke", {
      method: "POST",
      body:
      {
        password: hashedPass, device_name: "Linux Laptop"
      }
    });

    clearAuth();
  }

  async function refresh() {
    console.log("refreshing");
    const res = await fetchWithApi("/auth/refresh", {
      method: "POST"
    }) as any;
    console.log("finished refreshing:", res);
    if (res && res.access_token) {
      accessToken.value = res.access_token;
      console.log("set new access token");
    } else {
      console.log("refresh didn't return access token");
    }
  }

  async function fetchUser() {
    if (!accessToken.value) return;
    console.log("fetchuser access token:", accessToken.value);
    const res = await fetchWithApi("/me") as UserResponse;
    user.value = res;
    return user.value;
  }

  async function getUser() {
    if (!accessToken) return;
    if (!user.value) {
      await fetchUser();
    }
    return user.value;
  }

  
  // as in email the password link
  async function resetPassword() {
    // ...
  }

  async function disableAccount() {
    // ...
  }

  async function deleteAccount() {
    // ...
  }

  return {
	clearAuth,
    register,
    login,
    logout,
    revoke,
    refresh,
    getUser,
    fetchUser,
    user
  }
}
