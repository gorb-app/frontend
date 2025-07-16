import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export function getDisplayName(user: UserResponse, member?: GuildMemberResponse): string {
	if (member?.nickname) return member.nickname
	if (user.display_name) return user.display_name
	return user.username
}