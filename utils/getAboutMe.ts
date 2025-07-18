import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export default (profile: UserResponse | GuildMemberResponse): string | null => {
	if ("username" in profile) {
		return profile.about
	} else {
		return profile.user.about
	}
}