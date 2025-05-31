import type { UserResponse } from "~/types/interfaces"

export default async (guildId: string, memberId: string): Promise<UserResponse> => {
	const user = await fetchWithApi(`/guilds/${guildId}/members/${memberId}`) as UserResponse;
	return user;
}
