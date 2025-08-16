import type { GuildMemberResponse } from "~/types/interfaces";
const { getDisplayName } = useProfile()

export default (members: GuildMemberResponse[]): GuildMemberResponse[] => {
	return members.sort((a, b) => {
		return getDisplayName(a).localeCompare(getDisplayName(b))
	})
}