import { Permission } from "~/types/enums";
import type { ContextMenuItem, GuildMemberResponse } from "~/types/interfaces";

export default async (member: GuildMemberResponse, guildId: string) => {
	const menuItems: ContextMenuItem[] = [];

	const { fetchMeMember } = useApi();
	const me = useState<GuildMemberResponse | undefined>("me");
	if (!me.value) {
		const fetchedMe = await fetchMeMember(member.guild_uuid);
		me.value = fetchedMe;
	}
	const { banMember, kickMember } = useApi();

	console.log("[MENUITEM] hi");
	console.log("[MENUITEM] member:", member.user.username);
	console.log("[MENUITEM] me:", me.value?.user.username);
	if (me.value && member.uuid != me.value.uuid) {
		console.log("[MENUITEM] member is not me");
		if (hasPermission(me.value, Permission.KickMember)) {
			console.log("[MENUITEM] has kick member permission");
			menuItems.splice(Math.min(3, menuItems.length), 0, { name: "Kick", icon: "lucide:user-x", type: "danger", callback: async () => await kickMember(member.uuid) });
		}

		if (hasPermission(me.value, Permission.BanMember)) {
			console.log("[MENUITEM] has ban permission");
			menuItems.splice(Math.min(4, menuItems.length), 0, { name: "Ban (WIP)", icon: "lucide:ban", type: "danger", callback: async () => await banMember(guildId, member.uuid) });
		}
	}

	console.log("[MENUITEM] returning menu items:", menuItems);
	return menuItems;
}
