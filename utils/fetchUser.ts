import type { UserResponse } from "~/types/interfaces"

export default async (serverId: string, userId: string): Promise<UserResponse> => {
	const user = await fetchWithApi(`/users/${userId}`) as UserResponse;
	return user;
}
