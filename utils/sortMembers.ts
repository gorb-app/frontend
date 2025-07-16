import type { GuildMemberResponse } from "~/types/interfaces";

export default (members: GuildMemberResponse[]): GuildMemberResponse[] => {
	return members.sort((a, b) => {
		return getDisplayName(a.user, a).localeCompare(getDisplayName(b.user, b))
	})
}