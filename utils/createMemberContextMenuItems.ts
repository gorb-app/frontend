import { Permission } from "~/types/enums";
import type { ContextMenuSection, GuildMemberResponse, IConfirmationModal } from "~/types/interfaces";

export default async (member: GuildMemberResponse, guildId: string, confirmationModal?: Ref<IConfirmationModal | undefined>) => {
	const menuSections: ContextMenuSection[] = [];
	const moderationSection: ContextMenuSection = {
		name: "Moderation",
		items: []
	};

	const me = useState<GuildMemberResponse | undefined>("me");
	const { banMember, kickMember } = useApi();

	console.log("[MENUITEM] hi");
	console.log("[MENUITEM] member:", member.user.username);
	console.log("[MENUITEM] me:", me.value?.user.username);
	if (me.value && member.uuid != me.value.uuid) {
		console.log("[MENUITEM] member is not me");
		if (hasPermission(me.value, Permission.KickMember)) {
			console.log("[MENUITEM] has kick member permission");
			moderationSection.items.splice(Math.min(3, menuSections.length), 0, {
				name: "Kick",
				icon: "lucide:user-x",
				type: "danger",
				callback: async () => {
					if (confirmationModal) {
						console.log("[CONFIRM] HEYO THERE!!");
						confirmationModal.value = {
							actionName: "kick",
							callback: async () => await kickMember(member.uuid),
							show: true
						}
					} else {
						console.log("[CONFIRM] no modal");
						await kickMember(member.uuid)
					}
				}
			});
		}

		if (hasPermission(me.value, Permission.BanMember)) {
			console.log("[MENUITEM] has ban permission");
			moderationSection.items.splice(Math.min(4, menuSections.length), 0, {
				name: "Ban (WIP)",
				icon: "lucide:ban",
				type: "danger",
				callback: async () => {
					if (confirmationModal) {
						console.log("[CONFIRM] HEYO THERE!! 2");
						confirmationModal.value = {
							actionName: "ban",
							callback: async () => await banMember(member.guild_uuid, member.uuid),
							show: true
						}
					} else {
						console.log("[CONFIRM] no modal 2");
						await banMember(member.guild_uuid, member.uuid)
					}
		 		}
			});
		}
	}

	if (moderationSection.items.length) {
		menuSections.push(moderationSection);
	}

	console.log("[MENUITEM] returning menu items:", menuSections);
	return menuSections;
}
