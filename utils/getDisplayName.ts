import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export default (profile: UserResponse | GuildMemberResponse): string => {
	if ("username" in profile) {
		// assume it's a UserRespone
		if (profile.display_name) return profile.display_name
		return profile.username
	} else {
		// assume it's a GuildMemberResponse
		if (profile.nickname) return profile.nickname
		if (profile.user.display_name) return profile.user.display_name
		return profile.user.username
	}
}