import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

export default (profile: UserResponse | GuildMemberResponse): Date | null => {
	if ("username" in profile) {
		return uuidToDate(profile.uuid)
	} else {
		return uuidToDate(profile.user_uuid)
	}
}