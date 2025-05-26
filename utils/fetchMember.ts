import type { UserResponse } from "~/types/interfaces"

export default async (serverId: string, memberId: string): Promise<UserResponse> => {
	const user = await fetchWithApi(`/servers/${serverId}/members/${memberId}`) as UserResponse;
	return user;
}
