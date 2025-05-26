import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";

export default async <T>(path: string, options: NitroFetchOptions<string> = {}) => {
  console.log("path received:", path);
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  if (path.endsWith("/")) {
    path = path.slice(0, path.lastIndexOf("/"));
  }
  console.log("formatted path:", path);
  try {
    const accessToken = useCookie("access_token");
    console.log("access token:", accessToken.value);
    const apiBase = useCookie("api_base").value;
    const apiVersion = useRuntimeConfig().public.apiVersion;
    console.log("heyoooo")
    console.log("apiBase:", apiBase);
    if (!apiBase) {
      console.log("no api base");
      return;
    }
    console.log("path:", path)
    const { revoke, refresh } = useAuth();
    console.log("access token 2:", accessToken.value);
  
    let headers: HeadersInit = {};
  
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
  
    let reauthFailed = false;
    while (!reauthFailed) {
      try {
        console.log("fetching:", URL.parse(apiBase + path));
        const res = await $fetch<T>(URL.parse(apiBase + path)!.href, {
          ...options,
          headers,
          credentials: "include"
        });
    
        return res;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          if (!path.startsWith("/auth/refresh")) {
            try {
              await refresh();
            } catch (error: any) {
              if (error?.response?.status === 401) {
                reauthFailed = true;
                await revoke();
                return;
              }
            }
          }
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("error:", error);
  }
}
