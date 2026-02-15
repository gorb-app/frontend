import type { NitroFetchOptions } from "nitropack";
import Timer from "~/classes/Timer";

export default async <T>(path: string, options: NitroFetchOptions<string> = {}) => {
  const timer = new Timer("fetchWithApi");
  timer.start();
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
    timer.stop();
	return;
  }
  console.log("path:", path)
  const authStore = useAuthStore();
  
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

	  timer.stop();
      return res;
    } catch (error: any) {
      console.error("Error fetching resource");
      if (error?.response?.status === 401 || (error?.data === "Header of type `authorization` was missing")) {
        console.log("Error status is 401, or 400 due to missing Authorization header");
        if (!path.startsWith("/auth/refresh")) {
          console.log("Path is not refresh endpoint");
          try {
            console.log("Trying to refresh");
            await authStore.refresh();
            console.log("Successfully refreshed token");
          } catch (error: any) {
            console.log("Failed to refresh token");
            if (error?.response?.status === 401) {
              console.log("Refresh returned 401");
              reauthFailed = true;
              await authStore.clear();
			  timer.stop();
			  throw error;
            }
          }
        } else {
          console.log("Path is refresh endpoint, throwing error");
		  timer.stop();
          throw error;
        }
      } else {
        console.log("throwing error:", error);
		timer.stop();
        throw error;
      }
    }
  }
}
