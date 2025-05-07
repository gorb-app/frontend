export const useAuth = () => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("access_token");
  const user = useState("user", () => null);

  async function register(username: string, email: string, password: string) {
    const apiBase = localStorage.getItem("apiBase");
    const hashedPass = await hashPassword(password);
    const res = await $fetch(`${apiBase}/auth/register`, {
      method: "POST", body:
      {
        email, identifier: username, password: hashedPass, device_name: "Linux Laptop"
      }
    }) as { access_token: string, refresh_token: string };
    //authStore.setAccessToken(accessToken);
    accessToken.value = res.access_token;
  }

  async function login(username: string, password: string, device_name: string) {
    const apiBase = localStorage.getItem("apiBase");
    const hashedPass = await hashPassword(password);
    console.log("hashedPass:", hashedPass);
    //authStore.setAccessToken(accessToken);
    const res = await fetchWithAuth(`${apiBase}/auth/login`, {
      method: "POST", body:
      {
        username, password: hashedPass, device_name: "Linux Laptop"
      }
    }) as { access_token: string, refresh_token: string }; fetch

    accessToken.value = res.access_token;
    console.log("access token:", accessToken.value);
    await fetchUser();
  }

  async function logout(password: string) {
    const apiBase = localStorage.getItem("apiBase");
    console.log("password:", password);
    console.log("access:", accessToken.value);
    const hashedPass = await hashPassword(password);
    console.log("hashed");

    const res = await fetchWithAuth(`${apiBase}/auth/revoke`, {
      method: "POST",
      body:
      {
        password: hashedPass, device_name: "Linux Laptop"
      }
    });

    accessToken.value = null;
    user.value = null;
  }

  async function revoke() {
    accessToken.value = null;
    localStorage.removeItem("instanceUrl");
    localStorage.removeItem("apiBase");
  }

  async function refresh() {
    const apiBase = localStorage.getItem("apiBase");
    const res = await fetchWithAuth(`${apiBase}/auth/refresh`, {
      method: "POST"
    }) as { access_token: string };
    accessToken.value = res.access_token;
  }

  async function fetchUser() {
    const apiBase = localStorage.getItem("apiBase");
    if (!accessToken.value) return;
    const res = await fetchWithAuth(`${apiBase}/users/me`) as any;
    user.value = res;
  }

  async function getUser() {
    if (!accessToken) return;
    if (!user.value) {
      await fetchUser();
    }
    return user.value;
  }

  return {
    accessToken,
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
