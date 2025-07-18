import type { NitroFetchOptions } from "nitropack";

export default async <T>(path: string, options: NitroFetchOptions<string> = {}) => {
  console.log("path received:", path);
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  if (path.endsWith("/")) {
    path = path.slice(0, path.lastIndexOf("/"));
  }
  console.log("formatted path:", path);
  const apiBase = useCookie("api_base").value;
  const apiVersion = useRuntimeConfig().public.apiVersion;
  console.log("heyoooo")
  console.log("apiBase:", apiBase);
  if (!apiBase) {
    console.log("no api base");
    return;
  }
  console.log("path:", path)
  const { clearAuth, refresh } = useAuth();
  
  let headers: HeadersInit = {};
  
  
  let reauthFailed = false;
  while (!reauthFailed) {
    const accessToken = useCookie("access_token");
    console.log("access token:", accessToken.value);
    if (accessToken.value) {
      headers = {
        ...options.headers,
        "Authorization": `Bearer ${accessToken.value}`
      };
    } else {
      headers = {
        ...options.headers
      };
    }
    try {
      console.log("fetching:", URL.parse(apiBase + path));
      const res = await $fetch<T>(URL.parse(apiBase + path)!.href, {
        ...options,
        headers,
        credentials: "include"
      });

      return res;
    } catch (error: any) {
      console.error("Error fetching resource");
      if (error?.response?.status === 401) {
        console.log("Error status is 401");
        if (!path.startsWith("/auth/refresh")) {
          console.log("Path is not refresh endpoint");
          try {
            console.log("Trying to refresh");
            await refresh();
            console.log("Successfully refreshed token");
          } catch (error: any) {
            console.log("Failed to refresh token");
            if (error?.response?.status === 401) {
              console.log("Refresh returned 401");
              reauthFailed = true;
              await clearAuth()
              console.log("Redirecting to login");
              await navigateTo("/login");
              console.log("redirected");
              return;
            }
          }
        } else {
          console.log("Path is refresh endpoint, throwing error");
          throw error;
        }
      } else {
        console.log("throwing error:", error);
        throw error;
      }
    }
  }
}
