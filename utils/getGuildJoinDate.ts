import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export default (profile: UserResponse | GuildMemberResponse): Date | null => {
	if ("username" in profile) {
		return null
	} else {
		return uuidToDate(profile.uuid)
	}
}