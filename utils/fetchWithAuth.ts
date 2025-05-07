import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";

export default async <T>(request: NitroFetchRequest, options: NitroFetchOptions<string> = {}) => {
  const accessToken = useCookie("access_token").value;
  const { revoke } = useAuth();
  console.log("access token 2:", accessToken);

  let headers: HeadersInit = {};

  if (accessToken) {
    headers = {
      ...options.headers,
      "Authorization": `Bearer ${accessToken}`
    };
  } else {
    headers = {
      ...options.headers
    };
  }

  try {
    const res = await $fetch<T>(request, {
      ...options,
      headers,
      credentials: "include"
    });

    return res;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      revoke();
    }
    throw error;
  }
}
