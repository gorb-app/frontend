import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import { fetch as tauriFetch, type ClientOptions } from '@tauri-apps/plugin-http';

declare global {
    interface Window {
        __TAURI_INTERNALS__: Record<string, unknown>;
    }
}

export default async <T>(path: string, options: NitroFetchOptions<string> | (RequestInit & ClientOptions) = {}) => {
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
  const { logout, refresh } = useAuth();
  
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
	  let res;
	  if (window.__TAURI_INTERNALS__) {
	    // Use Tauri's HTTP client
		console.log("USING TAURI'S FUCKING BITCHASS FETCH SHIT")
	    res = await tauriFetch(URL.parse(apiBase + path)!.href, {
			...options,
			headers,
			credentials: "include"
		} as RequestInit & ClientOptions)
	  } else {
		console.log("USING GOATED EPIC NUXT FETCH")
		console.log("fetching:", URL.parse(apiBase + path));
		res = await $fetch<T>(URL.parse(apiBase + path)!.href, {
		  ...options,
		  headers,
		  credentials: "include"
		} as NitroFetchOptions<string>);
	  }

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
              console.log("Revoking");
              await logout();
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
