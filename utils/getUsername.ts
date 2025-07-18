import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export default (profile: UserResponse | GuildMemberResponse): string => {
	if ("username" in profile) {
		return profile.username
	} else {
		return profile.user.username
	}
}