import type { Permission } from "~/types/enums";
import type { GuildMemberResponse } from "~/types/interfaces";

export default (member: GuildMemberResponse, permission: Permission) => {
	for (const role of member.roles) {
		if (role.permissions & permission) {
			return true;
		}
	}
	return false;
}
