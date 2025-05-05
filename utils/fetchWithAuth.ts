import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";

export default async <T>(request: NitroFetchRequest, options: NitroFetchOptions<string> = {}) => {
  const accessToken = useCookie("access_token");
  console.log("access token 2:", accessToken.value);

  try {
    const res = await $fetch<T>(request, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${accessToken.value}`
      }
    });

    return res;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      // auth.revoke();
    }
    throw error;
  }
}
