import type { Permission } from "~/types/enums";
import type { GuildMemberResponse } from "~/types/interfaces";

export default (member: GuildMemberResponse, permission: Permission) => {
	console.log(`[hasPermission] Checking if any of ${member.user.display_name}'s roles has ${permission.toString()} permission`);
	for (const role of member.roles) {
		console.log(`[hasPermission] Checking ${role.name}`);
		if (role.permissions & permission) {
			console.log(`[hasPermission] ${role.name} has ${permission.toString()} permission`);
			return true;
		}
		console.log(`[hasPermission] ${role.name} does not have ${permission.toString()} permission`);
	}
	return false;
}
